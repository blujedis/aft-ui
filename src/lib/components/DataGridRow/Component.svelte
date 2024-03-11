<script lang="ts">
	import { type DataGridRowProps, gridRowDefaults as defaults } from './module';
	import { themeStore, styler, themer } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import type { DataGridContext } from '$lib/components/DataGrid';
	import { getContext } from 'svelte';
	import { flip } from 'svelte/animate';

	type $$Props = DataGridRowProps & ElementProps<'div'>;
	type DragHandlerEvent = DragEvent & {
		currentTarget: EventTarget & HTMLDivElement;
		target: null | (EventTarget & { id?: string | null });
	};

	const context = getContext('DataGrid') as DataGridContext;
	let dragging = false;

	export let { autocols, columns, divided, size, striped, stacked, theme } = {
		...defaults,
		autocols: context.globals?.autocols,
		columns: context.globals?.columns,
		divided: context.globals?.divided,
		size: context.globals?.size,
		stacked: context.globals?.stacked,
		striped: context.globals?.striped,
		theme: context.globals?.theme
	} as Required<$$Props>;

	const st = styler($themeStore);

	$: gridRowStyles = st
		.create('DataGridRow')
		.add('--template-columns', context.getDataGridTemplate(), autocols)
		.append($$restProps.style, true)
		.compile();

	$: gridRowClasses = themer($themeStore)
		.create('DataGridRow')
		.option('common', 'divided', divided)
		.prepend('datagrid-row', true)
		.append('divide-x', divided)
		.append('grid grid-flow-col w-full', !stacked)
		.append(stacked ? 'auto-rows-fr py-1.5' : 'auto-cols-fr', autocols)
		.append($$restProps.class, true)
		.compile();

	function getHeaderChildren(child: HTMLElement) {
		const children = child.closest('.datagrid-row')?.children;
		if (!children) return null;
		return Array.from(children);
	}

	function getIndex(el: HTMLElement) {
		const children = getHeaderChildren(el);
		if (!children || !children.length) return null;
		const nodes = Array.from(children);
		let index: number | null = null;
		nodes.forEach((n, i) => {
			if (n.contains(el)) index = i;
		});
		return index;
	}

	function onDragStart(event: DragHandlerEvent) {
		if (!event.dataTransfer) {
			console.warn(`Column reorder on DRAG START failed, invalid target.`);
			return;
		}
		const index = getIndex(event.target as HTMLElement);
		if (index === null) {
			console.warn(`Column reorder failed, cannot find index.`);
			return;
		}
		event.dataTransfer.setData('text/plain', index + '');
		dragging = true;
	}

	function onDragOver(event: DragHandlerEvent) {
		event.preventDefault();
	}

	function onDrop(event: DragHandlerEvent) {
		dragging = false;
		if (!event.dataTransfer || !event.target) {
			console.warn(`Column reorder on DROP failed, invalid target.`);
			return;
		}
		const target = event.target as HTMLElement;
		const sourceIndex = Number(event.dataTransfer.getData('text'));
		const targetIndex = getIndex(event.target as HTMLElement);

		if (targetIndex === null) {
			console.warn(`Column reorder event DROP failed, unknown target index.`);
			return;
		}
		event.dataTransfer.clearData();
		context.swapColumns(sourceIndex, targetIndex);
		target.focus(); // put focus where we dropped.
	}
</script>

{#if $$slots.default}
	<div role="row" {...$$restProps} class={gridRowClasses} style={gridRowStyles}>
		<slot />
	</div>
{/if}

<style>
	.datagrid-row {
		grid-template-columns: var(--template-columns);
	}
</style>
