<script lang="ts">
	import type { DisclosureContext } from '../Disclosure/module';

	import { SvelteComponent, getContext } from 'svelte';
	import { forwardEventsBuilder } from '../../utils';
	import { get_current_component } from 'svelte/internal';
	import type { DisclosureButtonProps } from './module';
	import type { HTMLTag } from '../../types';

	type T = $$Generic<HTMLTag | typeof SvelteComponent<any>>;
	type $$Props = DisclosureButtonProps<T>;

	export let as = 'button' as T;

	const context = getContext<DisclosureContext>('Disclosure');
	const forwardedEvents = forwardEventsBuilder(get_current_component());

	const isElement = typeof as === 'string';
	const element = as as T extends HTMLTag ? T : never;
	const component = as as T extends typeof SvelteComponent ? T : never;
</script>

{#if isElement}
	<svelte:element
		this={element}
		role="button"
		tabindex="-1"
		{...$$restProps}
		use:forwardedEvents
		on:click={() => context.toggle()}
	>
		<slot />
	</svelte:element>
{:else}
	<svelte:component this={component} {...$$restProps} on:click={() => context.toggle()}>
		<slot />
	</svelte:component>
{/if}
