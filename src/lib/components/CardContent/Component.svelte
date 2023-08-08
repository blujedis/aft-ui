<script lang="ts">
	import { CardElement } from '../CardElement';
	import type { ElementNativeProps } from '../../types';
	import { type CardContentProps, cardContentDefaults as defaults } from './module';
	type $$Props = CardContentProps & ElementNativeProps<'div'>;

	export let { size } = {
		...defaults
	} as Required<CardContentProps>;
</script>

<svelte:component this={CardElement} {...$$restProps} type="footer" {size}>
	<slot />
</svelte:component>
