<script lang="ts">
	import { type MenuButtonProps, menuButtonDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import  { type MenuContext, Button, Icon } from '$lib/components';
	import { getContext } from 'svelte';

	type $$Props = MenuButtonProps & ElementProps<'div'>;

	const context = getContext('Menu') as MenuContext;

	export let { caret, full, rounded, roticon, size, shadowed, theme, variant } = {
		...defaults,
		...context?.globals
	} as Required<$$Props>;

	const th = themer($themeStore);

	$: buttonClasses = th
		.create('MenuButton')
		.append('h-full', true) // without h-full button won't fill parent.
		.append($$restProps.class, true)
		.compile(true);

	$: iconClasses = th
		.create('MenuButtonIcon')
		.option('iconCaretSizes', size, true)
		.append('transition-transform duration-300 origin-center', !!caret && roticon)
		.append(
			typeof roticon === 'string' ? roticon : '-rotate-180',
			$context.visible && roticon && !!caret
		)
		.append('ml-2 shrink pointer-events-none pt-px', true)
		.compile();

	function handleClick(e: CustomEvent<HTMLButtonElement>) {
	
		context.toggle();
	}
</script>

<svelte:component
	this={Button}
	{...{ full, rounded, shadowed, size, theme, variant }}
	{...$$restProps}
	class={buttonClasses}
	on:click={handleClick}
	aria-expanded={$context.visible}
	aria-haspopup="true"
	as="button"
>
	<div class="flex items-center pointer-events-none">
		<slot />
		{#if caret}
			<slot name="caret">
				<svelte:component this={Icon} icon={caret} class={iconClasses} />
			</slot>
		{/if}
	</div>
</svelte:component>
