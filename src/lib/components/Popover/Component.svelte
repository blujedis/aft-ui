<script lang="ts">
	import { type PopoverProps, popoverDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import { onMount } from 'svelte';
	import { createPopoverInstance } from '$lib/hooks/usePopover';

	type Tag = $$Generic<'div' | 'a'>;
	type $$Props = PopoverProps<Tag> & Omit<ElementProps<Tag>, 'size'>;

	export let {
		as,
		escapeable,
		events,
		middleware,
		offset,
		padding,
		placement,
		role,
		sticky,
		strategy,
		trigger,
		onChange
	} = {
		...defaults
	} as PopoverProps<Tag>;

	let popover: ReturnType<typeof createPopoverInstance>;
	let placeholderRef: HTMLElement;
	let contentRef: HTMLElement;
	let triggerRef: string | HTMLElement;
	let visible = false;

	const th = themer($themeStore);

	$: popoverClasses = th
		.create('Badge')
		.prepend('popover', true)
		.append('z-50', true)
		.append($$restProps.class, true)
		.compile();

	function init(node: HTMLElement) {
		contentRef = node;
		if (contentRef) popover.registerContent(contentRef, { middleware, placement });
	}

	onMount(() => {
		const prevSibling = placeholderRef.previousElementSibling;
		triggerRef = !trigger && prevSibling ? (prevSibling as HTMLElement) : (trigger as string);
		popover = createPopoverInstance({
			events,
			escapeable,
			offset,
			padding,
			placement,
			sticky,
			strategy,
			onChange: (state) => (visible = state)
		});
		if (triggerRef) {
			popover.registerTrigger(triggerRef);
		}
		return () => {
			if (popover) popover.destroy();
		};
	});
</script>

{#if !triggerRef}
	<div bind:this={placeholderRef} />
{/if}

{#if visible && triggerRef}
	<svelte:element this={as} use:init {...$$restProps} {role} class={popoverClasses}>
		<slot />
	</svelte:element>
{/if}
