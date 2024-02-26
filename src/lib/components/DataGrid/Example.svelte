<script lang="ts">
	import { DataGrid, type DataGridColumnConfig } from '.';
	import jsondata from '../_Example/jsondata.ts.old';
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
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { cubicIn } from 'svelte/easing';
	import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';

	const title = 'DataGrid';
	const description = 'Themed table with responsive layout.';

	const props = {
		full: false,
		focused: true,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'frame' as ThemeColor,
		transitioned: false as boolean // ThemeTransitioned,
	};

	type Data = (typeof jsondata)[number];
	let data = jsondata; // .slice(0, 15);

	// const existing = [] as number[];

	// for (const [i, v] of data.entries()) {
	// 	if (existing.includes(v.id)) {
	// 		v.id = Math.round(v.id + Math.random());
	// 		data[i] = v;
	// 	} else {
	// 		existing.push(v.id);
	// 	}
	// }

	// const columns = ['id', 'title', 'description', 'category', 'price'] as (keyof Item)[];
	const columns = [
		{ accessor: 'id', label: 'ID', width: '75px' },
		{ accessor: 'title', width: '100px', filterable: true },
		{ accessor: 'description', width: '300px', resizeable: true },
		{ accessor: 'category' },
		{ accessor: 'price' }
	] as DataGridColumnConfig<Data>[];

	const flipDurationMs = 300;

	function handleDndConsiderColumn(e: any) {
		console.log('consider', e.detail);
		// columns = e.detail.items;
	}
	function handleDndFinalizeColumn(e: any) {
		console.log('final', e.detail);
		// columns = e.detail.items;
	}

	const getClasses = (item: any) => {
		return item[SHADOW_ITEM_MARKER_PROPERTY_NAME] ? 'dragging' : '';
	};
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

	<DataGrid {...props} {columns} items={data} let:rows let:columns>
		<DataGridSearch />

		<div
			use:dndzone={{ items: columns, flipDurationMs, dropTargetStyle: {} }}
			on:consider={handleDndConsiderColumn}
			on:finalize={handleDndFinalizeColumn}
		>
			<DataGridHeader>
				{#each columns as column (column.id)}
					<div animate:flip={{ duration: flipDurationMs }} class={getClasses(column)}>
						<DataGridHeaderCell accessor={column.accessor} let:sort let:sortdir>
							<button on:click={sort} class="outline-none">{column.label} ({sortdir})</button>
						</DataGridHeaderCell>
						{#if column[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
							<div in:fade={{ duration: 200, easing: cubicIn }} class="placeholder" />
						{/if}
					</div>
				{/each}

				<svelte:fragment slot="filter">
					<DataGridFilter />
				</svelte:fragment>
			</DataGridHeader>
		</div>

		<!-- <DataGridFilter /> -->

		<DataGridBody>
			{#each rows as row (row.id)}
				<div animate:flip={{ duration: flipDurationMs }}>
					<DataGridRow>
						{#each columns as { accessor, id } (id)}
							<div animate:flip={{ duration: flipDurationMs }}>
								<DataGridCell {accessor}>{row[accessor]}</DataGridCell>
							</div>
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
