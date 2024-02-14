<script lang="ts">
	import { type SelectListOptionProps, selectListOptionDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import { forwardEventsBuilder } from '$lib/utils';
	import { get_current_component } from 'svelte/internal';
	import type { SelectListContext, SelectListItem } from '$lib/components/SelectList';
	import { getContext } from 'svelte';

	type Tag = $$Generic<'button' | 'a'>;
	type $$Props = SelectListOptionProps<Tag> & ElementProps<Tag>;

	const context = getContext('SelectListContext') as SelectListContext;

	export let { as, focused, hovered, multiple, removable, size, theme, key } = {
		...defaults,
		focused: context.globals?.focused,
		hovered: context.globals?.hovered,
		multiple: context.globals?.multiple,
		size: context.globals?.size,
		theme: context.globals?.theme
	} as Required<SelectListOptionProps<Tag>>;

	const th = themer($themeStore);

	$: selected = $context.selected.map((v) =>
		$context.items.find((item) => item.value === v)
	) as SelectListItem[];

	$: optionClasses = th
		.create('SelectListOption')
		.bundle(['selectedBgAriaSelected', 'selectedWhiteTextAriaSelected'], theme, true)
		.option('common', 'focusedOutline', focused)
		.option('outlineFocus', theme, focused)
		.option('panelBgHover', theme, true)
		.option('fieldFontSizes', size, size)
		.option('menuPadding', size, size)
		.append('block w-full text-left z-40', true)
		.append($$restProps.class, true)
		.compile();

	const forwardedEvents = forwardEventsBuilder(get_current_component());

	function handleSelect() {
		if (context.isSelected(key) && removable) context.unselect(key);
		else if (key) context.select(key);
	}

	function handleClick(e: Event & { currentTarget: HTMLElement }) {
		if (!multiple && $context.input) {
			handleSelect();
			setTimeout(() => {
				const labels = selected.map((i) => i.label).filter((l) => typeof l !== 'undefined');
				if ($context.input) $context.input.value = labels.join(', ');
				$context.input?.focus();
			});
		} else {
			handleSelect();
			setTimeout(() => {
				$context.input?.focus();
			});
		}
	}
</script>

<button
	role="option"
	{...$$restProps}
	use:forwardedEvents
	on:click={handleClick}
	aria-selected={$context.selected.includes(key)}
	data-key={key}
	class={optionClasses}
>
	<slot />
</button>
