<script lang="ts">
	import ExamplePage from './ExamplePage.svelte';
	import defaults from '../../theme/defaults';
	import * as defaultOptions from '../../components/options';
	import * as defaultComponents from '../../components/configs';
	import Section from './Section.svelte';

	const title = 'Downloads';
	const description = 'Utility for downloading current Dev Theme';

	const defaultTheme = JSON.stringify(
		{
			options: defaultOptions,
			defaults,
			components: defaultComponents
		},
		null,
		2
	);

	function download(text: string, name: string) {
		const a = document.createElement('a');
		const type = name.split('.').pop();
		a.href = URL.createObjectURL(
			new Blob([text], { type: `text/${type === 'txt' ? 'plain' : type}` })
		);
		a.download = name;
		a.click();
	}
</script>

<ExamplePage {title} {description}>
	<Section>
		<button
			type="button"
			class="rounded-sm bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			on:click={() => download(defaultTheme, 'theme.json')}>Download Theme</button
		>
	</Section>
</ExamplePage>
