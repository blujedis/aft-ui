<script lang="ts">
	import { CardElement } from '$lib/components';
	import type { ElementProps } from '$lib/types';
	import { type CardHeaderProps, cardHeaderDefaults as defaults } from './module';
	type $$Props = CardHeaderProps & ElementProps<'div'>;

	export let { size } = {
		...defaults
	} as Required<CardHeaderProps>;
</script>

<svelte:component this={CardElement} {...$$restProps} type="header" {size}>
	<slot />
</svelte:component>
