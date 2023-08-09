/**
 * @see https://github.com/bryanmylee/svelte-popperjs/blob/master/src/index.ts
 */

import { computePosition, flip, shift, offset, arrow as arrowMiddleware, type ComputePositionConfig, type ComputePositionReturn, type Coords, type Middleware, autoUpdate, autoPlacement, type VirtualElement } from '@floating-ui/dom';
import { type SvelteComponent, onDestroy } from 'svelte';
import type { Readable } from 'svelte/store';
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
  anchored?: boolean;
  arrowed?: string;
  autoplaced?: boolean;
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
  props: PopoverConstructorProps<C>;
}

export type PopoverUpdateHandler = (updateOptions?: Partial<ComputePositionConfig>) => void;

export type PopoverCreateHook = [PopoverUpdateHandler, Partial<ComputePositionConfig>];

export type PopoverUIOptions = Partial<ComputePositionConfig> & {
  arrow?: HTMLElement | null;
  popover: HTMLElement;
  anchored?: boolean;
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

// don't care about type here, either merge two arrays
// or simply return an empty one.
function mergeMiddleware(target?: any, source?: any) {
  target = target || [];
  source = source || [];
  return [...target, ...source] as Middleware[];
}

export function composePopover(
  trigger: HTMLElement,
  options?: PopoverUIOptions
) {

  const middleware = mergeMiddleware(DEFAULTS.middleware, options?.middleware);

  const { arrow, popover, anchored, ...rest } = {
    ...DEFAULTS,
    ...options,
    middleware
  } as Required<PopoverUIOptions>;

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

  async function update(updateOptions?: Partial<ComputePositionConfig>) {
    updateOptions = {
      ...rest,
      ...updateOptions
    };

    if (anchored) {
      autoUpdate(trigger, popover, () => {
        computePosition(trigger, popover, updateOptions)
          .then(response => {
            assignElement(response);
            if (arrow)
              assignArrow(response);
          })
          .catch(ex => {
            console.warn((ex as Error).message);
          });
      });
    }
    else {
      computePosition(trigger, popover, updateOptions)
        .then(response => {
          assignElement(response);
          if (arrow)
            assignArrow(response);
        })
        .catch(ex => {
          console.warn((ex as Error).message);
        });
    }
  }

  return [update, rest] as PopoverCreateHook;

}

export function createPopover<C extends typeof SvelteComponent<any>>(
  options: PopoverRegisterOptions<C>) {

  const {
    abortable, arrowed, Component, container: initContainer, autoplaced,
    escapable, events, popover: initPopover, props, anchored, ...rest
  } = options;

  const container = findContainer(initContainer);

  let visible = false;
  let trigger: HTMLElement | VirtualElement | undefined;
  let popover = null as HTMLElement | null;
  let arrow = null as HTMLElement | null;
  let component = undefined as SvelteComponent | undefined;
  let updater = undefined as PopoverUpdateHandler | undefined;


  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && visible) {
      event.preventDefault();
      hide();
    }
  };

  const handleClick = () => {
    if (visible) hide();
    else show();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!trigger || event.target === trigger) return;
    if (popover && !popover.contains((event.target as Node) || null) && visible) {
      event.preventDefault();
      hide();
    }
  };

  const hide = () => {
    if (!popover) return;
    if (component)
      popover.remove();
    else
      popover.style.display = '';
    visible = false;
    if (events.includes('click') && abortable)
      document.removeEventListener('click', handleClickOutside);
  };

  const initElements = () => {
    if (Component) {
      const componentProps = {
        ...props,
        //  hide: api.hide.bind(api)
      };
      component = new Component({ target: container, props: componentProps });
      popover = findElement(initPopover, container); // must be called AFTER above "new Component"
    }
    else if (typeof popover === 'string') {
      popover = findElement(initPopover, container);
    }
    // Component and didn't find contained popover element or popover 
    // selector not found, or neither Component nor popover selector/element passed.
    if (typeof popover !== 'object')
      throw new Error(`Popover failed...missing or invalid popover element.`);
    if (arrowed && popover)
      arrow = findElement(arrowed, popover);
  };

  const show = (updateOptions?: Partial<ComputePositionConfig>) => {
    initElements();
    if (popover) {
      let middleware = mergeMiddleware(rest.middleware, updateOptions?.middleware);
      if (arrow)
        middleware.push(arrowMiddleware({ element: arrow, padding: 4 }))
      if (autoplaced) // flip cannot be present when autoPlacement middleware is use.
        middleware = mergeMiddleware(middleware, autoPlacement()).filter(m => m.name !== 'flip')
      updateOptions = {
        ...rest,
        ...updateOptions,
        middleware,
      };
      const [popoverUpdater] = composePopover(trigger, { arrow, popover, anchored, ...updateOptions });
      updater = popoverUpdater;
      if (!updater) return;
      updater(); // update the tooltip to apply middleware and position.
      if (!component)
        popover.style.display === 'block';
      visible = true;
      if (events.includes('click') && abortable)
        document.addEventListener('click', handleClickOutside);
    }
    else {
      visible = false;
    }
  };

  const destroy = () => {
    if (popover) popover.remove();
    if (component) component.$destroy();
    unbind();
  };

  const eventMap = {
    hover: [['mouseenter', show], ['mouseleave', hide]],
    focus: [['focus', show], ['blur', hide]],
    click: [['click', handleClick]]
  } as Record<PopoverEvent, PopoverEventTuple[]>;

  const unbind = () => {
    (events as PopoverEvent[]).forEach(ev => {
      eventMap[ev].forEach(([event, listener]) => {
        trigger.removeEventListener(event, listener);
      });
    });
    if (abortable && escapable) window.addEventListener('keydown', handleEscape);
  };

  const bind = () => {
    unbind();
    (events as PopoverEvent[]).forEach(ev => {
      eventMap[ev].forEach(([event, listener]) => {
        trigger.addEventListener(event, listener);
      });
    });
    if (abortable && escapable) window.addEventListener('keydown', handleEscape);
  };

  let referenceNode: any;
  const initVirtualObserver = (triggerRef: Readable<VirtualElement>) => {
    const unsubscribe = triggerRef.subscribe(($triggerRef) => {

      if (trigger === undefined) {
        trigger = $triggerRef;
        // create the popover.
        // initPopper();
      } else {
        // Preserve the reference to the virtual element.
        Object.assign(trigger, $triggerRef);
        // call update
        // popperInstance?.update();
      }

    });
    onDestroy(unsubscribe);
  };

  const registerTrigger = (triggerRef: Element | VirtualElement | Readable<VirtualElement>, registerOptions = {} as PopoverOptions<C>) => {
    const middleware = mergeMiddleware(options.middleware, registerOptions?.middleware)
    registerOptions = {
      ...options,
      ...registerOptions,
      middleware,
      props: {
        ...options.props,
        ...registerOptions.props
      } as any
    };
    registerOptions.events = ensureArray(registerOptions.events);
    if ('subscribe' in triggerRef) {
      initVirtualObserver(triggerRef);
    }
    else {
      trigger = triggerRef;
      // create popover.
      return {
        destroy
      };
    }
  };

  const registerPopover = (popoverRef: HTMLElement, registerOptions = {} as PopoverOptions<C>) => {
    const middleware = mergeMiddleware(options.middleware, registerOptions?.middleware)
    registerOptions = {
      ...options,
      ...registerOptions,
      middleware,
      props: {
        ...options.props,
        ...registerOptions.props
      } as any
    };
    registerOptions.events = ensureArray(registerOptions.events);

    return {
      update() {
        // update popover options here.
      },
      destroy
    };

  };

}

