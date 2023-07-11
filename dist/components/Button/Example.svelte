<script>import Button, {} from ".";
import Section from "../_Example/Section.svelte";
import SelectTheme from "../_Example/SelectTheme.svelte";
import SelectSize from "../_Example/SelectSize.svelte";
import SelectRounded from "../_Example/SelectRounded.svelte";
import SelectShadowed from "../_Example/SelectShadowed.svelte";
import ListOptions from "../_Example/ListOptions.svelte";
import ToggleOptions from "../_Example/ToggleOptions.svelte";
import ExamplePage from "../_Example/ExamplePage.svelte";
import Checkbox from "../_Example/Checkbox.svelte";
const title = "Buttons";
const description = "Themed Buttons with multiple variants.";
const code = `
  `;
const props = {
  activated: false,
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
  variant: "default",
  underlined: false
};
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<Checkbox label="Full" bind:checked={props.full} />
		<Checkbox label="Transitioned" bind:checked={props.transitioned} />
		<Checkbox label="Disabled" bind:checked={props.disabled} />
		<Checkbox label="Underlined" bind:checked={props.underlined} />
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

	<div class="grid grid-cols-4 gap-4">
		<label for="filled">
			<Button {...props}>Button</Button>
		</label>
		<label for="outline">
			<Button {...props} variant="outlined">Button</Button>
		</label>
		<label for="link">
			<Button {...props} variant="text">Button</Button>
		</label>
		<label for="ghost">
			<Button {...props} variant="ghost">Button</Button>
		</label>
	</div>
</ExamplePage>
