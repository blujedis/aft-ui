<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import {
		type ConditionalComponentProps,
		conditionaComponentDefaults as defaults
	} from './module';
	import type { SvelteConstructorProps } from '$lib/types';

	type Tag = $$Generic<typeof SvelteComponent<any>>;

	type $$Props = ConditionalComponentProps<Tag> & SvelteConstructorProps<Tag>;

	export let { as, condition, props } = {
		...defaults
	} as $$Props;

	$: wrap = typeof condition === 'function' ? condition() : condition;
</script>

{#if wrap}
	<svelte:component this={as} {...props}>
		<slot />
	</svelte:component>
{:else}
	<slot />
{/if}
