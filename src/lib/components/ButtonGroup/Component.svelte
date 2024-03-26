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
		value,
		shadowed,
		size,
		theme,
		transitioned,
		variant
	} = {
		...cleanObj($themeStore.defaults?.component),
		...defaults
	} as Required<ButtonGroupProps>;

	const store = useSelect({ selected: value, mode: multiple ? 'multiple' : 'single' });

	setContext<ButtonGroupContext>('ButtonGroup', {
		...store,
		globals: {
			focused,
			full,
			hovered,
			rounded,
			size,
			theme,
			transitioned,
			variant
		}
	});

	$: buttonGroupClasses = themer($themeStore)
		.create('ButtonGroup')
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.prepend('button-group', true)
		.append('w-full', full)
		.append('[&>:not(:first-child):not(:last-child)]:rounded-none', variant !== 'ghost')
		.append('isolate inline-flex', true)
		.append('space-x-4', variant === 'flushed')
		.append('gap-1', ['ghost', 'flushed'].includes(variant))
		.append($$restProps.class, true)
		.compile();

	function handleReset() {
		store.reset();
	}
</script>

<span role="list" class={buttonGroupClasses}>
	<slot
		selected={$store.selected}
		reset={store.reset}
		select={store.select}
		unselect={store.unselect}
	/>
</span>
