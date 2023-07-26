<script lang="ts">
	import {
		type SelectListProps,
		selectListDefaults as defaults,
		type SelectListContext,
		type SelectListStore,
		type SelectListItem,
		type SelectListItemKey
	} from './module';
	import themeStore, { themer, useSelect, type SelectStore } from '$lib';
	import type { ElementProps } from '../../types';
	import { onMount, setContext } from 'svelte';
	import { cleanObj, createCustomEvent } from '$lib/utils';

	type Item = $$Generic<SelectListItem>;
	type $$Props = SelectListProps<Item> & Omit<ElementProps<'select'>, 'size'>;

	export let {
		autoclose,
		escapable,
		items,
		filter: initFilter,
		full,
		multiple,
		newable,
		placeholder,
		removable,
		rounded,
		shadowed,
		size,
		store: initStore,
		strategy,
		tags,
		theme,
		underlined,
		variant,
		visible,
		onBeforeAdd,
		onBeforeRemove
	} = {
		...(defaults as any)
	} as Required<$$Props>;

	export const store = (initStore ||
		useSelect({
			multiple: true,
			visible,
			selected: [],
			items: [],
			filtered: []
		})) as SelectStore<SelectListStore<Item>>;

	const th = themer($themeStore);
	let sel: HTMLSelectElement;
	let mounted =false;

	const globals = cleanObj({
		full,
		newable,
		multiple,
		placeholder,
		removable,
		rounded,
		shadowed,
		size,
		strategy,
		tags,
		theme,
		underlined,
		variant,
		onBeforeAdd,
		onBeforeRemove
	});

	export const context = setContext('SelectListContext', {
		...store,
		open,
		close,
		isSelected,
		add,
		toggle,
		remove,
		filter,
		reset,
		globals
	}) as SelectListContext;

	$: groups = $store.items.reduce((a, c) => {
		if (!c.group) return a;
		a[c.group] = a[c.group] || [];
		a[c.group].push(c as Required<Item>);
		return a;
	}, {} as Record<string, Required<Item>[]>);

	$: groupKeys = Object.keys(groups);

	$: multiselectClasses = th
		.create('SelectListController')
		.append('w-full', full)
		.append('relative inline-flex not-sr-only', true)
		.append($$restProps.class, true)
		.compile(true);

	const clickOutside = createCustomEvent('click', 'click_outside', (e, n) => {
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
					if (selected && selectedItems.length && ['multiselect', 'tags'].includes(strategy))
						selectedItems.push(value);
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
			if (!query) console.log(s.items);
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

	items.forEach((item) => add(item));
	onMount(() => {
		mounted = true;
	});
</script>

<div
	role="none"
	{...$$restProps}
	use:clickOutside
	on:click_outside={handleClose}
	on:keydown={handleKeydown}
	class={multiselectClasses}
	class:visible={mounted}
>
	<div class:w-full={full}>
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
		<select bind:this={sel} class="sr-only" {...$$restProps} multiple={true}>
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
