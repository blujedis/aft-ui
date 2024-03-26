<script lang="ts">
	import { type TooltipProps, tooltipDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import { boolToMapValue, cleanObj } from '$lib/utils';
	import { onMount } from 'svelte';
	import { createPopoverInstance } from '$lib/hooks/usePopover';

	type Tag = $$Generic<'div' | 'a'>;
	type $$Props = TooltipProps<Tag> & Omit<ElementProps<Tag>, 'size'>;

	export let {
		arrowed,
		as,
		escapeable,
		events,
		middleware,
		offset,
		padding,
		placement,
		rounded,
		role,
		shadowed,
		size,
		sticky,
		strategy,
		theme,
		trigger,
		variant,
		onChange
	} = {
		...cleanObj($themeStore.defaults?.component, ['transitioned', 'hovered', 'focused']),
		...defaults
	} as Required<TooltipProps<Tag>>;

	let popover: ReturnType<typeof createPopoverInstance>;
	let placeholderRef: HTMLElement;
	let arrowRef: HTMLElement;
	let contentRef: HTMLElement;
	let triggerRef: string | HTMLElement;
	let visible = false;

	const th = themer($themeStore);

	$: popoverClasses = th
		.create('Badge')
		.bundle(['mainBg', 'filledText'], theme, variant === 'filled')
		.bundle(
			['mainRing', 'unfilledText'],
			{ $base: 'ring-1 ring-inset' },
			theme,
			variant === 'outlined'
		)
		.bundle(['softBg', 'unfilledText'], {}, theme, variant === 'soft')
		.option('badgeFontSizes', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.prepend('popover', true)
		.append('z-50', true)
		.append($$restProps.class, true)
		.compile();

	$: arrowClasses = th
		.create('PopoverArrow')
		.prepend('popover-arrow', true)
		.append('absolute pointer-events-none w-2 h-2 rotate-45 bg-inherit border-inherit', true)
		.compile();

	function init(node: HTMLElement) {
		contentRef = node;
		if (contentRef)
			popover.registerContent(contentRef, { arrowRef: arrowed ? arrowRef : undefined });
	}

	function initArrow(node: HTMLElement) {
		arrowRef = node;
	}

	onMount(() => {
		const prevSibling = placeholderRef.previousElementSibling;
		triggerRef = !trigger && prevSibling ? (prevSibling as HTMLElement) : trigger;
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
		{#if arrowed}<div use:initArrow class={arrowClasses} />{/if}
	</svelte:element>
{/if}
