<script>
	import { Button } from '../Button';
	import { getContext } from 'svelte';
	import { dropdownButtonDefaults as defaults } from './module';
	import { Icon } from '../Icon';
	import { themer, themeStore } from '../..';
	const context = getContext('Dropdown');
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
	};
	const buttonProps = {
		as: typeof as === 'undefined' && context.mode === 'menu' ? 'a' : as,
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
	let ref;
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
	function handleClick(e) {
		if (context.trigger !== 'click') return;
		if (e.target) ref = e.target;
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
