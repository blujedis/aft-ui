<script lang="ts">
	import { type DropdownPanelProps, dropdownPanelDefaults as defaults } from './module';
	import themeStore, { themer, transitioner } from '$lib';
	import { getContext } from 'svelte';
	import type { DropdownContext } from '$lib/components/Dropdown/module';
	import type { ElementNativeProps } from '../../types';

	type $$Props = DropdownPanelProps & ElementNativeProps<'div'>;

	const context = getContext<DropdownContext>('Dropdown');

	export let { origin, position, rounded, shadowed, theme, transition, unmount, variant, width } = {
		...defaults,
		rounded: context?.globals.rounded,
		shadowed: context?.globals.shadowed,
		theme: context?.globals.theme
	} as Required<$$Props>;

	let ref: HTMLDivElement | undefined;
	let mounted = false;

	$: panelClasses = themer($themeStore)
		.create('DropdownPanel')
		.variant('dropdownPanel', variant, theme, true)
		.option('roundeds', rounded === 'full' ? 'xl2' : rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.append(`dropdown-panel absolute z-30 mt-1 min-w-full focus:outline-none`, true)
		.append(position === 'right' ? 'right-0' : 'left-0', true)
		.append(origin === 'right' ? 'origin-top-right' : 'origin-top-left', true)
		.append('origin-center', origin === 'center')
		.append($$restProps.class, true)
		.compile(true);

	function getChildren() {
		const container = ref?.firstChild as HTMLElement;
		const items = (Array.from(container.children) || []) as HTMLElement[];
		return [items, container] as [HTMLElement[], HTMLElement];
	}

	function focusActive(items?: HTMLElement[], fallbackNode?: HTMLElement) {
		items = items || getChildren()[0];
		console.log(items);
		let activeNode = items.find((node) => $context.selected.includes(node.dataset.value as any));
		if (activeNode) {
			activeNode.focus();
		} else if (fallbackNode) {
			activeNode = fallbackNode;
			fallbackNode.focus();
		}
		return activeNode;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.repeat || !['ArrowUp', 'ArrowDown', ' ', 'Enter'].includes(e.key)) return;
		const [items, container] = getChildren();
		if (!items.length) return; // nothing to do aren't any option items.
		const activeNode = document.activeElement as HTMLElement;
		//////////////////////////////////////////////
		// User is selecting current value.
		//////////////////////////////////////////////
		if ((e.key === ' ' || e.key === 'Enter') && container.contains(activeNode)) {
			// already selected nothing to do.
			e.preventDefault();
			const isSelected = $context.selected.includes(activeNode.dataset.value as any);
			if (context.globals.multiple) {
				if (isSelected) activeNode.dataset.value && context.remove(activeNode.dataset.value);
				else context.select(activeNode.dataset.value);
			} else if (!$context.selected.includes(activeNode.dataset.value as any)) {
				context.select(activeNode.dataset.value);
				context.close();
			}
			// if ($context.selected.includes(activeNode.dataset.value as any) && !context.globals.multiple) return;
		}
		//////////////////////////////////////////////
		// User is navigating options.
		//////////////////////////////////////////////
		else {
			let currentNode: HTMLElement | undefined;
			if (container.contains(activeNode)) {
				// already navigating child nodes.
				const currentIndex = items.indexOf(activeNode);
				const nextIndex = e.key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
				// Nothing to do is a repeat key or out of scope.
				if (nextIndex < 0 || nextIndex > items.length - 1) return;
				// Otherwise set the current node to the new index.
				currentNode = items[nextIndex];
				if (currentNode) currentNode.focus();
			} else {
				// dropdown expanded start at first or selected node.
				focusActive(items, items[0]);
			}
		}
	}

	function setPanelRef(el: HTMLDivElement) {
		mounted = true;
		context.update((s) => ({ ...s, panel: el }));
		el.focus();
	}
</script>

<!-- Panel is set invisible until mounted to ensure binding
	     manually created source items
	-->
{#if (unmount && $context.visible) || !unmount || !mounted}
	<div
		role={context.strategy === 'menu' ? 'menu' : 'listbox'}
		aria-orientation="vertical"
		tabindex="-1"
		{...$$restProps}
		bind:this={ref}
		use:setPanelRef
		on:keydown={handleKeydown}
		transition:transitioner={transition}
		class={panelClasses}
		class:invisible={!mounted}
	>
		<div class="py-1 flex flex-col" role="none">
			<slot selected={$context.selected} filtered={$context.filtered} />
		</div>
	</div>
{/if}
