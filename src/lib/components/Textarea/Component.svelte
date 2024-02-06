<script lang="ts">
	import { type TextareaProps, textareaDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder, boolToMapValue } from '$lib/utils';
	import type { ElementProps } from '$lib/types';

	type $$Props = TextareaProps & Omit<ElementProps<'input'>, 'size'>;

	export let {
		disabled,
		focused,
		full,
		resize,
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

	$: textareaClasses = themer($themeStore)
		.create('Textarea')
		.variant('textarea', variant, theme, variant)
		.option('focusedRing', theme, focused)
		.option('placeholders', theme, true)
		.option('common', 'transitioned', transitioned)
		.option('resizes', resize, resize)
		.option('fieldFontSizes', size, size)
		.option('fieldPadding', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('common', 'disabled', disabled)
		.append('w-full', full)
		.append('flex items-center justify-center form-textarea border-0', true)
		.append('border-0 ring-1 ring-black ring-opacity-5', variant === 'filled')
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<textarea {...$$restProps} use:forwardedEvents class={textareaClasses} />
