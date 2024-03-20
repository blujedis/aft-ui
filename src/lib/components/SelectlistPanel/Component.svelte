<script lang="ts">
	import { type SelectListPanelProps, selectListPanelDefaults as defaults } from './module';
	import { themeStore, themer } from '$lib/theme';
	import { transitioner } from '$lib/components/Disclosure';
	import type { SelectListContext, SelectListItem } from '$lib/components/SelectList';
	import { getContext } from 'svelte';
	import { useFocusNav } from '$lib/hooks';
	import { boolToMapValue } from '$lib/utils';
	import type { ElementProps } from '$lib/types';

	type $$Props = SelectListPanelProps & ElementProps<'div'>;

	interface ActiveItem {
		el?: HTMLElement;
		index?: number;
	}

	const context = getContext('SelectListContext') as SelectListContext;

	export let { full, origin, position, recordless, rounded, shadowed, tags, theme, transition } = {
		...defaults,
		full: context.globals?.full,
		tags: context.globals?.tags,
		recordless: context.globals?.recordless,
		rounded: context.globals?.rounded,
		shadowed: context.globals?.shadowed,
		theme: context.globals?.theme
	} as Required<SelectListPanelProps>;

	const th = themer($themeStore);

	$: nav = useFocusNav($context.panel?.firstChild, {
		onSelected,
		onFind,
		onInit,
		onNavigate
	});

	$: activeItem = { el: undefined, index: undefined } as ActiveItem;

	$: recordlessMsg = typeof recordless === 'string' ? recordless : `No options available.`;

	$: panelClasses = th
		.create('SelectListPanel')
		.option('panelBg', theme, theme)
		.option('roundeds', rounded === 'full' ? 'xl2' : boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('common', 'bordered', true)
		.prepend('select-list-panel', true)
		.append('outline-none', true)
		.append(`absolute z-30 mt-1 text-left min-w-32 border`, true)
		.append(position === 'right' ? 'right-0' : 'left-0', true)
		.append(origin === 'right' ? 'origin-top-right' : 'origin-top-left', true)
		.append('origin-center', origin === 'center')
		.append('min-w-full', full)
		.append($$restProps.class, true)
		.compile();

	$: recordlessClasses = th
		.create('SelectListPanelRecordless')
		.option('menuPadding', context.globals?.size, context.globals?.size)
		.option('fieldFontSizes', context.globals?.size, context.globals?.size)
		.compile();

	function onInit(items = [] as HTMLElement[]) {
		if (!items.length || $context.filtering) return;
		activeItem = items.reduce(
			(a, c, i) => {
				if (c.classList.contains('select-list-option-selected')) {
					a.el = c;
					a.index = Math.max(0, i - 1);
				}
				return a;
			},
			{ el: undefined, index: undefined } as ActiveItem
		);

		if (!activeItem.el)
			// just focus on first option item if none selected.
			activeItem = { el: items[0], index: 0 };
		activeItem.el?.focus();
	}

	function onNavigate(el: HTMLElement | undefined, index: number) {
		activeItem = { el, index };
	}

	function onSelected(el: HTMLElement, e: KeyboardEvent) {
		e.preventDefault(); // prevent or will bubble for option select event.
		const key = el.dataset.key as string;
		if (!tags && $context.input) {
			context.toggle();
			context.restore(key, false);
			setTimeout(() => {
				if ($context.input) {
					const nextValue = $context.items.find((i) => key === i.value)?.label || '';
					$context.input.value = nextValue;
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

	function onFind(items: HTMLElement[]) {
		let found = items.find((el) => el.classList.contains('select-list-option-selected'));
		if (!found) found = items.find((el) => el.classList.contains('select-list-option'));
		return found as HTMLElement;
	}
</script>

{#if $context.visible}
	<div
		role="listbox"
		tabindex="-1"
		{...$$restProps}
		aria-orientation="vertical"
		bind:this={$context.panel}
		on:keydown={nav.onKeydown}
		transition:transitioner={transition}
		class={panelClasses}
	>
		<div class="py-1" role="none">
			{#if recordless && !$context.filtered.length}
				<slot name="recordless">
					<div class={recordlessClasses}>
						{#if typeof recordless === 'string'}
							<span>{recordless}</span>
						{:else}
							<span>{recordlessMsg}</span>
						{/if}
					</div>
				</slot>
			{:else}
				<slot {activeItem} />
			{/if}
		</div>
	</div>
{/if}
