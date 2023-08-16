<script lang="ts">
	import { CardElement } from '../CardElement';
	import type { ElementProps } from '../../types';
	import { type CardContentProps, cardContentDefaults as defaults } from './module';
	type $$Props = CardContentProps & ElementProps<'div'>;

	export let { size } = {
		...defaults
	} as Required<CardContentProps>;
</script>

<svelte:component this={CardElement} {...$$restProps} type="footer" {size}>
	<slot />
</svelte:component>
