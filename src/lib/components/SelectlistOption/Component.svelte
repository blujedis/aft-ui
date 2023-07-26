<script lang="ts">
	import { type SelectListOptionProps, selectListOptionDefaults as defaults } from './module';
	import themeStore, { themer } from '$lib';
	import type { ElementProps } from '../../types';
	import { forwardEventsBuilder } from '$lib/utils';
	import { get_current_component } from 'svelte/internal';
	import type { SelectListContext, SelectListItem } from '../SelectList';
	import { getContext } from 'svelte';

	type Tag = $$Generic<'button' | 'a'>;
	type $$Props = SelectListOptionProps<Tag> & ElementProps<Tag>;

	const context = getContext('SelectListContext') as SelectListContext;

	export let { as, size, theme, key, variant } = {
		...defaults,
		...context?.globals
	} as Required<SelectListOptionProps<Tag>>;

	const th = themer($themeStore);
	$: selected = $context.selected.map((v) =>
		$context.items.find((item) => item.value === v)
	) as SelectListItem[];

	$: optionClasses = th
		.create('SelectListOption')
		.variant('selectListOption', variant, theme, variant)
		.append('focus:outline outline-frame-400 outline-2', true)
		.option('focusedOutline', theme, true)
		.option('focusedOutlineSizes', 'two', true)
		.remove('focus-visible:', true)
		.option('fieldFontSizes', size, size)
		.option('menuPadding', size, size)
		.append('block w-full text-left z-40', true)
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());

	function handleClick(e: Event & { currentTarget: HTMLElement }) {
		if (!context.globals.tags && $context.input) {
			const labels = selected.map((i) => i.label).filter((l) => typeof l !== 'undefined');
			setTimeout(() => {
				if ($context.input) $context.input.value = labels.join(', ');
				$context.input?.focus();
			});
		} else {
			if (context.isSelected(key)) {
				setTimeout(() => {
					context.unselect(key);
					$context.input?.focus();
				});
			} else if (key) {
				setTimeout(() => {
					context.select(key);
					$context.input?.focus();
				});
			}
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
