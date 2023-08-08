import { computePosition, flip, shift, offset, arrow as arrowMiddleware, type ComputePositionConfig, type ComputePositionReturn, type Coords } from '@floating-ui/dom';
import type { SvelteComponent } from 'svelte';
import { browser } from '$app/environment';
import { Popover } from '../components/Popover';
import { ensureArray } from '$lib/utils';
import type { SvelteConstructorProps } from '$lib/types';

export type PopoverEvent = 'hover' | 'click' | 'focus';
export type PopoverEventTuple = [keyof HTMLElementEventMap, (...args: any[]) => void];

export type PopoverBaseProps<C extends typeof SvelteComponent> = SvelteConstructorProps<C> & {
  hide?: () => void;
}

export type PopoverHookOptions<C extends typeof SvelteComponent> = Partial<ComputePositionConfig> & {
  abortable?: boolean;
  arrowed?: string;
  Component?: C;
  element?: HTMLElement;
  escapable?: boolean;
  props?: PopoverBaseProps<C>;
  target?: HTMLElement;
  selector?: string;
  events?: PopoverEvent | PopoverEvent[];
}

// Reasonable defaults for most use cases. 
const DEFAULTS: Partial<ComputePositionConfig> = {
  middleware: [
    offset(4), // offset should be at start.
    flip(),
    shift({ padding: 4 })
  ],
  placement: 'top',
};

const ARROW_POSITION = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

function normalizeOptions<C extends typeof SvelteComponent<any> = typeof Popover>(options?: PopoverHookOptions<C>) {

  options = {
    target: document.body,
    events: ['hover'],
    Component: Popover as C,
    ...DEFAULTS,
    ...options
  };

  options.events = ensureArray(options.events);

  const {
    abortable, arrowed, Component, escapable, events: initEvents,
    element: initElement, props, selector,
    target, ...rest } = options as Required<PopoverHookOptions<C>>;

  return {
    internal: {
      abortable, arrowed, Component,
      escapable, initEvents,
      initElement, props, selector,
      target
    },
    floating: rest
  };

}

export function usePopover<C extends typeof SvelteComponent<any>>(
  initRef?: HTMLElement,
  options?: PopoverHookOptions<C>
) {

  if (!initRef || !browser) return {
    initRef,
    element: undefined,
    arrow: unbind,
    bind,
    unbind,
    show,
    hide,
    update,
    destroy
  };

  const events = {
    hover: [['mouseenter', show], ['mouseleave', hide]],
    focus: [['focus', show], ['blur', hide]],
    click: [['click', show]]
  } as Record<PopoverEvent, PopoverEventTuple[]>;

  const normalized = normalizeOptions(options);
  const rest = normalized.floating;

  const {
    abortable, arrowed, Component, escapable, initEvents,
    initElement, props, selector, target
  } = normalized.internal;

  let FloatingComponent: typeof SvelteComponent | undefined;

  const ref = initRef as HTMLElement;
  let element: HTMLElement | undefined;
  let component = undefined as SvelteComponent | undefined;
  let arrow: HTMLElement | undefined;
  let visible = false;

  if (initElement)
    element = initElement;
  else
    FloatingComponent = Component;

  const api = {
    ref,
    element,
    arrow,
    bind,
    unbind,
    show,
    hide,
    update,
    destroy
  };

  function findElement(selector: string, root = document.body as HTMLElement) {
    const el = root.querySelector(selector);
    if (!el) {
      console.warn(`Could NOT locate floating element using selector "${selector}".`);
      return null;
    }
    return el as HTMLElement;
  }

  function handleClickOutside(event: MouseEvent) {
    if (!ref || event.target === ref) return;
    if (element && !element.contains((event.target as Node) || null) && visible) {
      event.preventDefault();
      hide();
    }
  }

  function handleEscape(event: KeyboardEvent) {
    if (event.key === 'Escape' && visible) {
      event.preventDefault();
      hide();
    }
  }

  function bind() {
    (initEvents as PopoverEvent[]).forEach(ev => {
      events[ev].forEach(([event, listener]) => {
        ref.addEventListener(event, listener);
      });
    });
    if (abortable && escapable) window.addEventListener('keydown', handleEscape);
  }

  function unbind() {
    (initEvents as PopoverEvent[]).forEach(ev => {
      events[ev].forEach(([event, listener]) => {
        ref.removeEventListener(event, listener);
      });
    });
    if (abortable && escapable) window.addEventListener('keydown', handleEscape);
  }

  function register(el: HTMLElement) {
    //
  }

  function assignElement({ x, y }: ComputePositionReturn) {
    if (!element) return;
    Object.assign(element.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  }

  function assignArrow({ placement, middlewareData }: ComputePositionReturn) {
    if (!arrow) return;
    const { x, y } = middlewareData.arrow as Coords & { centerOffset: number };
    const key = placement.split('-')[0] as keyof typeof ARROW_POSITION;
    const pos = ARROW_POSITION[key];
    Object.assign(arrow.style, {
      left: x != null ? `${x}px` : '',
      top: y != null ? `${y}px` : '',
      right: '',
      bottom: '',
      [pos]: '-4px',
    });
  }

  function update(updateOptions?: Partial<ComputePositionConfig>) {

    if (!element) return;

    updateOptions = {
      ...rest,
      ...updateOptions
    };

    if (arrowed && arrow) // add the arrow if user defined.
      updateOptions.middleware?.push(arrowMiddleware({ element: arrow, padding: 4 }))

    return computePosition(ref, element, updateOptions)
      .then((response) => {
        assignElement(response);
        if (arrowed)
          assignArrow(response);
      });

  }

  function show() {
    if (FloatingComponent) {
      // pass along the hide prop for use with popovers.
      // you will need to create the appropriate type
      // readonly hide?: () => void;" in your component's 
      // exported options.
      props.hide = api.hide.bind(api);
      component = new FloatingComponent({ target, props });
      const foundEl = findElement(selector, target);
      if (foundEl)
        element = foundEl;
    }
    if (arrowed) {
      const foundEl = findElement(arrowed);
      if (foundEl)
        arrow = foundEl;
    }
    if (element) {
      element.style.display = 'block';
      update();
    }
    visible = true;
    if (initEvents.includes('click') && abortable)
      document.addEventListener('click', handleClickOutside);
  }

  function hide() {
    if (!element) return;
    if (FloatingComponent)
      element.remove();
    else
      element.style.display = '';
    visible = false;
    if (initEvents.includes('click') && abortable)
      document.removeEventListener('click', handleClickOutside);
  }

  function destroy() {
    if (component) component.$destroy();
    unbind();
  }

  return api;

}

export function popover<C extends typeof SvelteComponent<any>>(
  ref: HTMLElement,
  options: PopoverHookOptions<C>) {

  const content = ref.getAttribute('title');
  ref.setAttribute('title', '');

  options.props = {
    content,
    ...options.props
  } as unknown as PopoverHookOptions<C>['props'];

  const { bind, destroy } = usePopover(ref, {
    escapable: true,
    selector: '.popover',
    arrowed: '#arrow',
    Component: Popover as C,
    ...options,
  });

  bind();

  return {
    destroy
  };

}