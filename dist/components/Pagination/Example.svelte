<script>import ExamplePage from "../_Example/ExamplePage.svelte";
import { Pagination } from ".";
import { PaginationPage } from "../PaginationPage";
import jsondata from "../_Example/jsondata.ts.old";
import { colors } from "../../constants";
const title = "Pagination";
const description = "Pager for data tables and record sets.";
const props = {
  focused: true,
  hovered: true,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "default",
  transitioned: false,
  variant: "grouped"
};
let pagination = null;
</script>

<ExamplePage {title} {description}>
	{#each colors as color}
		<div class="grid grid-cols-3 gap-2 mb-8">
			<div>
				<Pagination
					{...props}
					bind:this={pagination}
					variant="flushed"
					items={jsondata.length}
					page={1}
					pageSize={10}
					pages={10}
					theme={color}
					let:activePages
				>
					{#each activePages as page}
						<PaginationPage value={page}>{page}</PaginationPage>
					{/each}
				</Pagination>
			</div>

			<div>
				<Pagination
					{...props}
					bind:this={pagination}
					variant="filled"
					items={jsondata.length}
					page={1}
					pageSize={5}
					pages={3}
					ellipsis
					theme={color}
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
			</div>

			<div>
				<Pagination
					{...props}
					bind:this={pagination}
					variant="soft"
					items={jsondata.length}
					page={1}
					pageSize={5}
					pages={3}
					ellipsis
					theme={color}
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
			</div>
		</div>
	{/each}
</ExamplePage>
