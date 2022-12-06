<script lang="ts">
	import themeStore from '$lib';
	import { Radio } from '$lib/components';
	import Section from '$docs/layout/Section.svelte';
	import Page from '$docs/layout/Page.svelte';
	import { withThemes } from '@forewind/util';

	type Conf = { theme: any; variant?: any };

	const title = 'Radio';
	const description = 'Themed radio buttons';

	const { palette, components } = $themeStore;
	const component = withThemes(components.radio.main, palette);
	const { variant } = component;

	const examples = Object.keys(variant).reduce((a, v) => {
		const obj = { title: v, items: [] as Conf[] };
		const themes = Object.keys(variant.default.themes);
		themes.forEach((t) => {
			obj.items.push({
				theme: t,
				variant: v
			});
		});
		a.push(obj);
		return a;
	}, [] as { title: any; items: Conf[] }[]);

	let group = 'danger';

	const options = {
		ringed: false,
		shadow: '',
		size: 'md',
		disabled: false
	};
</script>

<Page {title} {description}>
	<div class="-m-2 flex flex-wrap space-x-4">
		<label class="text-sm inline-flex items-center dark:text-gray-300 m-2">
			<input type="checkbox" bind:checked={options.ringed} class="dark:bg-transparent" />
			<span class="pl-2">Ringed</span>
		</label>

		<label class="text-sm inline-flex items-center m-2">
			<select
				bind:value={options.shadow}
				class="remove-caret focus:ring-transparent focus:outline-none px-4 py-1 border-transparent focus:border-transparent 
			text-gray-700 dark:text-gray-300 border-b border-b-gray-400 focus:border-b-gray-400 dark:bg-transparent text-sm"
			>
				<option value="">Select Shadow</option>
				<option value="xs">Shadow xs</option>
				<option value="sm">Shadow sm</option>
				<option value="md">Shadow md</option>
				<option value="lg">Shadow lg</option>
				<option value="xl">Shadow xl</option>
				<option value="2xl">Shadow 2xl</option>
			</select>
		</label>

		<label class="text-sm inline-flex items-center m-2">
			<select
				bind:value={options.size}
				class="remove-caret focus:ring-transparent focus:outline-none px-4 py-1 border-transparent focus:border-transparent 
			text-gray-700 dark:text-gray-300 border-b border-b-gray-400 focus:border-b-gray-400 dark:bg-transparent text-sm"
			>
				<option value="">Select Size</option>
				<option value="xs">Size xs</option>
				<option value="sm">Size sm</option>
				<option value="md">Size md</option>
				<option value="lg">Size lg</option>
				<option value="xl">Size xl</option>
				<option value="2xl">Size 2xl</option>
			</select>
		</label>
	</div>
	{#each examples as comp}
		<div class="my-6">
			<Section section={comp.title} />
			<div class="flex -m-2 flex-row flex-wrap space-x-8">
				{#key options}
					{#each comp.items as item}
						<label
							for={item.theme}
							class="m-2 bg-transparent inline-flex relative items-center align-middle"
						>
							<Radio
								id={item.theme}
								name="theme"
								bind:group
								value={item.theme}
								theme={item.theme}
								{...options}
							/>
							<span class="ml-2 dark:text-slate-400 text-sm">
								{item.theme}
							</span>
						</label>
					{/each}
				{/key}
			</div>
		</div>
	{/each}
</Page>
