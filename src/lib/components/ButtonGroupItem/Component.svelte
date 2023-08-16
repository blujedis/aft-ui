<script lang="ts">
	import { themer, themeStore } from '../../theme';
	import { type ButtonGroupItemProps, buttonGroupItemDefaults as defaults } from './module';
	import { Button } from '../Button';
	import type { ElementProps } from '../../types';
	import { getContext } from 'svelte';
	import type { ButtonGroupContext } from '../ButtonGroup';
	import type { SelectStoreValue } from '$lib/stores/select';
	import { cleanObj } from '$lib/utils';

	type $$Props = ButtonGroupItemProps & ElementProps<'button'>;

	const context = getContext('ButtonGroup') as ButtonGroupContext;

	export let { disabled, focused, full, rounded, size, theme, transitioned, value, variant } = {
		...defaults,
		...context?.globals
	} as unknown as Required<ButtonGroupItemProps>;

	const th = themer($themeStore);

	const passthru = cleanObj({
		disabled,
		focused,
		full,
		rounded,
		size,
		theme,
		transitioned,
		variant
	});

	$: buttonClasses = th
		.create('ButtonGroupItem')
		.variant('buttonGroupItem', variant, theme, true)
		.option('buttonPadding', size, size)
		.append('relative first:ml-0 focus:z-10  -ml-px first:rounded-r-none last:rounded-l-none', true)
		.append($$restProps.class, true)
		.compile(true);

	function handleSelect(value: SelectStoreValue) {
		if ($context?.selected?.includes(value)) context.unselect(value);
		else context.select(value);
	}
</script>

<svelte:component
	this={Button}
	{...$$restProps}
	{...passthru}
	role="listitem"
	class={buttonClasses}
	aria-checked={$context?.selected?.includes(value)}
	aria-labelledby={value + ''}
	on:click={() => handleSelect(value)}
>
	<slot />
</svelte:component>
