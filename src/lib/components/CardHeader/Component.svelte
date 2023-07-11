<script lang="ts">
	import CardContent from '../CardContent';
	import type { ElementNativeProps } from '../../types';
	import { type CardHeaderProps, cardHeaderDefaults as defaults } from './module';
	type $$Props = CardHeaderProps & ElementNativeProps<'div'>;

	export let { size } = {
		...defaults
	} as Required<CardHeaderProps>;
</script>

<svelte:component this={CardContent} {...$$restProps} mode="header" {size}>
	<slot />
</svelte:component>
