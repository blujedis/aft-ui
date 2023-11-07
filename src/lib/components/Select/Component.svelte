<script lang="ts">
	import { type SelectProps, selectDefaults as defaults, type SelectContext } from './module';
	import { themeStore, ConditionalElement, Flushed, ensureArray, themer } from '$lib';
	import { onMount, setContext } from 'svelte';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementProps } from '../../types';
	import { useSelect } from '$lib/stores/select';

	type $$Props = SelectProps & Omit<ElementProps<'select'>, 'size'>;

	export let {
		disabled,
		focused,
		full,
		multiple,
		placeholder,
		rows,
		rounded,
		selected,
		shadowed,
		size,
		theme,
		transitioned,
		variant,
		unstyled
	} = {
		...defaults
	} as Required<$$Props>;

	const store = useSelect({ multiple, selected: ensureArray(selected) });

	export const context = setContext<SelectContext>('SelectContext', {
		...store
	});

	const th = themer($themeStore);

	$: inputClasses = th
		.create('Select')
		.variant('input', variant, theme, variant)
		.option('focusedRing', theme, focused && variant !== 'flushed')
		.option('common', 'transition', transitioned)
		.option('placeholders', theme, true)
		.option('fieldFontSizes', size, size)
		.option('fieldPadding', size, size)
		.option('roundeds', rounded, rounded && variant !== 'flushed')
		.option('shadows', shadowed, shadowed)
		.option('disableds', theme, disabled)
		.append('w-full', full)
		.append('border-0 ring-0', variant !== 'outlined')
		.append('px-2 peer focus:ring-0 outline-none border-0', variant === 'flushed')
		.append('flex items-center justify-center pr-10 outline-none', true) // always pad right for caret.
		.append(multiple ? 'form-multiselect' : 'form-select', true)
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
	const component = Flushed as any; // TODO: Fix types in Conditional Element
</script>

<ConditionalElement as={component} {theme} condition={variant === 'flushed'} />

{#if variant === 'flushed'}
	<Flushed {theme}>
		<select
			{...$$restProps}
			use:forwardedEvents
			{multiple}
			size={rows}
			class={inputClasses}
			value={multiple ? $store.selected : $store.selected[0]}
		>
			{#if placeholder}
				<option value="" disabled selected
					>{typeof placeholder === 'string' ? placeholder : 'Please Select'}</option
				>
			{/if}
			<slot selectedItems={$store.selected} select={context.select} unselect={context.unselect} />
		</select>
	</Flushed>
{:else}
	<select
		{...$$restProps}
		use:forwardedEvents
		{multiple}
		size={rows}
		class={inputClasses}
		value={multiple ? $store.selected : $store.selected[0]}
	>
		{#if placeholder}
			<option value="" disabled selected
				>{typeof placeholder === 'string' ? placeholder : 'Please Select'}</option
			>
		{/if}
		<slot selectedItems={$store.selected} select={context.select} unselect={context.unselect} />
	</select>
{/if}
