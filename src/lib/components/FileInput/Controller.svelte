<script lang="ts">
	import { type FileInputControllerProps, fileInputControllerDefaults as defaults } from './module';
	import type { ElementProps } from '$lib/types';

	type $$Props = FileInputControllerProps & ElementProps<'input'>;

	export let { name, readAs, onFormData, onReadFiles } = {
		...defaults
	} as Required<FileInputControllerProps>;

	let input: HTMLInputElement;

	const states = {
		0: 'starting',
		1: 'loading',
		2: 'finished'
	};

	function createFormData(files: FileList | null) {
		if (!files) return null;
		const data =
			input?.form instanceof HTMLFormElement ? new FormData(input?.form) : new FormData();
		Array.from(files).forEach((file) => data.append(name, file));
		return data;
	}

	function updateState(value: number) {
		const state = states[String(value) as unknown as keyof typeof states];
		console.info(`File updload state is: ${state}`);
	}

	function readFile(file: File): Promise<string | ArrayBuffer | null> {
		return new Promise((resolve, reject) => {
			var reader = new FileReader();
			reader.onload = () => {
				updateState(reader.readyState);
				resolve(reader.result);
			};
			reader.onerror = reject;
			if (readAs === 'text') reader.readAsText(file);
			else if (readAs === 'url') reader.readAsDataURL(file);
			else if (readAs === 'binary') reader.readAsBinaryString(file);
			else reader.readAsArrayBuffer(file);
		});
	}

	function handleFiles(type: 'form' | 'read', files?: FileList | null) {
		files = input?.files;
		if (!files) return;
		if (type === 'read' && typeof onReadFiles !== 'undefined') {
			const proms = Array.from(files).map(readFile);
			Promise.all(proms)
				.then((result) => {
					onReadFiles(null, result, files as FileList);
				})
				.catch((ex) => {
					onReadFiles(ex as Error, null, files as FileList);
				});
		} else if (type === 'form' && typeof onFormData !== 'undefined') {
			onFormData(createFormData(files), files as FileList);
		}
	}

	function handleInputChange(e?: any) {
		handleFiles('form');
	}

	function handleDrop(e: DragEvent & { currentTarget: EventTarget & HTMLElement }) {
		e.preventDefault();
		const files = e?.dataTransfer?.files;
		if (files) input.files = files;
		handleFiles('read', files);
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
