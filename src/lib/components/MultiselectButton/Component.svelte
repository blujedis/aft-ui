<script lang="ts">
	import { type MultiselectButtonProps, multiselectButtonDefaults as defaults } from './module';
	import themeStore, { Badge, themer } from '$lib';
	import Icon from '../Icon';
	import type { ElementProps } from '$lib/types';
	import type { MultiselectControllerContext, MultiselectItem } from '../MultiselectController';
	import { getContext, onMount } from 'svelte';

	type $$Props = MultiselectButtonProps & ElementProps<'input'>;

	const context = getContext('MultiselectContext') as MultiselectControllerContext;

	export let {
		caret,
		disabled,
		filterable,
		focused,
		full,
		name,
		newable,
		placeholder,
		removable,
		rounded,
		roticon,
		size,
		shadowed,
		tags,
		theme,
		transitioned,
		variant
	} = {
		...defaults,
		...context?.globals
	} as Required<$$Props>;

	const th = themer($themeStore);
	let mounted = false;
	let lastFocus = null as HTMLElement | null;

	$: selected = $context.selected.map((v) =>
		$context.items.find((item) => item.value === v)
	) as MultiselectItem[];
	$: labels = selected.map((v) => v.label);

	$: containerClasses = th
		.create('MultiselectContainer')
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
		.append('inline-flex items-center justify-between relative', true)
		.append($$restProps.class, true)
		.compile(true);

	$: inputWrapperClasses = th
		.create('MultiselectInputWrapper')
		.append('flex items-center', true)
		.append('w-full', full && !tags)
		.append('flex-wrap pl-1 overflow-clip', tags)
		.compile();

	$: inputClasses = th
		.create('MultiselectInput')
		.option('fieldFontSizes', size, size)
		.option('fieldPadding', size, size)
		.append('background-transparent outline-none border-none', true)
		.append('invisible', disabled) // transparent background shows as light gray.
		.append('w-10 ml-1 pl-0', tags)
		.append('w-full', full)
		.append('caret-transparent truncate cursor-pointer', !tags)
		.compile(true);

	$: buttonClasses = th
		.create('MultiselectButtonIconWrapper')
		.option('fieldPaddingX', 'md', 'md')
		.append('pt-px pl-0', true)
		.append('pl-0', tags)
		.compile(true);

	$: iconClasses = th
		.create('MultiselectButtonIcon')
		.option('iconDropdownSizes', size, true)
		.append('transition-transform duration-300 origin-center', !!caret && roticon)
		.append(
			typeof roticon === 'string' ? roticon : '-rotate-180',
			$context?.visible && roticon && !!caret
		)
		.append('ml-2 shrink pointer-events-none', true)
		.compile(true);

	function updateWidth() {
		if (!$context.input) return;
		const multiplier = ['xl', 'xl2'].includes(size) ? 8.75 : ['xs', 'sm'].includes(size) ? 6 : 7.5;
		const value = $context.input.value;
		const width = value.length * multiplier + 25; // 8px per character
		$context.input.style.width = width + 'px';
	}

	function removeBadge(item: MultiselectItem) {
		console.log(item);
		if (item) context.remove(item.value);
	}

	function handleClick(e: MouseEvent) {
		context.toggle();
	}

	function handleInputClick(e: MouseEvent) {
		if (!tags) context.toggle();
	}

	function handleInput(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		e: Event & {
			currentTarget: EventTarget | HTMLInputElement;
		}
	) {
		if (tags) updateWidth();
	}

	function handleInputKeydown(
		e: {
			currentTarget: EventTarget & HTMLInputElement;
		} & KeyboardEvent
	) {
		if (!tags) {
			e.preventDefault();
			return;
		}
		if (
			$context.input &&
			['Backspace', 'Enter'].includes(e?.key || '') &&
			!$context.input.value.length
		) {
			if (e.key === 'Backspace') {
				if ($context.selected.length) {
					if (
						confirm(
							`Are you sure you want to delete value "${
								$context.selected[$context.selected.length - 1]
							}"?`
						)
					) {
						e.preventDefault();
						const last = selected.slice(-1)[0];
						if (last && removable) {
							context.remove(last.value);
						}
						$context.input.focus();
						context.close();
					} else {
						context.reset();
					}
				}
			} else if (e.key === 'Enter' && newable && ($context.input.value || '').length) {
				e.preventDefault();
				context.add({ value: $context.input.value });
				context.select($context.input.value);
				$context.input.value = '';
				updateWidth(); // reset the width.
				$context.input.focus();
			}
		} else if ($context.input && filterable) {
			let query = $context.input.value || '';
			if (e.key.length === 1) query += e.key;
			else if (e.key === 'Backspace') query = query.slice(0, -1);
			context.filter(query);
			if (!$context.visible) {
				// do this to ensure focus after opening dropdown.
				context.open();
				setTimeout(() => {
					if ($context.input) {
						if (e.key.length === 1) $context.input.value = e.key || '';
						$context.input.focus();
					}
				});
			}
		}
	}

	function setFocus(e: Event & { target: EventTarget | null }) {
		lastFocus = e.target as HTMLElement;
	}

	function setInitialValue(el: HTMLInputElement) {
		if (!mounted && !tags && labels.length) el.value = labels.join(', ');
	}

	onMount(() => {
		mounted = true;
	});
</script>

<div>
	<div class={containerClasses}>
		<div class={inputWrapperClasses}>
			{#if tags}
				{#each selected as item}
					<button on:click={() => removeBadge(item)} class="mr-0.5">
						<Badge variant="filled" class="pointer-events-none" {rounded} {theme} {size}
							>{item.label}
							<slot name="icon">×</slot>
						</Badge>
					</button>
				{/each}
			{/if}
			<slot>
				<input
					aria-controls=""
					{...$$restProps}
					bind:this={$context.input}
					use:setInitialValue
					role="combobox"
					type="text"
					aria-expanded={$context.visible}
					aria-haspopup="true"
					aria-disabled={disabled}
					{disabled}
					class={inputClasses}
					placeholder={!selected.length ? placeholder || '' : ''}
					on:input={handleInput}
					on:keydown={handleInputKeydown}
					on:focus={setFocus}
					on:click={handleInputClick}
				/>
			</slot>
		</div>
		<button on:click={handleClick} class={buttonClasses}>
			<slot name="caret">
				<svelte:component this={Icon} icon={caret} class={iconClasses} />
			</slot>
		</button>
	</div>
</div>
