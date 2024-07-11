<script lang="ts">
	import { type ConditionalRenderProps, conditionalRenderDefaults as defaults } from './module';

	type $$Props = ConditionalRenderProps;

	export let { condition } = {
		...defaults
	} as ConditionalRenderProps;

	$: shouldRender = typeof condition === 'function' ? condition() : condition;
</script>

{#if shouldRender}
	<slot />
{:else}
	<slot name="unsatisfied" />
{/if}
