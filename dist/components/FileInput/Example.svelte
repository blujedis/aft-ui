<script>import { FileInput } from ".";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { Button } from "../Button";
import { Empty } from "../Empty";
const title = "File Input";
const description = "Component for handling input files.";
const props = {
  disabled: false,
  focused: "focusVisible",
  // true: focus-visible.
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "default",
  transitioned: false
  // ThemeTransitioned,
};
let theme = "frame";
function handleUpload(data, files) {
  const file = data?.get("file");
  console.info(`Uploaded file ${file.name}`);
  console.log(file);
  setTheme("end");
}
function setTheme(type) {
  if (type === "start")
    theme = "success";
  else
    theme = "frame";
}
</script>

<ExamplePage {title} {description}>
	<div class="flex space-x-8">
		<label for="Upload Button">
			<FileInput accept="image/png, image/jpeg" onFormData={handleUpload} let:click>
				<Button variant="text" theme="frame" on:click={click}>Upload Files</Button>
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
