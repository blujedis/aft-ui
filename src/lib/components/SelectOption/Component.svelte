<script lang="ts">
	import { type SelectOptionProps, selectOptionDefaults as defaults } from './module';
	import { styler, themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementProps } from '$lib/types';
	import { getContext } from 'svelte';

	type $$Props = SelectOptionProps & ElementProps<'option'>;

	const context = getContext('Select') as Record<string, any>;

	export let { disabled, size, theme, transitioned, value, variant, unstyled } = {
		...defaults,
		...context
	} as Required<$$Props>;

	const th = themer($themeStore);
	const st = styler($themeStore);

	$: selectOptionStyles = st
		.create('SelectOptionStyles')
		.color('--option-selected-background', `${$themeStore.options.selectOptionBg[theme]}`, true)
		.compile();

	$: selectOptionClasses = th
		.create('SelectOption')
		.option('common', 'transitioned', transitioned)
		.option('fieldFontSizes', size, size)
		.option('fieldPadding', size, size)
		.option('common', 'disabled', disabled)
		.append('flex items-center text-dark dark:text-light', true) // always pad right for caret.
		.append($$restProps.class, true)
		.compile();

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<option
	use:forwardedEvents
	{...$$restProps}
	{value}
	class={selectOptionClasses}
	style={selectOptionStyles}
>
	<slot />
</option>

<style>
	option {
		background-color: white;
	}
	option:checked {
		background-color: var(--option-selected-background);
		color: #fff;
	}
	dark:option {
		backgound-color: transparent;
	}
</style>
