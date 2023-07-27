<script>import ExamplePage from "../_Example/ExamplePage.svelte";
import SelectShadowed from "../_Example/SelectShadowed.svelte";
import SelectRounded from "../_Example/SelectRounded.svelte";
import SelectSize from "../_Example/SelectSize.svelte";
import SelectTheme from "../_Example/SelectTheme.svelte";
import Pagination, {} from ".";
import PaginationPage from "../PaginationPage";
import jsondata from "../jsondata";
import ListOptions from "../_Example/ListOptions.svelte";
import ToggleOptions from "../_Example/ToggleOptions.svelte";
import Section from "../_Example/Section.svelte";
const title = "Pagination";
const description = "Pager for data tables and record sets.";
const code = `
  `;
const props = {
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "light",
  transitioned: false,
  variant: "default"
};
let pagination = null;
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<span class="italic">No Toggle Options</span>
	</ToggleOptions>
	<ListOptions>
		<SelectTheme bind:value={props.theme} />
		<SelectSize bind:value={props.size} />
		<SelectRounded bind:value={props.rounded} />
		<SelectShadowed bind:value={props.shadowed} />
	</ListOptions>

	<Section>
		<hr />
	</Section>

	<Section>
		{#key props}
			<Pagination
				{...props}
				bind:this={pagination}
				variant="grouped"
				items={jsondata.length}
				page={1}
				pageSize={10}
				pages={10}
				let:activePages
			>
				{#each activePages as page}
					<PaginationPage as="a" value={page}>{page}</PaginationPage>
				{/each}
			</Pagination>
		{/key}
	</Section>

	<Section>
		{#key props}
			<Pagination
				{...props}
				bind:this={pagination}
				variant="flushed"
				items={jsondata.length}
				page={1}
				pageSize={10}
				pages={10}
				let:activePages
			>
				{#each activePages as page}
					<PaginationPage as="a" value={page}>{page}</PaginationPage>
				{/each}
			</Pagination>
		{/key}
	</Section>

	<Section>
		{#key props}
			<Pagination
				{...props}
				bind:this={pagination}
				variant="grouped"
				items={jsondata.length}
				page={1}
				pageSize={5}
				pages={3}
				ellipsis
				let:activePages
				let:page
				let:totalPages
				let:startPage
				let:endPage
			>
				<PaginationPage as="a" previous />
				{#each activePages as page}
					<PaginationPage as="a" value={page} />
				{/each}
				<PaginationPage as="a" next />
			</Pagination>
		{/key}
	</Section>
</ExamplePage>
