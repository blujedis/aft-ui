<script lang="ts">
	import { type DataGridHeaderProps, gridHeaderDefaults as defaults } from './module';
	import { themeStore, styler, themer } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import type { DataGridContext } from '$lib/components/DataGrid';
	import { getContext } from 'svelte';
	import { useResizer } from '$lib/hooks';

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
		// .option('common', 'bordered', false)
		.option('common', 'divided', divided)
		.prepend('datagrid-header', true)
		.append('divide-y', divided)
		.append('sticky top-0 z-10 overflow-clip', sticky) // add overflow-clip & "rounded" to keep top rounding
		.append('rounded-b-none', rounded)
		.append('shadow-sm', sticky)
		.compile();

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
