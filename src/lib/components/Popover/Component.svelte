<script lang="ts">
	import themeStore, { themer } from '$lib';
	import { type PopoverProps, popoverDefaults as defaults } from './module';
	import type { ElementNativeProps } from '../../types';

	type $$Props = PopoverProps & ElementNativeProps<'div'>;

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

	$: popoverClasses = th
		.create('Popover')
		.variant('popover', variant, theme, true)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.option('common', 'transition', transitioned)
		.option('popoverSizes', size, size)
		.option('fontSizes', size, size)
		.append('popover', true)
		.append($$restProps.class, true)
		.compile(true);
</script>

<div {role} {...$$restProps} class={popoverClasses}>
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
	#arrow,
	#arrow::before {
		position: absolute;
		width: 8px;
		height: 8px;
		z-index: -1;
		background: inherit;
	}

	#arrow {
		visibility: hidden;
	}

	#arrow::before {
		visibility: visible;
		content: '';
		transform: rotate(45deg);
		background: inherit;
	}

	:global(.popover[data-popper-placement^='bottom'] > #arrow) {
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
	}
</style>
