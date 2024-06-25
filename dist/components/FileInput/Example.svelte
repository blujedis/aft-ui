<script>import { FileInput } from ".";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { Button } from "../Button";
import { Input } from "../Input";
import { Box } from "../Box";
const title = "File Input";
const description = "Component for handling input files.";
let uploading = 0;
let value;
function handleFormData(err, data, files) {
  uploading = 2;
  if (err)
    console.log(err);
  if (data)
    for (const value2 of data.values()) {
      console.log(value2);
    }
}
function handleReadFiles(err, result, files) {
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
					<Box centered={false} size="unstyled" theme="primary" focused>
						<Button theme="primary" focused={false} on:click={onClick} class="rounded-r-none"
							>Upload Files</Button
						>
						<Input focused={false} class="rounded-l-none" on:click={onClick} bind:value />
					</Box>
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
				<Box
					theme={uploading === 0 ? 'frame' : uploading === 1 ? 'primary' : 'success'}
					emptied
					size="md"
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
				</Box>
			</FileInput>
			<div class="mt-4">
				<input type="file" multiple />
			</div>
		</form>
	</div>
</ExamplePage>
