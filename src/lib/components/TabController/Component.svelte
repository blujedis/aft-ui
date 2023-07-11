<script lang="ts">
	import {
		type TabControllerProps,
		tabControllerDefaults as defaults,
		type TabControllerContext
	} from './module';
	import themeStore, { themer } from '$lib';
	import { setContext } from 'svelte';
	import { useSelect } from '$lib/stores/select';
	import { ensureArray } from '$lib/utils';
	import type { ElementNativeProps } from '../../types';

	type $$Props = TabControllerProps & ElementNativeProps<'div'>;

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

	export const context = setContext<TabControllerContext>('TabController', {
		...store,
		globals: {
			focused,
			full,
			rounded,
			size,
			theme,
			transitioned,
			variant
		}
	});

	const th = themer($themeStore);

	$: tabControllerlWrapperClasses = th.create('TabControllerWrapper').append(klass, true).compile();

	$: tabControllerNavWrapperClasses = th
		.create('TabControllerNavWrapper')
		.append('w-full', full)
		.append('hidden sm:flex items-start flex-col', true)
		.append('max-w-min', condensed && !full)
		.append(navWrapperClasses, true)
		.compile(true);

	$: tabControllerNavContainerClasses = th
		.create('TabControllerNavContainer')
		.variant('tabController', variant, theme, true)
		.append('w-full', full)
		.append('hidden sm:block', true)
		.append(navContainerClasses, true)
		.compile(true);

	$: tabControllerNavClasses = th
		.create('TabControllerNav')
		.option('roundeds', rounded, rounded && !['underlined', 'labeled'].includes(variant))
		.option('shadows', shadowed, shadowed && variant !== 'labeled')
		.append('-mb-px', ['underlined', 'default'].includes(variant))
		.append('space-x-4', variant !== 'grouped')
		.append('w-full justify-around space-x-0', full)
		.append('isolate flex', true)
		.append('[&>:not(:first-child):not(:last-child)]:rounded-none', variant === 'grouped')
		.append(navClasses, true)
		.compile(true);
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
					reset={store.reset}
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
				reset={store.reset}
				select={store.select}
				unselect={store.unselect}
				isSelected={store.isSelected}
			/>
		</div>
	</div>
</div>
