import type { Readable } from 'svelte/store';
import {
	type VirtualElement,
	offset,
	flip,
	shift,
	type ComputePositionConfig,
	type Middleware,
	type Coords,
	type ComputePositionReturn,
	computePosition,
	autoUpdate,
	type ReferenceElement,
	arrow,
	autoPlacement,
	type Strategy,
	type Padding
} from '@floating-ui/dom';
import { SvelteComponent, onDestroy } from 'svelte';
import type { SvelteConstructorProps } from '$lib/types';
import { browser } from '$app/environment';
import { Popover } from '$lib/components';
import { cleanObj } from '$lib/utils';

export type PopoverEvent = 'hover' | 'click' | 'focus';

export type PopoverEventTuple = [keyof HTMLElementEventMap, (...args: any[]) => void];

export type PopoverTriggerOptions = Omit<
	PopoverInitOptions<any>,
	'abortable' | 'escapable' | 'content' | 'events' | 'Component' | 'props'
>;

export type PopoverComponentProps<C extends typeof SvelteComponent> = SvelteConstructorProps<C> & {
	close?: () => void;
};

type ComputeMiddleware = false | null | undefined | Middleware;

export type PopoverOptions<C extends typeof SvelteComponent> = {
	abortable?: boolean;
	anchored?: boolean;
	arrow?: string | null;
	attributes?: string | null; // default for tooltip is "title"
	autoplaced?: boolean;
	Component?: C;
	container?: string | HTMLElement | null;
	content?: string | null;
	escapable?: boolean;
	events?: PopoverEvent | PopoverEvent[] | null;
	describedby?: boolean | string;
	onBeforeCompute?: (
		response: ComputePositionReturn
	) => ComputePositionReturn | Promise<ComputePositionReturn>;
};

export type PopoverInitOptions<C extends typeof SvelteComponent> = PopoverOptions<C> &
	Partial<ComputePositionConfig> & {
		offset?: number;
		shift?: Padding;
		props?: PopoverComponentProps<C>;
	};

const ARROW_POSITION = {
	top: 'bottom',
	right: 'left',
	bottom: 'top',
	left: 'right'
};

function ensureArray<T>(value?: null | T | T[], def = [] as T[], ignoreNull = true) {
	if (value === null && ignoreNull) return def;
	if (typeof value === 'undefined' || Array.isArray(value)) return (value || def) as T[];
	return [value] as T[];
}

function findContainer(selector?: string | HTMLElement | null, def = document.body): HTMLElement {
	if (!selector) return def;
	if (typeof selector === 'string') return document.querySelector(selector) || def;
	return selector;
}

function findElement(
	selector?: string | HTMLElement | null,
	container = document.body
): HTMLElement | null {
	if (!selector) return null;
	if (typeof selector !== 'string') return selector;
	const el = container.querySelector(selector);
	if (!el) return null;
	return el as HTMLElement;
}

function mergeMiddleware(
	target?: ComputeMiddleware | ComputeMiddleware[],
	source?: ComputeMiddleware | ComputeMiddleware[],
	removeFromTarget?: string[]
) {
	target = ensureArray(target);
	if (removeFromTarget)
		target = target.filter((m) => {
			if (m && typeof m == 'object') return !removeFromTarget.includes(m.name);
			return false;
		});
	source = ensureArray(source).filter((m) => {
		return !(typeof m === 'object' && m !== null && hasMiddleware(target, m.name));
	});
	return [...target, ...source] as Middleware[];
}

function hasMiddleware(middleware: ComputeMiddleware | ComputeMiddleware[], ...keys: string[]) {
	return ensureArray(middleware).some((m) => {
		if (m !== null && typeof m === 'object') return keys.includes(m.name);
		return false;
	});
}

// Allows for setting some reasonable settings in a simpler way
// for full control pass first class middleware in "config.middleware".
function mapMiddleware(
	middleware: ComputeMiddleware | ComputeMiddleware[],
	defaults: { offset?: number; shift?: Padding }
) {
	const _middleware = ensureArray(middleware);
	const arr = [] as ComputeMiddleware[];
	if (typeof defaults.offset !== 'undefined' && !hasMiddleware(_middleware, 'offset'))
		arr.push(offset(defaults.offset));
	if (typeof defaults.shift !== 'undefined' && !hasMiddleware(_middleware, 'shift'))
		arr.push(shift({ padding: shift as Padding }));
	return [...arr];
}

