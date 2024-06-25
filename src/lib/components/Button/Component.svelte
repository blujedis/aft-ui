<script lang="ts">
	import { get_current_component } from 'svelte/internal';
	import { boolToMapValue, forwardEventsBuilder, cleanObj } from '$lib/utils';
	import { themeStore, themer } from '$lib/theme';
	import { type ButtonProps, buttonDefaults as defaults } from './module';
	import type { ElementProps } from '$lib/types';

	type Tag = $$Generic<'button' | 'a'>;
	type $$Props = ButtonProps<Tag> & ElementProps<Tag>;

	export let {
		as,
		bordered,
		disabled,
		focused,
		full,
		href,
		hovered,
		rounded,
		shadowed,
		dropshadowed,
		size,
		theme,
		transitioned,
		variant,
		underlined
	} = {
		...cleanObj($themeStore.defaults?.component),
		...defaults
	} as Required<ButtonProps<Tag>>;

	const th = themer($themeStore);

	$: buttonClasses = th
		.create('Button')
		.bundle(['unfilledText'], theme, variant === 'text')
		.bundle(['mainBg', 'filledText'], theme, variant === 'filled')
		.bundle(
			['mainRing', 'unfilledText'],
			{ $base: 'ring-1 ring-inset' },
			theme,
			variant === 'outlined'
		)
		.bundle(['ghostBgHover', 'softText'], { dark: 'hover:text-white' }, theme, variant === 'ghost')
		.bundle(['softBg', 'softText'], theme, variant === 'soft')
		.option('hovered', variant, theme, hovered && variant !== 'ghost')
		.option('elementRing', theme, bordered)
		.option('common', 'focusedOutlineVisible', focused)
		.option('outlineFocusVisible', theme, focused)
		.option('common', 'transitioned', transitioned)
		.option('fieldButtonSizes', size, size)
		.option('fieldLeading', size, size)
		.option('buttonPadding', size, size && variant !== 'text')
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed && variant !== 'text')
		.option(
			'dropshadows',
			boolToMapValue(shadowed && variant === 'text' ? shadowed : dropshadowed),
			(shadowed && variant === 'text') || dropshadowed
		)
		.option('common', 'disabled', disabled)
		.prepend(`button button-${variant}`, true)
		.append('underline', underlined && underlined !== 'hover')
		.append('hover:underline', underlined === 'hover')
		.append('max-w-fit', !full)
		.append('w-full', full)
		.append('ring-1', bordered)
		.append('inline-flex items-center justify-center cursor-pointer outline-none', true)
		.append($$restProps.class, true)
		.compile();

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

{#if href}
	<a use:forwardedEvents {href} {...$$restProps} class={buttonClasses} aria-disabled={disabled}>
		<slot />
	</a>
{:else}
	<button use:forwardedEvents {...$$restProps} class={buttonClasses} {disabled}>
		<slot />
	</button>
{/if}
