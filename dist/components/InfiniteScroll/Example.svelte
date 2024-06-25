<script>import { InfiniteScroll } from ".";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { onMount } from "svelte";
const title = "Infinite Scroll";
const description = "Simple Infinite Scroll helper.";
let list;
let page = 0;
let size = 10;
let data = [];
$:
  data = [...data];
async function fetchData() {
  window.fetch(`https://dummyjson.com/products/?limit=${size}&skip=${size * page}`).then((res) => res.json()).then((res) => data = [...data, ...res.products]);
}
onMount(async () => {
  fetchData();
});
</script>

<ExamplePage {title} {description}>
	<div
		bind:this={list}
		class="divide-y divide-gray-100 dark:divide-gray-700/80 h-64 overflow-y-auto"
	>
		{#each data as item}
			<div class="py-1 flex space-x-2 items-center">
				<div class="h-12 w-12">
					<img src={item.images[0]} alt={item.description} />
				</div>
				<div>{item.description}</div>
				<div>{item.price}</div>
			</div>
		{/each}
		<!-- InfiniteScroll should be child of scrolling element by default the ParentNode
         is selected. Otherwise the -->
		<InfiniteScroll
			threshold={0}
			hasMore={true}
			on:load={() => {
				page++;
				fetchData();
			}}
		/>
	</div>
</ExamplePage>
