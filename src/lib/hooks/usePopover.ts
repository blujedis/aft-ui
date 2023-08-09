/**
 * @see https://github.com/bryanmylee/svelte-popperjs/blob/master/src/index.ts
 */

import { computePosition, flip, shift, offset, arrow as arrowMiddleware, type ComputePositionConfig, type ComputePositionReturn, type Coords, type Middleware, autoUpdate, autoPlacement, type VirtualElement } from '@floating-ui/dom';
import { type SvelteComponent, onDestroy } from 'svelte';
import type { Readable } from 'svelte/store';
import { Popover } from '../components/Popover';
import type { SvelteConstructorProps } from '$lib/types';

export type PopoverEvent = 'hover' | 'click' | 'focus';

export type PopoverEventTuple = [keyof HTMLElementEventMap, (...args: any[]) => void];

export type PopoverConstructorProps<C extends typeof SvelteComponent> = SvelteConstructorProps<C> & {
  hide?: () => void;
}

export type PopoverBaseOptions<C extends typeof SvelteComponent> = {
  anchored?: boolean;
  arrowed?: string;
  autoplaced?: boolean;
  container?: string | HTMLElement;
  Component?: C;
  popover?: string | HTMLElement;
  escapable?: boolean;
  events?: PopoverEvent | PopoverEvent[] | null;
  props?: PopoverConstructorProps<C>;
}

export type PopoverOptions<C extends typeof SvelteComponent> = Partial<ComputePositionConfig> & PopoverBaseOptions<C>;

export type PopoverUpdateHandler = (updateOptions?: Partial<ComputePositionConfig>) => void;

export type PopoverCreateHook = [PopoverUpdateHandler, Partial<ComputePositionConfig>];

