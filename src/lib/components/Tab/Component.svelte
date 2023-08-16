<script lang="ts">
	import { themer, themeStore } from '../../theme';
	import { type TabProps, tabDefaults as defaults } from './module';
	import type { ElementProps } from '../../types';
	import { getContext } from 'svelte';
	import type { TabsContext } from '../Tabs';
	import type { SelectStoreValue } from '$lib/stores/select';

	type Tag = $$Generic<'a' | 'button'>;
	// type NativeProps = Tag extends 'button'
	// 	? ElementProps<'button', 'disabled' | 'value'>
	// 	: ElementProps<'a'>;
	type $$Props = TabProps<Tag> & ElementProps<Tag>;

	const context = getContext('Tabs') as TabsContext;

	export let {
		as,
		disabled,
		focused,
		full,
		rounded,
		size,
		theme,
		transitioned,
		underlined,
		value,
		variant
	} = {
		...defaults,
		...context?.globals
	} as Required<TabProps<Tag>>;

	const th = themer($themeStore);

	$: tabClasses = th
		.create('Tab')
		.variant('tab', variant, theme, true)
		.option('focusedRingVisible', theme, focused)
		.option('buttonPadding', size, size)
		.option('fieldFontSizes', size, size)
		.option('roundeds', rounded, rounded)
		.append(
			'rounded-br-none rounded-bl-none',
			['labeled', 'default', 'underlined'].includes(variant)
		)
		.append('inline-flex items-center justify-center', true)
		.append('whitespace-nowrap', variant === 'flushed')
		.append('w-full', full && ['grouped', 'labeled'].includes(variant))
		.append('px-10', full && ['pills', 'underlined', 'default'].includes(variant))
		.append(
			'relative focus:z-10 first:ml-0 -ml-px first:ml-0 first:rounded-r-none last:rounded-l-none',
			variant === 'grouped'
		)
		.append($$restProps.class, true)
		.compile(true);

	function handleSelect(value: SelectStoreValue) {
		if ($context?.selected?.includes(value)) context.unselect(value);
		else context.select(value);
	}
</script>

<svelte:element
	this={as}
	aria-labelledby={value + ''}
	{...$$restProps}
	role={as === 'a' ? 'link' : 'button'}
	tabindex="-1"
	class={tabClasses}
	aria-current={$context?.selected?.includes(value)}
	aria-selected={$context?.selected?.includes(value)}
	on:click={() => handleSelect(value)}
>
	<slot />
</svelte:element>
