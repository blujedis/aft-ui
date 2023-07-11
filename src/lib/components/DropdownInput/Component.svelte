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

	function handleClick(
		e:
			| (MouseEvent & { key?: KeyboardEvent['key'] }) // hack should check event type.
			| (KeyboardEvent & {
					currentTarget: EventTarget & HTMLDivElement;
			  })
	) {
		const target = e.target as HTMLElement;
		const isInput = target.tagName.toLowerCase() === 'input';
		const isButton = target.tagName.toLowerCase() === 'button';

		if (!isInput && !isButton) {
			// hit icon toggle panel.
			context.toggle();
			return;
		}

		e.stopPropagation();

		if (isButton) {
			const childNodes = target.parentElement?.querySelectorAll('button');
			if (!childNodes?.length || !removable) return;
			const childNodesArray = Array.from(childNodes);
			const index = childNodesArray.indexOf(target as HTMLButtonElement);
			const item = selected[index];
			if (item) context.remove(item.value);
		} else if (e.key === 'ArrowDown' && !$context.visible) {
			context.open();
		}
	}

	function handleMouseEnter() {
		if (context.trigger !== 'hover') return;
		context.toggle();
	}

	function handleInput(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		updateWidth();
	}

	function handleKeydown(
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
			} else if (e.key === 'Enter' && newable && context.mode === 'multiselect') {
				e.preventDefault();
				context.add(input.value);
				context.select(input.value);
				input.value = '';
				updateWidth(); // reset the width.
				input.focus();
			}
		} else if (query.length) {
			// apply filter.
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function handleBlur(e: any) {
		if (!resetable) return;
	}

	context.subscribe(() => {
		if (div && !$context.visible) div.focus();
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
		on:keydown={handleClick}
		class={inputWrapperClasses}
	>
		<div class={containerWrapper}>
			{#if !selected.length}
				<div class={placeholderClasses}>{placeholder}</div>
			{/if}
			{#if context.mode === 'multiselect'}
				{#each selected as item}
					<Badge
						variant={variant === 'flushed' ? 'default' : variant}
						tag
						{rounded}
						{theme}
						{size}
						{removable}>{item.label}</Badge
					>
				{/each}
				<input
					bind:this={input}
					on:input={handleInput}
					on:keydown={handleKeydown}
					on:blur={handleBlur}
					type="text"
					class={inputClasses}
				/>
			{/if}
		</div>
		{#if caret}
			<div class="h-full">
				<Icon icon={caret} class={iconClasses} />
			</div>
		{/if}
	</div>
</div>
