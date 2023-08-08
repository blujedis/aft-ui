<script>import { Empty } from ".";
import { colors } from "../../constants";
import ExamplePage from "../_Example/ExamplePage.svelte";
const title = "Empty";
const description = "New instance empty container.";
const code = `
  `;
const props = {
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "success",
  transitioned: false,
  // ThemeTransitioned,
  variant: "outlined"
};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-4 gap-4">
		{#each colors as color}
			<label for={color}>
				<div class="text-sm">Outlined:</div>
				<Empty theme={color}>Empty</Empty>
			</label>
		{/each}
	</div>
</ExamplePage>
