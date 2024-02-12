<script lang="ts">
	import { type CardImageProps, cardImageDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { Image } from '$lib/components';
	import type { ElementProps } from '$lib/types';

	type $$Props = CardImageProps & ElementProps<'img'>;

	export let { fit, full, imageClasses } = {
		...defaults
	} as Required<CardImageProps>;

	const th = themer($themeStore);

	$: cardImageClasses = th.create('CardImage').append($$restProps.class, true).compile();
</script>

<div class={cardImageClasses}>
	<slot>
		<svelte:component this={Image} {...$$restProps} {fit} {full} class={imageClasses} />
	</slot>
</div>
