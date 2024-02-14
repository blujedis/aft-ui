<script lang="ts">
	import { type SelectListButtonProps, selectListButtonDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import {
		Flushed,
		Badge,
		Icon,
		type SelectListContext,
		type SelectListItem
	} from '$lib/components';
	import type { ElementProps, IconifyTuple } from '$lib/types';
	import { boolToMapValue } from '$lib/utils';
	import { getContext, onMount } from 'svelte';

	type $$Props = SelectListButtonProps & ElementProps<'input'>;

	const context = getContext('SelectListContext') as SelectListContext;

	export let {
		badgeProps,
		caret,
		disabled,
		filterable,
		focused,
		full,
		hovered,
		name,
		multiple,
		newable,
		placeholder,
		removable,
		rounded,
		roticon,
		size,
		shadowed,
		theme,
		transitioned,
		variant,
		onBeforeAdd,
		onBeforeRemove
	} = {
		...defaults,
		badgeProps: context.globals?.badgeProps,
		disabled: context.globals?.disabled,
		filterable: context.globals?.filterable,
		full: context.globals?.full,
		focused: context.globals?.focused,
		hovered: context.globals?.hovered,
		multiple: context.globals?.multiple,
		newable: context.globals?.newable,
		placeholder: context.globals?.placeholder,
		removable: context.globals?.removable,
		rounded: context.globals?.rounded,
		size: context.globals?.size,
		shadowed: context.globals?.shadowed,
		theme: context.globals?.theme,
		variant: context.globals?.variant,
		transitioned: context.globals?.transitioned
	} as Required<$$Props>;

	const th = themer($themeStore);
	let mounted = false;

	$: selected = $context.selected.map((v) =>
		$context.items.find((item) => v === item.value)
	) as SelectListItem[];

	$: icons = (Array.isArray(caret) ? caret : [caret, caret]) as IconifyTuple;
	$: activeIcon = roticon ? icons[0] : !$context.visible ? icons[0] : icons[1];

	$: containerClasses = th
		.create('SelectListButton')
		.bundle(['mainBg', 'whiteText', 'filledPlaceholder'], theme, variant === 'filled')
		.bundle(
			['inputText', 'mainRing'],
			{ $base: 'ring-1 ring-inset' },
			theme,
			variant === 'outlined'
		)
		.bundle(['softBg', 'inputText'], theme, variant === 'soft')
		.bundle(['mainBorder', 'mainBorderGroupHover', 'inputText'], theme, variant === 'flushed')
		.option('common', 'focusedOutlineWithin', focused && variant !== 'flushed')
		.option(
			'outlineFocusWithin',
			theme,
			focused && ['filled', 'outlined', 'ghost', 'soft', 'text'].includes(variant)
		)
		.bundle(['inputText'], theme, variant === 'text')
		.option('common', 'transitioned', transitioned)
		.option('hovered', variant, theme, hovered)
		.option('roundeds', boolToMapValue(rounded), rounded && variant !== 'flushed')
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('common', 'disabled', disabled)
		.prepend('select-list-button', true)
		.append('w-full', full)
		.append('relative peer flex items-center', true)
		.append('outline-none', focused && variant !== 'flushed')
		.append('border-0', variant === 'flushed')
		.append($$restProps.class, true)
		.compile();

	$: contentWrapperClasses = th
		.create('SelectListInputWrapper')
		.option('fieldFontSizes', size, size)
		.option('fieldPadding', size, size)
		.append('relative flex flex-1 gap-1 flex-wrap overflow-hidden', true)
		.compile();

	$: inputWrapperClasses = th
		.create('SelectListInput')
		.prepend('select-list-input-wrapper', true)
		.append('relative', true)
		.compile();

	$: badgeButtonClasses = th
		.create('SelectListButtonTag')
		.append('outline-none inline-flex', true)
		.compile();

	$: badgeClasses = th
		.create('SelectListBadge')
		.append('border border-white/50', variant === 'filled')
		.append('relative flex whitespace-nowrap overflow-hidden', true) //
		.append('pr-2', removable)
		.compile();

	$: inputClasses = th
		.create('SelectListInput')
		.prepend('select-list-input', true)
		.append('invisible', disabled) // transparent background shows as light gray.
		.append('relative bg-transparent outline-none border-none inline', true)
		.append('group peer', true)
		.compile();

	$: triggerClasses = th
		.create('SelectListButtonIconWrapper')
		.append('absolute inset-y-0 right-2 flex items-center', true)
		.compile();

	$: iconClasses = th
		.create('SelectListButtonIcon')
		.option('iconCaretSizes', size, true)
		.append('transition-transform duration-300 origin-center', !!caret && roticon)
		.append(
			typeof roticon === 'string' ? roticon : '-rotate-180',
			$context?.visible && roticon && !!caret
		)
		.append('ml-2 pointer-events-none', true) // shrink
		.compile();

	function updateWidth() {
		if (!$context.input) return;
		const multiplier = ['xl', 'xl2'].includes(size) ? 8.75 : ['xs', 'sm'].includes(size) ? 6 : 7.5;
		const value = $context.input.value;
		let width = Math.max(32, value.length * multiplier + 25); // 8px per character
		// $context.input.style.width = width + 'px';
	}

	async function handleRemoveTag(item?: SelectListItem) {
		if (!removable) return;
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
		// if (!tags) {
		context.toggle();
		// }
		// else if ($context.input) {
		// 	$context.input.value = '';
		// }
	}

	function handleInputClick(e: MouseEvent & { currentTarget: EventTarget | HTMLInputElement }) {
		if (!multiple && !filterable) context.toggle();
		if (!multiple && $context.input) {
			$context.input.value = '';
			$context.input.focus();
		}
		// e.preventDefault();
	}

	function handleInputUpdate(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		e: Event & {
			currentTarget: EventTarget | HTMLInputElement;
		}
	) {
		if (multiple) {
			updateWidth();
		}
	}

	async function handleInputKeydown(
		e: {
			currentTarget: EventTarget & HTMLInputElement;
		} & KeyboardEvent
	) {
		if ($context.input && ['Backspace', 'Enter'].includes(e?.key || '')) {
			if (e.key === 'Enter' && !newable) {
				$context.input.value = '';
			} else if (
				multiple &&
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
			} else if (multiple && e.key === 'Enter' && $context.input.value && newable) {
				const value = $context.input.value || '';
				if (value) {
					e.preventDefault();
					handleAddTag(value);
				}
			}
		}
		// else if ($context.input && filterable) {
		// 	let query = $context.input.value || '';
		// 	if (e.key.length === 1) query += e.key;
		// 	else if (e.key === 'Backspace') query = query.slice(0, -1);
		// 	context.filter(query);
		// 	if (!$context.visible) {
		// 		// do this to ensure focus after opening dropdown.
		// 		context.open();
		// 		setTimeout(() => {
		// 			if ($context.input) {
		// 				if (e.key.length === 1) $context.input.value = e.key || '';
		// 				$context.input.focus();
		// 			}
		// 		});
		// 	}
		// }
	}

	function setInitialValue(el: HTMLInputElement) {
		const labels = selected.map((i) => i.label).filter((l) => typeof l !== 'undefined');
		if (!multiple && labels.length) el.value = labels.join(', ');
	}

	onMount(() => {
		mounted = true;
	});
</script>

<!-- <div> -->
<Flushed disabled={variant !== 'flushed'} {theme} {focused} group>
	<div role="button" tabindex="-1" aria-disabled={disabled} class={containerClasses}>
		<div class={contentWrapperClasses}>
			{#if multiple && selected.length}
				<!-- <div class={badgeWrapperClasses}> -->
				<slot name="tags" {handleRemoveTag}>
					{#each selected as item}
						<button on:click={() => handleRemoveTag(item)} class={badgeButtonClasses}>
							<Badge {rounded} {theme} {size} {...badgeProps} class={badgeClasses}>
								<span class="pointer-events-none pr-1">
									{item?.label}
								</span>
								{#if removable}
									<span class="absolute inset-y-0 right-1 top-0.5">
										<slot name="icon">×</slot>
									</span>
								{/if}
							</Badge>
						</button>
					{/each}
				</slot>
				<!-- </div> -->
			{/if}
			<div class={inputWrapperClasses}>
				<slot name="input" {handleInputUpdate} {handleInputKeydown} {handleInputClick}>
					<input
						aria-controls={name}
						{...$$restProps}
						bind:this={$context.input}
						use:setInitialValue
						role="combobox"
						type="text"
						aria-expanded={$context.visible}
						aria-haspopup="true"
						aria-disabled={disabled}
						{disabled}
						placeholder={!multiple || (!selected.length && placeholder) ? placeholder || '' : ''}
						class={inputClasses}
						on:input={handleInputUpdate}
						on:keydown={handleInputKeydown}
						on:click={handleInputClick}
					/>
				</slot>
			</div>
		</div>
		<button on:click={handleClick} class={triggerClasses}>
			<slot name="caret" handleCaretClick={handleClick}>
				<svelte:component this={Icon} icon={activeIcon} class={iconClasses} />
			</slot>
		</button>
	</div>
</Flushed>

<!-- </div> -->

<style>
	/* .select-list-input-wrapper {
		grid-area: 1 / 1 / 2 / 3;
	}
	.select-list-input {
		grid-area: 1/2;
		outline: 0px;
		padding: 0px;
		margin: 0px;
		border: 0px;
		min-width: 2px;
		width: 100%;
		background: 0px center;
	} */
</style>
