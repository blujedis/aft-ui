<script lang="ts">
	import { getContext } from 'svelte';
	import type { DropdownContext } from '../Dropdown/module';
	import { type DropdownInputProps, dropdownInputDefaults as defaults } from './module';
	import themeStore, { themer } from '$lib';
	import type { ElementNativeProps } from '../../types';
	import Badge from '../Badge';
	import { Icon } from '../Icon';

	type $$Props = DropdownInputProps & ElementNativeProps<'input', 'size'>;

	const context = getContext<DropdownContext>('Dropdown');

	export let {
		caret,
		disabled,
		filterable,
		focused,
		full,
		multiple,
		newable,
		placeholder,
		removable,
		resetable,
		rounded,
		roticon,
		size,
		shadowed,
		theme,
		transitioned,
		variant,
		unstyled
	} = {
		...defaults,
		...context?.globals
	} as Required<DropdownInputProps>;

	let div: HTMLDivElement | undefined;
	let input: HTMLInputElement | undefined;
	let lastFocus = null as HTMLElement | null;
	const th = themer($themeStore);

	$: selected = $context.items.filter((item) => $context.selected.includes(item.value));

	$: inputWrapperClasses = th
		.create('DropdownInputWrapper')
		.variant('input', variant, theme, true)
		.option('focused', theme, focused)
		.option('focusedRingSizes', 'two', focused)
		.remove(focused === 'visible' ? 'focus:' : 'focus-visible:', true)
		.option('common', 'transition', transitioned)
		.option('fieldFontSizes', size, size)
		.option('roundeds', rounded, rounded && variant !== 'flushed')
		.option('shadows', shadowed, shadowed)
		.option('disableds', theme, disabled)
		.append('w-full', full)
		.append('px-2', variant === 'flushed' && !multiple)
		.append('inline-flex items-center justify-between relative', true)
		.append($$restProps.class, true)
		.compile(true);

	$: containerWrapper = th
		.create('DropdownInputContainer')
		.append('flex flex-wrap items-center overflow-clip', true)
		.compile();

	$: iconClasses = th
		.create('DropdownInputIcon')
		.option('iconDropdownSizes', size, true)
		.append('transition-transform duration-300 origin-center', !!caret && roticon)
		.append(
			typeof roticon === 'string' ? roticon : '-rotate-180',
			$context.visible && roticon && !!caret
		)
		.append('mr-2 shrink pointer-events-none', true)
		.compile();

	$: inputClasses = th
		.create('DropdownInput')
		.option('fieldFontSizes', size, size)
		.option('fieldPadding', size, size)
		.append('background-transparent outline-none border-none w-10 ml-1', true)
		.append('invisible', disabled) // transparent background shows as light gray.
		.append('px-0', selected.length || (placeholder && !selected.length))
		.compile(true);

	$: placeholderClasses = th
		.create('DropdownPlaceholder')
		.option('fieldPadding', size, size)
		.append('pt-0 pb-0 pr-0 capitalize', true)
		.compile(true);

	function updateWidth() {
		if (!input) return;
		const multiplier = ['xl', 'xl2'].includes(size) ? 8.75 : ['xs', 'sm'].includes(size) ? 6 : 7.5;
		const value = input.value;
		const width = value.length * multiplier + 25; // 8px per character
		input.style.width = width + 'px';
	}

	function removeBadge(target: EventTarget | null) {
		if (!target) return;
		const childNodes = (target as HTMLButtonElement).parentElement?.querySelectorAll('button');
		if (!childNodes?.length || !removable) return;
		const childNodesArray = Array.from(childNodes);
		const index = childNodesArray.indexOf(target as HTMLButtonElement);
		const item = selected[index];
		if (item) context.remove(item.value);
	}

	function handleClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		const isInput = target.tagName.toLowerCase() === 'input';
		const isButton = target.tagName.toLowerCase() === 'button';

		if (!isInput && !isButton) return context.toggle();

		e.stopPropagation();

		if (isButton) return removeBadge(target);
	}

	function handleContainerKeydown(
		e: KeyboardEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		}
	) {
		const target = e.target as HTMLElement;
		const isInput = target.tagName.toLowerCase() === 'input';
		const isButton = target.tagName.toLowerCase() === 'button';

		if (['ArrowDown', 'ArrowUp'].includes(e.key + '')) {
			if (e.key === 'ArrowUp' && $context.visible) context.close();
			else if (e.key === 'ArrowDown' && !$context.visible) context.open();
			return;
		}

		if (e.key === 'ArrowDown' && !$context.visible) return context.open();

		if (e.key === 'Enter') removeBadge(e.target);
	}

	function handleMouseEnter() {
		if (context.trigger !== 'hover') return;
		context.toggle();
	}

	function handleInput(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		e: Event & {
			currentTarget: EventTarget | HTMLInputElement;
		}
	) {
		updateWidth();
	}

	function handleInputKeydown(
		e: {
			currentTarget: EventTarget & HTMLInputElement;
		} & KeyboardEvent
	) {
		if (!input) return;
		const query = input.value || '';
		if (typeof e.key !== 'undefined' && ['Backspace', 'Enter'].includes(e.key)) {
			if (e.key === 'Backspace' && !input.value.length) {
				e.preventDefault();
				const last = selected.slice(-1)[0];
				if (last && removable) context.remove(last.value);
				input.focus();
			} else if (
				e.key === 'Enter' &&
				newable &&
				context.strategy === 'multiselect' &&
				(input.value || '').length
			) {
				e.preventDefault();
				context.add({ value: input.value });
				context.select(input.value);
				input.value = '';
				updateWidth(); // reset the width.
				input.focus();
			}
		} else if (query.length && filterable) {
			context.filter(query);
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function handleBlur(e: any) {
		if (!resetable) return;
	}

	function setFocus(e: Event & { target: EventTarget | null }) {
		lastFocus = e.target as HTMLElement;
	}

	context.subscribe(() => {
		if (div && !$context.visible) {
			if (lastFocus) {
				lastFocus.focus();
			} else {
				div.focus();
			}
		}
	});
</script>

<div>
	<div
		bind:this={div}
		role="combobox"
		tabindex={0}
		aria-expanded={$context.visible}
		aria-controls=""
		aria-haspopup="true"
		aria-disabled={disabled}
		on:click={handleClick}
		on:mouseenter={handleMouseEnter}
		on:keydown={handleContainerKeydown}
		class={inputWrapperClasses}
	>
		<div class={containerWrapper}>
			{#if !selected.length && context.strategy !== 'tags'}
				<div class={placeholderClasses}>{placeholder}</div>
			{/if}
			{#if context.strategy === 'tags'}
				{#each selected as item}
					<Badge
						variant={variant === 'flushed' ? 'default' : variant}
						{rounded}
						{theme}
						{size}
						{removable}
						on:focus={setFocus}>{item.label}</Badge
					>
				{/each}
				<input
					bind:this={input}
					on:input={handleInput}
					on:keydown={handleInputKeydown}
					on:blur={handleBlur}
					on:focus={setFocus}
					type="text"
					class={inputClasses}
					class:w-full={!selected.length}
					placeholder={!selected.length ? 'Enter Value' : ''}
				/>
			{/if}
		</div>
		{#if caret}
			<div class="listbox-caret h-full">
				<Icon icon={caret} class={iconClasses} />
			</div>
		{/if}
	</div>
</div>
