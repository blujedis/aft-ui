import type { SvelteConstructorProps } from '$lib/types';
import { computePosition, flip, shift, offset, arrow as arrowMiddleware, type ComputePositionConfig, type ComputePositionReturn, type Coords } from '@floating-ui/dom';
import type { SvelteComponent } from 'svelte';
import { browser } from '$app/environment';
import { FloatingElement } from '../components/FloatingElement';
import { ensureArray } from '$lib/utils';

export type FloatingElementEvent = 'hover' | 'click' | 'focus';
export type FloatingElementEventTuple = [keyof HTMLElementEventMap, (...args: any[]) => void]

export type FloatingElementOptions = Partial<ComputePositionConfig> & {
  arrowed?: string;
  Component?: typeof SvelteComponent;
  element?: HTMLElement;
  escapable?: boolean;
  props?: SvelteConstructorProps<any>;
  target?: HTMLElement;
  selector?: string;
  events?: FloatingElementEvent | FloatingElementEvent[];
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

export function usePopover(
  ref: HTMLElement,
  options: FloatingElementOptions
) {

  if (!browser) return {
    ref,
    element: undefined,
    arrow: unbind,
    bind,
    unbind,
    show,
    hide,
    update,
    destroy
  };

  options = {
    target: document.body,
    events: ['hover'],
    ...DEFAULTS,
    ...options
  };

  options.events = ensureArray(options.events);

  const {
    arrowed, Component, escapable, events: initEvents,
    element: initElement, props, selector,
    target, ...rest } = options as Required<FloatingElementOptions>;

  const events = {
    hover: [['mouseenter', show], ['mouseleave', hide]],
    focus: [['focus', show], ['blur', hide]],
    click: [['click', show]]
  } as Record<FloatingElementEvent, FloatingElementEventTuple[]>

  let FloatingComponent: typeof SvelteComponent | undefined;

  let element: HTMLElement | undefined;
  let component = undefined as SvelteComponent | undefined;
  let arrow: HTMLElement | undefined;
  let visible = false;

  if (initElement)
    element = initElement;
  else
    FloatingComponent = Component;

  function findElement(selector: string, root = document.body as HTMLElement) {
    const el = root.querySelector(selector);
    if (!el) {
      console.warn(`Could NOT locate floating element using selector "${selector}".`);
      return null;
    }
    return el as HTMLElement;
  }

  function handleClickOutside(event: any) {
    if (!ref || event.target === ref) return;
    if (element && !element.contains(event.target) && visible) hide();
  }

  function handleEscape(event: KeyboardEvent) {
    if (event.key === 'Escape' && visible) hide();
  }

  function bind() {
    (initEvents as FloatingElementEvent[]).forEach(ev => {
      events[ev].forEach(([event, listener]) => {
        ref.addEventListener(event, listener);
      });
    });
    if (escapable) window.addEventListener('keydown', handleEscape);
  }

  function unbind() {
    (initEvents as FloatingElementEvent[]).forEach(ev => {
      events[ev].forEach(([event, listener]) => {
        ref.removeEventListener(event, listener);
      });
    });
    if (escapable) window.addEventListener('keydown', handleEscape);
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
    if (initEvents.includes('click'))
      document.addEventListener('click', handleClickOutside);
  }

  function hide() {
    if (!element) return;
    if (FloatingComponent)
      element.remove();
    else
      element.style.display = '';
    visible = false;
    if (initEvents.includes('click'))
      document.removeEventListener('click', handleClickOutside);
  }

  function destroy() {
    if (component) component.$destroy();
    unbind();
  }

  return {
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

}

export type FloatingTooltipOptions = Omit<FloatingElementOptions, 'Component' | 'props'> & {
  props?: SvelteConstructorProps<typeof FloatingElement>
}

export function popover(
  ref: HTMLElement,
  options: FloatingTooltipOptions) {


  const content = ref.getAttribute('title');
  ref.setAttribute('title', '');

  const { bind, destroy } = usePopover(ref, {
    escapable: true,
    selector: '.popover',
    arrowed: '#arrow',
    props: {
      content,
      ...options.props
    },
    ...options,
    Component: FloatingElement as typeof SvelteComponent,
  });

  bind();

  return {
    destroy
  };

}