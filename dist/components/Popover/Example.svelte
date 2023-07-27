<script>import Section from "../_Example/Section.svelte";
import SelectTheme from "../_Example/SelectTheme.svelte";
import SelectSize from "../_Example/SelectSize.svelte";
import SelectRounded from "../_Example/SelectRounded.svelte";
import SelectShadowed from "../_Example/SelectShadowed.svelte";
import ListOptions from "../_Example/ListOptions.svelte";
import ToggleOptions from "../_Example/ToggleOptions.svelte";
import ExamplePage from "../_Example/ExamplePage.svelte";
import Checkbox from "../_Example/Checkbox.svelte";
import popover, {} from "../../hooks/usePopover";
const title = "Popover";
const description = "Uses Popper to position tooltips and popover informational components.";
const code = `
  `;
const props = {
  arrowed: true,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "frame",
  transitioned: false,
  variant: "default"
};
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<Checkbox label="Arrowed" bind:checked={props.arrowed} />
		<Checkbox label="Transitioned" bind:checked={props.transitioned} />
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

	<div class="grid grid-cols-3 gap-4 p-4">
		<label>
			<div class="text-sm">Default Using Title Attribute:</div>
			<button use:popover={{ action: 'hover' }} title="Hello Tooltip">Tooltip Button</button>
		</label>
	</div>
</ExamplePage>
