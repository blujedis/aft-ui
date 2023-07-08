<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import themeStore, { themer } from '$lib';
	import type { DropdownContext } from '$lib/components/Dropdown/module';
	import { type DropdownOptionGroupProps, dropdownOptionGroupDefaults as defaults } from './module';

	type $$Props = DropdownOptionGroupProps;

	const context = getContext<DropdownContext>('Dropdown');

	export let { group, size, theme, variant } = {
		...defaults,
		...context?.globals
	} as Required<DropdownOptionGroupProps>;

	setContext('DropdownGroup', group);

	const th = themer($themeStore);

	$: optionGroupClasses = th
		.create('DropdownGroup')
		.variant('dropdownOptionGroup', variant, theme, variant)
		.option('fieldFontSizes', size, size)
		.option('fieldPadding', size, size)
		.append($$restProps.class, true)
		.compile(true);
</script>

{#if context.mode !== 'menu'}
	<optgroup class={optionGroupClasses}>{group}</optgroup>
{/if}
