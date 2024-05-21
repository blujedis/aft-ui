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
  rounded: "md",
  shadowed: "none",
  size: "md",
  // theme: 'default' as ThemeColor,
  transitioned: false,
  // ThemeTransitioned,
  variant: "outlined"
  // placeholder: 'Enter text here...'
};
</script>

<ExamplePage {title} {description}>
	<div class="grid grid-cols-4 gap-4 mb-4">
		{#each colors as color}
			<Textarea {...props} variant="outlined" theme={color}>Placeholder Text</Textarea>
		{/each}
	</div>
	<div class="grid grid-cols-4 gap-4 mb-4">
		{#each colors as color}
			<Textarea {...props} variant="soft" theme={color}>Placeholder Text</Textarea>
		{/each}
	</div>
	<div class="grid grid-cols-4 gap-4 mb-4">
		{#each colors as color}
			<Textarea {...props} variant="text" theme={color}>Placeholder Text</Textarea>
		{/each}
	</div>
</ExamplePage>
