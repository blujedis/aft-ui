<script>import { Checkbox } from ".";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { colors } from "../../constants/colors";
const title = "Checkboxes";
const description = "Themed Checkbox component.";
const code = `
  `;
const props = {
  disabled: false,
  full: false,
  // rounded: 'md' as ThemeRounded,
  shadowed: "none",
  size: "md",
  transitioned: false,
  variant: "outlined"
};
</script>

<ExamplePage {title} {description}>
	<div class="grid grid-cols-8 gap-2">
		{#each colors as color}
			<label for="outlined">
				<Checkbox {...props} theme={color} />
			</label>
		{/each}
	</div>
</ExamplePage>