export type PopoverUIOptions = Partial<ComputePositionConfig> & {
  anchored?: boolean;
  arrow?: HTMLElement | null;
  popover: HTMLElement;
  trigger: HTMLElement | VirtualElement,
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
  strategy: 'absolute',
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

function ensureArray<T>(value?: null | T | T[], def = [] as T[], ignoreNull = true) {
  if (value === null && ignoreNull)
    return def;
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

function mergeProps(target?: Record<string, any>, source?: Record<string, any>) {
  return {
    ...target,
    ...source
  };
}
export function computePopover(options: PopoverUIOptions) {

  console.log('computing')

  const middleware = mergeMiddleware(DEFAULTS.middleware, options?.middleware);

  const { trigger, popover, arrow, anchored, ...rest } = {
    ...DEFAULTS,
    ...options,
    middleware
  } as Required<PopoverUIOptions>;

  const assignElement = ({ x, y }: ComputePositionReturn) => {
    if (!popover) return;
    Object.assign(popover.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  }

  const assignArrow = ({ placement, middlewareData }: ComputePositionReturn) => {
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

  const compose = (updateOptions?: Partial<ComputePositionConfig>) => {
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

  return [compose, rest] as PopoverCreateHook;

}

export function createPopover<C extends typeof SvelteComponent<any>>(
  initOptions = {} as PopoverOptions<C>) {

  let options: PopoverOptions<C> & { events: PopoverEvent[] }
  let container: HTMLElement | undefined | null;

  let trigger: HTMLElement | VirtualElement | undefined | null;
  let popover = null as HTMLElement | null;
  let arrow = null as HTMLElement | null;
  let component = undefined as SvelteComponent | undefined;
  let updater = undefined as PopoverUpdateHandler | undefined;

  let visible = false;

  const getComputeOptions = <T>(extend: T) => {
    const { anchored, middleware, placement, platform, strategy } = options;
    return {
      anchored,
      middleware,
      placement,
      platform,
      strategy,
      ...extend,
    } as ComputePositionConfig & T;
  };

  const mergeOptions = (mergeOptions = {} as PopoverOptions<C>) => {
    const clone = { ...mergeOptions };
    const middleware = mergeMiddleware((options || {}).middleware, clone.middleware);
    const events = ensureArray(clone.events);
    options = {
      ...options,
      ...clone,
      middleware,
      events
    };
  };

  mergeOptions(initOptions);

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
    if (options.events.includes('click') && options.escapable)
      document.removeEventListener('click', handleClickOutside);
  };

  const bindElements = () => {
    container = findContainer(options.container);
    if (options.Component) {
      const componentProps = {
        ...options.props,
        //  hide: api.hide.bind(api)
      };
      component = new (options.Component)({ target: container, props: componentProps });
      popover = findElement(options.popover, container); // must be called AFTER above "new Component"
    }
    else if (typeof popover === 'string') {
      popover = findElement(options.popover, container);
    }
    // Component and didn't find contained popover element or popover 
    // selector not found, or neither Component nor popover selector/element passed.
    if (typeof popover !== 'object')
      throw new Error(`Popover failed...missing or invalid popover element.`);
    if (options.arrowed && popover)
      arrow = findElement(options.arrowed, popover);
  };

  const prepareOptions = (initOptions = {} as PopoverOptions<C>) => {
    let middleware = mergeMiddleware(options.middleware, initOptions.middleware);
    if (arrow)
      middleware.push(arrowMiddleware({ element: arrow, padding: 4 }))
    if (options.autoplaced) // flip cannot be present when autoPlacement middleware is use.
      middleware = mergeMiddleware(middleware, autoPlacement()).filter(m => m.name !== 'flip');
    options.middleware = middleware;
    console.log(options.middleware)
    bind();
  };

  const show = () => {
    bindElements();
    if (!trigger || !popover) return;
    if (!updater) {
      [updater] =
        computePopover(getComputeOptions({ trigger, arrow, popover, anchored: options.anchored }));
      console.log('updater', trigger, popover)
    }
    if (!trigger) {
      console.warn(`Poppover failed...attempted to show without valid trigger element.`);
      return;
    }
    if (popover) {
      if (!component)
        popover.style.display === 'block';
      visible = true;
      if (options.events.includes('click') && options.escapable)
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
    options.events.forEach(ev => {
      eventMap[ev].forEach(([event, listener]) => {
        if (trigger instanceof HTMLElement)
          trigger.removeEventListener(event, listener);
      });
    });
    if (options.escapable) window.addEventListener('keydown', handleEscape);
  };

  const bind = () => {
    if (!trigger) return;
    unbind();
    options.events.forEach(ev => {
      eventMap[ev].forEach(([event, listener]) => {
        if (trigger instanceof HTMLElement) {
          trigger?.addEventListener(event, listener);
        }
      });
    });
    if (options.escapable) window.addEventListener('keydown', handleEscape);
  };

  const initVirtualSubscriber = (triggerRef: Readable<VirtualElement>) => {
    const unsubscribe = triggerRef.subscribe(($triggerRef) => {
      if (trigger === undefined || trigger === null) {
        trigger = $triggerRef;
        prepareOptions();
      } else {
        Object.assign(trigger, $triggerRef) // add ref to trigger element.
        if (updater)
          updater();
      }
    });
    onDestroy(unsubscribe);
  };

  const registerTrigger = (triggerRef: HTMLElement | Readable<VirtualElement>) => {
    if ('subscribe' in triggerRef) {
      initVirtualSubscriber(triggerRef);
      return {}; // dummy object.
    }
    else {
      trigger = triggerRef;
      prepareOptions();
      return {
        destroy
      };
    }
  };

  const registerContent = (contentRef: HTMLElement) => {
    popover = contentRef;
    prepareOptions();
    return {
      update(updateOptions: Partial<ComputePositionConfig>) {
        if (updater)
          updater(updateOptions);
      },
      destroy
    };
  };

  return {
    registerTrigger,
    registerContent
  };

}

export function usePopover<C extends typeof SvelteComponent<any> = typeof Popover>(rootOptions = {} as PopoverOptions<C>) {

  rootOptions = {
    Component: Popover as C,
    ...rootOptions
  };

  const tooltip = (ref: HTMLElement, options = {} as Omit<PopoverOptions<C>, 'Component'>) => {
    const props = mergeProps(rootOptions.props, options.props) as SvelteConstructorProps<C>;
    const middleware = mergeMiddleware(rootOptions.middleware, options.middleware);
    // Allows us to use title for simple tooltips.
    const title = ref.getAttribute('title');
    if (title) {
      ref.setAttribute('title', '');
      props.content = props.content || title;
    };
    options = {
      popover: '#popover',
      arrowed: '#arrow',
      events: ['hover', 'focus'],
      ...options,
      props,
      middleware
    };
    return createPopover(options).registerTrigger(ref);
  };

  const popup = (ref: HTMLElement, options = {} as Omit<PopoverOptions<C>, 'Component'>) => {
    const props = mergeProps(rootOptions.props, options.props) as SvelteConstructorProps<C>;
    const middleware = mergeMiddleware(rootOptions.middleware, options.middleware);
    options = {
      popover: '#popover',
      arrowed: '#arrow',
      events: ['click'],
      ...options,
      props,
      middleware
    };
    return createPopover(options).registerTrigger(ref);
  };

  const trigger = (ref: HTMLElement, options = {} as Omit<PopoverOptions<C>, 'Component' | 'events' | 'popover'>) => {
    const props = mergeProps(rootOptions.props, options.props) as SvelteConstructorProps<C>;
    const middleware = mergeMiddleware(rootOptions.middleware, options.middleware);
    const _options = {
      ...options,
      props,
      middleware
    } as PopoverOptions<C>;
    delete _options.Component; // not used when manual trigger & content.
    return createPopover(options).registerTrigger(ref);
  };

  const content = (ref: HTMLElement, options = {} as Omit<PopoverOptions<C>, 'Component' | 'events' | 'popover'>) => {
    const props = mergeProps(rootOptions.props, options.props) as SvelteConstructorProps<C>;
    const middleware = mergeMiddleware(rootOptions.middleware, options.middleware);
    const _options = {
      popover: ref,
      arrowed: '#arrow',
      ...options,
      props,
      middleware
    } as PopoverOptions<C> & { popover: HTMLElement | string; };
    delete _options.Component;  // not used when manual trigger & content.
    return createPopover(options).registerContent(ref);
  };

  return {
    popup,
    tooltip,
    trigger,
    content
  };
}

