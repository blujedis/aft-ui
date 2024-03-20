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
	type $$Props = SelectListProps<Item> & Omit<ElementProps<'select'>, 'size' | 'multiple'>;

	export let {
		autoclose,
		badgeProps,
		disabled,
		escapable,
		exclusive,
		items,
		filterable,
		filter: initFilter,
		full,
		focused,
		hovered,
		min,
		max,
		newable,
		placeholder,
		recordless,
		removable,
		rounded,
		shadowed,
		size,
		tags,
		theme,
		value,
		variant,
		visible,
		transitioned,
		onBeforeAdd,
		onBeforeRemove,
		onChange
	} = {
		...(defaults as any) // TODO: fix/review types here.
	} as Required<$$Props>;

	if (newable) tags = true;
	if (removable) tags = true;
	if (min) tags = true;
	if (max) tags = true;

	export const store = useSelect({
		visible,
		selected: ensureArray(value),
		min,
		max,
		mode: tags ? 'multiple' : 'single-array',
		items: [],
		filtered: [],
		persisted: [],
		onChange: (selected) => {
			const changedValue = tags ? selected : selected[0];
			value = changedValue;
			if (typeof onChange === 'function') onChange(changedValue);
		}
	}) as SelectStore<SelectListStore<Item>>;

	const globals = cleanObj({
		badgeProps,
		disabled,
		exclusive,
		filterable,
		full,
		focused,
		hovered,
		min,
		max,
		newable,
		removable,
		placeholder,
		recordless,
		rounded,
		shadowed,
		size,
		tags,
		theme,
		variant,
		transitioned,
		onBeforeAdd,
		onBeforeRemove
	});

	const { class: classes, ...restProps } = $$restProps;

	export const context = setContext('SelectListContext', {
		...store,
		isSelected,
		add,
		select,
		remove,
		filter,
		restore,
		open,
		close,
		toggle,
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

	function isSelected(itemOrKey: Item | SelectListItemKey) {
		let key = itemOrKey as SelectListItemKey;
		if (typeof itemOrKey !== 'string') key = (itemOrKey as Item).value;
		return $store.selected.includes(key);
	}

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
					// if (selected && selectedItems.length && multiple) selectedItems.push(value);
					// else selectedItems = [value];
					if (tags) selectedItems.push(value);
					else selectedItems = [value];
				}
				const filteredItems = !exclusive
					? items
					: items.filter((v) => !selectedItems.includes(v.value));
				return {
					...s,
					items,
					filtered: filteredItems, // [...items],
					selected: selectedItems
				};
			});
		}
	}

	function setLabel(item: Required<Item>) {
		if (tags && $context.input) {
			//
		}
		else if ($context.input) {
			$context.input.value = item.label;
		}
	}

	function select(itemOrKey: Item | SelectListItemKey) {
		let key = itemOrKey as SelectListItemKey;
		if (typeof itemOrKey !== 'string') key = (itemOrKey as Item).value;

		store.select(key);
		if (exclusive) filter('');
	}

	function remove(itemOrKey: Item | SelectListItemKey) {
		let key = itemOrKey as SelectListItemKey;
		if (typeof itemOrKey !== 'string') key = (itemOrKey as Item).value;
		store.update((s) => {
			const filteredSelected = s.selected.filter((v: any) => v !== key);
			return { ...s, selected: filteredSelected };
		});
		// really should breakout filter below to return only values
		// then create "filterUpdateStore" or something.
		if (exclusive) filter('');
	}

	function restore(
		selectedItemsOrRestoreInput?: SelectListItemKey | SelectListItemKey[] | boolean,
		restoreInput?: boolean
	) {
		if (!$context.filtering) return;

		if (typeof selectedItemsOrRestoreInput === 'boolean') {
			restoreInput = selectedItemsOrRestoreInput;
			selectedItemsOrRestoreInput = undefined;
		}

		if ($context.input && restoreInput) {
			if (!tags) {
				const label = $context.items.find((i) => $context.persisted.includes(i.value))?.label;
				if (label) $context.input.value = label || '';
			} else {
				$context.input.value = '';
			}
		}

		const normalizedItems =
			typeof selectedItemsOrRestoreInput !== 'undefined'
				? ensureArray(selectedItemsOrRestoreInput)
				: !tags
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

	async function filter(query?: string) {
		let filtered = await resolveItems(query);
		const filteredValue = !query ? [] : filtered[0] ? [filtered[0].value] : [];
		store.update((s) => {
			filtered = !exclusive ? filtered : filtered.filter((v) => !s.selected.includes(v.value));
			return {
				...s,
				filtered: [...filtered],
				selected: tags ? s.selected : filtered.length ? filteredValue : []
			};
		});
	}

	function handleClose(_e?: Event) {
		context.close();
	}

	const clickOutside = createCustomEvent('click', 'click_outside', (e, n) => {
		if (tags) {
			restore(true);
		} else if (!tags && filterable) {
			if ($context.input && $context.filtering) {
				restore(true);
			}
		}
		return (
			(n && !n.contains(e.target) && !e.defaultPrevented && autoclose && $store.visible) || false
		);
	});

	function handleKeydown(e: KeyboardEvent) {
		if ((e.key === 'Escape' && escapable) || (e.key === 'Tab' && $store.visible)) {
			e.preventDefault();
			restore(true);
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
				open={context.open}
				close={context.close}
				toggle={store.toggle}
				select={store.select}
			/>
		</div>

		<slot name="select">
			<select tabindex="-1" class="sr-only" {...restProps} multiple={tags} {value}>
				{#if groupKeys.length}
					{#each Object.entries(groups) as [group, items]}
						<optgroup>{group}</optgroup>
						{#each items as item}
							<option value={item.value}>{item.label}</option>
						{/each}
					{/each}
				{:else}
					{#each $store.items as item}
						<option value={item.value} selected={isSelected(item.value)}>{item.label}</option>
					{/each}
				{/if}
			</select>
		</slot>
	</div>
</div>