export function createInstance<C extends typeof SvelteComponent<any>>(
	initOptions = {} as PopoverOptions<C>,
	initConfig = {} as Partial<ComputePositionConfig>,
	initProps = {} as PopoverComponentProps<C>
) {
	initConfig.middleware;

	let options = { ...initOptions } as PopoverOptions<C> & { events: PopoverEvent[] };
	let config = { ...initConfig } as ComputePositionConfig;
	let props = { ...initProps };

	let visible = false;
	let containerNode: HTMLElement;
	let triggerNode: HTMLElement | VirtualElement | null = null;
	let contentNode: HTMLElement | null = null;
	let arrowNode: HTMLElement | null = null;
	let component: SvelteComponent | undefined;

	if (browser) containerNode = findContainer(options.container);

	const mergeSettings = (
		updateOptions?: PopoverOptions<C> | null,
		updateConfig?: Partial<ComputePositionConfig> | null,
		updateProps?: Partial<SvelteConstructorProps<C> | null>
	) => {
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

	const handleEscape = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && visible) {
			event.preventDefault();
			close();
		}
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (!triggerNode || event.target === triggerNode) return;
		if (contentNode && !contentNode.contains((event.target as Node) || null) && visible) {
			event.preventDefault();
			close();
		}
	};

	const handleClick = () => {
		if (visible) close();
		else open();
	};

	const extendMiddleware = () => {
		if (!contentNode) return;
		if (!arrowNode && options.arrow) {
			arrowNode = findElement(options.arrow, contentNode);
			if (arrowNode && !hasMiddleware(config.middleware, 'arrow'))
				config.middleware = mergeMiddleware(
					config.middleware,
					arrow({ padding: 4, element: arrowNode }) as Middleware
				);
		}
		if (options.autoplaced && !hasMiddleware(config.middleware, 'autoPlacement'))
			config.middleware = mergeMiddleware(config.middleware, autoPlacement(), [
				'flip',
				'autoPlacement'
			]);
	};

	const applyStrategy = () => {
		if (!contentNode) return;
		contentNode.style.position = config.strategy || 'absolute';
	};

	const applyDescribedBy = () => {
		if (options.describedby && triggerNode && contentNode && triggerNode instanceof HTMLElement) {
			const describedby = triggerNode.getAttribute('aria-describedby');
			const hasId = contentNode.id;
			const id = contentNode.getAttribute('id') || 'popover';
			if (!hasId && id) contentNode.setAttribute('id', id);
			if (id && !describedby)
				// only apply if content has id and triggerNode has no describedby already.
				triggerNode.setAttribute(
					'aria-describedby',
					typeof options.describedby === 'string' ? options.describedby : id
				);
		}
	};

	const compute = (computeConfig = {} as Partial<ComputePositionConfig>) => {
		const cloneConfig = { ...config, ...computeConfig };

		if (!triggerNode || !contentNode) return;

		applyDescribedBy();

		const callback = options.onBeforeCompute || ((response: any) => response);

		const assignElement = ({ x, y }: ComputePositionReturn) => {
			if (!contentNode) return;
			Object.assign(contentNode.style, {
				left: `${x}px`,
				top: `${y}px`
			});
		};

		const assignArrow = ({ placement, middlewareData }: ComputePositionReturn) => {
			if (!arrowNode) return;
			const { x, y } = middlewareData.arrow as Coords & { centerOffset: number };
			const key = placement.split('-')[0] as keyof typeof ARROW_POSITION;
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
				computePosition(triggerNode as ReferenceElement, contentNode as HTMLElement, cloneConfig)
					.then((response) => {
						Promise.resolve(callback(response))
							.then((resp) => {
								assignElement(resp);
								if (arrowNode) assignArrow(resp);
							})
							.catch((ex) => {
								console.warn((ex as Error).message);
							});
					})
					.catch((ex) => {
						console.warn((ex as Error).message);
					});
			});
		} else {
			computePosition(triggerNode, contentNode, config)
				.then((response) => {
					Promise.resolve(callback(response))
						.then((resp) => {
							assignElement(resp);
							if (arrowNode) assignArrow(resp);
						})
						.catch((ex) => {
							console.warn((ex as Error).message);
						});
				})
				.catch((ex) => {
					console.warn((ex as Error).message);
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
		if (options.Component) mountComponent(options.Component, props as PopoverComponentProps<C>);
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

	const mountComponent = (Component: C, mountProps: PopoverComponentProps<C>) => {
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
		if (!contentNode) contentNode = findElement(options.content, containerNode);
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
	} as Record<PopoverEvent, PopoverEventTuple[]>;

	const unbind = () => {
		options.events.forEach((ev) => {
			eventMap[ev].forEach(([event, listener]) => {
				if (triggerNode instanceof HTMLElement) triggerNode.removeEventListener(event, listener);
			});
		});
		if (options.escapable) window.addEventListener('keydown', handleEscape);
	};

	const bind = () => {
		if (!triggerNode) return;
		unbind();
		options.events.forEach((ev) => {
			eventMap[ev].forEach(([event, listener]) => {
				if (triggerNode instanceof HTMLElement) {
					triggerNode.addEventListener(event, listener);
				}
			});
		});
		if (options.escapable) window.addEventListener('keydown', handleEscape);
	};

	const registerVirtualTrigger = (node: Readable<VirtualElement>) => {
		const unsubscribe = node.subscribe(($node) => {
			if (triggerNode === undefined) {
				triggerNode = $node;
				compute();
			} else if (triggerNode instanceof HTMLElement) {
				Object.assign(triggerNode, $node); // safe ref to Virtual Element.
			}
		});
		onDestroy(unsubscribe);
	};

	const registerTrigger = (
		node: Element | VirtualElement | Readable<VirtualElement>,
		registerOptions = {} as PopoverOptions<C>,
		registerConfig = {} as Partial<ComputePositionConfig>,
		registerProps = {} as PopoverComponentProps<C>
	) => {
		mergeSettings(registerOptions, registerConfig, registerProps);

		if ('subscribe' in node) {
			registerVirtualTrigger(node);
			return {};
		} else {
			triggerNode = node;
			if (options.Component) bind();
			return {
				destroy
			};
		}
	};

	const registerContent = (
		node: HTMLElement,
		registerOptions = {} as PopoverOptions<C>,
		registerConfig = {} as Partial<ComputePositionConfig>
	) => {
		contentNode = node;
		mergeSettings(registerOptions, registerConfig);
		applyStrategy();
		compute(config);
		return {
			update(updateConfig: Partial<ComputePositionConfig>) {
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
	strategy: 'absolute' as Strategy,
	// shorthand props below converted
	// into full class middleware.
	offset: 10,
	shift: 4
};

export const useTooltip = <C extends typeof SvelteComponent<any> = typeof Popover>(
	settings = {} as PopoverInitOptions<C>
) => {
	const {
		placement,
		middleware,
		offset,
		shift,
		strategy,
		platform,
		props: rootProps,
		...initOptions
	} = settings;

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
		events: ['hover', 'focus'] as PopoverEvent[],
		...initOptions
	};

	// TODO: Types aren't quite right here.
	const tooltip = (node: Element, props = {} as PopoverComponentProps<C>) => {
		props = {
			arrowed: true,
			...rootProps,
			...props
		};

		const { offset, shift, ...cleaned } = rootConfig as Partial<ComputePositionConfig> & {
			offset?: number;
			shift?: Padding;
		};

		cleaned.middleware = mapMiddleware(cleaned.middleware, { offset, shift });

		const content = node.getAttribute('title');
		node.setAttribute('title', '');

		if (content) (props as any).content = content;

		const { registerTrigger } = createInstance({ ...rootOptions }, cleaned, props);

		return registerTrigger(node);
	};

	return [tooltip] as [typeof tooltip];
};

export const usePopover = (settings = {} as PopoverTriggerOptions) => {
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

	const trigger = (node: Element | VirtualElement | Readable<VirtualElement>) => {
		return registerTrigger(node);
	};

	const content = (node: HTMLElement, config = {} as PopoverTriggerOptions) => {
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

	return [trigger, content] as [typeof trigger, typeof content];
};
