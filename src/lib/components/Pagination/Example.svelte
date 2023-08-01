<script lang="ts">
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import Pagination, { type PaginationVariant } from '.';
	import PaginationPage from '../PaginationPage';
	import jsondata from '../_Example/jsondata';
	import type {
		ThemeColor,
		ThemeRounded,
		ThemeShadowed,
		ThemeSize,
		ThemeTransitioned
	} from '../../types';
	import Section from '../_Example/Section.svelte';

	const title = 'Pagination';
	const description = 'Pager for data tables and record sets.';
	const code = `
  `;

	const props = {
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'light' as ThemeColor,
		transitioned: false as ThemeTransitioned,
		variant: 'default' as PaginationVariant
	};

	let pagination = null as Pagination<any> | null;
	// const context = pagination?.context;
</script>

<ExamplePage {title} {description} {code}>
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
