<script>import { Tile } from ".";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { colors } from "../../constants";
const title = "Tile";
const description = "Basic tiles that can be used for button or anchor content for navigation.";
const props = {
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "default",
  // transitioned: false as boolean, // ThemeTransitioned,
  variant: "filled"
};
</script>

<ExamplePage {title} {description}>
	{#each colors as color}
		<div class="grid grid-cols-5 gap-4 mb-4">
			<Tile {...props} theme={color}>My Profile</Tile>
			<Tile {...props} variant="outlined" theme={color}>Some content</Tile>
			<Tile {...props} theme={color} variant="soft">Some content</Tile>
		</div>
	{/each}
</ExamplePage>
