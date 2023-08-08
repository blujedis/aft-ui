<script>import Label from ".";
import ExamplePage from "../_Example/ExamplePage.svelte";
const title = "Label";
const description = "HTML themed form label elements.";
const code = `
  `;
const props = {
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "light",
  transitioned: false
  // ThemeTransitioned,
};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">Outlined:</div>
			<Label {...props} />
		</label>
	</div>
</ExamplePage>
