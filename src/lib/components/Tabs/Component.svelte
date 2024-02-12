<script lang="ts">
	import { type TabsProps, tabsDefaults as defaults, type TabsContext } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { setContext } from 'svelte';
	import { useSelect } from '$lib/stores/select';
	import { cleanObj, ensureArray, boolToMapValue } from '$lib/utils';
	import type { ElementProps } from '$lib/types';

	type $$Props = TabsProps & ElementProps<'div'>;

	export let {
		condensed,
		focused,
		full,
		rounded,
		selected,
		shadowed,
		size,
		theme,
		transitioned,
		variant,
		class: klass,
		navWrapperClasses,
		navContainerClasses,
		navClasses
	} = {
		...defaults
	} as Required<$$Props>;

	const store = useSelect({ selected: ensureArray(selected), multiple: false });

	const globals = cleanObj({
		focused,
		full,
		rounded,
		size,
		theme,
		transitioned,
		variant
	});

	export const context = setContext<TabsContext>('Tabs', {
		...store,
		globals: globals as any
	});

	const th = themer($themeStore);

	$: tabControllerlWrapperClasses = th.create('TabsWrapper').append(klass, true).compile();

	$: tabControllerNavWrapperClasses = th
		.create('TabsNavWrapper')
		.append('w-full', full)
		.append('hidden sm:flex items-start flex-col', true)
		.append('max-w-min', condensed && !full)
		.append(navWrapperClasses, true)
		.compile();

	$: tabControllerNavContainerClasses = th
		.create('TabsNavContainer')
		.variant('tabs', variant, theme, true)
		.append('w-full', full)
		.append('hidden sm:block', true)
		.append(navContainerClasses, true)
		.compile();

	$: tabControllerNavClasses = th
		.create('TabsNav')
		.option(
			'roundeds',
			boolToMapValue(rounded),
			rounded && !['underlined', 'labeled'].includes(variant)
		)
		.option('shadows', boolToMapValue(shadowed), shadowed && variant !== 'labeled')
		.append('-mb-px', ['underlined', 'default'].includes(variant))
		.append('space-x-4', variant !== 'grouped')
		.append('w-full justify-around space-x-0', full)
		.append('isolate flex', true)
		.append('[&>:not(:first-child):not(:last-child)]:rounded-none', variant === 'grouped')
		.append(navClasses, true)
		.compile();

	function handleReset() {}
</script>

<div class={tabControllerlWrapperClasses}>
	{#if $$slots.mobile}
		<div class="sm:hidden">
			<slot name="mobile" />
		</div>
	{/if}
	<div class={tabControllerNavWrapperClasses}>
		<div class={tabControllerNavContainerClasses}>
			<nav class={tabControllerNavClasses} aria-label="Tabs">
				<slot
					name="tabs"
					selectedItems={$store.selected}
					reset={handleReset}
					select={store.select}
					unselect={store.unselect}
					isSelected={store.isSelected}
				/>
			</nav>
		</div>
		<div class="hidden sm:flex">
			<slot
				name="panels"
				selectedItems={$store.selected}
				reset={handleReset}
				select={store.select}
				unselect={store.unselect}
				isSelected={store.isSelected}
			/>
		</div>
	</div>
</div>
