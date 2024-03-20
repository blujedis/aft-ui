<script>import ExamplePage from "../_Example/ExamplePage.svelte";
import { Badge } from ".";
import { colors } from "../../constants";
const title = "Badges";
const description = "Simple component for displaying tags, notification counts and more.";
const code = `
  `;
const props = {
  full: false,
  rounded: "full",
  shadowed: "none",
  size: "md",
  theme: "default",
  hovered: true,
  focused: true,
  transitioned: false,
  variant: "filled"
};
</script>

<ExamplePage {title} {description}>
	{#each colors as color}
		<div class="grid grid-cols-4 gap-2 mb-4">
			<label for="filled">
				<Badge {...props} theme={color}>Badge</Badge>
			</label>
			<label for="outlined">
				<Badge {...props} variant="outlined" theme={color}>Badge</Badge>
			</label>
			<label for="soft">
				<Badge {...props} variant="soft" theme={color}>Badge</Badge>
			</label>
		</div>
	{/each}
	<!-- <Badge {...props} variant="filled" theme="primary" size="xl2">1</Badge>
	<Badge {...props} variant="filled" theme="primary" rounded="full" size="xl2">1</Badge> -->
</ExamplePage>
