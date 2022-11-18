<script lang="ts">
	import { Builder, normalize, uniqid } from '@forewind/util';
	import type { PickElement } from '$lib/types';
	import themeStore, { Input } from '$lib';
	import { onDestroy, setContext } from 'svelte';
	import { createCustomEvent, fuzzyFull } from '../_utils';
	import { fade } from 'svelte/transition';
	import ComboboxOption from './option/Component.svelte';
	import type { ComboboxContext } from './types';
	import { createList, type ListStore } from './store';
	import { getProperty } from 'dot-prop';
	import { writable } from 'svelte/store';

	type ElementProps = PickElement<'div', 'size'>;
	type InputProps = PickElement<'div', 'size'>;
	type Defaults = typeof defaults & ElementProps;

	type T = $$Generic<string | Record<string, any>>;

	interface $$Props extends Defaults {
		controller?: ListStore<T>;
		escapable?: boolean;
		navigatable?: boolean;
		animate?: number;
		threshold?: number;
		icons?: boolean;
		items?: T[];
		onSelected?: (item: T | null) => void;
		onFilter?: (query: string) => Promise<T[]>;
		onMatch?: (selected: T | null, row: T) => boolean;
		getValue?: (item: T | null) => string;
		getLabel?: (item: T | null) => string;
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
		variant: 'filled',
		theme: ''
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
	export let animate = 50;
	export let items = [] as T[];
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

	export let controller = createList<T>(items, value);
	export let threshold = 2;

	let input: HTMLInputElement;
	const itemsStore = controller.items;
	const selectedStore = controller.selected;
	const activeStore = controller.active;

	export let getValue = (v: T | null) => pickProp(v, 'value');

	export let getLabel = (v: T | null) => pickProp(v, 'label', 'value');

	export let onSelected = (item: T | null) => {};

	export let onMatch = (v: T | null, row: T) => {
		const matchValue = getValue(v);
		const rowValue = getValue(row);
		if (!matchValue.length || !rowValue.length) return false;
		return matchValue.toLowerCase() === rowValue.toLowerCase();
	};

	export const handleSelect = (item: T | null, close = false, e?: MouseEvent | TouchEvent) => {
		controller.select(item);
		if (close) expanded = false;
		// else if (activeNode) 
		// 	activeNode.focus();
	};

	export let onFilter = async (query: string) => {
		const filtered = await controller.filter((item) => {
			const result = fuzzyFull(query, getValue(item), { threshold });
			if (result.score === 10)
				handleSelect(item, false); // if exact match select it.
			return result.match;
		});
		return filtered;
	};

	export const setInput = (v: string) => (input.value = v);

	export const register = (cb: (input: HTMLInputElement) => void) => cb(input);

	const unsubSelected = selectedStore.subscribe((selectedItem) => {
		onSelected(selectedItem);
		if (input) 
			input.value = getValue(selectedItem);
	});

	const navCodes = ['ArrowUp', 'ArrowDown', 'Escape'];

	let ul: HTMLUListElement;
	let expanded = false;
	let nodes = [] as HTMLLIElement[];
	let activeNode = null as HTMLLIElement | null;

	$: expanded && ul && parseNodes();
	$: !expanded && parseNodes();
 
	const context: ComboboxContext<T> = {
		base,
		theme,
		size,
		shadow,
		transform,
		weight,
		icons,
		controller,
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
		hovered
	};


	// Event Handling

	// let hooks: Array<any> = [];
  // let idx: number = 0;
	// function nextTick(cb: () => void, deps: any[]) {
	// 	const oldDeps = hooks[idx];
  //   let hasChanged = true;
  //   if (oldDeps) {
  //     hasChanged = deps.some((dep, i) => !Object.is(dep, oldDeps[i]));
  //   }
  //   hooks[idx] = deps;
  //   idx++;
  //   if (hasChanged) cb();
	// }

	function handleFocus(e: FocusEvent) {}

	function handleKeyup(e: KeyboardEvent) {}

	const clickOutside = createCustomEvent('click', 'click_outside', (e, n) => {
		return n && !n.contains(e.target) && !e.defaultPrevented;
	});

	function pickProp(item: string | Record<string, any> | null, ...keys: string[]): string {
		if (item === null) return '';
		if (typeof item === 'string') return item;
		return keys.reduce((a, c) => {
			if (a) return a;
			const lookup = getProperty(item, c);
			if (typeof lookup !== 'undefined' && (lookup + '').length > 0) return lookup + '';
			return a;
		}, '');
	}

	function toggleCursor(enable: boolean) {
		nodes.forEach((n) => {
			n.style.cursor = enable ? 'default' : 'none';
			n.style.pointerEvents = enable ? 'auto' : 'none';
		});
	}

	function pauseMouse() {
		let unsub: () => void;
		const handler = () => unsub();
		const initListener = () => {
			if (typeof document === 'undefined') return () => {};
			toggleCursor(false);
			document.body.addEventListener('mousemove', handler, true);
			return () => {
				toggleCursor(true);
				document.body.removeEventListener('mousemove', handler, true);
			};
		};
		unsub = initListener();
		return unsub;
	}

	function handleExpand(e?: Event) {
		expanded = !expanded;
	}

	function handleOutsideClick(e?: Event) {
		expanded = false;
	}

	function parseNodes() {
		if (!expanded) {
			nodes = [];
			if (!(input?.value || '').length) controller.unfilter();
			return;
		}
		if (nodes.length || !ul?.childNodes) return;
		let i = 0;
		for (const n of ul.childNodes) {
			const node = n as HTMLLIElement;
			if (node?.tagName !== 'LI') continue;
			const isSelected = node.dataset?.selected === 'true';
			if (isSelected) {
				activeNode = node;
				// node.focus();
			}
			i++
			nodes.push(node);
		}
	}

	function getNodeIndex(node: HTMLLIElement | null) {
		if (!node) return -1;
		return nodes.indexOf(node);
	}

	function handleNavigate(code: 'ArrowUp' | 'ArrowDown') {
		const currentIndex = getNodeIndex(activeNode);
		let next = 0;
		next = code === 'ArrowUp' ? Math.max(0, currentIndex - 1) : currentIndex + 1;
		if (next >= 0 && next <= nodes.length - 1) {
			activeNode = nodes[next];
			// activeNode?.focus();
		}
		pauseMouse();
	}

	function handleKeyDown(e: KeyboardEvent) {
		const code = e.key;
		if (e.repeat || !expanded || !navCodes.includes(code)) return;
		if (code === 'Escape' && escapable) {
			handleOutsideClick();
		} else if (navigatable) {
			handleNavigate(code as any);
		}
	}

	function handleInputChange(e: Event & { currentTarget: Partial<HTMLInputElement> | null }) {
		expanded = true;
		const val = e.currentTarget?.value || '';
		if (val.length) {
			if (!$itemsStore.length) controller.unfilter();
			onFilter(val);
		}
	}
	function handleInputKeyDown(e: KeyboardEvent) {
		if (e.repeat) return;
		if (e.key === 'ArrowDown' && $itemsStore.length) 
			expanded = true;
		if (e.key === 'Tab')
			console.log('tabbed');
	}

	function handleMouseOver(e: MouseEvent) {
		const node = e.target as HTMLLIElement;
		if (node.nodeName === 'LI') {
			//node.focus();
			activeNode = node;
			
		}
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
			full={true}
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

	{#if expanded && $itemsStore.length}
		<ul
			bind:this={ul}
			in:fade={{ duration: animate }}
			out:fade={{ duration: animate }}
			id="option"
			class={ulClasses}
			role="listbox"
			on:mouseover={handleMouseOver}
			on:focus={handleFocus}
			on:keyup={handleKeyup}
		>
			<slot>
				{#each $itemsStore as item}
					<ComboboxOption label={getLabel(item)} value={item} class="" />
				{/each}
			</slot>
		</ul>
	{/if}
</div>
