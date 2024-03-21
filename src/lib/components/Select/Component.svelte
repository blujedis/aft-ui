<script lang="ts">
	import { type SelectProps, selectDefaults as defaults, type SelectContext } from './module';
	import { ConditionalComponent, Flushed } from '$lib/components';
	import { themeStore, themer } from '$lib/theme';
	import { setContext } from 'svelte';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder, boolToMapValue } from '$lib/utils';
	import type { ElementProps } from '$lib/types';

	type $$Props = SelectProps & Omit<ElementProps<'select'>, 'size'>;

	export let {
		disabled,
		focused,
		full,
		hovered,
		placeholder,
		rows,
		rounded,
		value,
		shadowed,
		size,
		theme,
		transitioned,
		variant
	} = {
		...$themeStore?.defaults?.component,
		...defaults
	} as Required<$$Props>;

	setContext('Select', {
		size,
		theme,
		variant
	});

	const th = themer($themeStore);

	$: selectClasses = th
		.create('Select')
		.bundle(
			['mainBg', 'whiteText', 'filledPlaceholder'],
			{
				frame: 'text-dark dark:text-light'
			},
			theme,
			variant === 'filled'
		)
		.bundle(
			['inputText', 'mainRing'],
			{ $base: 'ring-1 ring-inset' },
			theme,
			variant === 'outlined'
		)
		.bundle(['softBg', 'inputText'], theme, variant === 'soft')
		.bundle(['mainBorder', 'mainBorderGroupHover', 'inputText'], theme, variant === 'flushed')
		.option('common', 'focusedOutline', focused && variant !== 'flushed')
		.option('outlineFocus', theme, focused && variant !== 'flushed')
		.bundle(['inputText'], theme, variant === 'text')
		.option('common', 'transitioned', transitioned)
		.option('hovered', variant, theme, hovered)
		.option('fieldFontSizes', size, size)
		.option('fieldPadding', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded && variant !== 'flushed')
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('common', 'disabled', disabled)
		.prepend(`select select-${variant} select-${theme}`, true)
		.append('min-w-min', true)
		.append('w-full', full || variant === 'flushed') // flushed container requires full width
		.append('dark:bg-transparent', ['outlined', 'flushed', 'text', 'ghost'].includes(variant))
		.append('peer px-2', variant === 'flushed')
		.append(
			'inline-flex items-center justify-center pr-10 focus:ring-0 outline-none border-0',
			true
		) // always pad right for caret.
		.append($$restProps.multiple ? 'form-multiselect' : 'form-select', true)
		.append($$restProps.class, true)
		.compile();

	const forwardedEvents = forwardEventsBuilder(get_current_component());
	const component = Flushed; // TODO: Fix types in Conditional Element
</script>

<ConditionalComponent as={component} condition={variant === 'flushed'} {theme}>
	<select {...$$restProps} use:forwardedEvents size={rows} class={selectClasses} bind:value>
		{#if placeholder}
			<option value="" disabled selected
				>{typeof placeholder === 'string' ? placeholder : 'Please Select'}</option
			>
		{/if}
		<slot />
	</select>
</ConditionalComponent>

<style>
	.select-filled:not(.select-frame) {
		background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>');
	}
</style>
