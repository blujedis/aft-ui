<script lang="ts">
	import { writable } from 'svelte/store';

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

	let dragging = false;
	let focusing = false;

	export let { accessor, focused, size, theme } = {
		...defaults,
		focused: context.globals?.focused,
		size: context.globals?.size,
		theme: context.globals?.theme
	} as Required<$$Props>;

	const th = themer($themeStore);

	$: config = $context.columns.find((v) => v.accessor === accessor) as Required<
		DataGridColumnConfig<DataGridDataItem>
	>;
	$: sortkey = $context?.sort.find((v) => [accessor, '-' + accessor].includes(v));
	$: sortdir = typeof sortkey === 'undefined' ? 0 : sortkey.charAt(0) === '-' ? -1 : 1;
	$: isLast =
		$context.columns.findIndex((c) => c.accessor === accessor) === $context.columns.length - 1;

	$: gridHeaderCellClasses = th
		.create('DataGridHeaderCell')
		.option('gridHeaderPadding', size, size)
		.option('common', 'focusedRingWithin', focused && !dragging)
		.prepend('datagrid-cell datagrid-header-cell', true)
		.append(
			'group-hover:bg-primary-950/5 dark:group-hover:bg-primary-950/20 group-hover:cursor-move',
			config.reorderable
		)
		.append(
			'group-[.dragging]:bg-primary-500/70 group-[.dragging]:text-white dark:group-[.dragging]:bg-primary-800/80',
			config.reorderable
		)
		.append('select-none focus:ring-inset', true)
		.append($$restProps.class, true)
		.compile();

	$: dividerClasses = th
		.create('DataGridHeaderCellDivider')
		.option('dividerBg', theme, theme)
		.prepend('datagrid-header-cell-divider', true)
		.append('w-0.5 h-1/2 absolute z-0 top-1/4 -right-[1.5px]', true)
		.compile();

	function sort() {
		const key = sortdir === 0 ? accessor : '-' + accessor;
		context.sortby(key);
	}

	// Below is basic drag and drop it does not work
	// well with animation but gets the job done for now
	// may improve in the future.

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

<div class="relative group" class:dragging>
	{#if config.reorderable}
		<div
			role="columnheader"
			{id}
			tabindex="-1"
			{...$$restProps}
			aria-grabbed={dragging}
			class={gridHeaderCellClasses}
			draggable={config.reorderable}
			on:dragstart={onDragStart}
			on:dragover={onDragOver}
			on:drop={onDrop}
			on:dragend={() => (dragging = false)}
			on:focusin={() => (focusing = true)}
			on:focusout={() => (focusing = false)}
		>
			<slot {sort} {sortdir} />
		</div>
	{:else}
		<div role="columnheader" {id} {...$$restProps} class={gridHeaderCellClasses}>
			<slot {sort} {sortdir} />
		</div>
	{/if}
	{#if !dragging && !isLast}
		<div class={dividerClasses} class:hidden={focusing}></div>
	{/if}
</div>