export function usePopover<C extends typeof SvelteComponent<any> = typeof Popover>(options = {} as PopoverOptions<C>) {

  // These are global options that
  // can be applied to all that call
  // the register hook below.
  const initOptions = {
    // Component: Popover as C, // Component used when popover is NOT an element.
    abortable: true,
    escapable: true,
    popover: '#popover', // when string finds element in body or Component
    events: ['hover'],
    middleware: [],
    ...options,
    props: {
      ...options.props
    }
  } as PopoverOptions<C>;


  function trigger(initRef: HTMLElement, registerOptions = {} as PopoverOptions<C>) {
    // unless we add a merge object function, need
    // to manually merge the middleware array.
    const middleware = mergeMiddleware(initOptions.middleware, registerOptions?.middleware)
    registerOptions = {
      ...initOptions,
      ...registerOptions,
      middleware,
      props: {
        ...initOptions.props,
        ...registerOptions.props
      } as any
    };
    registerOptions.events = ensureArray(registerOptions.events);
    return createPopover(initRef, registerOptions as PopoverRegisterOptions<C>);
  }

  return {
    trigger,

  };

}

export function tooltip<C extends typeof SvelteComponent<any> = typeof Popover>(
  ref: HTMLElement,
  options = {} as PopoverOptions<C>) {
  const title = ref.getAttribute('title');
  ref.setAttribute('title', '');
  options = {
    Component: Popover as C, // Component used when popover is NOT an element.
    arrowed: '#arrow',
    middleware: [],
    ...options,
    props: {
      content: title,
      ...options.props
    } as any,
  }
  // const { register } = usePopover();
  // const { destroy } = register(ref, options);
  // return {
  //   destroy
  // };
}
