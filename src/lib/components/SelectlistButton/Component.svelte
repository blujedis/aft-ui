<script lang="ts">
	import { type SelectListButtonProps, selectListButtonDefaults as defaults } from './module';
	import themeStore, { themer } from '$lib';
	import { Badge } from '../Badge';
	import { Flushed } from '../Flushed';
	import { Icon } from '../Icon';
	import type { ElementProps, IconifyTuple } from '$lib/types';
	import type { SelectListContext, SelectListItem } from '../SelectList';
	import { getContext, onMount } from 'svelte';

	type $$Props = SelectListButtonProps & ElementProps<'input'>;

	const context = getContext('SelectListContext') as SelectListContext;

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
		variant,
		badgeVariant,
		onBeforeAdd,
		onBeforeRemove
	} = {
		...defaults,
		...context?.globals
	} as Required<$$Props>;

	const th = themer($themeStore);
	let mounted = false;

	$: selected = $context.selected.map((v) =>
		$context.items.find((item) => v === item.value)
	) as SelectListItem[];

	$: icons = (Array.isArray(caret) ? caret : [caret, caret]) as IconifyTuple;
	$: activeIcon = roticon ? icons[0] : !$context.visible ? icons[0] : icons[1];

	$: containerClasses = th
		.create('SelectListContainer')
		.variant('input', variant, theme, true)
		.option('focusedRing', theme, focused && variant !== 'flushed')
		.option('common', 'transition', transitioned)
		.option('fieldFontSizes', size, size)
		.option('roundeds', rounded, rounded && variant !== 'flushed')
		.option('shadows', shadowed, shadowed)
		.option('disableds', theme, disabled)
		.append('w-full', full)
		.append('inline-flex items-center justify-between relative min-w-[176px] peer', true)
		.append('outline-none focus-visible:ring-2', focused && variant !== 'flushed')
		.append('border-0', variant === 'flushed')
		.append($$restProps.class, true)
		.compile(true);

	$: inputWrapperClasses = th
		.create('SelectListInputWrapper')
		.append('flex items-center', true)
		.append('w-full', full)
		.append('min-w-fit', tags && !selected.length)
		.append('flex-wrap pl-1 overflow-clip', tags)
		.compile();

	$: inputClasses = th
		.create('SelectListInput')
		.option('fieldFontSizes', size, size)
		.option('fieldPadding', size, size)
		.append('bg-transparent outline-none border-none', true)
		.append('invisible', disabled) // transparent background shows as light gray.
		.append('w-12 ml-1 pl-0', tags)
		.append('caret-transparent truncate cursor-pointer', !tags)
		.append('min-w-min', tags && !selected.length)
		.append('group peer', true)
		.compile(true);

	$: buttonClasses = th
		.create('SelectListButtonIconWrapper')
		.option('fieldPaddingX', 'md', 'md')
		.option('focusedRingVisible', theme, focused)
		.append('pt-px pl-0 outline-none focus-visible:ring-2', true)
		.append('pl-0', tags)
		.compile(true);

	$: tagClasses = th
		.create('SelectListButtonTag')
		.option('focusedRingVisible', theme, focused)
		.append('mr-0.5 outline-none focus-visible:ring-2', true)
		.compile(true);

	$: iconClasses = th
		.create('SelectListButtonIcon')
		.option('iconCaretSizes', size, true)
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

	async function handleRemoveTag(item?: SelectListItem) {
		let shouldRemove = false;
		if (item && item.value) {
			shouldRemove = await Promise.resolve(
				onBeforeRemove(item, $context.input as HTMLInputElement)
			);
			if (shouldRemove) context.remove(item.value);
		}
		$context.input?.focus();
		return shouldRemove;
	}

	async function handleAddTag(value: string) {
		if (!$context.input) return;
		const item = await onBeforeAdd(value, $context.input);
		if (item) {
			item.selected = true;
			context.add(item);
			$context.input.value = '';
		}
		updateWidth(); // reset the width.
		$context.input.focus();
	}

	function handleClick(e: MouseEvent) {
		context.toggle();
	}

	function handleInputClick(e: MouseEvent) {
		if (!tags) context.toggle();
	}

	function handleInputUpdate(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		e: Event & {
			currentTarget: EventTarget | HTMLInputElement;
		}
	) {
		if (tags) updateWidth();
	}

	async function handleInputKeydown(
		e: {
			currentTarget: EventTarget & HTMLInputElement;
		} & KeyboardEvent
	) {
		if (!tags) {
			e.preventDefault();
			return;
		}
		if ($context.input && ['Backspace', 'Enter'].includes(e?.key || '')) {
			if (e.key === 'Enter' && !newable) {
				$context.input.value = '';
			} else if (
				e.key === 'Backspace' &&
				removable &&
				$context.selected.length &&
				!$context.input.value.length
			) {
				e.preventDefault();
				const last = selected.slice(-1)[0];
				if (last && removable) {
					const shouldRemove = await handleRemoveTag(last);
					if (shouldRemove) {
						$context.input.focus();
						context.close();
					}
				}
			} else if (e.key === 'Enter' && $context.input.value && newable) {
				const value = $context.input.value || '';
				if (value) {
					e.preventDefault();
					handleAddTag(value);
				}
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

	function setInitialValue(el: HTMLInputElement) {
		const labels = selected.map((i) => i.label).filter((l) => typeof l !== 'undefined');
		if (!mounted && !tags && labels.length) el.value = labels.join(', ');
	}

	onMount(() => {
		mounted = true;
	});
</script>

<div>
	<Flushed disabled={variant !== 'flushed'} {theme} {focused} group>
		<div role="button" tabindex="0" class={containerClasses}>
			<div class={inputWrapperClasses}>
				{#if tags}
					<div class="my-0.5">
						<slot name="tags" {handleRemoveTag}>
							{#each selected as item}
								<button on:click={() => handleRemoveTag(item)} class={tagClasses}>
									<Badge variant={badgeVariant} {rounded} {theme} {size} class="hover:underline"
										><span class="pointer-events-none pr-1">{item?.label}</span>
										<slot name="icon">×</slot>
									</Badge>
								</button>
							{/each}
						</slot>
					</div>
				{/if}
				<slot {handleInputUpdate} {handleInputKeydown} {handleInputClick}>
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
						on:input={handleInputUpdate}
						on:keydown={handleInputKeydown}
						on:click={handleInputClick}
					/>
				</slot>
			</div>
			<slot name="caret" handleCaretClick={handleClick}>
				<button on:click={handleClick} class={buttonClasses}>
					<svelte:component this={Icon} icon={activeIcon} class={iconClasses} />
				</button>
			</slot>
		</div>
	</Flushed>
</div>
