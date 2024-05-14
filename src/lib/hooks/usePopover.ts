import type { Readable } from 'svelte/store';
import {
	type VirtualElement,
	type ComputePositionConfig,
	type Middleware,
	type Coords,
	type ComputePositionReturn,
	type ReferenceElement,
	computePosition,
	autoUpdate,
	arrow,
	shift,
	offset,
	type Padding
} from '@floating-ui/dom';
import { onDestroy } from 'svelte';
import { browser } from '$app/environment';
import { cleanObj, ensureArray } from '$lib/utils';

export type PopoverComputeMiddleware = false | null | undefined | Middleware;
export type PopoverEvent = 'hover' | 'click' | 'focus';
export type PopoverEventTuple = [keyof HTMLElementEventMap, (...args: any[]) => void];

export type PopoverOptions = ComputePositionConfig & {
	sticky?: boolean;
	containerRef?: string | HTMLElement | null | undefined;
	escapeable?: boolean;
	events?: PopoverEvent | PopoverEvent[] | null;
	offset?: number;
	padding?: number;
	onChange?: (visible: boolean) => any;
};

export type PopoverContentOptions = ComputePositionConfig & {
	arrowRef?: string | HTMLElement | null | undefined;
	offset?: PopoverOptions['offset'];
	padding?: PopoverOptions['padding'];
};

const DEFAULT_OPTIONS = {
	sticky: false,
	events: ['hover', 'focus'],
	middleware: [],
	offset: 8, // shortcut for offset see: https://floating-ui.com/docs/offset#options
	padding: 4, // shortcut for shift see:  https://floating-ui.com/docs/detectOverflow#padding
	placement: 'top',
	strategy: 'absolute',
	onChange: (v) => {}
} as Partial<PopoverOptions>;

const ARROW_POSITION = {
	top: 'bottom',
	right: 'left',
	bottom: 'top',
	left: 'right'
};

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

function hasMiddleware(
	middleware: PopoverComputeMiddleware | PopoverComputeMiddleware[],
	...keys: string[]
) {
	return ensureArray(middleware).some((m) => {
		if (m !== null && typeof m === 'object') return keys.includes(m.name);
		return false;
	});
}

