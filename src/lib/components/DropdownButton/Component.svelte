<script lang="ts">
	import { Button } from '../Button';
	import { getContext } from 'svelte';
	import type { DropdownContext } from '../Dropdown/module';
	import { type DropdownButtonProps, dropdownButtonDefaults as defaults } from './module';
	import type { ElementNativeProps } from '../../types';
	import { Icon } from '../Icon';
	import themeStore, { themer } from '$lib';

	type Tag = $$Generic<'button' | 'a'>;
	type $$Props = DropdownButtonProps<Tag> & ElementNativeProps<Tag>;

	const context = getContext<DropdownContext>('Dropdown');
	const { multiple, ...rest } = context.globals;

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
		...rest
	} as Required<DropdownButtonProps<Tag>>;

	const buttonProps = {
		as: (typeof as === 'undefined' && context.strategy === 'menu' ? 'a' : as) as Tag,
		// tabindex: typeof as === 'undefined' && context.strategy === 'menu' ? 0 : null,
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
		unstyled
		// class: 'justify-between capitalize '
	};

	$$restProps.class = 'justify-between ' + $$restProps.class;

	let ref: HTMLElement | undefined;
	const th = themer($themeStore);

	$: ref && context.update((s) => ({ ...s, button: ref as any }));
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
		e.preventDefault();
		e.stopPropagation();
		if (e.target) {
			ref = e.target as HTMLButtonElement;
		}
		context.toggle();
	}

	function handleMouseEnter() {
		if (context.trigger !== 'hover') return;
		context.toggle();
	}

	function setButtonRef(el: HTMLButtonElement) {
		context.update((s) => ({ ...s, button: el }));
	}
</script>

<div>
	<Button
		{...buttonProps}
		tabindex={0}
		{...$$restProps}
		on:click={handleClick}
		on:mouseenter={handleMouseEnter}
		strategy="text"
		aria-expanded={$context.visible}
		aria-haspopup="true"
	>
		<div class="flex items-center pointer-events-none">
			<slot>
				{#if ['select', 'multiselect'].includes(context.strategy)}
					<div>
						{label}
					</div>
				{/if}
			</slot>
			{#if caret}
				<Icon icon={caret} class={iconClasses} />
			{/if}
		</div>
	</Button>
</div>
