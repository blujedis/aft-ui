<script>
	import { dropdownDefaults as defaults } from './module';
	import themeStore, { themer } from '../..';
	import { useDisclosure } from '../../stores';
	import { createCustomEvent, ensureArray } from '../../utils';
	import { setContext } from 'svelte';
	export let {
		autoclose,
		disabled,
		escapable,
		focused,
		focustrap,
		full,
		mode,
		rounded,
		selected,
		shadowed,
		size,
		items,
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
	};
	export const store = useDisclosure({
		visible,
		selected: ensureArray(selected),
		items: [],
		filtered: []
	});
	export const context = setContext('Dropdown', {
		...store,
		add,
		remove,
		isSelected,
		mode,
		select,
		trigger,
		unselect,
		globals: {
			disabled,
			focused,
			full,
			multiple: mode === 'multiselect',
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
	let selref;
	const th = themer($themeStore);
	$: groups = $store.items.reduce((a, c) => {
		if (!c.group) return a;
		a[c.group] = a[c.group] || [];
		a[c.group].push(c);
		return a;
	}, {});
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
	function handleClose(e) {
		store.close();
	}
	function handleKeydown(e) {
		if (!e.repeat && e.key === 'Escape' && escapable) {
			store.close();
		}
	}
	function normalizeItem({ value, label, group }) {
		if (typeof label === 'undefined') label = value + '';
		group = group || '';
		return {
			value,
			label,
			group
		};
	}
	function add(value, label, group) {
		if (typeof label === 'undefined') label = value + '';
		group = group || '';
		const hasValue = $store.items.find((item) => item.value === value);
		if (!hasValue) {
			store.update((s) => {
				const items = [...s.items, { value, label, group }];
				return {
					...s,
					items,
					filtered: [...items]
				};
			});
		}
	}
	function remove(value) {
		store.update((s) => {
			const filteredItems = s.items.filter((i) => value !== i.value);
			const filteredSelected = s.selected.filter((v) => v !== value);
			return { ...s, items: filteredItems, selected: filteredSelected };
		});
	}
	function select(key) {
		if (typeof key === 'undefined') return;
		store.update((s) => {
			let keys = [];
			if (['multiselect', 'tags'].includes(mode))
				keys = s.selected.includes(key) ? s.selected : [key, ...s.selected];
			else keys = [key];
			return { ...s, selected: keys };
		});
	}
	function unselect(key) {
		if (typeof key === 'undefined') return;
		store.update((s) => {
			return { ...s, selected: s.selected.filter((v) => v !== key) };
		});
	}
	function isSelected(key) {
		if (typeof key === 'undefined') return false;
		return $store.selected.includes(key);
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
</script>

<div
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
			{...$$restProps}
			multiple={['multiselect'].includes(mode)}
			class="sr-only"
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
