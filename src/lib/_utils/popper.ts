import type { Readable } from 'svelte/store';
import { onDestroy } from 'svelte';
import type { OptionsGeneric, Modifier, VirtualElement, Instance, State } from '@popperjs/core';
import { createPopper as createPopperInternal } from '@popperjs/core';

export type { VirtualElement } from '@popperjs/core';

export type Node = Element | VirtualElement | Readable<VirtualElement>;

export type PopperOptions<M> = Partial<OptionsGeneric<M>> | undefined;

/**
 * Creates a new popper instance with provided options.
 *
 * @example
 * import createPopper from './popper';
 * const {ref, tooltip} = createPopper({
 *    placement: 'left',
 *    strategy: 'static'
 * });
 *
 * const conf = {
 *  modifiers: [
 *    { ...opts here }
 *  ]
 * }
 *
 * @param options the options to initialize with.
 */
export function createPopper<M extends Partial<Modifier<any, any>>>(
	initOptions?: PopperOptions<M>
) {
	let popper: Instance | null = null;
	let ref: VirtualElement | Element | undefined;
	let tooltipRef: HTMLElement | undefined;
	let config: PopperOptions<M> | undefined = initOptions;

	function init() {
		if (ref !== undefined && tooltipRef !== undefined)
			popper = createPopperInternal(ref, tooltipRef, config);
	}

	/**
	 * Destroys the current popper instance.
	 */
	function destroy() {
		if (popper === null) return;
		popper.destroy();
		popper = null;
	}

	/**
	 * Creates reference to virtual node resulting from Svelte Writable.
	 *
	 * @see https://popper.js.org/docs/v2/virtual-elements/#usage
	 * @example
	 * import { writable } from 'svelte/store';
	 * let x = 0;
	 * let y = 0;
	 * const mousemove = (event: MouseEvent) => {
	 *   x = event.clientX;
	 *   y = event.clientY;
	 * };
	 * $: getBoundingRect = () => ({
	 *    height: 0,
	 *    width: 0,
	 *    top: y,
	 *    bottom: y,
	 *    left: x,
	 *    right: x
	 * })
	 * const virtual = writeable({ getBoundingRect });
	 * $: virtual = { getBoundingRect };
	 * createRef(virtual);
	 *
	 * @param node the node containing a subscription.
	 */
	function createVirtual(node: Readable<VirtualElement>) {
		const unsubscribe = node.subscribe(($node) => {
			if (ref === undefined) {
				ref = $node;
				init();
			} else {
				Object.assign(ref, $node);
				popper?.update();
			}
		});
		onDestroy(unsubscribe);
	}

	/**
	 * Registers an element as a tooltip tigger.
	 *
	 * @example
	 * let visible = false;
	 * <button
	 *    use:ref
	 *    on:mouseenter={() => visible = true}
	 *    on:mouseleave={() => visible = false}
	 * >
	 *  Tooltip Trigger
	 * </button>
	 *
	 * {#if visible}
	 *    <div use:tooltip>
	 *       Hello world!
	 *    </div>
	 * {/if}
	 *
	 *
	 * @param node the element/node to used to create tooltip trigger.
	 */
	function createRef(node: Node) {
		if ('subscribe' in node) {
			createVirtual(node);
		} else {
			ref = node;
			init();
		}
	}

	/**
	 * Registers the tooltip content element that is to be triggered.
	 *
	 * @example
	 * {#if visible}
	 *    <div use:tooltip>
	 *       Hello world!
	 *    </div>
	 * {/if}
	 *
	 * @param node the tooltip content element that will be displayed when triggered.
	 * @param options additional options for displaying the tooltip.
	 */
	function createTooltip(node: HTMLElement, options: PopperOptions<M>) {
		tooltipRef = node;
		config = { ...initOptions, ...options };
		init();
	}

	/**
	 * Updates a registered tooltip.
	 *
	 * @param options additional options to be applied to the tooltip.
	 */
	function setOptions(options: PopperOptions<M>) {
		config = { ...initOptions, ...options };
		if (!popper) return Promise.resolve({} as Partial<State>);
		return popper?.setOptions(config);
	}

	/**
	 * Asynchronously calls update returning the current state from promise.
	 */
	function update() {
		if (!popper) return () => Promise.resolve({} as Partial<State>);
		return popper?.update;
	}

	/**
	 * Forces update or refresh of the tooltip.
	 */
	function forceUpdate() {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		if (!popper) return () => {};
		return popper?.forceUpdate;
	}

	return {
		get state() {
			return popper?.state;
		},
		ref: createRef,
		tooltip: createTooltip,
		update,
		forceUpdate,
		setOptions,
		destroy
	};
}
