<script lang="ts">
	import { Tabs } from '.';
	import { Tab } from '../Tab';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { colors } from '$lib/constants';

	const title = 'Tabs';
	const description = 'Themed Tabs and Tab controller component.';

	const props = {
		// condensed: true,
		full: false,
		focused: true,
		hovered: true,
		rounded: 'md' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'frame' as ThemeColor,
		transitioned: true // ThemeTransitioned,
		//variant: 'accented' as TabVariant
	};

	const tabs = [
		{
			value: 'java',
			label: 'Java',
			description:
				'Java is a multi-platform, object-oriented, and network-centric language that can be used as a platform in itself. It is a fast, secure, reliable programming language for coding everything from mobile apps and enterprise software to big data applications and server-side technologies.',
			visible: false
		},
		{
			value: 'javascript',
			label: 'JavaScript',
			description:
				'JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat.',
			visible: false
		},
		{
			value: 'python',
			label: 'Python',
			description:
				'Python is an interpreted, object-oriented, high-level programming language with dynamic semantics developed by Guido van Rossum. It was originally released in 1991. Designed to be easy as well as fun, the name "Python" is a nod to the British comedy group Monty Python.',
			visible: true
		},
		{
			value: 'react',
			label: 'React',
			description:
				'React is a JavaScript-based UI development library. Facebook and an open-source developer community run it. Although React is a library rather than a language, it is widely used in web development. The library first appeared in May 2013 and is now one of the most commonly used frontend libraries for web development.',
			visible: false
		}
	];
</script>

<ExamplePage {title} {description}>
	<Tabs {...props} variant="flushed" theme="primary" selected="Python">
		{#each tabs as tab}
			<Tab label={tab.label} selected={tab.value === 'python'}>
				{tab.description}
			</Tab>
		{/each}
	</Tabs>
	<br />
	<Tabs {...props} variant="filled" theme="primary" selected="Python">
		{#each tabs as tab}
			<Tab label={tab.label} selected={tab.value === 'python'}>
				{tab.description}
			</Tab>
		{/each}
	</Tabs>
	<br />
	<Tabs {...props} variant="pills" theme="primary" selected="Python">
		{#each tabs as tab}
			<Tab label={tab.label} selected={tab.value === 'python'}>
				{tab.description}
			</Tab>
		{/each}
	</Tabs>
	<br />
	<Tabs {...props} variant="text" theme="primary" selected="Python">
		{#each tabs as tab}
			<Tab label={tab.label} selected={tab.value === 'python'}>
				{tab.description}
			</Tab>
		{/each}
	</Tabs>

	<!--
	<Tabs {...props} variant="filled" selected="python" theme="frame">
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

		<Tabs {...props} variant="outlined" selected="java" theme="primary">
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

		<Tabs {...props} variant="outlined" selected="react" theme="primary">
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
		</Tabs> -->
</ExamplePage>
