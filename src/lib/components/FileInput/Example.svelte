<script lang="ts">
	import { FileInput } from '.';
	import type {
		ThemeColor,
		ThemeFocused,
		ThemeRounded,
		ThemeShadowed,
		ThemeSize
	} from '../../types';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { Button } from '../Button';
	import { Empty } from '../Empty';

	const title = 'File Input';
	const description = 'Component for handling input files.';
	const code = `
  `;

	let theme: ThemeColor = 'dark';

	const props = {
		disabled: false,
		focused: 'focusVisible' as ThemeFocused, // true: focus-visible.
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'light' as ThemeColor,
		transitioned: false as boolean // ThemeTransitioned,
	};

	function handleUpload(data: FormData | null, files: FileList | null) {
		console.log(data?.get('file'));
		console.log(files);
		setTheme('end');
	}

	function setTheme(type: 'start' | 'end') {
		if (type === 'start') theme = 'success';
		else theme = 'light';
	}
</script>

<ExamplePage {title} {description} {code}>
	<div class="flex space-x-8">
		<label for="Upload Button">
			<FileInput accept="image/png, image/jpeg" onFormData={handleUpload} let:click>
				<Button variant="text" theme="dark" on:click={click}>Upload Files</Button>
			</FileInput>
		</label>

		<label for="Upload Drop Child Element">
			<form id="upload">
				<FileInput accept="image/png, image/jpeg" onFormData={handleUpload} let:click let:drop>
					<button
						on:click={click}
						on:drop={drop}
						on:dragover|preventDefault={() => setTheme('start')}
						on:dragleave={() => setTheme('end')}
						on:dragend={() => setTheme('end')}
					>
						<Empty bind:theme class="text-sm font-medium uppercase">Upload Files</Empty>
					</button>
				</FileInput>
			</form>
		</label>
	</div>
</ExamplePage>
