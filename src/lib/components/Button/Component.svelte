<script lang="ts">
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '../../utils';
	import { themeStore, themer } from '../../';
	import { type ButtonProps, buttonDefaults as defaults } from './module';
	import type { ElementProps, ThemeVariantAppend } from '../../types';

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
		strong,
		theme,
		transitioned,
		variant,
		underlined,
		unstyled
	} = {
		...defaults,
		...$themeStore?.defaults?.component
	} as Required<ButtonProps<Tag>>;

	const th = themer($themeStore);

	const href = '#';

	$: isStrong = strong || (as === 'button' && typeof strong === 'undefined');

	$: buttonClasses = unstyled
		? th.create('Button').append($$restProps.class, true).compile()
		: th
				.create('Button')
				.variant('button', variant, theme, variant)
				.option(`hovered2.${variant}` as any, theme, hovered)
				.option('common', 'focusedVisible', focused)
				.option('common', 'transitioned', transitioned)
				.option('fieldFontSizes', size, size)
				.option('buttonPadding', size, size && variant !== 'text')
				.option('roundeds', rounded, rounded)
				.option('shadows', shadowed, shadowed && variant !== 'text')
				.option('dropshadows', shadowed, shadowed && variant === 'text')
				.option('common', 'disabled', disabled)
				.append('underline', underlined && underlined !== 'hover')
				.append('hover:underline', underlined === 'hover')
				.append('font-medium', strong)
				.append('w-full', full)
				.append('inline-flex items-center justify-center cursor-pointer outline-0', true)
				.append($$restProps.class, true)

				.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

{#if as === 'button'}
	<button use:forwardedEvents {...$$restProps} class={buttonClasses} {disabled}>
		{#if isStrong || buttonClasses.includes('font-medium')}
			<div class="pt-px">
				<slot />
			</div>
		{:else}
			<slot />
		{/if}
	</button>
{:else}
	<a use:forwardedEvents {href} {...$$restProps} class={buttonClasses} aria-disabled={disabled}>
		{#if isStrong || buttonClasses.includes('font-medium')}
			<div class="pt-px">
				<slot />
			</div>
		{:else}
			<slot />
		{/if}
	</a>
{/if}
