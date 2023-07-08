<script lang="ts">
	import { type CardImageProps, cardImageDefaults as defaults } from './module';
	import themeStore, { themer } from '$lib';
	import Image from '../Image';
	import type { ElementNativeProps } from '../types';

	type $$Props = CardImageProps & ElementNativeProps<'img'>;

	export let { fit, full, imageClasses } = {
		...defaults
	} as Required<CardImageProps>;

	const th = themer($themeStore);

	$: cardImageClasses = th.create('CardImage').append($$restProps.class, true).compile(true);
</script>

<div class={cardImageClasses}>
	<slot>
		<svelte:component this={Image} {...$$restProps} {fit} {full} class={imageClasses} />
	</slot>
</div>
