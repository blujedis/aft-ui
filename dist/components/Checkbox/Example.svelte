<script>import Checkbox, {} from ".";
import Section from "../_Example/Section.svelte";
import SelectTheme from "../_Example/SelectTheme.svelte";
import SelectSize from "../_Example/SelectSize.svelte";
import SelectShadowed from "../_Example/SelectShadowed.svelte";
import ListOptions from "../_Example/ListOptions.svelte";
import ToggleOptions from "../_Example/ToggleOptions.svelte";
import ExamplePage from "../_Example/ExamplePage.svelte";
import SelectRounded from "../_Example/SelectRounded.svelte";
const title = "Checkboxes";
const description = "Themed Checkbox component.";
const code = `
  `;
const props = {
  disabled: false,
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "light",
  transitioned: false,
  variant: "default"
};
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<span class="italic">No Toggle Options</span>
	</ToggleOptions>
	<ListOptions>
		<SelectTheme bind:value={props.theme} />
		<SelectSize bind:value={props.size} />
		<SelectRounded bind:value={props.rounded} />
		<SelectShadowed bind:value={props.shadowed} />
	</ListOptions>

	<Section>
		<hr />
	</Section>

	<div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">Outlined:</div>
			<Checkbox {...props} />
		</label>
	</div>
</ExamplePage>
