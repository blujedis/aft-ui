<script lang="ts">
	import {
		type SelectListProps,
		selectListDefaults as defaults,
		type SelectListContext,
		type SelectListStore,
		type SelectListItem,
		type SelectListItemKey
	} from './module';
	import { themeStore, themer, useSelect, type SelectStore } from '$lib';
	import type { ElementProps } from '$lib/types';
	import { setContext } from 'svelte';
	import { cleanObj, createCustomEvent } from '$lib/utils';

	type Item = $$Generic<SelectListItem>;
	type $$Props = SelectListProps<Item> & Omit<ElementProps<'select'>, 'size'>;

	export let {
		badgeProps,
		autoclose,
		disabled,
		escapable,
		items,
		filterable,
		filter: initFilter,
		full,
		focused,
		hovered,
		multiple,
		newable,
		placeholder,
		removable,
		rounded,
		shadowed,
		size,
		store: initStore,
		theme,
		variant,
		visible,
		transitioned,
		onBeforeAdd,
		onBeforeRemove
	} = {
		...(defaults as any)
	} as Required<$$Props>;

	let sel: HTMLSelectElement;

	export const store = (initStore ||
		useSelect({
			multiple,
			visible,
			selected: [],
			items: [],
			filtered: []
		})) as SelectStore<SelectListStore<Item>>;

	const globals = cleanObj({
		badgeProps,
		disabled,
		filterable,
		full,
		focused,
		hovered,
		newable,
		multiple,
		placeholder,
		removable,
		rounded,
		shadowed,
		size,
		theme,
		variant,
		transitioned,
		onBeforeAdd,
		onBeforeRemove
	});

	export const api = {
		open,
		close,
		isSelected,
		add,
		toggle,
		remove,
		filter,
		reset
	};

	const { class: classes, ...restProps } = $$restProps;

	export const context = setContext('SelectListContext', {
		...store,
		...api,
		globals
	}) as SelectListContext;

	const th = themer($themeStore);

	$: groups = $store.items.reduce(
		(a, c) => {
			if (!c.group) return a;
			a[c.group] = a[c.group] || [];
			a[c.group].push(c as Required<Item>);
			return a;
		},
		{} as Record<string, Required<Item>[]>
	);

	$: groupKeys = Object.keys(groups);

	$: controllerClasses = th
		.create('SelectListController')
		.append('relative not-sr-only inline-flex', true)
		.append('w-full', full)
		.append(classes, true)
		.compile();

	const clickOutside = createCustomEvent('click', 'click_outside', (e, n) => {
		if ($context.input) $context.input.value = '';
		return (
			(n && !n.contains(e.target) && !e.defaultPrevented && autoclose && $store.visible) || false
		);
	});

	function open() {
		store.update((s) => ({ ...s, visible: true }));
	}

	function close() {
		store.update((s) => ({ ...s, visible: false }));
	}

	function toggle() {
		store.update((s) => ({ ...s, visible: !s.visible }));
	}

	function add({ value, label, group, selected }: Item) {
		if (typeof label === 'undefined') label = value + '';
		group = group || '';
		const hasValue = $store.items.find((item) => item.value === value);
		if (!hasValue) {
			store.update((s) => {
				const items = [...s.items, { value, label, group } as Required<Item>];
				let selectedItems = [...s.selected];
				if (selected && !selectedItems.includes(value)) {
					if (selected && selectedItems.length && multiple) selectedItems.push(value);
					else selectedItems = [value];
				}
				return {
					...s,
					items,
					filtered: [...items],
					selected: selectedItems
				};
			});
		}
	}

	function remove(itemOrKey: Item | SelectListItemKey) {
		let key = itemOrKey as SelectListItemKey;
		if (typeof itemOrKey !== 'string') key = (itemOrKey as Item).value;
		store.update((s) => {
			const filteredSelected = s.selected.filter((v) => v !== key);
			return { ...s, selected: filteredSelected };
		});
	}

	function filter(query?: string) {
		store.update((s) => {
			const newItems = !query?.length
				? [...s.items]
				: initFilter(query, s.items as Required<Item>[]);
			return { ...s, filtered: [...newItems] };
		});
	}

	function reset(selectedItems = [] as SelectListItemKey[]) {
		store.update((s) => {
			return { ...s, filtered: [...s.items], selectedItems };
		});
	}

	function handleClose(_e?: Event) {
		context.close();
	}

	function handleKeydown(e: KeyboardEvent) {
		if ((e.key === 'Escape' && escapable) || (e.key === 'Tab' && $store.visible))
			return context.close();
		if (!$store.visible && e.key === 'ArrowDown') return context.open();
	}

	function isSelected(itemOrKey: Item | SelectListItemKey) {
		let key = itemOrKey as SelectListItemKey;
		if (typeof itemOrKey !== 'string') key = (itemOrKey as Item).value;
		return $store.selected.includes(key);
	}

	items.forEach((i) => add(i));
</script>

<div class={controllerClasses}>
	<div
		role="none"
		{...restProps}
		use:clickOutside
		on:click_outside={handleClose}
		on:keydown={handleKeydown}
		class="w-full"
	>
		<div class="w-full">
			<slot
				visible={$store.visible}
				selected={$store.selected}
				filtered={$store.filtered}
				isSelected={context.isSelected}
				open={context.open}
				close={context.close}
				toggle={store.toggle}
			/>
		</div>

		<slot name="select">
			<select bind:this={sel} class="sr-only" {...restProps} {multiple}>
				{#if groupKeys.length}
					{#each Object.entries(groups) as [group, items]}
						<optgroup>{group}</optgroup>
						{#each items as item}
							<option value={item.value}>{item.label}</option>
						{/each}
					{/each}
				{:else}
					{#each $store.items as item}
						<option value={item.value} selected={$store.selected.includes(item.value)}
							>{item.label}</option
						>
					{/each}
				{/if}
			</select>
		</slot>
	</div>
</div>
