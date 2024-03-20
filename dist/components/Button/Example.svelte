<script>import { Button } from ".";
import { colors } from "../../constants";
import ExamplePage from "../_Example/ExamplePage.svelte";
const title = "Buttons";
const description = "Themed Buttons with variants.";
const code = `
  `;
const props = {
  disabled: false,
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  strong: false,
  underlined: false,
  hovered: true,
  focused: true,
  transitioned: true
};
</script>

<ExamplePage {title} {description}>
	{#each colors as color}
		<div class="grid grid-cols-5 gap-4 mb-4">
			<Button {...props} variant="filled" theme={color}>Button</Button>
			<Button {...props} variant="outlined" theme={color}>Button</Button>
			<Button {...props} variant="soft" theme={color}>Button</Button>
			<Button {...props} variant="ghost" theme={color}>Button</Button>
			<Button {...props} variant="text" theme={color}>Button</Button>
		</div>
	{/each}
</ExamplePage>
