<script lang="ts">
	import themeStore from '$lib';
	import { Slider } from '$lib/components';
	import Section from '$docs/layout/Section.svelte';
	import Page from '$docs/layout/Page.svelte';
	import { withThemes } from '@forewind/util';

	type Conf = { theme: any; variant?: any };

	const title = 'Slider';
	const description = 'Themed range sliders';

	const { palette, components } = $themeStore;
	const component = withThemes(components.slider.main, palette);
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

	const options = {
		rounded: false,
		shadow: '',
		size: 'md',
		disabled: false
	};
</script>

<Page {title} {description}>
	<div class="-m-2 flex flex-wrap space-x-4">
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
				<option value="md" selected>Size md</option>
				<option value="lg">Size lg</option>
				<option value="xl">Size xl</option>
				<option value="2xl">Size 2xl</option>
			</select>
		</label>
	</div>
	{#each examples as comp}
		<div class="my-6">
			<Section section={comp.title} />
			<div class="flex flex-col -m-2">
				{#key options}
					<Slider {...options} value={20} min={0} max={100} />
					<span class="pl-2 text-sm">default</span>
					{#each comp.items as item}
						<Slider theme={item.theme} {...options} class="mt-8" value={20} min={0} max={100} />
						<span class="pl-2 text-sm">{item.theme}</span>
					{/each}
				{/key}
			</div>
		</div>
	{/each}
</Page>
