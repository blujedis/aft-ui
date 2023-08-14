<script lang="ts">
	import type { AccordionContext } from '../Accordion/module';
	import { getContext, setContext } from 'svelte';
	import {
		type AccordionPanelProps,
		accordionPanelDefaults as defaults,
		type AccordionPanelContext
	} from './module';
	import { themer, themeStore } from '../../theme';
	import type { ElementNativeProps, HTMLTag } from '../../types';

	type Tag = $$Generic<HTMLTag>;
	type $$Props = AccordionPanelProps<Tag> & ElementNativeProps<Tag>;

	const context = getContext('Accordion') as AccordionContext;

	export let { as, key } = {
		...defaults
	} as Required<AccordionPanelProps<Tag>>;

	setContext('AccordionPanel', {
		key
	}) as AccordionPanelContext;

	const th = themer($themeStore);

	$: accordionPanelClasses = th
		.create('AccordionPanel')
		.append($$restProps.class, true)
		.compile(true);
</script>

<svelte:element this={as} {...$$restProps} class={accordionPanelClasses}>
	<slot open={() => context.select(key)} close={() => context.select(key)} />
</svelte:element>
