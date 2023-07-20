<script lang="ts">
	import {
		type MultiselectControllerProps,
		multiselectControllerDefaults as defaults,
		type MultiselectControllerContext,
		type MultiselectControllerStore,
		type MultiselectItem,
		type MultiselectItemKey
	} from './module';
	import themeStore, { themer, useSelect, type SelectStore } from '$lib';
	import type { ElementProps } from '../../types';
	import { setContext } from 'svelte';
	import { cleanObj, createCustomEvent } from '$lib/utils';

	type Item = $$Generic<MultiselectItem>;
	type $$Props = MultiselectControllerProps<Item> & Omit<ElementProps<'select'>, 'size'>;

	export let {
		autoclose,
		escapable,
		items,
		filter: initFilter,
		full,
		multiple,
		placeholder,
		rounded,
		shadowed,
		size,
		store: initStore,
		strategy,
		tags,
		theme,
		underlined,
		variant,
		visible
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
		})) as SelectStore<MultiselectControllerStore<Item>>;

	const th = themer($themeStore);
	let div: HTMLDivElement;
	let sel: HTMLSelectElement;

	const globals = cleanObj({
		full,
		multiple,
		placeholder,
		rounded,
		shadowed,
		size,
		strategy,
		tags,
		theme,
		underlined,
		variant
	});

	export const context = setContext('MultiselectContext', {
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
	}) as MultiselectControllerContext;

	$: groups = $store.items.reduce((a, c) => {
		if (!c.group) return a;
		a[c.group] = a[c.group] || [];
		a[c.group].push(c as Required<Item>);
		return a;
	}, {} as Record<string, Required<Item>[]>);

	$: groupKeys = Object.keys(groups);

	$: dropdownClasses = th
		.create('MultiselectController')
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

	function remove(itemOrKey: Item | MultiselectItemKey) {
		let key = itemOrKey as MultiselectItemKey;
		if (typeof itemOrKey !== 'string') key = (itemOrKey as Item).value;
		store.update((s) => {
			const filteredItems = s.items.filter((i) => key !== i.value);
			const filteredSelected = s.selected.filter((v) => v !== key);
			return { ...s, items: filteredItems, selected: filteredSelected };
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

	function reset(selectedItems = [] as MultiselectItemKey[]) {
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

	function isSelected(itemOrKey: Item | MultiselectItemKey) {
		let key = itemOrKey as MultiselectItemKey;
		if (typeof itemOrKey !== 'string') key = (itemOrKey as Item).value;
		return $store.selected.includes(key);
	}

	items.forEach((item) => add(item));
</script>

<div
	role="none"
	bind:this={div}
	{...$$restProps}
	use:clickOutside
	on:click_outside={handleClose}
	on:keydown={handleKeydown}
	class={dropdownClasses}
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
