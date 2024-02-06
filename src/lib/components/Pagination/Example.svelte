<script lang="ts">
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { Pagination, type PaginationVariant } from '.';
	import { PaginationPage } from '../PaginationPage';
	import jsondata from '../_Example/jsondata';
	import { colors } from '$lib/constants';
	import type {
		ThemeColor,
		ThemeRounded,
		ThemeShadowed,
		ThemeSize,
		ThemeTransitioned
	} from '$lib/types';

	const title = 'Pagination';
	const description = 'Pager for data tables and record sets.';
	const code = `
  `;

	const props = {
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'default' as ThemeColor,
		transitioned: false as ThemeTransitioned,
		variant: 'grouped' as PaginationVariant
	};

	let pagination = null as Pagination<any> | null;
</script>

<ExamplePage {title} {description} {code}>
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
					variant="glass"
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
