<script lang="ts">
	import { type SelectListOptionProps, selectListOptionDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import { forwardEventsBuilder } from '$lib/utils';
	import { get_current_component } from 'svelte/internal';
	import type { SelectListContext } from '$lib/components/SelectList';
	import { getContext } from 'svelte';

	type Tag = $$Generic<'button' | 'a'>;
	type $$Props = SelectListOptionProps<Tag> & ElementProps<Tag>;

	const context = getContext('SelectListContext') as SelectListContext;

	export let { as, focused, hovered, tags, removable, size, theme, key } = {
		...defaults,
		focused: context.globals?.focused,
		hovered: context.globals?.hovered,
		tags: context.globals?.tags,
		size: context.globals?.size,
		theme: context.globals?.theme
	} as Required<SelectListOptionProps<Tag>>;

	const th = themer($themeStore);

	$: optionClasses = th
		.create('SelectListOption')
		.bundle(
			['selectedBgAriaSelected'],
			{
				$base: 'aria-selected:text-white'
			},
			theme,
			theme
		)
		.option('bgFocus', theme, focused)
		.option('panelBgHover', theme, hovered)
		.option('fieldFontSizes', size, size)
		.option('menuPadding', size, size)
		.prepend('select-list-option', true)
		.append('select-list-option-selected', $context.selected.includes(key))
		.append('block w-full text-left z-40 outline-none', true)
		.append($$restProps.class, true)
		.compile();

	const forwardedEvents = forwardEventsBuilder(get_current_component());

	function handleClick(e: Event & { currentTarget: HTMLElement }) {
		e.preventDefault();
		if (!tags && $context.input) {
			context.toggle();
			if ($context.filtering) context.restore(key, false);
			else context.select(key);
			setTimeout(() => {
				if ($context.input) {
					// const nextValue = $context.items.find((i) => key === i.value)?.label || '';
					// $context.input.value = nextValue;
					$context.input.focus();
				}
			});
		} else {
			context.select(key);
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
	<slot active={$context.selected.includes(key)} />
</button>
