<script>import { DataGrid } from ".";
import { jsondata } from "../_Example/jsondata";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { DataGridHeader } from "../DataGridHeader";
import { DataGridRow } from "../DataGridRow";
import { DataGridCell } from "../DataGridCell";
import { DataGridBody } from "../DataGridBody";
import { DataGridHeaderCell } from "../DataGridHeaderCell";
import { DataGridSearch } from "../DataGridSearch";
import Section from "../_Example/Section.svelte";
import { flip } from "svelte/animate";
import { DataGridFilterCell } from "../DataGridFilterCell";
const title = "DataGrid";
const description = "Themed table with responsive layout.";
const props = {
  full: false,
  focused: true,
  rounded: "md",
  shadowed: "none",
  size: "md",
  theme: "frame",
  transitioned: false,
  // ThemeTransitioned,
  stacked: false,
  autocols: true,
  divided: true
};
let data = jsondata;
const initColumns = [
  { accessor: "id", label: "ID", width: "75px" },
  { accessor: "title", filterable: true, width: "150px" },
  { accessor: "description", filterable: true, width: "300px", resizeable: true },
  { accessor: "category" },
  { accessor: "price" },
  { accessor: "actions" }
];
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
		columns={initColumns}
		rows={data}
		class={props.stacked ? 'max-w-screen-md m-auto' : ''}
		let:rows
		let:columns
	>
		<DataGridSearch />

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
			<!-- <svelte:fragment slot="filter">
				<DataGridFilter />
			</svelte:fragment> -->
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

<style>
	/* .dragging {
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
	} */
</style>
