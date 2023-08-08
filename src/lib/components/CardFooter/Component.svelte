<script lang="ts">
	import { CardElement } from '../CardElement';
	import type { ElementNativeProps } from '../../types';
	import { type CardFooterProps, cardFooterDefaults as defaults } from './module';
	type $$Props = CardFooterProps & ElementNativeProps<'div'>;

	export let { size } = {
		...defaults
	} as Required<CardFooterProps>;
</script>

<svelte:component this={CardElement} {...$$restProps} type="footer" {size}>
	<slot />
</svelte:component>
