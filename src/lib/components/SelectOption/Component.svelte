<script lang="ts">
	import { type SelectOptionProps, selectOptionDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementProps } from '$lib/types';
	import { getContext } from 'svelte';

	type $$Props = SelectOptionProps & ElementProps<'option'>;

	const context = getContext('Select') as Record<string, any>;

	export let { disabled, size, value } = {
		...defaults,
		...context.globals
	} as Required<$$Props>;

	const th = themer($themeStore);

	$: selectOptionClasses = th
		.create('SelectOption')
		.option('fieldFontSizes', size, size)
		.option('fieldPadding', size, size)
		.option('common', 'disabled', disabled)
		.append('flex items-center', true) // always pad right for caret.
		.append($$restProps.class, true)
		.compile();

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<option use:forwardedEvents {...$$restProps} {value} {disabled} class={selectOptionClasses}>
	<slot />
</option>
