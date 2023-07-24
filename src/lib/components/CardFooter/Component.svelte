<script lang="ts">
	import CardContent from '../CardContent';
	import type { ElementNativeProps } from '../../types';
	import { type CardFooterProps, cardFooterDefaults as defaults } from './module';
	type $$Props = CardFooterProps & ElementNativeProps<'div'>;

	export let { size } = {
		...defaults
	} as Required<CardFooterProps>;
</script>

<svelte:component this={CardContent} {...$$restProps} type="footer" {size}>
	<slot />
</svelte:component>
