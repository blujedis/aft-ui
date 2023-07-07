<script lang="ts">
	import {
		type ButtonGroupProps,
		buttonGroupDefaults as defaults,
		type ButtonGroupContext
	} from './module';
	import { themer, themeStore } from '$lib/theme';
	import type { ElementNativeProps } from '../types';
	import { setContext } from 'svelte';
	import { useSelect } from '$lib/stores/select';
	import { ensureArray } from '$lib/utils';

	type $$Props = ButtonGroupProps & Omit<ElementNativeProps<'span'>, 'size'>;

	export let {
		focused,
		full,
		multiple,
		rounded,
		selected,
		shadowed,
		size,
		theme,
		transitioned,
		underlined,
		variant
	} = {
		...defaults
	} as Required<ButtonGroupProps>;

	export const store = useSelect({ selected: ensureArray(selected), multiple });

	setContext<ButtonGroupContext>('ButtonGroup', {
		...store,
		globals: {
			focused,
			full,
			rounded,
			size,
			theme,
			transitioned,
			underlined,
			variant
		}
	});

	$: buttonGroupClasses = themer($themeStore)
		.create('ButtonGroup')
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.append('w-full', full)
		.append('isolate inline-flex [&>:not(:first-child):not(:last-child)]:rounded-none', true)
		.append($$restProps.class, true)
		.compile(true);
</script>

<span role="list" class={buttonGroupClasses}>
	<slot
		selectedItems={$store.selected}
		reset={store.reset}
		select={store.select}
		unselect={store.unselect}
		isSelected={store.isSelected}
	/>
</span>
