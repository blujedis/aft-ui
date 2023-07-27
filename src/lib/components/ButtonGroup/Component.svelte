<script lang="ts">
	import {
		type ButtonGroupProps,
		buttonGroupDefaults as defaults,
		type ButtonGroupContext
	} from './module';
	import themeStore, { themer } from '$lib';
	import type { ElementNativeProps, ThemeFocused } from '../../types';
	import { onMount, setContext } from 'svelte';
	import { useSelect } from '$lib/stores/select';
	import { cleanObj, ensureArray } from '$lib/utils';

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
		variant
	} = {
		...defaults
	} as Required<ButtonGroupProps>;

	export const store = useSelect({ selected: ensureArray(selected), multiple });
	let mounted = false;

	const globals = cleanObj({
		focused,
		full,
		rounded,
		size,
		theme,
		transitioned,
		variant
	});

	setContext<ButtonGroupContext>('ButtonGroup', {
		...store,
		globals: globals as any
	});

	$: buttonGroupClasses = themer($themeStore)
		.create('ButtonGroup')
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.append('w-full', full)
		.append('isolate inline-flex[&>:not(:first-child):not(:last-child)]:rounded-none', true)
		.append($$restProps.class, true)
		.compile(true);

	function handleReset() {}
	onMount(() => {
		mounted = true;
	});
</script>

<span role="list" class={buttonGroupClasses} class:invisible={!mounted}>
	<slot
		selectedItems={$store.selected}
		reset={handleReset}
		select={store.select}
		unselect={store.unselect}
		isSelected={store.isSelected}
	/>
</span>
