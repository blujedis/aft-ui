<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { Builder, normalize } from '@forewind/util';
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
	type Defaults = typeof defaults & LiProps;
	type T = $$Generic<string | Record<string, any>>;

	interface $$Props extends Defaults {
		label?: string;
		value: T;
	}

	const { components, palette } = $themeStore;

	const li = normalize(components.comboboxOption.main, palette);
	const b = new Builder(li, palette);
	const bl = new Builder(components.comboboxOption.icon);
	const br = new Builder(components.comboboxOption.icon);

	const defaults = b
		.defaults({	base: true},
			['variant', 'position', 'theme']
		);

	export let value: T;
	export let label = typeof value === 'string' ? value : '';

	if (!$$slots.default && !label)
		throw new Error(`ComboboxOption must contain a slot value or a label.`);

	const ctx = getContext('Combobox') as Required<ComboboxContext<T>>;

	let isSelected = false;
	let isActive = false;

	const unsubscribeSelected = ctx.controller.selected.subscribe((selectedValue) => {
		isSelected = ctx.onMatch(selectedValue, value);
	});

	const unsubscribeActive= ctx.controller.active.subscribe((activeValue) => {
		isActive = ctx.onMatch(activeValue, value);
	});

	onDestroy(() =>{
		unsubscribeSelected();
		unsubscribeActive();
	});

	const left = $$slots.left && ctx.icons;
	const right = ctx.icons; // if icons enabled always show right fallback.

	const leftIcon = bl.addFeature('base', ctx.base).addFeature('position', 'left').bundle();

	const rightIcon = br.addFeature('base', ctx.base).addFeature('position', 'right').bundle();

	const classes = b
		.addFeature('base', ctx.base)
		.addVariant('default', ctx.theme)
		.addHandlerClass('inactive', !isActive && !isSelected, ctx.theme)
		.addHandlerClass('active', isActive, ctx.theme)
		.addHandlerClass('selected', isSelected, ctx.theme)
		.addUserClass($$restProps.class, true)
		.bundle();

	const itemClasses = 'block truncate';

	function handleClick(e: MouseEvent | TouchEvent) {
		ctx.handleSelect(value, true, e);
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key !== 'Enter') return;
		ctx.handleSelect(value);
	}
</script>

<li
	{...$$restProps}
	role="option"
	tabindex="-1"
	class={classes}
	data-value={value}
	data-selected={isSelected}
	aria-selected={isSelected}
	on:click={handleClick}
	on:keydown={handleKeyDown}
	on:touchstart={handleClick}
>
	{#if left}
		<span class={leftIcon}>
			<slot name="left" />
		</span>
	{/if}

	<span class={itemClasses}>
		<slot>
			{label}
		</slot>
	</span>

	{#if right}
		<span class={rightIcon}>
			<slot name="right">
				<svg
					class="h-5 w-5 {!isSelected ? 'hidden' : 'visible'}"
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


