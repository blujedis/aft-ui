<script lang="ts">
	import { type SelectProps, selectDefaults as defaults, type SelectContext } from './module';
	import { ConditionalComponent, Flushed } from '$lib/components';
	import { themeStore, themer } from '$lib/theme';
	// import { setContext } from 'svelte';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder, boolToMapValue } from '$lib/utils';
	import type { ElementProps } from '$lib/types';

	type $$Props = SelectProps & Omit<ElementProps<'select'>, 'size'>;

	export let {
		disabled,
		focused,
		full,
		hovered,
		placeholder,
		rows,
		rounded,
		value,
		shadowed,
		size,
		theme,
		transitioned,
		variant
	} = {
		...defaults
	} as Required<$$Props>;

	// const store = useSelect({ multiple, selected: ensureArray(value) });

	// export const context = setContext<SelectContext>('SelectContext', {
	// 	...store
	// });

	const th = themer($themeStore);

	$: inputClasses = th
		.create('Select')
		.bundle(['mainBg', 'whiteText', 'filledPlaceholder'], theme, variant === 'filled')
		.bundle(
			['inputText', 'mainRing'],
			{ $base: 'ring-1 ring-inset' },
			theme,
			variant === 'outlined'
		)
		.bundle(['softBg', 'inputText'], theme, variant === 'soft')
		.bundle(['mainBorder', 'mainBorderGroupHover', 'inputText'], theme, variant === 'flushed')
		.option('common', 'focusedOutline', focused && variant !== 'flushed')
		.option('outlineFocus', theme, focused && variant !== 'flushed')
		.bundle(['inputText'], theme, variant === 'text')
		.option('common', 'transitioned', transitioned)
		.option('hovered', variant, theme, hovered)
		.option('fieldFontSizes', size, size)
		.option('fieldPadding', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded && variant !== 'flushed')
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('common', 'disabled', disabled)
		.prepend(`select select-${variant}`, true)
		.append('min-w-min', true)
		.append('w-full', full)
		.append('dark:bg-transparent', ['outlined', 'flushed', 'text', 'ghost'].includes(variant))
		.append('peer px-2', variant === 'flushed')
		.append('flex items-center justify-center pr-10 focus:ring-0 outline-none border-0', true) // always pad right for caret.
		.append($$restProps.multiple ? 'form-multiselect' : 'form-select', true)
		.append($$restProps.class, true)
		.compile();

	const forwardedEvents = forwardEventsBuilder(get_current_component());
	const component = Flushed; // TODO: Fix types in Conditional Element
</script>

<ConditionalComponent as={component} condition={variant === 'flushed'} {theme}>
	<select {...$$restProps} use:forwardedEvents size={rows} class={inputClasses} bind:value>
		{#if placeholder}
			<option value="" disabled selected
				>{typeof placeholder === 'string' ? placeholder : 'Please Select'}</option
			>
		{/if}
		<slot />
	</select>
</ConditionalComponent>

<!-- {#if variant === 'flushed'}
	<Flushed {theme}>
		<select {...$$restProps} use:forwardedEvents size={rows} class={inputClasses} bind:value>
			{#if placeholder}
				<option value="" disabled selected
					>{typeof placeholder === 'string' ? placeholder : 'Please Select'}</option
				>
			{/if}
			<slot />
		</select>
	</Flushed>
{:else}
	<select {...$$restProps} use:forwardedEvents size={rows} class={inputClasses} bind:value>
		{#if placeholder}
			<option value="" disabled selected
				>{typeof placeholder === 'string' ? placeholder : 'Please Select'}</option
			>
		{/if}
		<slot />
	</select>
{/if} -->
