<script lang="ts">
	import type { HtmlTag } from 'svelte/internal';

	import { themer, themeStore } from '$lib/theme';
	import { type TabProps, tabDefaults as defaults } from './module';
	import Button from '../Button';
	import type { ElementNativeProps, ElementProps } from '../types';
	import { getContext } from 'svelte';
	import type { TabControllerContext } from '../TabController';
	import type { SelectValue } from '$lib/stores/select';

	type Tag = $$Generic<'a' | 'button'>;
	type NativeProps = Tag extends 'button'
		? ElementNativeProps<'button', 'disabled' | 'value'>
		: ElementNativeProps<'a'>;
	type $$Props = TabProps<Tag> & NativeProps;

	const context = getContext('TabController') as TabControllerContext;

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
		.append('pointer-events-none', $context?.selected?.includes(value))
		.append($$restProps.class, true)
		.compile(true);

	function handleSelect(value: SelectValue) {
		if ($context?.selected?.includes(value)) context.unselect(value);
		else context.select(value);
	}
</script>

<svelte:element
	this={as}
	{...$$restProps}
	class={tabClasses}
	aria-current={$context?.selected?.includes(value)}
	aria-selected={$context?.selected?.includes(value)}
	aria-labelledby={value + ''}
	on:click={() => handleSelect(value)}
>
	<slot />
</svelte:element>
