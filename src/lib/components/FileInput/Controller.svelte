<script lang="ts">
	import { type FileInputControllerProps, fileInputControllerDefaults as defaults } from './module';
	import type { ElementProps } from '$lib/types';

	type $$Props = FileInputControllerProps & ElementProps<'input'>;

	export let { name, readAs, onFormData, onReadFiles } = {
		...defaults
	} as Required<FileInputControllerProps>;

	let input: HTMLInputElement;

	function createFormData(files: FileList | null) {
		if (!files) return null;
		const data =
			input?.form instanceof HTMLFormElement ? new FormData(input?.form) : new FormData();
		Array.from(files).forEach((file) => data.append(name, file));
		return data;
	}

	function readFile(file: File): Promise<string | ArrayBuffer | null> {
		return new Promise((resolve, reject) => {
			var reader = new FileReader();
			reader.onload = () => {
				resolve(reader.result);
			};
			reader.onerror = reject;
			if (readAs === 'text') reader.readAsText(file);
			else if (readAs === 'url') reader.readAsDataURL(file);
			else if (readAs === 'binary') reader.readAsBinaryString(file);
			else reader.readAsArrayBuffer(file);
		});
	}

	function handleFiles(files?: FileList | null) {
		files = input?.files;
		if (!files) return;
		if (typeof onReadFiles !== 'undefined') {
			const proms = Array.from(files).map(readFile);
			Promise.all(proms)
				.then((result) => {
					onReadFiles(null, result, files as FileList);
				})
				.catch((ex) => {
					onReadFiles(ex as Error, null, files as FileList);
				});
		}
		if (typeof onFormData !== 'undefined') {
			onFormData(createFormData(files), files as FileList);
		}
	}

	function handleInputChange(e?: any) {
		handleFiles();
	}

	function handleDrop(e: DragEvent & { currentTarget: EventTarget & HTMLElement }) {
		e.preventDefault();
		const files = e?.dataTransfer?.files;
		if (files) input.files = files;
		handleFiles(files);
	}

	function handleClick() {
		input.click();
	}
</script>

<slot onClick={handleClick} onDrop={handleDrop} />

<input
	bind:this={input}
	{...$$restProps}
	{name}
	on:change={handleInputChange}
	type="file"
	class="sr-only"
/>
