<script lang="ts">
	import themeStore from '$lib';
	import { Icon } from '$lib/components';
	import Section from '$docs/layout/Section.svelte';
	import Page from '$docs/layout/Page.svelte';
	import { withThemes } from '@forewind/util';

	type Conf = { theme: any; variant?: any };

	const title = 'Icon';
	const description = 'Themed icons';

	const { palette, components } = $themeStore;
	const component = withThemes(components.icon.main, palette);
	const { variant } = component;

	const examples = Object.keys(variant).reduce((a, v) => {
		const obj = { title: v, items: [] as Conf[] };
		const themes = Object.keys(variant[v as keyof typeof variant].themes);
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
		hovered: false,
		size: 'md',
		rounded: 'full',
		animate: '',
		shadow: ''
	};
</script>

<Page {title} {description}>
	<div class="-m-2 flex flex-wrap space-x-4">
		<label class="text-sm inline-flex items-center dark:text-gray-300 m-2">
			<input type="checkbox" bind:checked={options.hovered} class="dark:bg-transparent" />
			<span class="pl-2">Hovered</span>
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

			<label class="text-sm inline-flex items-center m-2">
				<select
					bind:value={options.rounded}
					class="remove-caret focus:ring-transparent focus:outline-none px-4 py-1 border-transparent focus:border-transparent 
			text-gray-700 dark:text-gray-300 border-b border-b-gray-400 focus:border-b-gray-400 dark:bg-transparent text-sm"
				>
					<option value="">No Radius</option>
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
					bind:value={options.animate}
					class="remove-caret focus:ring-transparent focus:outline-none px-4 py-1 border-transparent focus:border-transparent 
			text-gray-700 dark:text-gray-300 border-b border-b-gray-400 focus:border-b-gray-400 dark:bg-transparent text-sm"
				>
					<option value="">No Animate</option>
					<option value="spin">Animate Spin</option>
					<option value="pulse">Animate Pulse</option>
					<option value="ping">Animate Ping</option>
					<option value="bounce">Animage Bounce</option>
				</select>
			</label>

			<label class="text-sm inline-flex items-center m-2">
				<select
					bind:value={options.shadow}
					class="remove-caret focus:ring-transparent focus:outline-none px-4 py-1 border-transparent focus:border-transparent 
			text-gray-700 dark:text-gray-300 border-b border-b-gray-400 focus:border-b-gray-400 dark:bg-transparent text-sm"
				>
					<option value="">No Shadow</option>
					<option value="xs">Shadow xs</option>
					<option value="sm">Shadow sm</option>
					<option value="md">Shadow md</option>
					<option value="lg">Shadow lg</option>
					<option value="xl">Shadow xl</option>
					<option value="2xl">Shadow 2xl</option>
				</select>
			</label>
		</label>
	</div>
	{#each examples as comp}
		<div class="my-6">
			<Section section={comp.title} />
			<div class="flex flex-row space-x-8">
				{#key options}
					{#each comp.items as item}
						<Icon variant={comp.title} theme={item.theme} {...options} class="fill-gray-200">
							<!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg> -->
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
									clip-rule="evenodd"
								/>
							</svg>
						</Icon>
					{/each}
				{/key}
			</div>
		</div>
	{/each}
</Page>
