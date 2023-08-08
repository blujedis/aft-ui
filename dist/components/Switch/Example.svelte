<script>import { Switch } from ".";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { colors } from "../../constants";
const title = "Switch";
const description = "Toggle switch component.";
const code = `
  `;
let checked = true;
const props = {
  disabled: false,
  focused: "focusVisible",
  shadowed: "none",
  size: "md",
  theme: "dark",
  transitioned: false
  // ThemeTransitioned,
};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4">
		{#each colors as color}
			<label for={color}>
				<Switch {...props} bind:checked theme={color} />
			</label>
		{/each}
	</div>
</ExamplePage>
