<script>import Switch, {} from ".";
import Section from "../_Example/Section.svelte";
import SelectTheme from "../_Example/SelectTheme.svelte";
import SelectShadowed from "../_Example/SelectShadowed.svelte";
import ListOptions from "../_Example/ListOptions.svelte";
import ToggleOptions from "../_Example/ToggleOptions.svelte";
import ExamplePage from "../_Example/ExamplePage.svelte";
import Checkbox from "../_Example/Checkbox.svelte";
import SelectSize from "../_Example/SelectSize.svelte";
const title = "Switch";
const description = "Toggle switch component.";
const code = `
  `;
const props = {
  disabled: false,
  focused: "visible",
  shadowed: "none",
  size: "md",
  theme: "light",
  transitioned: false,
  // ThemeTransitioned,
  variant: "default"
};
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<Checkbox label="Disabled" bind:checked={props.disabled} />
		<Checkbox label="Transitioned" bind:checked={props.transitioned} />
	</ToggleOptions>
	<ListOptions>
		<SelectTheme bind:value={props.theme} />
		<SelectSize bind:value={props.size} />
		<SelectShadowed bind:value={props.shadowed} />
	</ListOptions>

	<Section>
		<hr />
	</Section>

	<div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">Outlined:</div>
			<Switch {...props} />
		</label>
	</div>
</ExamplePage>
