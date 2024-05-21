<script>import { Box } from ".";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { colors } from "../../constants";
const title = "Box";
const description = "Basic boxes that can be used for button or anchor content for navigation.";
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
			<Box {...props} theme={color}>My Profile</Box>
			<Box {...props} variant="outlined" theme={color}>Some content</Box>
			<Box {...props} theme={color} variant="soft">Some content</Box>
		</div>
	{/each}
</ExamplePage>
