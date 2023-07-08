<script>
	import themeStore, { themer } from '../..';
	import { forwardEventsBuilder } from '../../utils';
	import { get_current_component } from 'svelte/internal';
	import { popoverDefaults as defaults } from './module';
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
	};
	const role = $$restProps.role ?? arrowed ? 'tooltip' : 'region';
	const forwardedEvents = forwardEventsBuilder(get_current_component());
	const th = themer($themeStore);
	$: popoverClasses = th
		.create('Popover')
		.variant('popover', variant, theme, true)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.option('common', 'transition', transitioned)
		.remove(transitioned === 'colors' ? 'transition-all' : 'transition-colors', transitioned)
		.option('popoverSizes', size, size)
		.append('popover', true)
		.append($$restProps.class, true)
		.compile(true);
</script>

<div use:forwardedEvents {role} {...$$restProps} class={popoverClasses}>
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
