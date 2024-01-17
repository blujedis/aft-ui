<script>import { Loader } from ".";
import ExamplePage from "../_Example/ExamplePage.svelte";
const title = "Loader";
const description = "HTML themed Loader/spinner element.";
const code = `
  `;
const props = {
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "default",
  transitioned: false
  // ThemeTransitioned,
};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">Outlined:</div>
			<Loader {...props} />
		</label>
	</div>
</ExamplePage>
