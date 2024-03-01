<script lang="ts">
	import { uniqid } from '$lib/utils';

	import { getContext } from 'svelte';
	import { type DataGridHeaderCellProps, gridHeaderCellDefaults as defaults } from './module';
	import { themeStore, themer } from '$lib/theme';
	import type {
		DataGridColumnConfig,
		DataGridContext,
		DataGridDataItem
	} from '$lib/components/DataGrid';
	import type { ElementProps } from '$lib/types';

	type DragHandlerEvent = DragEvent & {
		currentTarget: EventTarget & HTMLDivElement;
		target: null | (EventTarget & { id?: string | null });
	};

	type Data = $$Generic<DataGridDataItem>;
	type $$Props = DataGridHeaderCellProps<Data> & ElementProps<'div'>;

	const context = getContext('DataGrid') as DataGridContext;
	const id = uniqid();

	export let { accessor, focused, size, stacked, theme } = {
		...defaults,
		focused: context.globals?.focused,
		size: context.globals?.size,
		stacked: context.globals?.stacked,
		theme: context.globals?.theme
	} as Required<$$Props>;

	$: sortkey = $context?.sort.find((v) => [accessor, '-' + accessor].includes(v));
	$: sortdir = typeof sortkey === 'undefined' ? 0 : sortkey.charAt(0) === '-' ? -1 : 1;

	$: gridHeaderCellClasses = themer($themeStore)
		.create('DataGridHeaderCell')
		.option('gridHeaderPadding', size, size)
		.option('common', 'focusedOutlineWithin', focused)
		.option('outlineFocusWithin', theme, focused)
		.prepend('datagrid-cell datagrid-header-cell', true)
		.append('select-none outline-inset', true)
		.append($$restProps.class, true)
		.compile();

	function sort() {
		const key = sortdir === 0 ? accessor : '-' + accessor;
		context.sortby(key);
	}

	function getHeaderChildren(child: HTMLElement) {
		const children = child.closest('.datagrid-header-row')?.children;
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
		event.currentTarget.style.backgroundColor = 'rgb(var(--frame-400))';
	}

	function onDragOver(event: DragHandlerEvent) {
		event.preventDefault();
	}

	function onDrop(event: DragHandlerEvent) {
		if (!event.dataTransfer || !event.target) {
			console.warn(`Column reorder on DROP failed, invalid target.`);
			return;
		}
		const sourceIndex = Number(event.dataTransfer.getData('text'));
		const targetIndex = getIndex(event.target as HTMLElement);

		if (targetIndex === null) {
			console.warn(`Column reorder event DROP failed, unknown target index.`);
			return;
		}
		event.dataTransfer.clearData();
		context.swapColumns(sourceIndex, targetIndex);
	}
</script>

<div
	role="presentation"
	{id}
	{...$$restProps}
	data-accessor={accessor}
	class={gridHeaderCellClasses}
	draggable="true"
	on:dragstart={onDragStart}
	on:dragover={onDragOver}
	on:drop={onDrop}
>
	<slot {sort} {sortdir} />
</div>
