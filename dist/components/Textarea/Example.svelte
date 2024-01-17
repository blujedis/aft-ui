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
  theme: "default",
  transitioned: false,
  // ThemeTransitioned,
  variant: "outlined",
  placeholder: "Example text use bind:value={some_property}"
};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-4 gap-4 mb-4">
		{#each colors as color}
			<Textarea {...props} variant="filled" theme={color}>Placeholder Text</Textarea>
		{/each}
	</div>
	<div class="grid grid-cols-4 gap-4 mb-4">
		{#each colors as color}
			<Textarea {...props} variant="ghost" theme={color}>Placeholder Text</Textarea>
		{/each}
	</div>
	<div class="grid grid-cols-4 gap-4 mb-4">
		{#each colors as color}
			<Textarea {...props} variant="outlined" theme={color}>Placeholder Text</Textarea>
		{/each}
	</div>
</ExamplePage>
