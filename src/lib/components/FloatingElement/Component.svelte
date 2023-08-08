<script lang="ts">
	import themeStore, { themer } from '$lib';
	import { type FloatingElementProps, floatingElementDefaults as defaults } from './module';
	import type { ElementProps } from '../../types';

	type $$Props = FloatingElementProps & ElementProps<'div'>;

	export let {
		arrowed,
		content,
		id,
		rounded,
		shadowed,
		size,
		theme,
		transitioned,
		unstyled,
		variant
	} = {
		...defaults
	} as Required<$$Props>;

	const role = $$restProps.role ?? arrowed ? 'tooltip' : 'region';
	const th = themer($themeStore);

	$: floatingElementClasses = th
		.create('FloatingElement')
		.variant('popover', variant, theme, variant)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.option('common', 'transition', transitioned)
		.option('common', 'ringed', true)
		.option('fieldFontSizes', size, size)
		.option('popoverSizes', size, size)
		.append('popover absolute', true)
		.append($$restProps.class, true)
		.compile(true);
</script>

<div {role} {...$$restProps} class={floatingElementClasses}>
	<slot>
		{#if typeof content === 'string'}
			{content}
		{:else}
			<svelte:component this={content} />
		{/if}
	</slot>
	{#if arrowed}
		<div id="arrow" data-popper-arrow />
	{/if}
</div>

<style>
	#arrow {
		position: absolute;
		background: #222;
		width: 8px;
		height: 8px;
		transform: rotate(45deg);
	}

	/* Default Example
	#tooltip {
		width: max-content;
		position: absolute;
		top: 0;
		left: 0;
		background: #222;
		color: white;
		font-weight: bold;
		padding: 5px;
		border-radius: 4px;
		font-size: 90%;
	} */

	/* #arrow,
	#arrow::before {
		position: absolute;
		width: 8px;
		height: 8px;
		background: inherit;
		transform: rotate(45deg);
		z-index: -1; 
	} */

	/* #arrow {
		visibility: hidden;
	}

	#arrow::before {
		visibility: visible;
		content: '';
		transform: rotate(45deg);
		background: inherit;
	} */

	/* :global(.popver[data-popper-placement^='bottom'] > #arrow) {
		top: -4px;
	}

	:global(.popover[data-popper-placement^='top'] > #arrow) {
		bottom: -4px;
	}

	:global(.popover[data-popper-placement^='left'] > #arrow) {
		right: -4px;
	}

	:global(.popover[data-popper-placement^='right'] > #arrow) {
		left: -4px;
	} */
</style>
