<script lang="ts">
	import ExamplePage from './ExamplePage.svelte';
	import Section from './Section.svelte';
	import type { ElementHandler,  ThemeShade } from '$lib/types';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	type ShadeConfig = ThemeShade | 'default' | [ThemeShade, (ThemeShade | null)?, string?];
	type ShadeConfigInternal = [ThemeShade | 'default', (ThemeShade | null)?, string?];

	interface GeneratorConfig {
		type: 'text' | 'bg' | 'border' | 'ring' | 'divide';
		base?: boolean;
		color?: string | string[];
		shades?: ShadeConfig;
		modifiers?: Record<string, ShadeConfig>;
		overrides?: Record<string, Record<string, ShadeConfig>>;
	}

	const title = 'Class Generator';
	const description = 'Accepts configuration then generates Tailwind classes.';
	const code = `
  `;
	const defaultPlaceholder = `{
		"color": "primary",
		"type": "bg",
		"shades": [500, 800],
		"modifiers": {
			"hover": [600, 900],
			"focus": [600, 900]
		},
		"overrides": {},
	}`;

	const store = writable(getGenerators());

	let mounted = false;
	let textarea: HTMLTextAreaElement;
	let savename = '';
	let generator = '';
	let generated = '';
	let alert = '';

	let placeholder =
		typeof localStorage !== 'undefined'
			? localStorage.getItem('generator') || defaultPlaceholder
			: defaultPlaceholder;

	const defaults = {
		color: [
			'white',
			'light',
			'dark',
			'primary',
			'secondary',
			'tertiary',
			'danger',
			'warning',
			'success',
			'info'
		],
		shades: [400, 600],
		modifiers: {},
		overrides: {}
	};

	function getGenerators() {
		if (typeof localStorage === 'undefined') return {} as Record<string, string>;
		return JSON.parse(localStorage.getItem('generators') || '{}');
	}

	function getOverrides(color: string, key: string, overrides: GeneratorConfig['overrides']) {
		const obj = (overrides || {})[color] || {};
		return obj[key];
	}

	function normalizeShades(shades: ShadeConfig, overrides?: ShadeConfig, merge = false) {
		let _overrides = [] as unknown as ShadeConfigInternal;
		if (overrides) {
			_overrides = normalizeShades(overrides);
			if (!merge) return _overrides;
		}
		const result = (
			!Array.isArray(shades) ? (typeof shades === 'undefined' ? ['default'] : [shades]) : shades
		) as ShadeConfigInternal;
		if (merge) {
			result[0] = _overrides[0] || result[0];
			result[1] = _overrides[1] || result[1];
		}
		return result;
	}

	function parseConfig(config: Required<GeneratorConfig>) {
		if (!config.type) return showAlert(`Cannot generate without property: "type".`);
		const result = {} as Record<string, string>;
		const colors = !Array.isArray(config.color) ? [config.color] : config.color;
		colors.forEach((c) => {
			let template = `${config.type}-${c}`;
			let tmp = [] as string[];

			const shades = normalizeShades(
				config.shades,
				getOverrides(c, 'base', config.overrides)
			) as ShadeConfigInternal;

			const [light, dark] = shades;

			if (config.base === true || typeof config.base === 'undefined') {
				if (light === 'default') {
					tmp.push(template);
				} else {
					tmp.push(template + `-${light}`);
					if (dark) tmp.push(`dark:${template}-${dark}`);
				}
			}

			Object.entries(config.modifiers).forEach(([key, val]) => {
				const mOverrides = getOverrides(c, key, config.overrides);
				const [mlight, mdark, altcolor] = normalizeShades(val, mOverrides);
				const mTemplate = altcolor ? `${config.type}-${altcolor}` : template;
				if (mlight === 'default') {
					tmp.push(`${key}:${mTemplate}`);
				} else {
					tmp.push(`${key}:${mTemplate}-${mlight}`);
					if (mdark) tmp.push(`dark:${key}:${mTemplate}-${mdark}`);
				}
			});
			result[c] = tmp.join(' ');
		});
		return result;
	}

	function showAlert(message: string) {
		alert = message;
	}
	function hideAlert() {
		alert = '';
	}
	function removeGenerator(key: string) {
		const generators = getGenerators();
		if (!generators[key]) return showAlert(`Cannot remove unknown generator "${key}".`);
		delete generators[key];
		localStorage.setItem('generators', JSON.stringify(generators));
		store.update((s) => generators);
		generator = '';
	}
	function loadGenerator(e: any) {
		const template = $store[generator];
		if (template) textarea.value = template;
	}
	function handleReset(e: ElementHandler<HTMLButtonElement, MouseEvent>) {
		generated = '';
		textarea.value = placeholder;
	}
	function handleClick(e: ElementHandler<HTMLButtonElement, MouseEvent>) {
		try {
			if (!textarea.value) return showAlert(`Nothing to parse, please enter value.`);
			const normalized = textarea.value.trim();
			const config = {
				...defaults,
				...JSON.parse(normalized)
			} as Required<GeneratorConfig>;

			if (savename) {
				const generators = JSON.parse(localStorage.getItem('generators') || '{}');
				generators[savename] = normalized;
				localStorage.setItem('generators', JSON.stringify(generators));
				store.update((s) => generators);
			}
			localStorage.setItem('generator', normalized); // always store the latest.
			const processed = JSON.stringify(parseConfig(config), null, 2);
			generated = processed
				.replace(/"([^"]+)":/g, (match, clean) => {
					return clean;
				})
				.replace(/"([^"]+)"/g, (match, clean) => {
					return "'" + clean + "'";
				});
		} catch (e) {
			const err = e as Error;
			showAlert(err.message);
			console.warn(err.message);
		}
	}

	onMount(() => {
		mounted = true;
	});
