<script lang="ts">
	import themeStore from '$lib';
	import { Switcher, Label } from '$lib/components';
	import Section from '$docs/layout/Section.svelte';
	import Page from '$docs/layout/Page.svelte';
	import { withThemes } from '@forewind/util';

	type Conf = { theme: any; variant?: any };

	const title = 'Switcher';
	const description = 'Themed switcher with active/inactive variants';

	const { palette, components } = $themeStore;

	const component = withThemes(components.switcher.main, palette);
	const { variant } = component;

	const examples = Object.keys(variant).reduce((a, v) => {
		const obj = { title: v, items: [] as Conf[] };
		const themes = Object.keys((variant as any)[v].themes);
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
		ringed: false,
		shadow: '',
		size: 'md',
		position: '',
		weight: '',
		transform: ''
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

		<label class="text-sm inline-flex items-center m-2">
			<select
				bind:value={options.weight}
				class="remove-caret focus:ring-transparent focus:outline-none px-4 py-1 border-transparent focus:border-transparent 
			text-gray-700 dark:text-gray-300 border-b border-b-gray-400 focus:border-b-gray-400 dark:bg-transparent text-sm"
			>
				<option value="">Select Weight</option>
				<option value="extralight">Weight extralight</option>
				<option value="light">Weight light</option>
				<option value="normal">Weight normal</option>
				<option value="medium">Weight medium</option>
				<option value="semibold">Weight semibold</option>
				<option value="bold">Weight bold</option>
				<option value="extrabold">Weight extrabold</option>
				<option value="black">Weight black</option>
			</select>
		</label>

		<label class="text-sm inline-flex items-center m-2">
			<select
				bind:value={options.transform}
				class="remove-caret focus:ring-transparent focus:outline-none px-4 py-1 border-transparent focus:border-transparent 
			text-gray-700 dark:text-gray-300 border-b border-b-gray-400 focus:border-b-gray-400 dark:bg-transparent text-sm"
			>
				<option value="">Select Transform</option>
				<option value="uppercase">Transform uppercase</option>
				<option value="lowercase">Transform lowercase</option>
				<option value="capitalize">Transform capitalize</option>
				<option value="normal">Transform normal</option>
				<option value="italic">Transform italic</option>
				<option value="unitalic">Transform unitalic</option>
			</select>
		</label>

		<label class="text-sm inline-flex items-center m-2">
			<select
				bind:value={options.position}
				class="remove-caret focus:ring-transparent focus:outline-none px-4 py-1 border-transparent focus:border-transparent 
			text-gray-700 dark:text-gray-300 border-b border-b-gray-400 focus:border-b-gray-400 dark:bg-transparent text-sm"
			>
				<option value="">Select Position</option>
				<option value="top">Position top</option>
				<option value="right">Position right</option>
				<option value="bottom">Position bottom</option>
				<option value="left">Position left</option>
			</select></label
		>
	</div>
	{#each examples as comp}
		<div class="my-6">
			<Section section={comp.title} />
			<div class="-m-2 flex flex-row flex-wrap space-x-8">
				{#key options}
					<Switcher
						checked={comp.title === 'active' ? true : false}
						{...options}
						text={'default'}
						class="m-2"
					/>
					{#each comp.items as item}
						<Switcher theme={item.theme} checked={true} text={item.theme} {...options} class="m-2">
							<Label class="mx-2">{item.theme}</Label>
						</Switcher>
					{/each}
				{/key}
			</div>
		</div>
	{/each}
</Page>
