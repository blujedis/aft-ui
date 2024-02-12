<script lang="ts">
	import { get_current_component } from 'svelte/internal';
	import { boolToMapValue, forwardEventsBuilder } from '$lib/utils';
	import { themeStore, themer } from '$lib/theme';
	import { type ButtonProps, buttonDefaults as defaults } from './module';
	import type { ElementProps } from '$lib/types';

	type Tag = $$Generic<'button' | 'a'>;
	type $$Props = ButtonProps<Tag> & ElementProps<Tag>;

	export let {
		as,
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
		underlined
	} = {
		...defaults,
		...$themeStore?.defaults?.component
	} as Required<ButtonProps<Tag>>;

	const th = themer($themeStore);
	const href = '#';

	$: buttonClasses = th
		.create('Button')
		.bundle(['mainText'], theme, variant === 'text')
		.bundle(['mainBg', 'whiteText'], theme, variant === 'filled')
		.bundle(['mainText', 'mainRing'], { $base: 'ring-1 ring-inset' }, theme, variant === 'outlined')
		.bundle(['mainText', 'ghostBgHover'], { dark: 'hover:text-white' }, theme, variant === 'ghost')
		.bundle(['softText', 'softBg'], theme, variant === 'soft')
		.option('hovered', variant, theme, hovered)
		.option('common', 'focusedOutlineVisible', focused)
		.option('outlineFocusVisible', theme, focused)
		.option('common', 'transitioned', transitioned)
		.option('fieldFontSizes', size, size)
		.option('buttonPadding', size, size && variant !== 'text')
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed && variant !== 'text')
		.option('dropshadows', boolToMapValue(shadowed), shadowed && variant === 'text')
		.option('common', 'disabled', disabled)
		.append('underline', underlined && underlined !== 'hover')
		.append('hover:underline', underlined === 'hover')
		.append('w-full', full)
		.append('inline-flex items-center justify-center cursor-pointer outline-none', true)
		.append($$restProps.class, true)
		.compile();

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

{#if as === 'button'}
	<button use:forwardedEvents {...$$restProps} class={buttonClasses} {disabled}>
		<slot />
	</button>
{:else}
	<a use:forwardedEvents {href} {...$$restProps} class={buttonClasses} aria-disabled={disabled}>
		<slot />
	</a>
{/if}
