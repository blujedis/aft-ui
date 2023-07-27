<script>import Drawer, {} from ".";
import Section from "../_Example/Section.svelte";
import SelectTheme from "../_Example/SelectTheme.svelte";
import SelectSize from "../_Example/SelectSize.svelte";
import SelectShadowed from "../_Example/SelectShadowed.svelte";
import ListOptions from "../_Example/ListOptions.svelte";
import ToggleOptions from "../_Example/ToggleOptions.svelte";
import ExamplePage from "../_Example/ExamplePage.svelte";
const title = "Drawer";
const description = "Component for revealing a drawer which can be used for menus or settings as an example";
const code = `
  `;
let drawer;
const props = {
  position: "right",
  shadowed: "xl",
  size: "md",
  speed: "medium",
  theme: "light",
  variant: "default"
};
function show() {
  drawer?.store?.open();
}
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<span class="italic">No Toggle Options</span>
	</ToggleOptions>
	<ListOptions>
		<SelectTheme bind:value={props.theme} />
		<SelectSize bind:value={props.size} />
		<!-- <SelectRounded bind:value={props.rounded} /> -->
		<SelectShadowed bind:value={props.shadowed} />
	</ListOptions>

	<Section>
		<hr />
	</Section>

	<div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">
				Default: <button class="text-primary underline pl-4" on:click={show}>Show Drawer</button>
			</div>
			<Drawer bind:this={drawer} {...props} />
		</label>
	</div>
</ExamplePage>
