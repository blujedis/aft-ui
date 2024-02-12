<script lang="ts">
	import { type SelectOptionProps, selectOptionDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementProps } from '$lib/types';
	import type { SelectContext } from '$lib/components/Select';
	import { getContext } from 'svelte';

	type $$Props = SelectOptionProps & ElementProps<'option'>;

	export let { disabled, size, theme, transitioned, value, variant, unstyled } = {
		...defaults
	} as Required<$$Props>;

	const context = getContext<SelectContext>('SelectContext');

	const th = themer($themeStore);

	$: inputClasses = th
		.create('SelectOption')
		.variant('selectOption', variant, theme, variant)
		.option('common', 'transitioned', transitioned)
		.option('fieldFontSizes', size, size)
		.option('fieldPadding', size, size)
		.option('common', 'disabled', disabled)
		.append('flex items-center justify-center', true) // always pad right for caret.
		.append($$restProps.class, true)
		.compile();

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<option
	{...$$restProps}
	use:forwardedEvents
	{value}
	class={inputClasses}
	on:click={() => context.select(value)}
>
	<slot selected={() => context.isSelected(value)} />
</option>
