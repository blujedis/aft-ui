import type { Readable } from 'svelte/store';
import {
	createPopper as createPopperInstance,
	type Instance,
	type OptionsGeneric,
	type Modifier,
	type VirtualElement
} from '@popperjs/core';
import { onDestroy, SvelteComponent, SvelteComponentTyped, type ComponentProps } from 'svelte';

import Popover, { type PopoverProps } from '$lib/components/Popover';
import type { ElementNativeProps } from '$lib/components';

export type { VirtualElement } from '@popperjs/core';
export type RefNode = Element | VirtualElement;
export type ContentNode = HTMLElement | undefined;

export type PopperOptions<TModifier> = Partial<OptionsGeneric<TModifier>> | undefined;

export type PopoverNativeProps = ElementNativeProps<'div'>;

export type RefAction = (node: RefNode | Readable<VirtualElement>) => {
	destroy?(): void;
};

export type ContentAction<TModifier> = (
	node: HTMLElement,
	popperOptions?: PopperOptions<TModifier>
) => {
	update(popperOptions: PopperOptions<TModifier>): void;
	destroy(): void;
};

export type InstanceExt = Instance & {
	ref: VirtualElement | Element | undefined;
	content: HTMLElement | undefined;
	destroy: () => void;
};

export type PopperReturn<TModifier> = [
	RefAction,
	ContentAction<TModifier>,
	() => InstanceExt | null
];

export class PopoverComponent extends SvelteComponentTyped<PopoverProps & PopoverNativeProps> {}

export type PopoverOptions<
	TModifier,
	C extends typeof SvelteComponent
> = PopperOptions<TModifier> & {
	target?: string | Element | ShadowRoot;
	selector?: string;
	node?: Element & { focus: () => void };
	type?: 'click' | 'hover' | 'focus' | 'none';
	escapable?: boolean;
	component?: C;
	props?: ComponentProps<InstanceType<C>>;
};

/**
 * Hook creates new Popper instance using reference node and content node Svelte Actions.
 *
 * @example
 * <script>
 * 		import { usePopper } from '$lib/usePopper';
 * 		const [ref, content] = usePopper({
 * 			modifier: [{ name: 'offset', options: { offset: [0, 8] } }]
 * 		});
 * 		let visible = false;
 * </script>
 *
 * <button>My Tooltip</button>
 * {#if visible}
 * 		<div id="tooltip" use:content>
 * 			Hello Tooltip!
 * 			<div id="arrow" data-popper-arrow />
 * 		</div>
 * {/if}
 *
 *
 * @param initOptions the options to initialize Popper instance.
 */
export function createPopper<TModifier extends Partial<Modifier<any, any>>>(
	initOptions?: PopperOptions<TModifier>
): PopperReturn<TModifier> {
	initOptions = {
		modifiers: [{ name: 'offset', options: { offset: [0, 8] } } as any],
		...initOptions
	};

	let options: PopperOptions<TModifier> = initOptions;

	let instance: Instance | null = null;
	let ref: VirtualElement | Element | undefined;
	let content: ContentNode;

	function init() {
		if (ref !== undefined && content !== undefined)
			instance = createPopperInstance(ref, content, options);
	}

	function destroy() {
		if (instance !== null) {
			instance.destroy();
			instance = null;
		}
	}

	function createVirtual(node: Readable<VirtualElement>) {
		const unsubscribe = node.subscribe((n) => {
			if (ref === undefined) {
				ref = n;
				init();
			} else {
				Object.assign(ref, n);
				instance?.update();
			}
		});
		onDestroy(unsubscribe);
	}

	function createRef(node: RefNode | Readable<VirtualElement>) {
		if ('subscribe' in node) {
			createVirtual(node);
			return {};
		} else {
			ref = node;
			init();
			return {
				destroy
			};
		}
	}

	function createContent(node: HTMLElement, contentOptions?: PopperOptions<TModifier>) {
		content = node;
		options = { ...initOptions, ...contentOptions };
		init();
		return {
			update(updateOptions: PopperOptions<TModifier>) {
				options = { ...initOptions, ...updateOptions };
				instance?.setOptions(options);
			},
			destroy
		};
	}

	return [createRef, createContent, () => ({ ...instance, ref, content, destroy } as InstanceExt)];
}