</script>

<ExamplePage {title} {description} {code}>
	{#if alert}
		<Section>
			<div class="rounded-md bg-red-50 dark:bg-red-400 p-4">
				<div class="flex">
					<div class="flex-shrink-0">
						<svg
							class="h-5 w-5 text-red-400 dark:text-red-800"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<div class="ml-3">
						<p class="text-sm font-medium text-red-800 dark:text-red-50">{alert}</p>
					</div>
					<div class="ml-auto pl-3">
						<div class="-mx-1.5 -my-1.5">
							<button
								type="button"
								class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 dark:text-red-50 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
								on:click={() => hideAlert()}
							>
								<span class="sr-only">Dismiss</span>
								<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
									<path
										d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</Section>
	{/if}
	<Section class={!mounted ? 'invisible' : ''}>
		<div class="w-3/4">
			<div class="mb-2 w-full">
				<label
					for="location"
					class="block text-sm font-medium leading-6 text-gray-900 dark:text-frame-100"
					>Generator Templates</label
				>
				<select
					bind:value={generator}
					class="form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
					on:change={(e) => loadGenerator(e)}
				>
					<option value="" selected disabled>Please Select</option>
					{#each Object.entries($store) as [gKey, gVal]}
						<option value={gKey}>{gKey}</option>
					{/each}
				</select>
			</div>
			<textarea
				bind:this={textarea}
				class="p-4 w-full border border-frame-100 dark:border-frame-600 dark:bg-transparent dark:text-white"
				rows={16}
				{placeholder}
				value={placeholder}
			/>
			<div class="mt-2">
				<div class="flex space-x-4 w-full">
					<div class="flex">
						<button
							class="bg-frame-600 dark:bg-frame-900 text-white px-4 py-1.5 font-medium uppercase text-sm inline-flex items-center"
							on:click={() => removeGenerator(generator)}>Remove Generator</button
						>
					</div>
					<div class="flex">
						<button
							class="bg-frame-600 dark:bg-frame-900 text-white px-4 py-1.5 font-medium uppercase text-sm inline-flex items-center"
							on:click={handleReset}>Reset</button
						>
					</div>

					<div class="flex flex-1">
						<div class="relative w-full">
							<label
								for="name"
								class="absolute -top-2 left-2 inline-block bg-white dark:bg-frame-800 px-1 text-xs font-medium text-gray-900 dark:text-frame-100"
								>Save as:</label
							>
							<input
								bind:value={savename}
								type="text"
								name="name"
								id="name"
								class="form-input block w-full rounded-sm border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-frame-800 dark:ring-frame-600 dark:text-frame-100 dark:placeholder:text-frame-500 rounded-r-none"
								placeholder="Jane Smith"
							/>
						</div>

						<button
							class="rounded-l-none inline-flex items-center bg-indigo-500 text-white px-4 py-1.5 font-medium uppercase text-sm"
							on:click={handleClick}>Generate</button
						>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-4">
			<div class="w-3/4">
				<pre class="overflow-x-auto whitespace-pre-wrap">
				<code>
					{generated}
				</code>
			</pre>
			</div>
		</div>
	</Section>
</ExamplePage>
