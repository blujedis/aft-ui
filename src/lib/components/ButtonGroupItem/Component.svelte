<script lang="ts">
	import { themer, themeStore } from '$lib/theme';
	import { type ButtonGroupItemProps, buttonGroupItemDefaults as defaults } from './module';
	import type { ElementProps } from '$lib/types';
	import { getContext } from 'svelte';
	import type { ButtonGroupContext } from '../ButtonGroup';
	import type { SelectStoreValue } from '$lib/stores/select';
	import { cleanObj } from '$lib/utils';
	import { ConditionalComponent, Flushed, Button, type ButtonVariant } from '$lib/components';

	type $$Props = ButtonGroupItemProps & ElementProps<'button'>;

	const context = getContext('ButtonGroup') as ButtonGroupContext;

	export let {
		disabled,
		hovered,
		focused,
		full,
		rounded,
		size,
		theme,
		transitioned,
		value,
		variant
	} = {
		...defaults,
		...context?.globals
	} as unknown as Required<ButtonGroupItemProps>;

	const th = themer($themeStore);

	const passthru = cleanObj({
		disabled,
		focused,
		full: false,
		hovered,
		rounded,
		size,
		theme,
		transitioned,
		variant: (variant === 'flushed' ? 'text' : variant) as ButtonVariant
	});

	$: isSelected = $context.selected?.includes(value);

	$: buttonClasses = th
		.create('ButtonGroupItem')
		.bundle(['mainText'], theme, variant === 'flushed')
		.bundle(['mainBg', 'selectedAccentBgAriaChecked'], theme, variant === 'filled')
		.bundle(
			['selectedBgAriaChecked', 'selectedWhiteTextAriaChecked'],
			theme,
			variant === 'outlined'
		)
		.bundle(['mainText', 'mainRing'], { $base: 'ring-1 ring-inset' }, theme, variant === 'outlined')
		.bundle(
			['mainText', 'ghostBgHover', 'selectedGhostBgAriaChecked', 'selectedGhostTextAriaChecked'],
			theme,
			variant === 'ghost'
		)
		.bundle(
			['softText', 'softBg', 'selectedSoftBgAriaChecked', 'selectedWhiteTextAriaChecked'],
			theme,
			variant === 'soft'
		)
		.option('buttonPadding', size, size)
		.option('common', 'bordered', variant === 'filled')
		.append('first:border-l-0 border-l', variant === 'filled')
		.append('px-1', variant === 'flushed')
		.append('flex-1', full)
		.append('first:rounded-r-none last:rounded-l-none -ml-px', variant !== 'ghost')
		.append('relative first:ml-0 focus:z-10 aria-checked:pointer-events-none', true)
		.append($$restProps.class, true)
		.compile();

	function handleSelect(value: SelectStoreValue) {
		if ($context?.selected?.includes(value)) context.unselect(value);
		else context.select(value);
	}
</script>

<ConditionalComponent
	as={Flushed}
	condition={variant === 'flushed'}
	selected={isSelected}
	group={true}
	{theme}
	{hovered}
	{focused}
>
	<svelte:component
		this={Button}
		aria-labelledby={value + ''}
		{...$$restProps}
		{...passthru}
		role="listitem"
		class={buttonClasses}
		aria-checked={isSelected}
		on:click={() => handleSelect(value)}
	>
		<slot />
	</svelte:component>
</ConditionalComponent>
