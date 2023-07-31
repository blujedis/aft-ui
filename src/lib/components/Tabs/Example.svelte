<script lang="ts">
	import Tabs from '.';
	import Tab, { type TabVariant } from '../Tab';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
	import TabPanel from '../TabPanel';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	const title = 'Tabs';
	const description = 'Themed Tabs and Tab controller component.';
	const code = `
  `;

	const props = {
		condensed: true,
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'light' as ThemeColor,
		transitioned: false as boolean, // ThemeTransitioned,
		variant: 'accented' as TabVariant
	};

	const tabs = [
		{
			value: 'java',
			label: 'Java',
			description:
				'Java is a multi-platform, object-oriented, and network-centric language that can be used as a platform in itself. It is a fast, secure, reliable programming language for coding everything from mobile apps and enterprise software to big data applications and server-side technologies.'
		},
		{
			value: 'javascript',
			label: 'JavaScript',
			description:
				'JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat.'
		},
		{
			value: 'python',
			label: 'Python',
			description:
				'Python is an interpreted, object-oriented, high-level programming language with dynamic semantics developed by Guido van Rossum. It was originally released in 1991. Designed to be easy as well as fun, the name "Python" is a nod to the British comedy group Monty Python.'
		},
		{
			value: 'react',
			label: 'React',
			description:
				'React is a JavaScript-based UI development library. Facebook and an open-source developer community run it. Although React is a library rather than a language, it is widely used in web development. The library first appeared in May 2013 and is now one of the most commonly used frontend libraries for web development.'
		}
	];
</script>

<ExamplePage {title} {description} {code}>
	<div class="mb-4">
		<div class="text-sm mb-4">Flushed:</div>
		{#key props}
			<Tabs {...props} variant="flushed" selected="python">
				<svelte:fragment slot="tabs">
					{#each tabs as tab}
						<Tab as="a" value={tab.value}>{tab.label}</Tab>
					{/each}
				</svelte:fragment>
				<svelte:fragment slot="panels">
					{#each tabs as tab}
						<TabPanel value={tab.value} class="flex p-4">{tab.description}</TabPanel>
					{/each}
				</svelte:fragment>
			</Tabs>
		{/key}
	</div>
	<div class="mb-4">
		<div class="text-sm mb-4">Grouped:</div>
		{#key props}
			<Tabs {...props} variant="grouped" selected="react">
				<svelte:fragment slot="tabs">
					{#each tabs as tab}
						<Tab as="a" value={tab.value}>{tab.label}</Tab>
					{/each}
				</svelte:fragment>
				<svelte:fragment slot="panels">
					{#each tabs as tab}
						<TabPanel value={tab.value} class="flex p-4">{tab.description}</TabPanel>
					{/each}
				</svelte:fragment>
			</Tabs>
		{/key}
	</div>
	<div class="mb-4">
		<div class="text-sm mb-4">Pills:</div>
		{#key props}
			<Tabs {...props} variant="pills" selected="java">
				<svelte:fragment slot="tabs">
					{#each tabs as tab}
						<Tab as="a" value={tab.value}>{tab.label}</Tab>
					{/each}
				</svelte:fragment>
				<svelte:fragment slot="panels">
					{#each tabs as tab}
						<TabPanel value={tab.value} class="flex p-4">{tab.description}</TabPanel>
					{/each}
				</svelte:fragment>
			</Tabs>
		{/key}
	</div>
	<div class="mb-4">
		<div class="text-sm mb-4">Labeled:</div>
		{#key props}
			<Tabs {...props} variant="labeled" selected="javascript">
				<svelte:fragment slot="tabs">
					{#each tabs as tab}
						<Tab as="a" value={tab.value}>{tab.label}</Tab>
					{/each}
				</svelte:fragment>
				<svelte:fragment slot="panels">
					{#each tabs as tab}
						<TabPanel value={tab.value} class="flex p-4">{tab.description}</TabPanel>
					{/each}
				</svelte:fragment>
			</Tabs>
		{/key}
	</div>
</ExamplePage>
