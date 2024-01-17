<script>import { Button } from ".";
import { colors } from "../../constants";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { Flushed } from "../Flushed";
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
  variant: "filled",
  underlined: false
};
</script>

<ExamplePage {title} {description} {code}>
	{#each colors as color}
		<div class="grid grid-cols-5 gap-4 mb-4">
			<label for="filled">
				<Button {...props} theme={color}>button</Button>
			</label>
			<label for="outline">
				<Button {...props} variant="outlined" theme={color}>button</Button>
			</label>
			<label for="link">
				<Button {...props} variant="text" theme={color}>button</Button>
			</label>
			<label for="ghost">
				<Button {...props} variant="ghost" theme={color}>button</Button>
			</label>
		</div>
	{/each}
</ExamplePage>
