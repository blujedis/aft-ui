<script lang="ts">
	import { CardElement } from '$lib/components';
	import type { ElementProps } from '$lib/types';
	import { type CardContentProps, cardContentDefaults as defaults } from './module';
	type $$Props = CardContentProps & ElementProps<'div'>;

	export let { size } = {
		...defaults
	} as Required<CardContentProps>;
</script>

<svelte:component this={CardElement} {...$$restProps} type="content" {size}>
	<slot />
</svelte:component>
