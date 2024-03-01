<script lang="ts">
	import { DataGrid, type DataGridColumnConfig } from '.';
	import { jsondata } from '../_Example/jsondata';
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
	import { flip } from 'svelte/animate';

	const title = 'DataGrid';
	const description = 'Themed table with responsive layout.';

	const props = {
		full: false,
		focused: true,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'frame' as ThemeColor,
		transitioned: false as boolean, // ThemeTransitioned,
		stacked: true,
		divided: false
	};

	type Data = (typeof jsondata)[number];
	let data = jsondata; // .slice(0, 15);

	const columns = [
		{ accessor: 'id', label: 'ID', width: '75px' },
		{ accessor: 'title', width: '100px', filterable: true },
		{ accessor: 'description', width: '300px', resizeable: true },
		{ accessor: 'category' },
		{ accessor: 'price' }
	] as DataGridColumnConfig<Data>[];

	const flipDurationMs = 300;
</script>

<ExamplePage {title} {description}>
	<Section>
		<ul role="list" class="divide-y divide-gray-200">
			<li class="py-4">
				Filter can be after `DataGridHeader` or can be in fragment slot named `filter` inside of
				`DataGridHeader`
			</li>
			<li />
		</ul>
	</Section>

	<DataGrid
		{...props}
		{columns}
		items={data}
		class={props.stacked ? 'max-w-screen-sm m-auto' : ''}
		let:rows
		let:columns
		let:stacked
	>
		<DataGridSearch />

		<DataGridHeader>
			{#each columns as { accessor, label }, index (index)}
				<div animate:flip={{ duration: 300 }}>
					<DataGridHeaderCell {accessor} let:sort let:sortdir>
						<button on:click={sort} class="outline-none">{label} ({sortdir})</button>
					</DataGridHeaderCell>
				</div>
			{/each}
			<svelte:fragment slot="filter">
				<DataGridFilter />
			</svelte:fragment>
		</DataGridHeader>

		<!-- <DataGridFilter /> -->

		<DataGridBody>
			{#each rows as row (row.id)}
				<div animate:flip={{ duration: flipDurationMs }}>
					<DataGridRow>
						{#each columns as { accessor, label }}
							<DataGridCell {accessor}>
								{#if stacked}
									<div class="grid grid-flow-col auto-cols-max gap-2">
										<div class="capitalize min-w-20">{label}:</div>
										<div class="ml-4 max-w-64 flex-wrap">{row[accessor]}</div>
									</div>
								{:else}
									{row[accessor]}
								{/if}
							</DataGridCell>
						{/each}
					</DataGridRow>
				</div>
			{/each}
		</DataGridBody>
	</DataGrid>
</ExamplePage>

<style>
	.dragging {
		background: whitesmoke;
		opacity: 0.8;
	}
	.placeholder {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		visibility: visible;
		background-color: #edf2f7;
		border: 3px dashed #cbd5e0;
		margin: 0;
	}
</style>
