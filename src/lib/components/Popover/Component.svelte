<script lang="ts">
	import { themeStore, themer } from '$lib';
	import { type PopoverProps, popoverDefaults as defaults } from './module';
	import type { ElementProps } from '../../types';

	type $$Props = PopoverProps & ElementProps<'div'>;

	export let {
		arrowed,
		content,
		hide,
		id,
		rounded,
		sanitizer,
		shadowed,
		size,
		theme,
		transitioned,
		unstyled,
		variant
	} = {
		id: 'popover',
		...defaults
	} as Required<$$Props>;

	const role = $$restProps.role ?? arrowed ? 'tooltip' : 'region';
	const th = themer($themeStore);

	$: popoverClasses = th
		.create('Popover')
		.variant('popover', variant, theme, variant)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.option('common', 'transition', transitioned)
		.option('fieldFontSizes', size, size)
		.option('popoverSizes', size, size)
		.append('absolute', true)
		.append($$restProps.class, true)
		.compile(true);
</script>

<div {role} {...$$restProps} {id} class={popoverClasses}>
	<slot {hide}>
		{#if typeof content === 'string'}
			{#if !!sanitizer}
				{@html sanitizer(content)}
			{:else}
				{content}
			{/if}
		{:else}
			<svelte:component this={content} {hide} />
		{/if}
	</slot>
	{#if arrowed}
		<div id="arrow" class="popover__arrow" />
	{/if}
</div>

<style>
	#arrow {
		position: absolute;
		background: inherit;
		width: 8px;
		height: 8px;
		transform: rotate(45deg);
	}
</style>
