<script lang="ts">
	import { type TabPanelProps, tabPanelDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import type { ElementNativeProps } from '../types';
	import { useDisclosure } from '$lib/stores';
	import { getContext, onMount } from 'svelte';
	import type { TabControllerContext } from '../TabController';

	type $$Props = TabPanelProps & ElementNativeProps<'div'>;

	export let { unmount, value } = {
		...defaults
	} as Required<$$Props>;

	const context = getContext('TabController') as TabControllerContext;

	$: visible = $context?.selected?.includes(value);

	$: tabPanelStyles = $context.visible
		? $$restProps.style
		: !unmount
		? 'display:none;'
		: $$restProps.style;

	$: tabPanelClasses = themer($themeStore)
		.create('TabPanel')
		.append($$restProps.class, true)
		.compile(true);
</script>

{#if (unmount && visible) || !unmount}
	<div {...$$restProps} class={tabPanelClasses} style={tabPanelStyles}>
		<slot />
	</div>
{/if}
