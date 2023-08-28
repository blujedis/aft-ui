<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { type ConditionalElementProps, conditionalElementDefaults as defaults } from './module';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementProps, HTMLTag, SvelteConstructorProps } from '../../types';

	type Tag = $$Generic<HTMLTag | typeof SvelteComponent<any, any>>;
	type AdditionalProps = Tag extends HTMLTag
		? ElementProps<Tag>
		: Tag extends typeof SvelteComponent<any, any>
		? { props?: SvelteConstructorProps<Tag> }
		: never;
	type $$Props = ConditionalElementProps<Tag> & AdditionalProps;

	// 	T extends typeof SvelteComponent
	// ? SvelteConstructorProps<T>
	// : T extends HTMLTag
	// ? ElementProps<T>
	// : never;

	export let { as, condition, props } = {
		...defaults
	} as $$Props;

	$: wrap = typeof condition === 'function' ? condition() : condition;

	const isElement = typeof as === 'string';
	const element = as as Tag extends HTMLTag ? Tag : never;
	const component = as as Tag extends typeof SvelteComponent ? Tag : never;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const forwardEventsNoop = (node: any) => {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		return { destroy() {} };
	};
	const forwardedEvents = forwardEventsBuilder(get_current_component());
	// const forwardedEvents = withevents
	// 	? forwardEventsBuilder(get_current_component())
	// 	: forwardEventsNoop;
</script>

{#if wrap}
	{#if isElement}
		<svelte:element this={element} use:forwardedEvents {...$$restProps} {...props}>
			<slot />
		</svelte:element>
	{:else}
		<svelte:component this={component} {...props}>
			<slot />
		</svelte:component>
	{/if}
{:else}
	<slot />
{/if}
