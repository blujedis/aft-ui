<script>import { Radio } from ".";
import ExamplePage from "../_Example/ExamplePage.svelte";
const title = "Radio";
const description = "Themed radio input element.";
const code = `
  `;
const props = {
  disabled: false,
  focused: true,
  // true: focus-visible.
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "light",
  transitioned: false,
  // ThemeTransitioned,
  variant: "outlined"
};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">Outlined:</div>
			<Radio {...props} />
		</label>
	</div>
</ExamplePage>
