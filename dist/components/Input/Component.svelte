<script>
	import { inputDefaults as defaults } from './module';
	import themeStore, { themer } from '../..';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '../../utils';
	export let {
		disabled,
		focused,
		full,
		rounded,
		shadowed,
		size,
		theme,
		transitioned,
		variant,
		unstyled
	} = {
		...defaults
	};
	const th = themer($themeStore);
	$: inputClasses = unstyled
		? th
				.create('Input')
				.option(focused === 'default' ? 'focusedSizes' : 'focusedVisibleSizes', size, focused)
				.option(focused === 'default' ? 'focused' : 'focusedVisible', theme, focused)
				.append('focus:ring-offset-0 focus:border-transparent', variant !== 'flushed')
				.option('placeholders', theme, true)
				.option('common', 'transition', transitioned)
				.option('fieldFontSizes', size, size)
				.option('fieldPadding', size, size)
				.option('roundeds', rounded, rounded && variant !== 'flushed')
				.option('shadows', shadowed, shadowed)
				.option('disableds', theme, disabled)
				.append('w-full', full)
				.append('px-2', variant === 'flushed')
				.append('flex items-center justify-center', true)
				.append($$restProps.class, true)
				.compile(true)
		: th
				.create('Input')
				.variant('input', variant, theme, true)
				.option(focused === 'default' ? 'focusedSizes' : 'focusedVisibleSizes', size, focused)
				.option(focused === 'default' ? 'focused' : 'focusedVisible', theme, focused)
				.append('focus:ring-offset-0 focus:border-transparent', variant !== 'flushed')
				.option('placeholders', theme, true)
				.option('common', 'transition', transitioned)
				.remove(transitioned === 'colors' ? 'transition-all' : 'transition-colors', transitioned)
				.option('fieldFontSizes', size, size)
				.option('fieldPadding', size, size)
				.option('roundeds', rounded, rounded && variant !== 'flushed')
				.option('shadows', shadowed, shadowed)
				.option('disableds', theme, disabled)
				.append('w-full', full)
				.append('px-2', variant === 'flushed')
				.append('flex items-center justify-center', true)
				.append($$restProps.class, true)
				.compile(true);
	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<input {...$$restProps} use:forwardedEvents class={inputClasses} />
