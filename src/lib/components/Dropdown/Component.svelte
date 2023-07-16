<script lang="ts">
	import {
		type DropdownProps,
		dropdownDefaults as defaults,
		type DropdownContext,
		type DropdownKey,
		type DropdownItem
	} from './module';
	import themeStore, { themer } from '$lib';
	import { useDisclosure } from '../../stores';
	import { createCustomEvent, ensureArray } from '$lib/utils';
	import { setContext } from 'svelte';
	import type { ElementNativeProps } from '../../types';

	type Tag = $$Generic<'button' | 'a'>;
	type $$Props = DropdownProps<Tag> & ElementNativeProps<'div'>;

	export let {
		autoclose,
		disabled,
		escapable,
		filter,
		focused,
		focustrap,
		full,
		strategy,
		rounded,
		selected,
		shadowed,
		size,
		items: items,
		theme,
		transitioned,
		trigger,
		underlined,
		unstyled,
		variant,
		visible,
		selectProps
	} = {
		...defaults
	} as Required<$$Props>;

	export const store = useDisclosure({
		visible,
		selected: ensureArray(selected),
		items: [] as Required<DropdownItem>[],
		filtered: [] as Required<DropdownItem>[]
	});

	export const context = setContext<DropdownContext>('Dropdown', {
		...store,
		add,
		remove,
		isSelected,
		strategy,
		select,
		trigger,
		unselect,
		filter: filterItems,
		globals: {
			disabled,
			focused,
			full,
			multiple: strategy === 'multiselect',
			rounded,
			shadowed,
			size,
			theme,
			transitioned,
			underlined,
			variant,
			unstyled
		}
	});

	let selref: HTMLSelectElement | undefined;
	const th = themer($themeStore);

	$: groups = $store.items.reduce((a, c) => {
		if (!c.group) return a;
		a[c.group] = a[c.group] || [];
		a[c.group].push(c);
		return a;
	}, {} as Record<string, Required<DropdownItem>[]>);

	$: groupKeys = Object.keys(groups);

	$: dropdownClasses = th
		.create()
		.append('w-full', full)
		.append('relative inline-block text-left not-sr-only', true)
		.append($$restProps.class, true)
		.compile(true);

	const clickOutside = createCustomEvent('click', 'click_outside', (e, n) => {
		return (
			(n && !n.contains(e.target) && !e.defaultPrevented && autoclose && $store.visible) || false
		);
	});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function handleClose(e?: Event) {
		store.close();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!e.repeat && e.key === 'Escape' && escapable) {
			store.close();
		} else if (!e.repeat && e.key === 'Tab' && $store.visible) {
			store.close();
		}
	}

	function add({ value, label, group, selected }: DropdownItem) {
		if (typeof label === 'undefined') label = value + '';
		group = group || '';
		const hasValue = $store.items.find((item) => item.value === value);
		if (!hasValue) {
			store.update((s) => {
				const items = [...s.items, { value, label, group } as Required<DropdownItem>];
				const selectedItems =
					selected && !s.selected.includes(value) ? [...s.selected, value] : s.selected;
				return {
					...s,
					items,
					filtered: [...items],
					selected: selectedItems
				};
			});
		}
	}

	function remove(value: DropdownKey) {
		store.update((s) => {
			const filteredItems = s.items.filter((i) => value !== i.value);
			const filteredSelected = s.selected.filter((v) => v !== value);
			return { ...s, items: filteredItems, selected: filteredSelected };
		});
	}

	function select(key?: DropdownKey) {
		if (typeof key === 'undefined') return;
		store.update((s) => {
			let keys = [] as DropdownKey[];
			if (['multiselect', 'tags'].includes(strategy))
				keys = s.selected.includes(key) ? s.selected : [key, ...s.selected];
			else keys = [key];
			return { ...s, selected: keys };
		});
	}

	function unselect(key?: DropdownKey) {
		if (typeof key === 'undefined') return;
		store.update((s) => {
			return { ...s, selected: s.selected.filter((v) => v !== key) };
		});
	}

	function isSelected(key?: DropdownKey) {
		if (typeof key === 'undefined') return false;
		return $store.selected.includes(key);
	}

	function filterItems(query?: string) {
		store.update(s => {
			const newItems = !query ? [...s.items] : filter(query, s.items);
			return { ...s, filtered: newItems };
		});
	}

	store.subscribe((s) => {
		if (!selref || !s.selected.length) return;
		const options = selref.querySelectorAll('option');
		if (options?.length) {
			options.forEach((node) => {
				node.selected = false;
				if (s.selected.includes(node.value)) node.selected = true;
			});
		}
	});

	if (items?.length) items.forEach((item) => add(item));
</script>

<div
	role="presentation"
	{...$$restProps}
	use:clickOutside
	on:click_outside={handleClose}
	on:keydown={handleKeydown}
	class={dropdownClasses}
>
	<slot
		visible={$store.visible}
		selected={$store.selected}
		filtered={$store.filtered}
		{select}
		open={store.open}
		close={store.close}
		toggle={store.toggle}
	/>
	<!-- Native select is only shown for screen readers -->
	<slot name="select">
		<select
			bind:this={selref}
			class="sr-only"
			{...$$restProps}
			multiple={['multiselect'].includes(strategy)}
		>
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
