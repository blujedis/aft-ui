<script lang="ts">
	import { type MultiselectButtonProps, multiselectButtonDefaults as defaults } from './module';
	import themeStore, { themer } from '$lib';
	import Button from '../Button';
	import Icon from '../Icon';
	import type { ElementProps } from '$lib/types';
	import type { MultiselectControllerContext, MultiselectItem } from '../MultiselectController';
	import { getContext } from 'svelte';

	type $$Props = MultiselectButtonProps & ElementProps<'button'>;

	const context = getContext('MultiselectContext') as MultiselectControllerContext;

	export let {
		caret,
		full,
		placeholder,
		rounded,
		roticon,
		size,
		shadowed,
		strategy,
		theme,
		variant
	} = {
		...defaults,
		...context?.globals
	} as Required<$$Props>;

	const th = themer($themeStore);

	$: selected = $context.selected.map((v) =>
		$context.items.find((item) => item.value === v)
	) as MultiselectItem[];
	$: labels = selected.map((v) => v.label);
	$: firstItem = $context.items[0];

	$: console.log(labels);

	$: iconClasses = th
		.create('MultiselectButtonIcon')
		.option('iconDropdownSizes', size, true)
		.append('transition-transform duration-300 origin-center', !!caret && roticon)
		.append(
			typeof roticon === 'string' ? roticon : '-rotate-180',
			$context?.visible && roticon && !!caret
		)
		.append('ml-2 shrink pointer-events-none pt-px', true)
		.compile();

	// $: inputClasses = th
	// 	.create('DropdownInput')
	// 	.option('fieldFontSizes', size, size)
	// 	.option('fieldPadding', size, size)
	// 	.append('background-transparent outline-none border-none w-10 ml-1', true)
	// 	.append('invisible', disabled) // transparent background shows as light gray.
	// 	.append('px-0', selected.length || (placeholder && !selected.length))
	// 	.compile(true);

	function handleClick(e: CustomEvent<HTMLButtonElement>) {
		context.toggle();
	}
</script>

<svelte:component
	this={Button}
	{...{ full, rounded, shadowed, size, theme, variant }}
	strategy="text"
	{...$$restProps}
	on:click={handleClick}
	aria-expanded={$context?.visible}
	aria-haspopup="true"
>
	<div class="flex items-center pointer-events-none">
		<div>
			<slot>
				{#if $context?.selected.length}
					{labels.join(', ')}
				{:else}
					{placeholder || firstItem.label}
				{/if}
			</slot>
		</div>
		{#if caret}
			<slot name="caret">
				<svelte:component this={Icon} icon={caret} class={iconClasses} />
			</slot>
		{/if}
	</div>
</svelte:component>