export function createPopover<
	M extends Partial<Modifier<any, any>>,
	C extends typeof SvelteComponent
>(initOptions = {} as PopoverOptions<M, C>) {
	const options = {
		type: 'hover',
		target: document.body,
		...initOptions
	};

	if (typeof options.escapable === 'undefined' && options.type === 'click')
		options.escapable = true;

	const {
		node: initNode,
		component: initComponent,
		target: initTarget,
		type,
		props,
		selector,
		escapable,
		...rest
	} = options as Required<PopoverOptions<M, C>>;
	const [createRef, createContent, getInstance] = createPopper<M>(rest);
	const Component: typeof SvelteComponent = initComponent || Popover;

	let visible = false;
	let node = null as (Element & { focus: () => void }) | null;
	let component: SvelteComponentTyped | null = null;
	let content: HTMLElement | null = null;
	let events = [] as [string, (...args: any) => void][];
	const target = typeof initTarget === 'string' ? document.querySelector(initTarget) : initTarget;

	function bind() {
		if (!node) return;
		if (type === 'hover') {
			node.addEventListener('mouseover', show);
			node.addEventListener('mouseout', hide);
			events = [...events, ['mouseover', show], ['mouseout', hide]];
		} else if (type === 'click') {
			node.addEventListener('click', handleClick);
			events = [...events, ['click', handleClick]];
		} else if (type === 'focus') {
			node.addEventListener('focus', show);
			node.addEventListener('blur', hide);
			events = [...events, ['focus', show], ['blur', hide]];
		}
		if (escapable) window.addEventListener('keydown', handleEscape);
	}

	function unbind() {
		events.forEach(([event, handler]) => node?.removeEventListener(event, handler));
		if (type === 'click') document.removeEventListener('click', handleClickOutside);
		window.removeEventListener('keydown', handleEscape);
	}

	function register(registerNode: (Element & { focus: () => void }) | undefined) {
		if (registerNode) {
			node = registerNode;
			bind();
		}
	}

	function handleEscape(event: KeyboardEvent) {
		if (event.key === 'Escape' && visible) hide();
	}

	function handleClick() {
		if (visible) hide();
		else show();
	}

	function handleClickOutside(event: any) {
		if (!node || event.target === node) return;
		if (content && !content.contains(event.target) && visible) hide();
	}

	function show() {
		if (!target) return;
		component = new Component({
			target,
			props
		});
		content = target.querySelector(selector);
		if (!node || !content) return;
		visible = true;
		content.setAttribute('data-show', '');
		createRef(node);
		createContent(content);
		if (type === 'click') document.addEventListener('click', handleClickOutside);
	}

	function hide() {
		if (!target) return;
		content = target.querySelector(selector);
		content?.removeAttribute('data-show');
		visible = false;
		reset();
		if (type === 'click') document.removeEventListener('click', handleClickOutside);
		node?.focus();
	}

	function reset() {
		if (component) component.$destroy();
		const popper = getInstance();
		if (popper) popper.destroy();
		component = null;
	}

	function destroy() {
		unbind();
		reset();
	}

	if (initNode) register(initNode);

	return {
		register,
		bind,
		unbind,
		show,
		hide,
		destroy
	};
}

/**
 * Helper to create popover on element.
 *
 * @example
 * <a href="#" use:popover title="My Tooltip">Some Link</a>
 * <a href="#" use:popover={{ options... }}>Link with Options</a>
 *
 * @param node the node to apply the popover to.
 * @param options the popover options to be applied.
 */
export function popover<TModifier extends Partial<Modifier<any, any>>>(
	node: Element & { focus: () => void },
	options = {} as Omit<PopoverOptions<TModifier, typeof PopoverComponent>, 'component'>
) {
	options = {
		target: '#popover-container',
		selector: '.popover',
		...options,
		node
	};
	const content = node.getAttribute('title');
	node.setAttribute('title', '');
	options.props = {
		content,
		...options.props,
		arrowed: true
	};
	const { destroy } = createPopover(options);
	return {
		destroy
	};
}
