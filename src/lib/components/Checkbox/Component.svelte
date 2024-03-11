<script lang="ts">
	import { type CheckboxProps, checkboxDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder, boolToMapValue } from '$lib/utils';
	import type { ElementProps } from '$lib/types';

	type $$Props = CheckboxProps & Omit<ElementProps<'input'>, 'size'>;

	export let {
		checked,
		disabled,
		focused,
		full,
		hovered,
		rounded,
		shadowed,
		size,
		theme,
		transitioned,
		variant,
		unstyled
	} = {
		...defaults
	} as Required<$$Props>;

	$: checkboxClasses = themer($themeStore)
		.create('Checkbox')
		.bundle(['defaultText'], theme, true)
		.option('hovered', variant, theme, hovered)
		.option('common', 'focusedOutline', focused)
		.option('outlineFocus', theme, focused)
		.option('common', 'transitioned', transitioned)
		.option('checkboxSizes', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('common', 'disabled', disabled)
		.append('w-full', full)
		.append(
			// to remove default styling both ring and ring-offset
			'flex items-center justify-center form-checkbox focus:ring-0 focus:ring-offset-0 bg-transparent',
			true
		)
		.append($$restProps.class, true)
		.compile();

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<input use:forwardedEvents {...$$restProps} bind:checked type="checkbox" class={checkboxClasses} />
