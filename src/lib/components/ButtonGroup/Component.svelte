<script lang="ts">
	import {
		type ButtonGroupProps,
		buttonGroupDefaults as defaults,
		type ButtonGroupContext
	} from './module';
	import { themer, themeStore } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import { setContext } from 'svelte';
	import { useSelect } from '$lib/stores/select';
	import { cleanObj, ensureArray, boolToMapValue } from '$lib/utils';

	type $$Props = ButtonGroupProps & Omit<ElementProps<'span'>, 'size'>;

	export let {
		focused,
		full,
		hovered,
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

	const globals = cleanObj({
		focused,
		full,
		hovered,
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
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.append('w-full', full)
		.append('isolate inline-flex [&>:not(:first-child):not(:last-child)]:rounded-none', true)
		.append('space-x-4', variant === 'text')
		.append($$restProps.class, true)
		.compile();

	function handleReset() {}
</script>

<span role="list" class={buttonGroupClasses}>
	<slot
		selectedItems={$store.selected}
		reset={handleReset}
		select={store.select}
		unselect={store.unselect}
		isSelected={store.isSelected}
	/>
</span>
