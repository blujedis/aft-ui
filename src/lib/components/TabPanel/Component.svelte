<script lang="ts">
	import { type TabPanelProps, tabPanelDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import { getContext } from 'svelte';
	import type { TabsContext } from '$lib/components/Tabs';

	type $$Props = TabPanelProps & ElementProps<'div'>;

	export let { unmount, value } = {
		...defaults
	} as Required<$$Props>;

	const context = getContext('Tabs') as TabsContext;

	$: visible = $context?.selected?.includes(value);

	$: tabPanelStyles = $context.visible
		? $$restProps.style
		: !unmount
			? 'display:none;'
			: $$restProps.style;

	$: tabPanelClasses = themer($themeStore)
		.create('TabPanel')
		.prepend('tab-panel', true)
		.append($$restProps.class, true)
		.compile();
</script>

{#if (unmount && visible) || !unmount}
	<div {...$$restProps} class={tabPanelClasses} style={tabPanelStyles}>
		<slot />
	</div>
{/if}