function mergeMiddleware(
	target?: PopoverComputeMiddleware | PopoverComputeMiddleware[],
	source?: PopoverComputeMiddleware | PopoverComputeMiddleware[],
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

function middlewareDefaults(
	middleware: PopoverComputeMiddleware | PopoverComputeMiddleware[],
	defaults: { offset?: number; padding?: Padding }
) {
	const _middleware = ensureArray(middleware);
	const arr = [] as PopoverComputeMiddleware[];
	if (typeof defaults.offset !== 'undefined' && !hasMiddleware(_middleware, 'offset'))
		arr.push(offset(defaults.offset));
	if (typeof defaults.padding !== 'undefined' && !hasMiddleware(_middleware, 'shift'))
		arr.push(shift({ padding: defaults.padding }));
	return [...arr];
}

export function createPopoverInstance(instanceOptions?: PopoverOptions) {
	let options = {
		...DEFAULT_OPTIONS,
		...instanceOptions
	} as Required<PopoverOptions> & { events: PopoverEvent[] };
	options.events = ensureArray(options.events);
	options.middleware = middlewareDefaults(options.middleware, {
		offset: options.offset,
		padding: options.padding
	});

	let containerNode: HTMLElement;
	let triggerNode: HTMLElement | VirtualElement | null = null;
	let contentNode: HTMLElement | null = null;
	let arrowNode: HTMLElement | null = null;
	let cleanup: () => any;

	let visible = false;

	if (browser) containerNode = findContainer(options.containerRef);

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

	function mergeOptions(updateOptions: Partial<PopoverOptions>) {
		options = {
			...options,
			...cleanObj(updateOptions) // removes undefined values.
		};
		const updateEvents = ensureArray(updateOptions.events);
		options.events = updateEvents.length ? updateEvents : options.events;
		return options;
	}

	// Picks the floating ui compute config props.
	function getConfig(updateOptions?: Partial<PopoverOptions>) {
		if (updateOptions) mergeOptions(updateOptions);
		return cleanObj({
			strategy: options.strategy,
			placement: options.placement,
			platform: options.platform,
			middleware: options.middleware
		}) as ComputePositionConfig;
	}

	// Handles when user clicks escape which will close the floating ui.
	function handleEscape(event: KeyboardEvent) {
		if (event.key === 'Escape' && visible) {
			event.preventDefault();
			close();
		}
	}

	// Handles when user clicks outside the floating ui which closes it.
	function handleClickOutside(event: MouseEvent) {
		if (!triggerNode || event.target === triggerNode) return;
		if (contentNode && !contentNode.contains((event.target as Node) || null) && visible) {
			event.preventDefault();
			close();
		}
	}

	// Click event handler, essentially opens/shows floating ui.
	function handleClick() {
		if (visible) close();
		else open();
	}

	function bindEvents() {
		if (!triggerNode || !options.events.length) return;
		unbindEvents();
		options.events.forEach((ev) => {
			eventMap[ev].forEach(([event, listener]) => {
				if (triggerNode instanceof HTMLElement) triggerNode.addEventListener(event, listener);
			});
		});
		if (options.escapeable) window.addEventListener('keydown', handleEscape);
	}

	function unbindEvents() {
		if (options.events.length)
			options.events.forEach((ev) => {
				eventMap[ev].forEach(([event, listener]) => {
					if (triggerNode instanceof HTMLElement) triggerNode.removeEventListener(event, listener);
				});
			});
		if (options.escapeable) window.addEventListener('keydown', handleEscape);
	}

	function applyMiddleware(arrowRef?: string | HTMLElement | null) {
		if (!contentNode) return;
		const config = getConfig();
		arrowNode = findElement(arrowRef, contentNode);
		if (arrowNode) {
			if (!hasMiddleware(config.middleware, 'arrow'))
				options.middleware = mergeMiddleware(
					options.middleware,
					arrow({ padding: 4, element: arrowNode }) as Middleware
				);
		}
	}

	function compute() {
		if (!triggerNode || !contentNode) return;
		const config = getConfig();
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

		if (options.sticky) {
			cleanup = autoUpdate(triggerNode, contentNode, () => {
				computePosition(triggerNode as ReferenceElement, contentNode as HTMLElement, config)
					.then((response) => {
						assignElement(response);
						assignArrow(response);
					})
					.catch((ex) => {
						console.warn((ex as Error).message);
					});
			});
		} else {
			computePosition(triggerNode, contentNode, config)
				.then((response) => {
					assignElement(response);
					assignArrow(response);
				})
				.catch((ex) => {
					console.warn((ex as Error).message);
				});
		}
	}

	function setVisibility(state: boolean) {
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
		if (cleanup) cleanup();
		if (arrowNode instanceof HTMLElement) {
			arrowNode = null;
		}
		if (contentNode instanceof HTMLElement) {
			contentNode = null;
		}
	}

	function registerVirtualTrigger(node: Readable<VirtualElement>) {
		const unsubscribe = node.subscribe(($node) => {
			if (triggerNode === undefined) {
				triggerNode = $node;
				compute();
			} else if (triggerNode instanceof HTMLElement) {
				Object.assign(triggerNode, $node); // safe ref to Virtual Element.
			}
		});
		onDestroy(() => {
			unsubscribe();
			destroy();
		});
	}

	function registerTrigger(node: string | HTMLElement | VirtualElement | Readable<VirtualElement>) {
		const foundNode = typeof node === 'string' ? findElement(node, containerNode) : node;
		if (!foundNode)
			throw new Error(`Cannot create Popover using trigger element of null or undefined.`);
		if ('subscribe' in foundNode) {
			registerVirtualTrigger(foundNode);
			return {};
		} else {
			triggerNode = foundNode;
			bindEvents();
			return {
				destroy
			};
		}
	}

	function registerContent(node: HTMLElement, registerOptions = {} as PopoverContentOptions) {
		const { arrowRef, ...rest } = registerOptions;
		contentNode = node;
		const config = getConfig(rest);
		contentNode.style.position = config.strategy || 'absolute';
		applyMiddleware(arrowRef);
		compute();
		return {
			update(updateConfig: Partial<ComputePositionConfig>) {
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
