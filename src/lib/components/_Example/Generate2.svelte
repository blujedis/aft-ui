<script lang="ts">
	import ExamplePage from './ExamplePage.svelte';
	import Section from './Section.svelte';
	import type { ElementHandler } from '$lib/types';
	import { writable } from 'svelte/store';
	import { colors } from '../../constants/colors';
	import { onMount } from 'svelte';

	const title = 'Class Generator';
	const description = 'Accepts configuration then generates Tailwind classes.';
	const code = `
  `;

	let mounted = false;
	let alert = '';

	let textarea: HTMLTextAreaElement;
	let generator = '';
	let saveas = '';
	let result = JSON.stringify(
		{
			button: {
				filled: {
					default: '',
					dark: '',
					primary: '',
					secondary: '',
					tertiary: '',
					danger: '',
					warning: '',
					success: '',
					info: ''
				}
			}
		},
		null,
		2
	);

	let placeholder =
		typeof localStorage !== 'undefined' ? localStorage.getItem('generator') || '' : '';

	const store = writable(getGenerators());

	function getGenerators() {
		if (typeof localStorage === 'undefined') return {} as Record<string, string>;
		return JSON.parse(localStorage.getItem('generators') || '{}');
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
		saveas = '';
		textarea.value = placeholder;
	}
	function loadGenerator(e: any) {
		const template = $store[generator];
		saveas = e.target.value || '';
		if (template) textarea.value = template;
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

	function handleClick(e: ElementHandler<HTMLButtonElement, MouseEvent>) {
		try {
			if (!textarea.value) return showAlert(`Nothing to parse, please enter value.`);
			const normalized = textarea.value.trim();
			const config = {
				...{},
				...JSON.parse(normalized)
			} as Required<any>;

			if (saveas) {
				const generators = JSON.parse(localStorage.getItem('generators') || '{}');
				generators[saveas] = normalized;
				localStorage.setItem('generators', JSON.stringify(generators));
				store.update((s) => generators);
			}
			localStorage.setItem('generator', normalized); // always store the latest.
			const parsed = {}; // parseConfig(config);
			const processed = JSON.stringify(parsed, null, 2);
			result = processed
				.replace(/"([^"]+)":/g, (match, clean) => {
					return clean;
				})
				.replace(/"([^"]+)"/g, (match, clean) => {
					return "'" + clean + "'";
				})
				.replace(/"/g, "'");
		} catch (e) {
			const err = e as Error;
			showAlert(err.message);
			console.warn(err.message);
		}
	}
	function handleReset(e: ElementHandler<HTMLButtonElement, MouseEvent>) {
		result = '';
		textarea.value = placeholder;
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
						<p class="text-sm font-medium text-red-100">{alert}</p>
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
						on:change={(e) => loadGenerator(e)}
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
							class="bg-amber-600 text-white px-4 py-1.5 font-medium uppercase text-sm inline-flex items-center hover:brightness-110"
							on:click={handleReset}>Reset</button
						>
						<button
							class="bg-emerald-600 text-white px-4 py-1.5 font-medium uppercase text-sm inline-flex items-center hover:brightness-110"
							on:click={handleReset}>Download</button
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
						class="p-4 w-full border border-frame-100 dark:border-frame-600 dark:bg-transparent dark:text-white"
						rows={16}
						{placeholder}
						value={placeholder}
						on:keydown={handleKeydown}
					/>
				</div>
				<div class="flex space-x-2">
					<input
						bind:value={saveas}
						type="text"
						name="name"
						id="name"
						placeholder="Save as name..."
						class="form-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
					/>

					<button
						class="rounded-l-none inline-flex items-center bg-indigo-500 text-white px-4 py-1.5 font-medium uppercase text-sm hover:brightness-110"
						on:click={handleClick}>Generate</button
					>
				</div>
			</div>
			<div class="mb-2">
				<pre
					class="overflow-x-auto whitespace-pre-wrap pl-4 pr-4 border border-frame-100 dark:border-frame-600 dark:bg-transparent dark:text-white">
<code>
{result}
</code>
</pre>
			</div>
		</div>
	</Section>
</ExamplePage>
