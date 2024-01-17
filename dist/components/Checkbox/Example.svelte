<script>import { Checkbox } from ".";
import ExamplePage from "../_Example/ExamplePage.svelte";
const title = "Checkboxes";
const description = "Themed Checkbox component.";
const code = `
  `;
const props = {
  disabled: false,
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "default",
  transitioned: false,
  variant: "outlined"
};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">Outlined:</div>
			<Checkbox {...props} />
		</label>
	</div>
</ExamplePage>
