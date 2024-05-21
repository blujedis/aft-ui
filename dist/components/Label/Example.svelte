<script>import Label from ".";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { colors } from "../../constants/colors";
const title = "Label";
const description = "HTML themed form label elements.";
const code = `
  `;
const props = {
  hovered: true,
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "default",
  transitioned: false
  // ThemeTransitioned,
};
</script>

<ExamplePage {title} {description}>
	<div class="grid grid-cols-8 gap-4">
		{#each colors as color}
			<Label {...props} theme={color}>Label</Label>
		{/each}
	</div>
</ExamplePage>
