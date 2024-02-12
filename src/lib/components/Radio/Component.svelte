<script lang="ts">
	import { type RadioProps, radioDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder, boolToMapValue } from '$lib/utils';
	import type { ElementProps } from '$lib/types';

	type $$Props = RadioProps & Omit<ElementProps<'input'>, 'size'>;

	export let {
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

	const th = themer($themeStore);

	$: radioClasses = th
		.create('Radio')
		.option('iconSizes', size, size)
		.bundle(['defaultText'], theme, true)
		.option('hovered', variant, theme, hovered)
		.option('common', 'focusedOutline', focused)
		.option('outlineFocus', theme, focused)
		.option('common', 'transitioned', transitioned)
		.option('common', 'formBorder', true)
		.option('checkboxSizes', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('common', 'disabled', disabled)
		.append('w-full', full)
		.append(
			'flex items-center justify-center form-radio focus:ring-0 focus:ring-offset-0 bg-transparent',
			true
		)
		.append($$restProps.class, true)
		.compile();

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<input {...$$restProps} type="radio" use:forwardedEvents class={radioClasses} />
