import type { Readable } from 'svelte/store';
import {
	type Instance,
	type OptionsGeneric,
	type Modifier,
	type VirtualElement
} from '@popperjs/core';
import { SvelteComponent, SvelteComponentTyped, type ComponentProps } from 'svelte';
import { type PopoverProps } from '../components/Popover';
import type { ElementNativeProps } from '../components';
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
export declare class PopoverComponent extends SvelteComponentTyped<
	PopoverProps & PopoverNativeProps
> {}
export type PopoverOptions<
	TModifier,
	C extends typeof SvelteComponent
> = PopperOptions<TModifier> & {
	target?: string | Element | ShadowRoot;
	selector?: string;
	node?: Element & {
		focus: () => void;
	};
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
 * 		import { usePopper } from '../usePopper';
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
export declare function createPopper<TModifier extends Partial<Modifier<any, any>>>(
	initOptions?: PopperOptions<TModifier>
): PopperReturn<TModifier>;
export declare function createPopover<
	M extends Partial<Modifier<any, any>>,
	C extends typeof SvelteComponent
>(
	initOptions?: Partial<OptionsGeneric<M>> & {
		target?: string | Element | ShadowRoot | undefined;
		selector?: string | undefined;
		node?:
			| (Element & {
					focus: () => void;
			  })
			| undefined;
		type?: 'none' | 'hover' | 'click' | 'focus' | undefined;
		escapable?: boolean | undefined;
		component?: C | undefined;
		props?: ComponentProps<InstanceType<C>> | undefined;
	}
): {
	register: (
		registerNode:
			| (Element & {
					focus: () => void;
			  })
			| undefined
	) => void;
	bind: () => void;
	unbind: () => void;
	show: () => void;
	hide: () => void;
	destroy: () => void;
};
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
export declare function popover<TModifier extends Partial<Modifier<any, any>>>(
	node: Element & {
		focus: () => void;
	},
	options?: Omit<
		Partial<OptionsGeneric<TModifier>> & {
			target?: string | Element | ShadowRoot | undefined;
			selector?: string | undefined;
			node?:
				| (Element & {
						focus: () => void;
				  })
				| undefined;
			type?: 'none' | 'hover' | 'click' | 'focus' | undefined;
			escapable?: boolean | undefined;
			component?: typeof PopoverComponent | undefined;
			props?:
				| (PopoverProps &
						import('svelte/elements').HTMLAttributes<HTMLDivElement> &
						import('../components').ElementOverrideProps)
				| undefined;
		},
		'component'
	>
): {
	destroy: () => void;
};
