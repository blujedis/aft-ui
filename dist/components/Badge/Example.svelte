<script>import ExamplePage from "../_Example/ExamplePage.svelte";
import { Badge } from ".";
import { colors } from "../../constants";
const title = "Badges";
const description = "Simple component for displaying tags, notification counts and more.";
const code = `
  `;
const props = {
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "default",
  transitioned: false,
  variant: "filled"
};
</script>

<ExamplePage {title} {description} {code}>
	{#each colors as color}
		<div class="grid grid-cols-8 gap-2 mb-4">
			<label for="filled">
				<Badge {...props} theme={color}>React</Badge>
			</label>

			<label for="outlined">
				<Badge {...props} variant="outlined" theme={color}>react</Badge>
			</label>

			<label for="ghost">
				<Badge {...props} variant="ghost" theme={color}>React</Badge>
			</label>
		</div>
	{/each}
</ExamplePage>
