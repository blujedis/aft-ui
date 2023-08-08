import { computePosition, flip, shift, offset, arrow as arrowMiddleware, type ComputePositionConfig, type ComputePositionReturn, type Coords } from '@floating-ui/dom';
import type { SvelteComponent } from 'svelte';
import { browser } from '$app/environment';
import { Popover } from '../components/Popover';
import type { SvelteConstructorProps } from '$lib/types';

export type PopoverEvent = 'hover' | 'click' | 'focus';

export type PopoverEventTuple = [keyof HTMLElementEventMap, (...args: any[]) => void];

export type PopoverConstructorProps<C extends typeof SvelteComponent> = SvelteConstructorProps<C> & {
  hide?: () => void;
}

export type PopoverBaseOptions<C extends typeof SvelteComponent> = {
  abortable?: boolean;
  arrowed?: string;
  container?: string | HTMLElement;
  Component?: C;
  popover?: string | HTMLElement;
  escapable?: boolean;
  events?: PopoverEvent | PopoverEvent[];
  props?: PopoverConstructorProps<C>;
}

export type PopoverOptions<C extends typeof SvelteComponent> = Partial<ComputePositionConfig> & PopoverBaseOptions<C>;

export type PopoverRegisterOptions<C extends typeof SvelteComponent> = PopoverOptions<C> & {
  events: PopoverEvent[];
  popover: string | HTMLElement;
}

export type PopoverUpdateHandler = (updateOptions?: Partial<ComputePositionConfig>) => void;

export type PopoverCreateHook = [PopoverUpdateHandler, HTMLElement | null, Partial<ComputePositionConfig>];

export type PopoverUIOptions = Partial<ComputePositionConfig> & {
  arrowed?: string;
  container: HTMLElement;
  popover: HTMLElement;
};

export interface PopoverInstance {
  popover: HTMLElement | null;
  arrow: HTMLElement | null;
  bind(): void;
  unbind(): void;
  updater: PopoverUpdateHandler | undefined;
  show(options?: Partial<ComputePositionConfig>): void;
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

function ensureArray<T>(value?: null | T | T[], def = [] as T[]) {
  if (typeof value === 'undefined' || Array.isArray(value))
    return (value || def) as T[];
  return [value] as T[];
}

function findContainer(selector?: string | HTMLElement, def = document.body): HTMLElement {
  if (!selector) return def;
  if (typeof selector === 'string')
    return document.querySelector(selector) || def;
  return selector;
}

function findElement(selector?: string | HTMLElement, container = document.body): HTMLElement | null {
  if (!selector) return null;
  if (typeof selector !== 'string') return selector;
  const el = container.querySelector(selector);
  if (!el) {
    console.warn(`Could NOT locate Popover element using selector "${selector}".`);
    return null;
  }
  return el as HTMLElement;
}

export function createPopover(
  trigger: HTMLElement,
  options?: PopoverUIOptions
) {

  const { arrowed, container, popover, ...rest } = {
    ...DEFAULTS,
    ...options
  } as Required<PopoverUIOptions>;

  const arrow = findElement(arrowed, container);

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

  function update(updateOptions?: Partial<ComputePositionConfig>) {
    updateOptions = {
      ...rest,
      ...updateOptions
    };
    return computePosition(trigger, popover, updateOptions)
      .then((response) => {
        assignElement(response);
        if (arrowed)
          assignArrow(response);
      });
  }

  return [update, arrow, rest] as PopoverCreateHook;

}

export function registerPopover<C extends typeof SvelteComponent<any>>(trigger: HTMLElement, options: PopoverRegisterOptions<C>) {

  const {
    abortable, arrowed, Component, container: initContainer,
    escapable, events, popover: initPopover, props, ...rest
  } = options;

  let visible = false;
  let container = findContainer(initContainer);
  let popover = null as HTMLElement | null;
  let arrow = null as HTMLElement | null;
  let component = undefined as SvelteComponent | undefined;
  let updater = undefined as PopoverUpdateHandler | undefined;

  const eventMap = {
    hover: [['mouseenter', show], ['mouseleave', hide]],
    focus: [['focus', show], ['blur', hide]],
    click: [['click', show]]
  } as Record<PopoverEvent, PopoverEventTuple[]>;

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

  function initElements() {
    if (Component) {
      const componentProps = {
        ...props
      };
      component = new Component({ target: container, props: componentProps });
      popover = findElement(initPopover, container); // must be called AFTER above "new Component"
    }
    else {
      popover = findElement(initPopover, container);
    }
    if (arrowed)
      arrow = findElement(arrowed);
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

  function show(updateOptions?: Partial<ComputePositionConfig>) {
    initElements();
    if (popover) {
      updateOptions = {
        ...rest,
        ...updateOptions
      };
      [updater, arrow] = createPopover(trigger, { container, arrowed, popover, ...updateOptions });
      if (events.includes('click') && abortable)
        document.addEventListener('click', handleClickOutside);
      popover.style.display === 'block';
      visible = true;
    }
    else {
      visible = false;
    }
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

  return {
    popover,
    arrow,
    bind,
    unbind,
    updater,
    show,
    hide,
    destroy
  };

}

export function usePopover<C extends typeof SvelteComponent<any>>(options?: PopoverOptions<C>) {

  options = {
    Component: Popover as C, // Component used when popover is NOT an element.
    escapable: true,
    popover: '#popover', // when string finds element in body or Component
    events: ['hover'],
    ...options
  };

  options.events = ensureArray(options.events);

  let trigger = null as HTMLElement | null;
  let api = {} as PopoverInstance;

  function register(initRef: HTMLElement, initOptions?: PopoverOptions<C>) {
    api = registerPopover(initRef, {
      ...options,
      ...initOptions
    } as PopoverRegisterOptions<C>);
    trigger = api.popover;
  }

  return {
    ...api,
    trigger,
    register
  };

}

export function tooltip<C extends typeof SvelteComponent<any>>(
  ref: HTMLElement,
  options: PopoverOptions<C>) {
  const content = ref.getAttribute('title');
  ref.setAttribute('title', '');
  const { destroy, register } = usePopover()
  register(ref, options);
  return {
    destroy
  };
}
