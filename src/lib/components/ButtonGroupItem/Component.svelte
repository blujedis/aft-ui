<script lang="ts">
	import { themer, themeStore } from '$lib/theme';
	import { type ButtonGroupItemProps, buttonGroupItemDefaults as defaults } from './module';
	import type { ElementProps } from '$lib/types';
	import { getContext } from 'svelte';
	import type { ButtonGroupContext } from '../ButtonGroup';
	import type { SelectStoreValue } from '$lib/stores/select';
	import { cleanObj } from '$lib/utils';
	import { ConditionalElement, Flushed, Button } from '$lib/components';

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
		full,
		hovered,
		rounded,
		size,
		theme,
		transitioned,
		variant
	});

	$: isSelected = $context.selected?.includes(value);

	$: buttonClasses = th
		.create('ButtonGroupItem')
		.bundle(['mainText'], theme, variant === 'text')
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
		.append('px-1', variant === 'text')
		.append(
			'relative first:ml-0 focus:z-10 -ml-px first:rounded-r-none last:rounded-l-none aria-checked:pointer-events-none',
			true
		)
		.append($$restProps.class, true)
		.compile(true);

	function handleSelect(value: SelectStoreValue) {
		if ($context?.selected?.includes(value)) context.unselect(value);
		else context.select(value);
	}
</script>

<ConditionalElement
	as={Flushed}
	condition={variant === 'text'}
	props={{
		active: isSelected,
		theme,
		group: true,
		hover: hovered,
		focused: focused
	}}
>
	<svelte:component
		this={Button}
		{...$$restProps}
		{...passthru}
		role="listitem"
		class={buttonClasses}
		aria-checked={isSelected}
		aria-labelledby={value + ''}
		on:click={() => handleSelect(value)}
	>
		<slot />
	</svelte:component>
</ConditionalElement>
