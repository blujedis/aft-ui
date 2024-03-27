<script lang="ts">
	import { FileInput } from '.';
	import type { ThemeColor } from '$lib/types';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { Button } from '../Button';
	import { Empty } from '../Empty';
	import { Input } from '../Input';
	import { Tile } from '../Tile';

	const title = 'File Input';
	const description = 'Component for handling input files.';

	let uploading = 0 as 0 | 1 | 2;
	let value: any;

	function handleFormData(err: Error | null, data: FormData | null, files: FileList | null) {
		uploading = 2;
		// const file = data?.get('file') as File;
		// console.info(`Uploaded file ${file.name}`);
		// console.log(file);
		// console.log(files);
		if (err) console.log(err);
		if (data)
			for (const value of data.values()) {
				console.log(value);
			}
	}

	function handleReadFiles(
		err: Error | null,
		result: null | (string | ArrayBuffer | null)[], // array of data e.g. image as data uri.
		files: FileList
	) {
		uploading = 2;
		console.log(files);
	}
</script>

<ExamplePage {title} {description}>
	<div class="">
		<div class="mb-4">
			<FileInput
				accept="image/png, image/jpeg"
				onReadFiles={handleReadFiles}
				onFormData={handleFormData}
				let:onClick
			>
				<Button theme="primary" on:click={onClick}>Upload Files</Button>
			</FileInput>
		</div>

		<form id="upload" class="mb-4">
			<div class="flex">
				<FileInput
					accept="image/png, image/jpeg"
					onReadFiles={handleReadFiles}
					onFormData={handleFormData}
					let:onClick
					let:onDrop
				>
					<Tile centered={false} size="unstyled" theme="primary" focused>
						<Button theme="primary" focused={false} on:click={onClick} class="rounded-r-none"
							>Upload Files</Button
						>
						<Input focused={false} class="rounded-l-none" on:click={onClick} bind:value />
					</Tile>
				</FileInput>
			</div>
		</form>

		<form id="upload" class="mb-4">
			<FileInput
				accept="image/png, image/jpeg"
				onReadFiles={handleReadFiles}
				onFormData={handleFormData}
				let:onClick
				let:onDrop
			>
				<Empty
					theme={uploading === 0 ? 'frame' : uploading === 1 ? 'primary' : 'success'}
					as="button"
					class="text-sm font-medium uppercase"
					on:click={onClick}
					on:drop={(e) => onDrop(e)}
					on:dragover={(e) => {
						e.preventDefault();
						uploading = 1;
					}}
					on:dragleave={() => (uploading = 0)}
					on:end={() => (uploading = 0)}
				>
					Upload Files
				</Empty>
			</FileInput>
			<input type="file" multiple />
		</form>
	</div>
</ExamplePage>
