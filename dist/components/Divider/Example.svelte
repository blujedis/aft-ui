<script>import { Divider } from ".";
import { colors } from "../../constants";
import ExamplePage from "../_Example/ExamplePage.svelte";
const title = "Divider";
const description = "Themed Divider component.";
const code = `
  `;
const props = {
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "default",
  transitioned: false
};
</script>

<ExamplePage {title} {description}>
	{#each colors as color}
		<div class="mb-4"></div>
	{/each}
</ExamplePage>
