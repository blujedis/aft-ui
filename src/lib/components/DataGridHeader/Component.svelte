<script lang="ts">
	import { type DataGridHeaderProps, gridHeaderDefaults as defaults } from './module';
	import { themeStore, pickCleanProps, styler, themer } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import type { DataGridContext } from '$lib/components/DataGrid';
	import { getContext } from 'svelte';
	import { useResizer } from '$lib';
	import type { ChannelListener } from 'diagnostics_channel';

	type $$Props = DataGridHeaderProps & ElementProps<'div'>;

	const context = getContext('DataGrid') as DataGridContext;

	export let { autocols, divided, focused, rounded, size, sticky, theme, onAfterResize } = {
		...defaults,
		autocols: context.globals?.autocols,
		divided: context.globals?.divided,
		focused: context.globals?.focused,
		rounded: context.globals?.rounded,
		size: context.globals?.size,
		sticky: context.globals?.sticky,
		theme: context.globals?.theme
	} as Required<$$Props>;

	const st = styler($themeStore);
	const th = themer($themeStore);

	$: gridHeaderStyles = st
		.create('DataGridHeader')
		.add('--template-columns', context.getDataGridTemplate(), autocols)
		.compile();

	$: gridHeaderWrapperClasses = th
		.create('DataGridHeaderWrapper')
		.option('common', 'divided', divided && $$slots.filter)
		.option('common', 'bordered', true)
		.prepend('datagrid-header', true)
		.append('divide-y', divided && $$slots.filter)
		.append('sticky top-0 z-10', sticky) // add overflow-clip & "rounded" to keep top rounding
		.append('!border-b -mb-px', sticky && divided) // must be !important b/c of divide-y
		.append('rounded-b-none', rounded)
		.append('shadow-sm', sticky)
		.compile();

	$: gridHeaderClasses = th
		.create('DataGridHeader')
		.append('auto-cols-fr', autocols)
		.prepend('datagrid-header-row', true)
		.append('grid grid-flow-col w-full body-light dark:body-dark', true)
		.append($$restProps.class, true)
		.compile();

	function init(node: HTMLDivElement) {
		const header = node.children[0] as HTMLDivElement;

		if (!header) return;

		const cells = Array.from(header.children);

		for (const [i, c] of cells.entries()) {
			const col = $context.columns[i];
			if (i >= cells.length - 1 || !col.resizeable) continue;

			const [resizer] = useResizer({
				onResizing: ({ newWidth }) => {
					context.updateColumn(col.accessor, { width: newWidth + 'px' }, (columns) => {
						// manually update local columns.
						gridHeaderStyles = `--template-columns: ${context.getDataGridTemplate(columns)}`;
					});
				},
				onResized: onAfterResize,
				handles: {
					right: true
				},
				debug: true
			});
			resizer(c as HTMLElement);
		}
	}
</script>

<div use:init class={gridHeaderWrapperClasses}>
	<div {...$$restProps} class={gridHeaderClasses} style={gridHeaderStyles}>
		<slot />
	</div>

	<slot name="filter" />
</div>

<style>
	.datagrid-header-row {
		grid-template-columns: var(--template-columns);
	}
</style>
