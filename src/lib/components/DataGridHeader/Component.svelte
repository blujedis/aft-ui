<script lang="ts">
	import { type DataGridHeaderProps, gridHeaderDefaults as defaults } from './module';
	import { themeStore, styler, themer } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import type { DataGridContext } from '$lib/components/DataGrid';
	import { getContext } from 'svelte';
	import { useResizer } from '$lib/hooks';
	import { boolToMapValue } from '$lib/utils';

	type $$Props = DataGridHeaderProps & ElementProps<'div'>;

	const context = getContext('DataGrid') as DataGridContext;

	export let { autocols, divided, focused, rounded, size, stacked, sticky, theme, onAfterResize } =
		{
			...defaults,
			autocols: context.globals?.autocols,
			divided: context.globals?.divided,
			focused: context.globals?.focused,
			rounded: context.globals?.rounded,
			size: context.globals?.size,
			stacked: context.globals?.stacked,
			sticky: context.globals?.sticky,
			theme: context.globals?.theme
		} as Required<$$Props>;

	const st = styler($themeStore);
	const th = themer($themeStore);

	$: gridHeaderWrapperClasses = th
		.create('DataGridHeaderWrapper')
		.option('elementDivide', theme, divided)
		.prepend('datagrid-header', true)
		.append('divide-y', divided)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.append(
			'sticky top-0 z-10 bg-[rgb(var(--body-bg-light))] dark:bg-[rgb(var(--body-bg-dark))]',
			sticky
		)
		.append('rounded-b-none', rounded)
		.append('shadow-sm overflow-clip', sticky)
		.compile();

	console.log(rounded);

	function init(node: HTMLDivElement) {
		if (stacked) return; // can't resize columns when in stacked mode.
		const header = node.children[0] as HTMLDivElement;

		if (!header) return;

		const cells = Array.from(header.children);

		for (const [i, c] of cells.entries()) {
			const col = $context.columns[i];
			if (i >= cells.length - 1 || !col.resizeable) continue;

			const [resizer] = useResizer({
				onResizing: ({ newWidth }) => {
					context.updateColumn(col.accessor, { width: newWidth + 'px' });
				},
				onResized: onAfterResize,
				handles: {
					right: true
				},
				debug: false
			});
			resizer(c as HTMLElement);
		}
	}
</script>

{#if $$slots.default && !stacked}
	<div use:init class={gridHeaderWrapperClasses}>
		<slot />
	</div>
{/if}
