<script>import { FileInput } from ".";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { Button } from "../Button";
import { Empty } from "../Empty";
const title = "File Input";
const description = "Component for handling input files.";
const code = `
  `;
let theme = "dark";
const props = {
  disabled: false,
  focused: "focusVisible",
  // true: focus-visible.
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "light",
  transitioned: false
  // ThemeTransitioned,
};
function handleUpload(data, files) {
  console.log(data?.get("file"));
  console.log(files);
  setTheme("end");
}
function setTheme(type) {
  if (type === "start")
    theme = "success";
  else
    theme = "light";
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
