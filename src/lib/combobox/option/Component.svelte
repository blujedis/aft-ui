<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { Builder, mergeTailwind, normalize, type Palette, type TypeOrValue } from '@forewind/util';
	import themeStore from '../../init';
	import type { ComboboxContext } from '../types';

	interface LiProps {
		title?: string;
		class?: string;
		style?: string;
		dir?: 'ltr' | 'rtl' | 'auto';
		translate?: 'yes' | 'no';
		draggable?: 'true' | 'false' | 'auto';
	}

	type T = $$Generic<ComboboxItem>;

	type Defaults = typeof defaults & LiProps & T;
	type $$Props = Defaults;

	const { components, palette } = $themeStore;

	const li = normalize(components.comboboxOption.main, palette);

	const b = new Builder(li, palette);
	const bl = new Builder(components.comboboxOption.icon);
	const br = new Builder(components.comboboxOption.icon);

	const defaults = b
		.defaults({	base: true},
			['variant', 'position', 'theme']
		);

	export let add = true;
	export let value: any;
	export let key = value + '';
	
	let selected = false;
	let active = selected;

	if (!$$slots.default && !key)
		throw new Error(`ComboboxOption must contain a slot or value.`);

	const ctx = getContext('Combobox') as Required<ComboboxContext<T>>;
	const left = $$slots.left && ctx.icons;
	const right = ctx.icons; // if icons enabled always show right fallback.

	if (add) {
		ctx.addItem({ key, value } as T);
	}
	
	// Build main classes.
 
 	const classes = b
		.addFeature('base', ctx.base)
		.addVariant('default', ctx.theme)
		.addUserClass($$restProps.class, true)
		.bundle();

	// Build left icon classes.

	const leftIconClasses = bl
		.addFeature('base', ctx.base)
		.addFeature('position', 'left')
		.bundle();

	// Build right icon classes.

	 const rightIconClasses = br
		.addFeature('base', ctx.base)
		.addFeature('position', 'right')
		.bundle();

	const itemClasses = 'block truncate';

	let activeItemClasses = '';
	let selectedIconClasses = '';

	const updateClasses = () => {
		activeItemClasses = components.comboboxOption.main.state(ctx.theme, active ? 'active' : 'inactive');
		selectedIconClasses = components.comboboxOption.icon.state(ctx.theme, active ? 'active': selected ? 'selected' : 'inactive');
	};

	const unsubscribeSelected = ctx.controller.selected.subscribe((selectedValue) => {
		selected = ctx.onMatch(selectedValue, { key, value } as T);
		updateClasses();
	});

	const unsubscribeActive = ctx.controller.active.subscribe((activeValue) => {
		active = ctx.onMatch(activeValue, { key, value } as T);
		updateClasses();
	});

	function handleClick(e: MouseEvent | TouchEvent) {
		e.preventDefault();
		e.stopPropagation();
		ctx.handleSelect(key, true);
	}

	onDestroy(() => {
		unsubscribeSelected();
		unsubscribeActive();
	});


</script>

<li
	{...$$restProps}
	role="option"
	tabindex="-1"
	class={mergeTailwind(classes, activeItemClasses)}
	data-item={{ key, value }}
	data-selected={selected}
	aria-selected={selected}
	on:click={handleClick}
	on:touchstart={handleClick}
>
	{#if left}
		<span class={leftIconClasses}>
			<slot name="left" />
		</span>
	{/if}

	<span class={itemClasses}>
		<slot>
			{value}
		</slot>
	</span>

	{#if right}
		<span class={mergeTailwind(rightIconClasses, selectedIconClasses)}>
			<slot name="right">
				<svg
					class="h-5 w-5 {!selected ? 'hidden' : 'visible'}"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
						clip-rule="evenodd"
					/>
				</svg>
			</slot>
		</span>
	{/if}
</li>
