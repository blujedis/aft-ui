import { computePosition, flip, shift, offset, arrow as arrowMiddleware, type ComputePositionConfig, type ComputePositionReturn, type Coords } from '@floating-ui/dom';
import type { SvelteComponent } from 'svelte';
import { browser } from '$app/environment';
import { Popover } from '../components/Popover';
import { cleanObj, ensureArray } from '$lib/utils';
import type { SvelteConstructorProps } from '$lib/types';

export type PopoverEvent = 'hover' | 'click' | 'focus';

export type PopoverEventTuple = [keyof HTMLElementEventMap, (...args: any[]) => void];

export type PopoverConstructorProps<C extends typeof SvelteComponent> = SvelteConstructorProps<C> & {
  hide?: () => void;
}

export type PopoverBaseHookOptions<C extends typeof SvelteComponent> = {
  abortable?: boolean;
  arrowed?: string;
  Component?: C;
  element?: HTMLElement;
  escapable?: boolean;
  props?: PopoverConstructorProps<C>;
  target?: HTMLElement;
  selector?: string;
  events?: PopoverEvent | PopoverEvent[];
}

export type PopoverHookOptions<C extends typeof SvelteComponent> = Partial<ComputePositionConfig> & PopoverBaseHookOptions<C>;

export interface PopoverInstance<C extends typeof SvelteComponent<any>> {
  trigger: HTMLElement;
  popover: HTMLElement;
  arrow: HTMLElement;
  bind(): void;
  unbind(): void;
  update(options?: Partial<ComputePositionConfig>): void;
  show(options?: PopoverHookOptions<C>): void;
  hide(): void;
  destroy(): void;
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

function normalizeOptions<C extends typeof SvelteComponent<any> = typeof Popover>(options?: PopoverHookOptions<C>, rootOptions?: PopoverHookOptions<C>) {

  options = {
    target: document.body,
    events: ['hover'],
    Component: Popover as C,
    ...DEFAULTS,
    ...rootOptions,
    ...options
  };

  options.events = ensureArray(options.events);

  const {
    abortable, arrowed, Component, escapable, events,
    element, props, selector,
    target, ...rest } = options as Required<PopoverHookOptions<C>>;

  return {
    internal: {
      abortable, arrowed, Component,
      escapable, events,
      element, props, selector,
      target
    },
    floating: rest
  } as { internal: Required<PopoverBaseHookOptions<C>>, floating: ComputePositionConfig }

}

export function createPopover<C extends typeof SvelteComponent<any>>(
  initRef?: HTMLElement,
  initOptions?: PopoverHookOptions<C>
) {

  if (!initRef || !browser) return {
    trigger: initRef,
    popover: undefined,
    arrow: undefined,
    bind,
    unbind,
    show,
    hide,
    update,
    destroy
  };

  const eventMap = {
    hover: [['mouseenter', show], ['mouseleave', hide]],
    focus: [['focus', show], ['blur', hide]],
    click: [['click', show]]
  } as Record<PopoverEvent, PopoverEventTuple[]>;

  let trigger = initRef as HTMLElement;
  let popover: HTMLElement | undefined;
  let arrow: HTMLElement | undefined;
  let component = undefined as SvelteComponent | undefined;
  let visible = false;

  const initApplied = applyOptions(initOptions);
  let internalOptions = initApplied.internal;
  let floatingOptions = initApplied.floating;

  const { abortable, arrowed, Component, events, escapable, props, selector, target } = internalOptions as Required<PopoverBaseHookOptions<C>>;

  const api = {
    trigger,
    popover,
    arrow,
    bind,
    unbind,
    show,
    hide,
    update,
    destroy
  };

  function applyOptions(updateOptions?: PopoverHookOptions<C>) {
    const normalized = normalizeOptions(updateOptions, initOptions);
    if (normalized.internal.element)
      popover = normalized.internal.element;
    return normalized;
  }

  function findElement(selector: string, root = document.body as HTMLElement) {
    const el = root.querySelector(selector);
    if (!el) {
      console.warn(`Could NOT locate floating element using selector "${selector}".`);
      return null;
    }
    return el as HTMLElement;
  }

  function handleClickOutside(event: MouseEvent) {
    if (!trigger || event.target === trigger) return;
    if (popover && !popover.contains((event.target as Node) || null) && visible) {
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

  function assignElement({ x, y }: ComputePositionReturn) {
    if (!popover) return;
    Object.assign(popover.style, {
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

  function bind() {
    (events as PopoverEvent[]).forEach(ev => {
      eventMap[ev].forEach(([event, listener]) => {
        trigger.addEventListener(event, listener);
      });
    });
    if (abortable && escapable) window.addEventListener('keydown', handleEscape);
  }

  function unbind() {
    (events as PopoverEvent[]).forEach(ev => {
      eventMap[ev].forEach(([event, listener]) => {
        trigger.removeEventListener(event, listener);
      });
    });
    if (abortable && escapable) window.addEventListener('keydown', handleEscape);
  }

  function update(computeOptions?: Partial<ComputePositionConfig>) {

    if (!popover) return;

    computeOptions = {
      ...floatingOptions,
      ...computeOptions
    };

    if (arrowed && arrow) // add the arrow if user defined.
      computeOptions.middleware?.push(arrowMiddleware({ element: arrow, padding: 4 }))

    return computePosition(trigger, popover, computeOptions)
      .then((response) => {
        assignElement(response);
        if (arrowed)
          assignArrow(response);
      });

  }

  function show(updateOptions?: PopoverHookOptions<C>) {

    applyOptions(updateOptions);

    if (Component) {
      const componentProps = {
        ...props,
        hide: api.hide.bind(api)
      };

      // internalOptions.props.hide = api.hide.bind(api);
      component = new Component({ target, props: componentProps });
      const foundEl = findElement(selector, target);

      if (foundEl)
        popover = foundEl;
    }

    if (arrowed) {
      const foundEl = findElement(arrowed);
      if (foundEl)
        arrow = foundEl;
    }
    if (popover) {
      popover.style.display = 'block';
      update();
    }

    visible = true;

    if (events.includes('click') && abortable)
      document.addEventListener('click', handleClickOutside);
  }

  function hide() {
    if (!popover) return;
    if (component)
      popover.remove();
    else
      popover.style.display = '';
    visible = false;
    if (events.includes('click') && abortable)
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

  const { bind, destroy } = createPopover(ref, {
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

// export function usePopover(<C extends typeof SvelteComponent<any>> (
//   options: PopoverHookOptions<C>) {



//     function register(ref: HTMLElement) {

//     }

// }