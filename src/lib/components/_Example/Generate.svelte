<script lang="ts">
	import ExamplePage from './ExamplePage.svelte';
	import Section from './Section.svelte';
	import type { ElementHandler } from '$lib/types';
	import { defaultTokens, parseTokens } from '$lib/utils/generate';
	import defaults from '$lib/theme/defaults';
	import * as defaultOptions from '$lib/components/options';
	import * as defaultComponents from '$lib/components/configs';

	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	const title = 'Class Generator';
	const description = 'Accepts configuration then generates Tailwind classes.';
	const code = ``;

	let mounted = false;
	let message = '';

	let textarea: HTMLTextAreaElement;
	let saveas: HTMLInputElement;
	let generator = 'default';
	let result = '';
	let placeholder = init();

	const store = writable(getGenerators());

	function init() {
		let initGenerator = JSON.stringify(defaultTokens, null, 2);
		const generators = getGenerators();
		const active = getActive();
		setGenerators('default', initGenerator);
		if (generators.default) initGenerator = generators[active] || generators.default;
		setActive(active || 'default');
		return initGenerator;
	}

	function getGenerators() {
		if (typeof localStorage === 'undefined') return {} as Record<string, any>;
		return JSON.parse(localStorage.getItem('generators') || '{}');
	}

	function getActive() {
		return typeof localStorage !== 'undefined'
			? localStorage.getItem('active') || 'default'
			: 'default';
	}

	function setGenerators(name: string, value: string | Record<string, any>) {
		if (value && typeof value !== 'string') value = JSON.stringify(value);
		else if (typeof value === 'string') value = value.trim();
		value = value || '{}';
		if (typeof localStorage !== 'undefined') {
			const generators = getGenerators();
			generators[name] = value;
			localStorage.setItem('generators', JSON.stringify(generators, null, 2));
			return generators;
		}
		return {} as Record<string, string>;
	}

	function setActive(name: string) {
		if (typeof localStorage !== 'undefined') localStorage.setItem('active', name);
	}

	function removeGenerator(name: string) {
		const generators = getGenerators();
		if (name === 'default') return showAlert(`Default generator cannot be removed.`);
		if (!generators[name]) return showAlert(`Cannot remove unknown generator "${name}".`);
		delete generators[name];
		localStorage.setItem('generators', JSON.stringify(generators));
		store.update((s) => generators);
		let active = getActive();
		if (active === name) {
			// removing active revert to default.
			setActive('default');
			active = 'default';
		}
		generator = active;
		textarea.value = placeholder;
	}

	function showAlert(message: string) {
		message = message;
	}

	function hideAlert() {
		message = '';
	}

	function getTokens() {
		const value = textarea.value.trim();
		const tokens = {
			...{},
			...JSON.parse(value)
		} as any;
		return { tokens, value };
	}

	function formatTheme(currentResult: string) {
		return currentResult
			.replace(/"([^"]+)":/g, (match, clean) => {
				return clean + ':';
			})
			.replace(/"([^"]+)"/g, (match, clean) => {
				return "'" + clean + "'";
			})
			.replace(/"/g, "'");
	}

	function handleChange(e: any) {
		const template = $store[generator];
		if (template) textarea.value = template;
		setActive(generator);
		result = '';
	}

	function handleKeydown(e: ElementHandler<HTMLTextAreaElement, KeyboardEvent>) {
		if (e.key == 'Tab') {
			e.preventDefault();
			var start = textarea.selectionStart;
			var end = textarea.selectionEnd;
			// set textarea value to: text before caret + tab + text after caret
			textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end);
			// put caret at right position again
			textarea.selectionStart = textarea.selectionEnd = start + 1;
		}
	}

	function handleGenerate(e: ElementHandler<HTMLButtonElement, MouseEvent>) {
		try {
			hideAlert();
			if (!textarea.value) return showAlert(`Nothing to parse, please enter value.`);
			const { tokens, value } = getTokens();
			if (saveas.value) {
				store.update((s) => setGenerators(saveas.value, value));
				setActive(saveas.value);
			}
			result = parseTokens(tokens);
			handleCopy();
		} catch (e) {
			const err = e as Error;
			showAlert(err.message);
			console.warn(err.message);
		}
	}

	function handleSave(e: ElementHandler<HTMLButtonElement, MouseEvent>) {
		const { value } = getTokens();
		let name = saveas.value ? saveas.value : generator;
		if (!value || value === '{}') return showAlert('Whoops nothing to save!');
		store.update((s) => setGenerators(name, value));
		setActive(name);
		generator = name;
		saveas.value = '';
	}

	function handleReset(e: ElementHandler<HTMLButtonElement, MouseEvent>) {
		result = '';
		textarea.value = placeholder;
	}

	function handleDownload(filename: string) {
		const allowedExt = ['ts', 'js', 'cjs'];
		return function (e: ElementHandler<HTMLButtonElement, MouseEvent>) {
			if (!result) return showAlert(`Whoops Theme not generated, did you forget to "generate"?`);
			const split = filename.split('.');
			const ext = split.pop() || 'json';
			if (!allowedExt.includes(ext))
				return showAlert(`Cannot create download using extension ${ext}.`);
			const a = document.createElement('a');
			const type = 'text/javascript';
			a.href = URL.createObjectURL(new Blob([result], { type }));
			a.download = [...split, ext].join('.');
			a.click();
		};
	}

	function handleDownloadTheme(filename: string) {
		const allowedExt = ['json'];
		return function (e: ElementHandler<HTMLButtonElement, MouseEvent>) {
			const split = filename.split('.');
			const ext = split.pop() || 'json';
			if (!allowedExt.includes(ext))
				return showAlert(`Cannot create download using extension ${ext}.`);
			let defaultTheme = JSON.stringify(
				{
					options: defaultOptions,
					defaults,
					components: defaultComponents
				},
				null,
				2
			);
			const a = document.createElement('a');
			const type = 'text/javascript';
			a.href = URL.createObjectURL(new Blob([defaultTheme], { type }));
			a.download = [...split, ext].join('.');
			a.click();
		};
	}

	async function handleCopy() {
		if (!result || !result.length) return showAlert(`Copy failed! Did you forget to generate!`);
		try {
			await navigator.clipboard.writeText(result);
			alert(`Output copied to clipboard!`);
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	}

	onMount(() => {
		mounted = true;
		const active = getActive();
		generator = active;
	});
</script>

<ExamplePage {title} {description} {code}>
	{#if message}
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
						<p class="text-sm font-medium text-red-100">{message}</p>
					</div>
					<div class="ml-auto pl-3">
						<div class="-mx-1.5 -my-1.5">
							<button
								type="button"
								class="inline-flex rounded-md p-1.5 text-red-700 focus:outline-none focus:ring-2 focus:ring-red-800 hover:brightness-90 focus:ring-offset-0 focus:ring-offset-red-400"
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
		<div class="grid grid-cols-2 gap-4">
			<div class="mb-2">
				<div class="flex space-x-2">
					<select
						bind:value={generator}
						class="form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
						on:change={(e) => handleChange(e)}
					>
						<option value="" selected disabled>Please Select</option>
						{#each Object.entries($store) as [gKey, gVal]}
							<option value={gKey}>{gKey}</option>
						{/each}
					</select>

					<button
						class="bg-rose-600 text-white px-4 py-1.5 font-medium uppercase text-sm inline-flex items-center hover:brightness-110"
						on:click={() => removeGenerator(generator)}>Remove</button
					>
				</div>
			</div>
			<div class="mb-2">
				<div class="px-1 flex items-center h-full">
					<div class="flex-1">Results:</div>
					<div class="flex space-x-2">
						<button
							class="bg-orange-600 text-white px-4 py-1.5 font-medium uppercase text-sm inline-flex items-center hover:brightness-110"
							on:click={handleCopy}>Copy</button
						>
						<button
							class="bg-emerald-600 text-white px-4 py-1.5 font-medium uppercase text-sm inline-flex items-center hover:brightness-110"
							on:click={handleDownload('states.ts')}>Download States</button
						>
						<button
							class="bg-cyan-500 text-white px-4 py-1.5 font-medium uppercase text-sm inline-flex items-center hover:brightness-110"
							on:click={handleDownloadTheme('aft.theme.json')}>Download Theme</button
						>
						<button
							class="bg-amber-600 text-white px-4 py-1.5 font-medium uppercase text-sm inline-flex items-center hover:brightness-110"
							on:click={handleReset}>Reset</button
						>
					</div>
				</div>
			</div>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="mb-2">
				<div class="flex mb-2">
					<textarea
						bind:this={textarea}
						class="p-4 w-full border border-frame-100 dark:border-frame-600 dark:bg-transparent dark:text-white max-h-96"
						rows={16}
						{placeholder}
						value={placeholder}
						on:keydown={handleKeydown}
					/>
				</div>
				<div class="flex space-x-2">
					<input
						bind:this={saveas}
						type="text"
						name="name"
						id="name"
						placeholder="Save as name..."
						class="form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 inline-flex items-center flex-1"
					/>

					<button
						class="rounded-l-none inline-flex items-center bg-emerald-600 text-white px-4 py-1.5 font-medium uppercase text-sm hover:brightness-110"
						on:click={handleSave}>Save or Create</button
					>

					<button
						class="rounded-l-none inline-flex items-center bg-indigo-500 text-white px-4 py-1.5 font-medium uppercase text-sm hover:brightness-110"
						on:click={handleGenerate}>Generate</button
					>
				</div>
			</div>
			<div class="mb-2">
				<pre
					class="overflow-auto whitespace-pre-wrap pl-4 pr-4 border border-frame-100 dark:border-frame-600 dark:bg-transparent dark:text-white max-h-96">
<code id="result">
{result}
</code>
</pre>
			</div>
		</div>
	</Section>
</ExamplePage>
