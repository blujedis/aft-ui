import { computePosition, autoUpdate, arrow, shift, offset } from '@floating-ui/dom';
import { onDestroy } from 'svelte';
import { browser } from '$app/environment';
import { cleanObj, ensureArray } from '../utils';
const DEFAULT_OPTIONS = {
    sticky: false,
    events: ['hover', 'focus'],
    middleware: [],
    offset: 8, // shortcut for offset see: https://floating-ui.com/docs/offset#options
    padding: 4, // shortcut for shift see:  https://floating-ui.com/docs/detectOverflow#padding
    placement: 'top',
    strategy: 'absolute',
    onChange: (v) => { }
};
const ARROW_POSITION = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
};
function findContainer(selector, def = document.body) {
    if (!selector)
        return def;
    if (typeof selector === 'string')
        return document.querySelector(selector) || def;
    return selector;
}
function findElement(selector, container = document.body) {
    if (!selector)
        return null;
    if (typeof selector !== 'string')
        return selector;
    const el = container.querySelector(selector);
    if (!el)
        return null;
    return el;
}
function hasMiddleware(middleware, ...keys) {
    return ensureArray(middleware).some((m) => {
        if (m !== null && typeof m === 'object')
            return keys.includes(m.name);
        return false;
    });
}
function mergeMiddleware(target, source, removeFromTarget) {
    target = ensureArray(target);
    if (removeFromTarget)
        target = target.filter((m) => {
            if (m && typeof m == 'object')
                return !removeFromTarget.includes(m.name);
            return false;
        });
    source = ensureArray(source).filter((m) => {
        return !(typeof m === 'object' && m !== null && hasMiddleware(target, m.name));
    });
    return [...target, ...source];
}
function middlewareDefaults(middleware, defaults) {
    const _middleware = ensureArray(middleware);
    const arr = [];
    if (typeof defaults.offset !== 'undefined' && !hasMiddleware(_middleware, 'offset'))
        arr.push(offset(defaults.offset));
    if (typeof defaults.padding !== 'undefined' && !hasMiddleware(_middleware, 'shift'))
        arr.push(shift({ padding: defaults.padding }));
    return [...arr];
}
export function createPopoverInstance(instanceOptions) {
    let options = {
        ...DEFAULT_OPTIONS,
        ...instanceOptions
    };
    options.events = ensureArray(options.events);
    options.middleware = middlewareDefaults(options.middleware, {
        offset: options.offset,
        padding: options.padding
    });
    let containerNode;
    let triggerNode = null;
    let contentNode = null;
    let arrowNode = null;
    let cleanup;
    let visible = false;
    if (browser)
        containerNode = findContainer(options.containerRef);
    const eventMap = {
        hover: [
            ['mouseenter', open],
            ['mouseleave', close]
        ],
        focus: [
            ['focus', open],
            ['blur', close]
        ],
        click: [['click', handleClick]]
    };
    function mergeOptions(updateOptions) {
        options = {
            ...options,
            ...cleanObj(updateOptions) // removes undefined values.
        };
        const updateEvents = ensureArray(updateOptions.events);
        options.events = updateEvents.length ? updateEvents : options.events;
        return options;
    }
    // Picks the floating ui compute config props.
    function getConfig(updateOptions) {
        if (updateOptions)
            mergeOptions(updateOptions);
        return cleanObj({
            strategy: options.strategy,
            placement: options.placement,
            platform: options.platform,
            middleware: options.middleware
        });
    }
    // Handles when user clicks escape which will close the floating ui.
    function handleEscape(event) {
        if (event.key === 'Escape' && visible) {
            event.preventDefault();
            close();
        }
    }
    // Handles when user clicks outside the floating ui which closes it.
    function handleClickOutside(event) {
        if (!triggerNode || event.target === triggerNode)
            return;
        if (contentNode && !contentNode.contains(event.target || null) && visible) {
            event.preventDefault();
            close();
        }
    }
    // Click event handler, essentially opens/shows floating ui.
    function handleClick() {
        if (visible)
            close();
        else
            open();
    }
    function bindEvents() {
        if (!triggerNode || !options.events.length)
            return;
        unbindEvents();
        options.events.forEach((ev) => {
            eventMap[ev].forEach(([event, listener]) => {
                if (triggerNode instanceof HTMLElement)
                    triggerNode.addEventListener(event, listener);
            });
        });
        if (options.escapeable)
            window.addEventListener('keydown', handleEscape);
    }
    function unbindEvents() {
        if (options.events.length)
            options.events.forEach((ev) => {
                eventMap[ev].forEach(([event, listener]) => {
                    if (triggerNode instanceof HTMLElement)
                        triggerNode.removeEventListener(event, listener);
                });
            });
        if (options.escapeable)
            window.addEventListener('keydown', handleEscape);
    }
    function applyMiddleware(arrowRef) {
        if (!contentNode)
            return;
        const config = getConfig();
        arrowNode = findElement(arrowRef, contentNode);
        if (arrowNode) {
            if (!hasMiddleware(config.middleware, 'arrow'))
                options.middleware = mergeMiddleware(options.middleware, arrow({ padding: 4, element: arrowNode }));
        }
    }
    function compute() {
        if (!triggerNode || !contentNode)
            return;
        const config = getConfig();
        const assignElement = ({ x, y }) => {
            if (!contentNode)
                return;
            Object.assign(contentNode.style, {
                left: `${x}px`,
                top: `${y}px`
            });
        };
        const assignArrow = ({ placement, middlewareData }) => {
            if (!arrowNode)
                return;
            const { x, y } = middlewareData.arrow;
            const key = placement.split('-')[0];
            const pos = ARROW_POSITION[key];
            Object.assign(arrowNode.style, {
                left: x != null ? `${x}px` : '',
                top: y != null ? `${y}px` : '',
                right: '',
                bottom: '',
                [pos]: '-4px'
            });
        };
        if (options.sticky) {
            cleanup = autoUpdate(triggerNode, contentNode, () => {
                computePosition(triggerNode, contentNode, config)
                    .then((response) => {
                    assignElement(response);
                    assignArrow(response);
                })
                    .catch((ex) => {
                    console.warn(ex.message);
                });
            });
        }
        else {
            computePosition(triggerNode, contentNode, config)
                .then((response) => {
                assignElement(response);
                assignArrow(response);
            })
                .catch((ex) => {
                console.warn(ex.message);
            });
        }
    }
    function setVisibility(state) {
        visible = state;
        options.onChange(visible);
    }
    function open() {
        if (options.events.includes('click') && options.escapeable)
            document.addEventListener('click', handleClickOutside);
        setVisibility(true);
    }
    function close() {
        setVisibility(false);
        destroy();
    }
    function destroy() {
        if (options.events.includes('click') && options.escapeable)
            document.removeEventListener('click', handleClickOutside);
        if (cleanup)
            cleanup();
        if (arrowNode instanceof HTMLElement) {
            arrowNode = null;
        }
        if (contentNode instanceof HTMLElement) {
            contentNode = null;
        }
    }
    function registerVirtualTrigger(node) {
        const unsubscribe = node.subscribe(($node) => {
            if (triggerNode === undefined) {
                triggerNode = $node;
                compute();
            }
            else if (triggerNode instanceof HTMLElement) {
                Object.assign(triggerNode, $node); // safe ref to Virtual Element.
            }
        });
        onDestroy(() => {
            unsubscribe();
            destroy();
        });
    }
    function registerTrigger(node) {
        const foundNode = typeof node === 'string' ? findElement(node, containerNode) : node;
        if (!foundNode)
            throw new Error(`Cannot create Popover using trigger element of null or undefined.`);
        if ('subscribe' in foundNode) {
            registerVirtualTrigger(foundNode);
            return {};
        }
        else {
            triggerNode = foundNode;
            bindEvents();
            return {
                destroy
            };
        }
    }
    function registerContent(node, registerOptions = {}) {
        const { arrowRef, ...rest } = registerOptions;
        contentNode = node;
        const config = getConfig(rest);
        contentNode.style.position = config.strategy || 'absolute';
        applyMiddleware(arrowRef);
        compute();
        return {
            update(updateConfig) {
                mergeOptions(updateConfig);
                compute();
            },
            destroy
        };
    }
    return {
        getConfig,
        bindEvents,
        unbindEvents,
        open,
        close,
        compute,
        registerTrigger,
        registerContent,
        destroy
    };
}
