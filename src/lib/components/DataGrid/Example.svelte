<script lang="ts">
	import { DataGrid, type DataGridColumnConfig, type DataGridProps } from '.';
	import { jsondata } from '../_Example/jsondata';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { DataGridHeader } from '../DataGridHeader';
	import { DataGridRow } from '../DataGridRow';
	import { DataGridCell } from '../DataGridCell';
	import { DataGridBody } from '../DataGridBody';
	import { DataGridHeaderCell } from '../DataGridHeaderCell';
	import { DataGridSearch } from '../DataGridSearch';
	import Section from '../_Example/Section.svelte';
	import { flip } from 'svelte/animate';
	import { DataGridFilterCell } from '../DataGridFilterCell';

	type Data = (typeof jsondata)[number];
	type Column = DataGridColumnConfig<Data>;

	const title = 'DataGrid';
	const description = 'Themed table with responsive layout.';

	const props = {
		full: false,
		focused: true,
		rounded: 'md' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'frame' as ThemeColor,
		transitioned: false as boolean, // ThemeTransitioned,
		stacked: false,
		autocols: true,
		divided: true,
		sticky: true,
		resizeable: true,
		reorderable: true,
		rowkey: 'id'
	} as DataGridProps<Column, Data>;

	let datagrid: DataGrid<Column, Data>;

	let data = jsondata; // .slice(0, 15);

	const initColumns = [
		{ accessor: 'id', label: 'ID', width: '75px' },
		{ accessor: 'title', filterable: true, width: '150px' },
		{ accessor: 'description', filterable: true, width: '300px', resizeable: true },
		{ accessor: 'category' },
		{ accessor: 'price' },
		{ accessor: 'actions' }
	] as DataGridColumnConfig<Data>[];

	const flipDurationMs = 300;
</script>

<ExamplePage {title} {description}>
	<DataGrid
		bind:this={datagrid}
		{...props}
		columns={initColumns}
		rows={data}
		let:rows
		let:columns
		let:remove
	>
		<!-- <DataGridSearch /> -->

		<DataGridHeader>
			<DataGridRow divided={false}>
				{#each columns as { accessor, label }, index (index)}
					<div animate:flip={{ duration: 300 }}>
						<DataGridHeaderCell {accessor} let:sort let:sortdir>
							{#if accessor === 'actions'}
								<div class="text-center">Actions</div>
							{:else}
								<button on:click={sort} class="outline-none">{label} ({sortdir})</button>
							{/if}
						</DataGridHeaderCell>
					</div>
				{/each}
			</DataGridRow>

			<DataGridRow divided={false}>
				{#each columns as column, index (index)}
					<DataGridFilterCell {column} />
				{/each}
			</DataGridRow>
		</DataGridHeader>

		<!-- <DataGridFilter /> -->

		<DataGridBody>
			{#each rows as row (row.id)}
				<div animate:flip={{ duration: flipDurationMs }}>
					<DataGridRow>
						{#each columns as { accessor, label }, index (index)}
							{#if accessor === 'actions'}
								<DataGridCell {accessor} class="flex items-center justify-center">
									<button
										on:click={() => alert(`Would remove row "${row.id}"`)}
										class="text-rose-500"
									>
										<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24"
											><path
												fill="currentColor"
												d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
											/></svg
										>
									</button>
								</DataGridCell>
							{:else}
								<DataGridCell {accessor}>
									{#if props.stacked}
										<div class="grid grid-flow-col auto-cols-max gap-2">
											<div class="capitalize min-w-20">{label}:</div>
											<div class="ml-4 max-w-64 flex-wrap">{row[accessor]}</div>
										</div>
									{:else}
										{row[accessor]}
									{/if}
								</DataGridCell>
							{/if}
						{/each}
					</DataGridRow>
				</div>
			{/each}
		</DataGridBody>
	</DataGrid>
</ExamplePage>
