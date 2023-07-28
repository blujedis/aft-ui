<script lang="ts">
	import FileInput, { type FileInputVariant } from '.';
	import type {
		ThemeColor,
		ThemeFocused,
		ThemeRounded,
		ThemeShadowed,
		ThemeSize
	} from '../../types';
	import Section from '../_Example/Section.svelte';
	import SelectTheme from '../_Example/SelectTheme.svelte';
	import SelectSize from '../_Example/SelectSize.svelte';
	import SelectRounded from '../_Example/SelectRounded.svelte';
	import SelectShadowed from '../_Example/SelectShadowed.svelte';
	import ListOptions from '../_Example/ListOptions.svelte';
	import ToggleOptions from '../_Example/ToggleOptions.svelte';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import Checkbox from '../_Example/Checkbox.svelte';
	import Button from '../Button';
	import Empty, { type EmptyVariant } from '../Empty';

	const title = 'File Input';
	const description = 'Component for handling input files.';
	const code = `
  `;

	let theme: ThemeColor = 'dark';

	const props = {
		activated: false,
		disabled: false,
		focused: 'focusVisible' as ThemeFocused, // true: focus-visible.
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'light' as ThemeColor,
		transitioned: false as boolean, // ThemeTransitioned,
		variant: 'default' as FileInputVariant,
		underlined: false
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
	<ToggleOptions>
		<Checkbox label="Full" bind:checked={props.full} />
		<Checkbox label="Transitioned" bind:checked={props.transitioned} />
		<Checkbox label="Disabled" bind:checked={props.disabled} />
		<Checkbox label="Underlined" bind:checked={props.underlined} />
	</ToggleOptions>
	<ListOptions>
		<SelectTheme bind:value={props.theme} />
		<SelectSize bind:value={props.size} />
		<SelectRounded bind:value={props.rounded} />
		<SelectShadowed bind:value={props.shadowed} />
	</ListOptions>

	<Section>
		<hr />
	</Section>

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
