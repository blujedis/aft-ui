<script lang="ts">
	import { FileInput } from '.';
	import type { ThemeColor } from '$lib/types';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { Button } from '../Button';
	import { Empty } from '../Empty';

	const title = 'File Input';
	const description = 'Component for handling input files.';

	const props = {};

	let theme = 'frame' as ThemeColor;

	function handleUpload(data: FormData | null, files: FileList | null) {
		// const file = data?.get('file') as File;
		// console.info(`Uploaded file ${file.name}`);
		// console.log(file);
		// console.log(files);
		if (data)
			for (const value of data.values()) {
				console.log(value);
			}

		setTheme('end');
	}

	function handleReadFiles(
		err: Error | null,
		result: null | (string | ArrayBuffer | null)[], // array of data e.g. image as data uri.
		files: FileList
	) {
		// console.log(files);
	}

	function setTheme(type: 'start' | 'end') {
		if (type === 'start') theme = 'success';
		else theme = 'frame';
	}
</script>

<ExamplePage {title} {description}>
	<div class="flex space-x-8">
		<div>
			<FileInput
				accept="image/png, image/jpeg"
				onReadFiles={handleReadFiles}
				onFormData={handleUpload}
				let:onClick
			>
				<Button theme="primary" on:click={onClick}>Upload Files</Button>
			</FileInput>
		</div>

		<form id="upload">
			<FileInput
				accept="image/png, image/jpeg"
				onReadFiles={handleReadFiles}
				onFormData={handleUpload}
				let:onClick
				let:onDrop
			>
				<button
					on:click={onClick}
					on:drop={onDrop}
					on:dragover|preventDefault={() => setTheme('start')}
					on:dragleave={() => setTheme('end')}
					on:dragend={() => setTheme('end')}
				>
					<Empty bind:theme class="text-sm font-medium uppercase">Upload Files</Empty>
				</button>
			</FileInput>
		</form>
		<div></div>
	</div>
</ExamplePage>
