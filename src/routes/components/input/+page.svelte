<script lang="ts">
	import themeStore from '$lib';
	import { Input } from '$lib/components';
	// import Input from '$docs/components/input/Component.svelte'
	import Section from '$docs/layout/Section.svelte';
	import Page from '$docs/layout/Page.svelte';
	import { withThemes } from '@forewind/util';

	type Conf = { theme: any; variant?: any };

	const title = 'Inputs';
	const description = 'Themed form input using variants';

	const { palette, components } = $themeStore;
	const component = withThemes(components.input.main, palette);
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

	// function setValidity() {
	// 	const inputs = document.querySelectorAll('input');
	// 	Array.from(inputs).forEach(el => {
	// 		 if (invalid)
	// 		 	el.setCustomValidity('invalid');
	// 		else
	// 			el.setCustomValidity('');
	// 	});
	// }

	// let invalid: boolean;
	const options = {
		ringed: false,
		full: false,
		hovered: true,
		rounded: '',
		shadow: '',
		size: '',
		weight: '',
		transform: '',
		disabled: false
	};
</script>

<Page {title} {description}>
	<div class="-m-2 flex flex-wrap space-x-4">
		<label class="text-sm inline-flex items-center dark:text-gray-300 m-2">
			<input type="checkbox" bind:checked={options.ringed} class="dark:bg-transparent" />
			<span class="pl-2">Ringed</span>
		</label>
		<!-- 
		<label class="text-sm inline-flex items-center dark:text-gray-300 m-2">
			<input type="checkbox" bind:checked={invalid} on:change={() => setValidity()} class="dark:bg-transparent"/> 
			<span class="pl-2">Valid</span>
		</label> -->

		<label class="text-sm inline-flex items-center dark:text-gray-300 m-2">
			<input type="checkbox" bind:checked={options.hovered} class="dark:bg-transparent" />
			<span class="pl-2">Hovered</span>
		</label>

		<label class="text-sm inline-flex items-center dark:text-gray-300 m-2">
			<input type="checkbox" bind:checked={options.full} class="dark:bg-transparent" />
			<span class="pl-2">Full Width</span>
		</label>

		<label class="text-sm inline-flex items-center dark:text-gray-300 m-2">
			<input type="checkbox" bind:checked={options.disabled} class="dark:bg-transparent" />
			<span class="pl-2">Disabled</span>
		</label>

		<label class="text-sm inline-flex items-center m-2">
			<select
				bind:value={options.rounded}
				class="remove-caret focus:ring-transparent focus:outline-none px-4 py-1 border-transparent focus:border-transparent 
			text-gray-700 dark:text-gray-300 border-b border-b-gray-400 focus:border-b-gray-400 dark:bg-transparent text-sm"
			>
				<option value="">Select Radius</option>
				<option value="xs">Radius xs</option>
				<option value="sm">Radius sm</option>
				<option value="md">Radius md</option>
				<option value="lg">Radius lg</option>
				<option value="xl">Radius xl</option>
				<option value="2xl">Radius 2xl</option>
				<option value="full">Radius full</option>
			</select>
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

		<!-- <label class="text-sm inline-flex items-center m-2">
			<select bind:value={options.weight} class="remove-caret focus:ring-transparent focus:outline-none px-4 py-1 border-transparent focus:border-transparent 
			text-gray-700 dark:text-gray-300 border-b border-b-gray-400 focus:border-b-gray-400 dark:bg-transparent text-sm"> 
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
		</label> -->

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
	</div>

	{#each examples as comp}
		<div class="my-6">
			<Section section={comp.title} />
			<div class="flex flex-wrap -m-2">
				{#key options}
					<!-- <Addon class="m-2" size={options.size} theme="warning">
					<svelte:fragment slot="left">$</svelte:fragment >
					<Input 
						{...options}
						type="file"
						variant="flush"
						placeholder="secondary" 
						theme=""
					/>
					<svelte:fragment slot="right">
						<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
						</svg>
					</svelte:fragment>
				</Addon> -->
					{#each comp.items as item}
						<Input
							{...options}
							variant={item.variant}
							theme={item.theme}
							placeholder={item.theme}
							class="m-2"
						/>
					{/each}
				{/key}
			</div>
		</div>
	{/each}
</Page>
