<script lang="ts">
	import { Builder, normalize, uniqid } from '@forewind/util';
	import type { PickElement } from '$lib/types';
	import themeStore, { Input } from '$lib';
	import { onDestroy, setContext } from 'svelte';
	import { createCustomEvent, fuzzyFull } from '../_utils';
	import { fade } from 'svelte/transition';
	import ComboboxOption from './option/Component.svelte';
	import type { ComboboxContext, ListItem, ComboboxItem } from './types';
	import { useListController, type ListStore } from '../_hooks';

	type ElementProps = PickElement<'div', 'size'>;
	type InputProps = PickElement<'input', 'size'>;
	type Defaults = typeof defaults & ElementProps;

	type T = $$Generic<ComboboxItem>;
	type S = $$Generic<ListItem>;

	interface $$Props extends Defaults {
		controller?: ListStore<T>;
		escapable?: boolean;
		navigatable?: boolean;
		animate?: number;
		threshold?: number;
		icons?: boolean;
		items?: S[];
		valueProp?: S extends string ? never : keyof S;
		keyProp?: S extends string ? never : keyof S;
		onSelected?: (item: S | null) => void;
		onFilter?: (query: string) => Promise<T[]>;
		onMatch?: (selected: T | null, row: T) => boolean;
		setInput?: (value: string) => void;
		register?: (cb: (input: HTMLInputElement) => void) => void;
	}

	const { components, palette } = $themeStore;
	const combobox = normalize(components.combobox.main, palette);

	const b = new Builder(combobox, palette);
	const bw = new Builder(components.combobox.wrapper);
	const bb = new Builder(components.combobox.button);
	const bl = new Builder(components.combobox.ul);

	const defaults = b.defaults({
		base: true,
		size: 'md',
		variant: 'filled'
	});

	export let id = uniqid() as InputProps['id'];
	export let value = '' as InputProps['value'];
	export let name = '' as InputProps['name'];
	export let placeholder = '' as InputProps['placeholder'];
	export let type = 'text' as InputProps['type'];
	export let disabled = false as InputProps['disabled'];
	export let required = false as InputProps['required'];
	export let minlength = null as InputProps['minlength'];
	export let maxlength = null as InputProps['minlength'];
	export let min = null as InputProps['min'];
	export let max = null as InputProps['max'];
	export let pattern = null as InputProps['pattern'];
	export let step = null as InputProps['step'];
	export let autofocus = null as InputProps['autofocus'];
	export let autocomplete = null as InputProps['autocomplete'];

	export let icons = true;
	export let escapable = true;
	export let navigatable = true;
	export let newable = false;
	export let animate = 50;
	export let items = [] as S[];
	export let base = defaults.base;
	export let rounded = defaults.rounded;
	export let shadow = defaults.shadow;
	export let ringed = defaults.ringed;
	export let size = defaults.size;
	export let full = defaults.full;
	export let variant = defaults.variant || 'filled';
	export let theme = defaults.theme;
	export let hovered = defaults.hovered;
	export let transition = defaults.transition;
	export let transform = defaults.transform;
	export let weight = defaults.weight;

	export let valueProp = 'value';
	export let keyProp = 'key';

	// Normalize items.
	const initialItems = items.reduce((a, i) => {
		if (i === null || Array.isArray(i) || (typeof i !== 'string' && typeof i !== 'object'))
			return a;
		let obj = (typeof i === 'string' ? { key: i, value: i } : { ...i }) as ComboboxItem<S>;
		if (typeof i === 'object') { // map label and value to user defined keys.
			if (valueProp)
				obj.value = i[valueProp];
			if (keyProp)
				obj.key = i[keyProp];
		}
		obj.source = i;
		a = [...a, obj as T];
		return a;
	}, [] as T[]) as T[];

	const initialValue = value === '' || typeof value === 'undefined' ? null : initialItems.find(v => v.value === value) || null;

	export let controller = useListController<T>(initialItems, initialValue);
	export let threshold = 2;

	let input: HTMLInputElement | undefined;
	let ul: HTMLUListElement | undefined;

	const itemsStore = controller.items;
	const selectedStore = controller.selected;
	const activeStore = controller.active;

	export let onSelected = (item: S | null) => {};

	export let onMatch = (v: T | null, row: T) => {
		if (v?.value === 'null' || typeof v?.value === 'undefined') 
			return false;
		return v.value === row.value;
	};

	export let onFilter = async (query: string) => {
		const filtered = await controller.filter((item) => {
			const result = fuzzyFull(query, item.value, { threshold });
			if (result.score === 10)
				handleSelect(item.key, false); // if exact match select it.
			return result.match;
		});
		return filtered;
	};

	export const setInput = (v: string) => {
		if (input)
			input.value = v;
	};

	export const register = (cb: (input?: HTMLInputElement) => void) => cb(input);

	const unsubSelected = selectedStore.subscribe((selectedItem) => {
		if (!input || selectedItem === null) return;
		onSelected(selectedItem.source as S);
		input.value = selectedItem.value;
	});

	const navCodes = ['ArrowUp', 'ArrowDown', 'Escape', 'Enter'] as const;

	const handleSelect = (key?: string | null, close = false) => {
		const item = controller.getByKey(key);
		if (item) {
			controller.select(item);
			controller.activate(item);
		}
		if (close)
			expanded = false;
	};

	const addItem = (item: T) => {
		controller.add({ ...item, source: item.value });
		// When user manually adds options, check if is selected.
		if (item.value === value) 
			handleSelect(item.key);
	};
 
	const context: ComboboxContext<T> = {
		base,
		theme,
		size,
		shadow,
		transform,
		weight,
		icons,
		controller,
		addItem,
		onMatch,
		handleSelect
	};

	setContext('Combobox', context);

	const wrapperClasses = bw.addFeature('base', base).addFeature('full', full).bundle();

	const buttonClasses = bb.addFeature('base', base).bundle();

	const ulClasses = bl
		.addFeature('base', base)
		.addFeature('size', size)
		.addFeature('rounded', rounded)
		.addVariant('default', theme)
		.bundle();

	const inputProps = {
		id,
		type,
		name,
		placeholder,
		min,
		max,
		autofocus,
		autocomplete,
		minlength,
		maxlength,
		disabled,
		required,
		pattern,
		step,
		variant,
		shadow,
		ringed,
		size,
		base,
		theme,
		rounded,
		transition,
		hovered,
		full: true
	};

	// Event Handling

	let expanded = false;

	const clickOutside = createCustomEvent('click', 'click_outside', (e, n) => {
		return (n && !n.contains(e.target) && !e.defaultPrevented && expanded);
	});

	// When navigating disable cursor/pointer events.
	function toggleCursor(el: HTMLElement | undefined, enable: boolean) {
		el?.childNodes.forEach(n => {
			const node = n as HTMLLIElement;
			if (node && node.style) {
				node.style.cursor = enable ? 'default' : 'none';
				node.style.pointerEvents = enable ? 'auto' : 'none';
			}
		});
	}

	// Event listener to pause the mouse
	// used when navigating with keyboard events..
	function pauseMouse() {
		let unsub: () => void;
		const handler = () => unsub();
		const initListener = () => {
			if (typeof document === 'undefined') return () => {};
			toggleCursor(ul, false);
			document.body.addEventListener('mousemove', handler, true);
			return () => {
				toggleCursor(ul, true);
				document.body.removeEventListener('mousemove', handler, true);
			};
		};
		unsub = initListener();
		return unsub;
	}

	function handleExpand(e?: Event) {
		expanded = !expanded;
		if (!expanded) handleExit();
	}

	function handleExit() {
		expanded = false;
		// new items not permitted, reset to 
		// the selected value.
		if (!newable) { 
			if (input)
				input.value =  $selectedStore?.value || '';
			if (!controller.getByKey($selectedStore?.key)) 
				controller.unfilter(); // if exiting without value in list.
			handleSelect($selectedStore?.key, true);
		}
		else {
			const inputValue = input?.value || '';
		}
	}

	function handleOutsideClick(e: Event) {
		handleExit();
	}

	function handleNavigate(code: 'ArrowUp' | 'ArrowDown') {
		let currentIndex = controller.getActiveIndex();
		if (currentIndex === -1)
			currentIndex = controller.getSelectedIndex();
		const next = code === 'ArrowUp' ? Math.max(0, currentIndex - 1) : currentIndex + 1;
		if (next >= 0 && next <= $itemsStore.length - 1)
			controller.activateByIndex(next);
		pauseMouse();
	}

	function handleKeyDown(e: KeyboardEvent) {
		const code = e.key as typeof navCodes[number];
		if (navCodes.includes(code) && expanded && !e.repeat) {
		if (code === 'Escape' && escapable) {
			handleOutsideClick(e);
		}
		else if (code === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
			handleSelect($activeStore?.key, true);
		}
		else if (navigatable && (code === 'ArrowDown' || code === 'ArrowUp'))
			handleNavigate(code);
		}
	}

	function handleInputChange(e: Event & { currentTarget: Partial<HTMLInputElement> | null }) {
		if ($itemsStore.length)
			expanded = true;
		const val =(e.currentTarget?.value || '').trim();
		if (!val.length || (!$itemsStore.length && initialItems.length)){
			controller.unfilter();
			return;
		}
		onFilter(val);
		// setTimeout(() => input?.focus());
	}

	function handleInputKeyDown(e: KeyboardEvent) {
		if (e.repeat) return;
		if (e.key === 'ArrowDown' && $itemsStore.length)
			expanded = true;
		if (e.key === 'Tab') 
			handleExit();
	}
	onDestroy(() => unsubSelected);
</script>

<div
	class={wrapperClasses}
	use:clickOutside
	on:click_outside={handleOutsideClick}
	on:keydown={handleKeyDown}
>
	<slot name="input">
		<Input
			{...inputProps}
			ref={(e) => (input = e)}
			role="combobox"
			aria-placeholder={placeholder}
			aria-controls="options"
			aria-expanded={expanded}
			class={$$restProps.class}
			bind:value
			on:input
			on:blur
			on:change
			on:click
			on:focus
			on:keydown
			on:keypress
			on:keyup
			on:mouseenter
			on:mouseleave
			on:mouseover
			on:paste
			on:input={handleInputChange}
			on:keydown={handleInputKeyDown}
		/>
	</slot>

	<slot name="button">
		<button type="button" class={buttonClasses} on:click={handleExpand}>
			<svg
				class="h-5 w-5 text-gray-400"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</slot>
		<ul
			bind:this={ul}
			in:fade={{ duration: animate }}
			out:fade={{ duration: animate }}
			hidden={!expanded}
			id="option"
			class={ulClasses}
			role="listbox"
		>
			<slot>
				{#each $itemsStore as item}
					<ComboboxOption { ...item } add={false} />
				{/each}
			</slot>
		</ul>

</div>
