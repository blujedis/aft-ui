<script>import { Textarea } from ".";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { colors } from "../../constants";
const title = "Textarea";
const description = "Themed textarea input component.";
const code = `
  `;
const props = {
  disabled: false,
  focused: true,
  // true: focus-visible.
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "light",
  transitioned: false,
  // ThemeTransitioned,
  variant: "outlined"
};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4">
		{#each colors as color}
			<label for="filled">
				<Textarea {...props} variant="filled" theme={color} />
			</label>
			<label for="glass">
				<Textarea {...props} variant="glass" theme={color} />
			</label>
			<label for="outline">
				<Textarea {...props} variant="outlined" theme={color} />
			</label>
		{/each}
	</div>
</ExamplePage>
