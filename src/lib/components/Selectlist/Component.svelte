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
	import { cleanObj, createCustomEvent, ensureArray } from '$lib/utils';

	type Item = $$Generic<SelectListItem>;
	type $$Props = SelectListProps<Item> & Omit<ElementProps<'select'>, 'size'>;

	export let {
		autoclose,
		badgeProps,
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
			filtered: [],
			persisted: []
		})) as SelectStore<SelectListStore<Item>>;

	const globals = cleanObj({
		badgeProps,
		disabled,
		filterable,
		full,
		focused,
		hovered,
		newable: multiple ? newable : false,
		multiple,
		placeholder,
		removable: multiple ? removable : false,
		rounded,
		shadowed,
		size,
		theme,
		variant,
		transitioned,
		onBeforeAdd,
		onBeforeRemove
	});

	const { class: classes, ...restProps } = $$restProps;

	export const context = setContext('SelectListContext', {
		...store,
		open,
		close,
		isSelected,
		add,
		toggle,
		remove,
		restoreSelected,
		filter,
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
		.prepend('select-list', true)
		.append('relative not-sr-only inline-flex', true)
		.append('w-full', full)
		.append(classes, true)
		.compile();

	function open() {
		store.update((s) => ({ ...s, visible: true }));
	}

	function close() {
		store.update((s) => ({ ...s, visible: false }));
	}

	function toggle() {
		if ($context.visible) close();
		else open();
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

	async function resolveItems(query?: string) {
		if (!query) return $context.items as Required<Item>[];
		return Promise.resolve(
			initFilter(
				query,
				$context.items as Required<Item>[],
				$context.selected as SelectListItemKey[]
			)
		);
	}

	async function filter(query?: string) {
		const filtered = await resolveItems(query);
		const filteredValue = !query ? [] : filtered[0] ? [filtered[0].value] : [];
		store.update((s) => {
			return {
				...s,
				filtered: [...filtered],
				selected: multiple ? s.selected : filtered.length ? filteredValue : []
			};
		});
	}

	function isSelected(itemOrKey: Item | SelectListItemKey) {
		let key = itemOrKey as SelectListItemKey;
		if (typeof itemOrKey !== 'string') key = (itemOrKey as Item).value;
		return $store.selected.includes(key);
	}

	function restoreSelected(
		selectedItemsOrRestoreInput?: SelectListItemKey | SelectListItemKey[] | boolean,
		restoreInput?: boolean
	) {
		if (!$context.filtering) return;

		if (typeof selectedItemsOrRestoreInput === 'boolean') {
			restoreInput = selectedItemsOrRestoreInput;
			selectedItemsOrRestoreInput = undefined;
		}

		if ($context.input && restoreInput) {
			if (!multiple) {
				const label = $context.items.find((i) => $context.persisted.includes(i.value))?.label;
				if (label) $context.input.value = label || '';
			} else {
				$context.input.value = '';
			}
		}

		const normalizedItems =
			typeof selectedItemsOrRestoreInput !== 'undefined'
				? ensureArray(selectedItemsOrRestoreInput)
				: !multiple
					? $context.persisted
					: $context.selected;

		store.update((s) => {
			return {
				...s,
				filtered: [...s.items],
				selected: [...(normalizedItems as SelectListItemKey[])],
				persisted: [],
				filtering: false
			};
		});
	}

	function handleClose(_e?: Event) {
		context.close();
	}

	const clickOutside = createCustomEvent('click', 'click_outside', (e, n) => {
		if (multiple) {
			restoreSelected(true);
		} else if (!multiple && filterable) {
			if ($context.input && $context.filtering) {
				restoreSelected(true);
			}
		}
		return (
			(n && !n.contains(e.target) && !e.defaultPrevented && autoclose && $store.visible) || false
		);
	});

	function handleKeydown(e: KeyboardEvent) {
		if ((e.key === 'Escape' && escapable) || (e.key === 'Tab' && $store.visible)) {
			e.preventDefault();
			restoreSelected(true);
			context.close();
			setTimeout(() => {
				$context.input?.focus();
			});
		} else if (e.key === 'ArrowDown') {
			if (!$context.visible) {
				context.open();
				$context.input?.focus();
			}
		}
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
				selectedItems={$store.selected}
				filtered={$store.filtered}
				filtering={$store.filtering}
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
