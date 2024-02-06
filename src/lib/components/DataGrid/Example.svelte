<script lang="ts">
	import { DataGrid, type DataGridColumnConfig, type DataGridVariant } from '.';
	import jsondata from '../_Example/jsondata';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { DataGridHeader } from '../DataGridHeader';
	import { DataGridRow } from '../DataGridRow';
	import { DataGridCell } from '../DataGridCell';
	import { DataGridBody } from '../DataGridBody';
	import { DataGridFilter } from '../DataGridFilter';
	import { DataGridHeaderCell } from '../DataGridHeaderCell';
	import { DataGridSearch } from '../DataGridSearch';
	import Section from '../_Example/Section.svelte';

	const title = 'DataGrid';
	const description = 'Themed table with responsive layout.';
	const code = `
<DataGrid variant="filled" rounded="lg" size="sm" {columns} items={jsondata} let:rows let:columns>
	<DataGridHeader>
		{#each columns as { accessor, label }}
			<DataGridHeaderCell {accessor} let:sort let:sortdir>
				<button on:click={sort}>{label} ({sortdir})</button>
			</DataGridHeaderCell>
		{/each}
		<svelte:fragment slot="filter">
			<DataGridFilter />
		</svelte:fragment>
	</DataGridHeader>

	<DataGridBody>
		{#each rows as row}
			<DataGridRow>
				{#each columns as { accessor }}
					<DataGridCell {accessor}>{row[accessor]}</DataGridCell>
				{/each}
			</DataGridRow>
		{/each}
	</DataGridBody>
</DataGrid>
  `;

	const props = {
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'success' as ThemeColor,
		transitioned: false as boolean, // ThemeTransitioned,
		variant: 'outlined' as DataGridVariant
	};

	type Data = (typeof jsondata)[number];
	const data = jsondata;
	// const columns = ['id', 'title', 'description', 'category', 'price'] as (keyof Item)[];
	const columns = [
		{ accessor: 'id', label: 'ID', width: '75px' },
		{ accessor: 'title', width: '100px', filterable: true },
		{ accessor: 'description', width: '300px' },
		{ accessor: 'category' },
		{ accessor: 'price' }
	] as DataGridColumnConfig<Data>[];
</script>

<ExamplePage {title} {description} {code}>
	<Section>
		<ul role="list" class="divide-y divide-gray-200">
			<li class="py-4">
				Filter can be after `DataGridHeader` or can be in fragment slot named `filter` inside of
				`DataGridHeader`
			</li>
			<li />
		</ul>
	</Section>

	<DataGrid variant="filled" rounded="lg" size="sm" {columns} items={jsondata} let:rows let:columns>
		<DataGridSearch />
		<DataGridHeader>
			{#each columns as { accessor, label }}
				<DataGridHeaderCell {accessor} let:sort let:sortdir>
					<button on:click={sort}>{label} ({sortdir})</button>
				</DataGridHeaderCell>
			{/each}
			<svelte:fragment slot="filter">
				<DataGridFilter />
			</svelte:fragment>
		</DataGridHeader>

		<DataGridBody>
			{#each rows as row}
				<DataGridRow>
					{#each columns as { accessor }}
						<DataGridCell {accessor}>{row[accessor]}</DataGridCell>
					{/each}
				</DataGridRow>
			{/each}
		</DataGridBody>
	</DataGrid>
</ExamplePage>
