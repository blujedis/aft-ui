<script lang="ts">
	import { CardElement } from '../CardElement';
	import type { ElementNativeProps } from '../../types';
	import { type CardHeaderProps, cardHeaderDefaults as defaults } from './module';
	type $$Props = CardHeaderProps & ElementNativeProps<'div'>;

	export let { size } = {
		...defaults
	} as Required<CardHeaderProps>;
</script>

<svelte:component this={CardElement} {...$$restProps} type="header" {size}>
	<slot />
</svelte:component>
