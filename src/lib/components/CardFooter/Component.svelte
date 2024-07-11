<script lang="ts">
	import { CardElement } from '$lib/components';
	import type { ElementProps } from '$lib/types';
	import { type CardFooterProps, cardFooterDefaults as defaults } from './module';
	type $$Props = CardFooterProps & ElementProps<'div'>;

	export let { size } = {
		...defaults
	} as Required<CardFooterProps>;
</script>

<svelte:component this={CardElement} {...$$restProps} type="footer" {size}>
	<slot />
</svelte:component>
