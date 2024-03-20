<script>import { Empty } from ".";
import { colors } from "../../constants";
import ExamplePage from "../_Example/ExamplePage.svelte";
const title = "Empty";
const description = "New instance empty container.";
const code = `
  `;
const props = {
  focused: true,
  full: false,
  hovered: true,
  rounded: "none",
  shadowed: "none",
  size: "md",
  transitioned: false,
  variant: "outlined"
};
</script>

<ExamplePage {title} {description}>
	<div class="grid grid-cols-4 gap-4">
		{#each colors as color}
			<label for={color}>
				<div class="text-sm">Outlined:</div>
				<Empty {...props} tabindex={0} theme={color}>Empty</Empty>
			</label>
		{/each}
	</div>
</ExamplePage>
