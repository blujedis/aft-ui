<script lang="ts">
	import { type FileInputProps, fileInputDefaults as defaults } from './module';
	import type { ElementProps } from '$lib/types';

	type $$Props = FileInputProps & ElementProps<'input'>;

	export let { name, readAs, onFormData, onReadFiles } = {
		...defaults
	} as Required<FileInputProps>;

	let input: HTMLInputElement;
	let state = 0 as 0 | 1  | 2;

	function createFormData(files: FileList) {
		const data =
			input?.form instanceof HTMLFormElement ? new FormData(input?.form) : new FormData();
		Array.from(files).forEach((file) => data.append(name, file));
		return data;
	}

	function readFile(file: File): Promise<string | ArrayBuffer | null> {
		return new Promise((resolve, reject) => {
			var reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
			if (readAs === 'text') reader.readAsText(file);
			else if (readAs === 'url') reader.readAsDataURL(file);
			else if (readAs === 'binary') reader.readAsBinaryString(file);
			else reader.readAsArrayBuffer(file);
		});
	}

	function handleFiles(files: FileList | null | undefined) {
		files = input.files;

		if (typeof onReadFiles !== 'undefined') {
			const proms = Array.from(files as FileList).map(readFile);
			Promise.all(proms)
				.then((result) => {
					onReadFiles(null, result, files as FileList);
				})
				.catch((ex) => {
					onReadFiles(ex as Error, null, files as FileList);
				});
		} else if (typeof onFormData !== 'undefined') {
			try {
				onFormData(null, createFormData(files as FileList), files as FileList);
			} catch (ex) {
				onFormData(ex as Error, null, files as FileList);
			}
		}
	}

	function handleInputChange(
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		handleFiles(null);
	}

	function handleDrop(e: DragEvent & { currentTarget: EventTarget & HTMLElement }) {
		e.preventDefault();
		const files = e?.dataTransfer?.files;
		if (files) input.files = files;
		handleFiles(files);
	}

	function handleDragOver(e: DragEvent & { currentTarget: EventTarget & HTMLElement }) {
		e.preventDefault();
		state = 1;
	}

	function handleDragEnd(e: DragEvent & { currentTarget: EventTarget & HTMLElement }) {
		state = 0;
	}

	function handleClick() {
		input.click();
	}
</script>

<slot
	onClick={handleClick}
	onDrop={handleDrop}
	onDropOver={handleDragOver}
	onDropEnd={handleDragEnd}
/>

<input
	bind:this={input}
	{...$$restProps}
	{name}
	on:change={handleInputChange}
	type="file"
	class="sr-only"
/>
