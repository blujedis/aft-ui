<script lang="ts">
	import { Button } from '../Button';
	import { getContext } from 'svelte';
	import type { DropdownContext } from '../Dropdown/module';
	import { type DropdownButtonProps, dropdownButtonDefaults as defaults } from './module';
	import type { ElementNativeProps } from '../types';
	import { Icon } from '../Icon';
	import { themer, themeStore } from '$lib';

	type Tag = $$Generic<'button' | 'a'>;
	type $$Props = DropdownButtonProps<Tag> & ElementNativeProps<Tag>;

	const context = getContext<DropdownContext>('Dropdown');

	export let {
		as,
		caret,
		disabled,
		focused,
		full,
		placeholder,
		rounded,
		roticon,
		size,
		shadowed,
		theme,
		transitioned,
		underlined,
		variant,
		unstyled
	} = {
		...defaults,
		...context?.globals
	} as Required<DropdownButtonProps<Tag>>;

	const buttonProps = {
		as: (typeof as === 'undefined' && context.mode === 'menu' ? 'a' : as) as Tag,
		disabled,
		focused,
		full,
		rounded,
		size,
		shadowed,
		theme,
		transitioned,
		underlined,
		variant,
		unstyled,
		class: 'justify-between capitalize'
	};

	let ref: HTMLButtonElement | undefined;
	const th = themer($themeStore);

	$: selected = $context.items.filter((item) => $context.selected.includes(item.value))[0];
	$: label = selected ? selected.label : placeholder || '';

	$: iconClasses = th
		.create('DropdownButtonIcon')
		.option('iconDropdownSizes', size, true)
		.append('transition-transform duration-300 origin-center', !!caret && roticon)
		.append(
			typeof roticon === 'string' ? roticon : '-rotate-180',
			$context.visible && roticon && !!caret
		)
		.append('ml-2 shrink pointer-events-none pt-px', true)
		.compile();

	function handleClick(e: CustomEvent<HTMLButtonElement>) {
		if (context.trigger !== 'click') return;
		if (e.target) ref = e.target as HTMLButtonElement;
		context.toggle();
	}

	function handleEnter() {
		if (context.trigger !== 'hover') return;
		context.toggle();
	}
	context.subscribe((s) => {
		// reset focus back to button when dropdown is closed.
		if (ref && !$context.visible) ref.focus();
	});
</script>

<div>
	<Button
		{...buttonProps}
		{...$$restProps}
		on:click={handleClick}
		on:mouseenter={handleEnter}
		aria-expanded={$context.visible}
		aria-haspopup="true"
	>
		<slot>
			{#if ['select', 'multiselect'].includes(context.mode)}
				{label}
			{/if}
		</slot>
		{#if caret}
			<Icon icon={caret} class={iconClasses} />
		{/if}
	</Button>
</div>
