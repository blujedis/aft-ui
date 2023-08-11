import { offset, flip, shift, computePosition, autoUpdate, arrow, autoPlacement } from '@floating-ui/dom';
import { SvelteComponent, onDestroy } from 'svelte';
import { browser } from '$app/environment';
import { Popover } from '../components';
import { cleanObj } from '../utils';
const ARROW_POSITION = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
};
function ensureArray(value, def = [], ignoreNull = true) {
    if (value === null && ignoreNull)
        return def;
    if (typeof value === 'undefined' || Array.isArray(value))
        return (value || def);
    return [value];
}
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
function hasMiddleware(middleware, ...keys) {
    return ensureArray(middleware).some((m) => {
        if (m !== null && typeof m === 'object')
            return keys.includes(m.name);
        return false;
    });
}
// Allows for setting some reasonable settings in a simpler way
// for full control pass first class middleware in "config.middleware".
function mapMiddleware(middleware, defaults) {
    const _middleware = ensureArray(middleware);
    const arr = [];
    if (typeof defaults.offset !== 'undefined' && !hasMiddleware(_middleware, 'offset'))
        arr.push(offset(defaults.offset));
    if (typeof defaults.shift !== 'undefined' && !hasMiddleware(_middleware, 'shift'))
        arr.push(shift({ padding: shift }));
    return [...arr];
}
export function createInstance(initOptions = {}, initConfig = {}, initProps = {}) {
    initConfig.middleware;
    let options = { ...initOptions };
    let config = { ...initConfig };
    let props = { ...initProps };
    let visible = false;
    let containerNode;
    let triggerNode = null;
    let contentNode = null;
    let arrowNode = null;
    let component;
    if (browser)
        containerNode = findContainer(options.container);
    const mergeSettings = (updateOptions, updateConfig, updateProps) => {
        if (updateOptions) {
            options = {
                ...options,
                ...updateOptions,
                events: !options.Component
                    ? []
                    : [...ensureArray(options.events), ...ensureArray(updateOptions.events)]
            };
        }
        if (updateConfig) {
            config = {
                ...config,
                ...updateConfig
            };
        }
        if (updateProps) {
            props = {
                ...props,
                ...updateProps
            };
        }
        return { options, config, props };
    };
    const handleEscape = (event) => {
        if (event.key === 'Escape' && visible) {
            event.preventDefault();
            close();
        }
    };
    const handleClickOutside = (event) => {
        if (!triggerNode || event.target === triggerNode)
            return;
        if (contentNode && !contentNode.contains(event.target || null) && visible) {
            event.preventDefault();
            close();
        }
    };
    const handleClick = () => {
        if (visible)
            close();
        else
            open();
    };
    const extendMiddleware = () => {
        if (!contentNode)
            return;
        if (!arrowNode && options.arrow) {
            arrowNode = findElement(options.arrow, contentNode);
            if (arrowNode && !hasMiddleware(config.middleware, 'arrow'))
                config.middleware = mergeMiddleware(config.middleware, arrow({ padding: 4, element: arrowNode }));
        }
        if (options.autoplaced && !hasMiddleware(config.middleware, 'autoPlacement'))
            config.middleware = mergeMiddleware(config.middleware, autoPlacement(), [
                'flip',
                'autoPlacement'
            ]);
    };
    const applyStrategy = () => {
        if (!contentNode)
            return;
        contentNode.style.position = config.strategy || 'absolute';
    };
    const applyDescribedBy = () => {
        if (options.describedby && triggerNode && contentNode && triggerNode instanceof HTMLElement) {
            const describedby = triggerNode.getAttribute('aria-describedby');
            const hasId = contentNode.id;
            const id = contentNode.getAttribute('id') || 'popover';
            if (!hasId && id)
                contentNode.setAttribute('id', id);
            if (id && !describedby)
                // only apply if content has id and triggerNode has no describedby already.
                triggerNode.setAttribute('aria-describedby', typeof options.describedby === 'string' ? options.describedby : id);
        }
    };
    const compute = (computeConfig = {}) => {
        const cloneConfig = { ...config, ...computeConfig };
        if (!triggerNode || !contentNode)
            return;
        applyDescribedBy();
        const callback = options.onBeforeCompute || ((response) => response);
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
        if (options.anchored) {
            autoUpdate(triggerNode, contentNode, () => {
                computePosition(triggerNode, contentNode, cloneConfig)
                    .then((response) => {
                    Promise.resolve(callback(response))
                        .then((resp) => {
                        assignElement(resp);
                        if (arrowNode)
                            assignArrow(resp);
                    })
                        .catch((ex) => {
                        console.warn(ex.message);
                    });
                })
                    .catch((ex) => {
                    console.warn(ex.message);
                });
            });
        }
        else {
            computePosition(triggerNode, contentNode, config)
                .then((response) => {
                Promise.resolve(callback(response))
                    .then((resp) => {
                    assignElement(resp);
                    if (arrowNode)
                        assignArrow(resp);
                })
                    .catch((ex) => {
                    console.warn(ex.message);
                });
            })
                .catch((ex) => {
                console.warn(ex.message);
            });
        }
    };
    const destroy = () => {
        if (component) {
            if (arrowNode instanceof HTMLElement) {
                arrowNode.remove();
                arrowNode = null;
            }
            if (contentNode instanceof HTMLElement) {
                contentNode.remove();
                contentNode = null;
            }
            component.$destroy();
            component = undefined;
        }
    };
    const open = () => {
        if (options.Component)
            mountComponent(options.Component, props);
        compute();
        visible = true;
        if (options.events.includes('click') && options.escapable)
            document.addEventListener('click', handleClickOutside);
    };
    const close = () => {
        visible = false;
        destroy();
        if (options.events.includes('click') && options.escapable)
            document.removeEventListener('click', handleClickOutside);
    };
    const mountComponent = (Component, mountProps) => {
        if (!component) {
            const componentProps = {
                ...mountProps,
                close
            };
            component = new Component({
                target: containerNode,
                props: componentProps
            });
        }
        if (typeof options.content !== 'string')
            throw new Error(`Mounted components required a defined selector for "content" element.`);
        if (!contentNode)
            contentNode = findElement(options.content, containerNode);
        if (!contentNode)
            console.warn(`Cannot find content element using selector "${options.content}.`);
        applyStrategy();
        extendMiddleware();
    };
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
    const unbind = () => {
        options.events.forEach((ev) => {
            eventMap[ev].forEach(([event, listener]) => {
                if (triggerNode instanceof HTMLElement)
                    triggerNode.removeEventListener(event, listener);
            });
        });
        if (options.escapable)
            window.addEventListener('keydown', handleEscape);
    };
    const bind = () => {
        if (!triggerNode)
            return;
        unbind();
        options.events.forEach((ev) => {
            eventMap[ev].forEach(([event, listener]) => {
                if (triggerNode instanceof HTMLElement) {
                    triggerNode.addEventListener(event, listener);
                }
            });
        });
        if (options.escapable)
            window.addEventListener('keydown', handleEscape);
    };
    const registerVirtualTrigger = (node) => {
        const unsubscribe = node.subscribe(($node) => {
            if (triggerNode === undefined) {
                triggerNode = $node;
                compute();
            }
            else if (triggerNode instanceof HTMLElement) {
                Object.assign(triggerNode, $node); // safe ref to Virtual Element.
            }
        });
        onDestroy(unsubscribe);
    };
    const registerTrigger = (node, registerOptions = {}, registerConfig = {}, registerProps = {}) => {
        mergeSettings(registerOptions, registerConfig, registerProps);
        if ('subscribe' in node) {
            registerVirtualTrigger(node);
            return {};
        }
        else {
            triggerNode = node;
            if (options.Component)
                bind();
            return {
                destroy
            };
        }
    };
    const registerContent = (node, registerOptions = {}, registerConfig = {}) => {
        contentNode = node;
        mergeSettings(registerOptions, registerConfig);
        applyStrategy();
        compute(config);
        return {
            update(updateConfig) {
                mergeSettings(null, updateConfig);
                compute(config);
            },
            destroy
        };
    };
    return {
        compute,
        registerTrigger,
        registerContent,
        destroy
    };
}
const CONFIG_DEFAULTS = {
    middleware: [flip()],
    strategy: 'absolute',
    // shorthand props below converted
    // into full class middleware.
    offset: 10,
    shift: 4
};
export const useTooltip = (settings = {}) => {
    const { placement, middleware, offset, shift, strategy, platform, props: rootProps, ...initOptions } = settings;
    const rootConfig = {
        ...CONFIG_DEFAULTS,
        ...cleanObj({ placement, middleware, offset, shift, strategy, platform })
    };
    const rootOptions = {
        arrow: '#arrow',
        Component: Popover,
        abortable: true,
        escapable: true,
        content: '#popover',
        describedby: true,
        events: ['hover', 'focus'],
        ...initOptions
    };
    const tooltip = (node, props = {}) => {
        props = {
            arrowed: true,
            ...rootProps,
            ...props
        };
        const { offset, shift, ...cleaned } = rootConfig;
        cleaned.middleware = mapMiddleware(cleaned.middleware, { offset, shift });
        const content = node.getAttribute('title');
        node.setAttribute('title', '');
        if (content)
            props.content = content;
        const { registerTrigger } = createInstance({ ...rootOptions }, cleaned, props);
        return registerTrigger(node);
    };
    return [tooltip];
};
export const usePopover = (settings = {}) => {
    const { placement, middleware, offset, shift, strategy, platform, ...initOptions } = settings;
    const rootOptions = {
        arrow: '#arrow',
        describedby: true,
        ...initOptions
    };
    const rootConfig = {
        ...CONFIG_DEFAULTS,
        ...cleanObj({ placement, middleware, offset, shift, strategy, platform })
    };
    const { registerTrigger, registerContent } = createInstance();
    const trigger = (node) => {
        return registerTrigger(node);
    };
    const content = (node, config = {}) => {
        config = {
            ...rootConfig,
            ...config
        };
        const { offset, shift, anchored, arrow, autoplaced, container, ...cleaned } = config;
        const options = {
            ...rootOptions,
            ...cleanObj({ anchored, arrow, autoplaced, container })
        };
        const merged = mapMiddleware(cleaned.middleware, { offset, shift });
        cleaned.middleware = [...merged];
        return registerContent(node, options, cleaned);
    };
    return [trigger, content];
};
