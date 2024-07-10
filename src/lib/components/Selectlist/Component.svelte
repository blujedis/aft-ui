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
	import { onMount, setContext, tick } from 'svelte';
	import { cleanObj, createCustomEvent, ensureArray, isArrayEqual } from '$lib/utils';
	import { dequal } from 'dequal';

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
		tagsTheme,
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

	let mounted = false;
	let removing = false;
	let selecting = false;

	if (newable) tags = true;
	if (removable) tags = true;
	if (min) tags = true;
	if (max) tags = true;

	const store = useSelect({
		visible,
		selected: ensureArray(value),
		min,
		max,
		mode: tags ? 'multiple' : 'single-array',
		newItems: undefined,
		items: [],
		filtered: [],
		persisted: [],
		onChange: onChangeHandler
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
		name: $$restProps.name,
		newable,
		removable,
		placeholder,
		recordless,
		rounded,
		shadowed,
		size,
		tags,
		tagsTheme,
		theme,
		variant,
		transitioned,
		onBeforeAdd,
		onBeforeRemove
	});

	const { class: classes, ...restProps } = $$restProps;

	const context = setContext('SelectListContext', {
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

	$: {
		if (mounted && (typeof value === 'undefined' || !value?.length)) {
			if (tags && !value.length) store.update((s) => ({ ...s, selected: value }));
			setLabel();
		} else if (mounted && $context.input && !$context.input.value && !tags && !filterable) {
			setLabel(value);
		} else if (mounted && tags && !selecting && !filterable) {
			if (!isArrayEqual(value, $store.selected)) {
				if (!removing) {
					store.update((s) => ({ ...s, selected: [...value] }));
				} else {
					value = $store.selected;
				}
			}
			if (!removing && (value === null || !value?.length)) {
				store.update((s) => ({ ...s, selected: [] }));
			}
		}
		if (!removing && !selecting) {
			$store.items = [];
			items.forEach((i) => add({ ...i }));
			if (!items.length) {
				$store.filtered = [];
				$store.selected = [];
			}
		}
		// else if (
		// 	mounted &&
		// 	tags &&
		// 	!selecting &&
		// 	!filterable &&
		// 	!isArrayEqual(value, $store.selected)
		// ) {
		// 	console.log(value, $store.selected);
		// 	if (!removing) {
		// 		store.update((s) => ({ ...s, selected: [...value] }));
		// 	} else {
		// 		value = $store.selected;
		// 	}
		// } else if (
		// 	mounted &&
		// 	tags &&
		// 	!selecting &&
		// 	!filterable &&
		// 	!removing &&
		// 	(value === null || !value?.length)
		// ) {
		// 	store.update((s) => ({ ...s, selected: [] }));
		// }
	}

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

	function onChangeHandler(selected: any) {
		const changedValue = tags ? selected : selected[0];
		value = changedValue;
		if (!value.length) setLabel(); // if not value update the input which display label.
		if (typeof onChange === 'function') onChange(changedValue);
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

	function getItem(itemOrKey: Item | SelectListItemKey) {
		if (typeof itemOrKey === 'object' && typeof itemOrKey.value !== 'undefined')
			return itemOrKey as Item;
		return items.find((v) => v.value === itemOrKey) as Item;
	}

	function restore(
		selectedItemsOrRestoreInput?: SelectListItemKey | SelectListItemKey[] | boolean,
		restoreInput?: boolean | null,
		force = false
	) {
		if (typeof selectedItemsOrRestoreInput === 'boolean') {
			restoreInput = selectedItemsOrRestoreInput;
			selectedItemsOrRestoreInput = undefined;
		}

		if (!$context.filtering && !force) {
			return;
		}

		const normalizedItems =
			typeof selectedItemsOrRestoreInput !== 'undefined'
				? ensureArray(selectedItemsOrRestoreInput)
				: !tags
					? $context.persisted
					: $context.selected;

		if ($context.input) {
			if (restoreInput) {
				if (!tags) {
					const label = $context.items.find((i) => $context.persisted.includes(i.value))?.label;
					if (label) $context.input.value = label || '';
				} else {
					$context.input.value = '';
				}
			} else if (force) {
				if (!tags && normalizedItems.length) {
					$context.input.value =
						$context.items.find((i) => i.value === normalizedItems[0])?.label || '';
				}
			}
		}

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

	export function isSelected(itemOrKey: Item | SelectListItemKey) {
		const item = getItem(itemOrKey);
		const selected = $store.selected.includes(item?.value);
		return selected;
	}

	export function setLabel(itemOrKey?: Item | SelectListItemKey) {
		const item = !itemOrKey ? null : getItem(itemOrKey);
		if ($context.input) {
			if (item && !tags) $context.input.value = item.label as string;
			else if (!item) $context.input.value = '';
		}
	}

	export function open() {
		store.update((s) => ({ ...s, visible: true }));
	}

	export function close() {
		store.update((s) => ({ ...s, visible: false }));
	}

	export function toggle() {
		if ($context.visible) close();
		else open();
	}

	export function add({ value, label, group, selected }: Item) {
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

	export async function select(itemOrKey: Item | SelectListItemKey) {
		selecting = true;
		const item = getItem(itemOrKey);
		setLabel(item);
		store.select(item.value);
		if (exclusive) filter('');
		await tick();
		selecting = false;
	}

	export async function remove(itemOrKey: Item | SelectListItemKey) {
		removing = true;
		let key = itemOrKey as SelectListItemKey;
		if (typeof itemOrKey !== 'string') key = (itemOrKey as Item).value;
		let newSelected = $store.selected || [];
		store.update((s) => {
			const filteredSelected = s.selected.filter((v: any) => v !== key);
			newSelected = filteredSelected;
			return { ...s, selected: [...filteredSelected] };
		});
		// really should breakout filter below to return only values
		// then create "filterUpdateStore" func or something.
		if (exclusive) filter('');
		await tick();
		removing = false;
		// Shouldn't have to call this. Need to provide multi-record
		// update in the useSelect helper.
		onChangeHandler(newSelected);
	}

	export async function filter(query?: string) {
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

	onMount(() => {
		mounted = true;
	});
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
				{groups}
				open={context.open}
				close={context.close}
				toggle={store.toggle}
				select={store.select}
			/>
		</div>

		<!-- Select cannot have a dynamic "multiple when using bind."-->
		<slot name="select">
			{#if tags}
				<select tabindex="-1" class="sr-only" multiple {...restProps} bind:value>
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
			{:else}
				<select tabindex="-1" class="sr-only" {...restProps} bind:value>
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
			{/if}
		</slot>
	</div>
</div>
