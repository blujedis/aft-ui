<script>import Tile, {} from ".";
import Section from "../_Example/Section.svelte";
import SelectTheme from "../_Example/SelectTheme.svelte";
import SelectRounded from "../_Example/SelectRounded.svelte";
import SelectShadowed from "../_Example/SelectShadowed.svelte";
import ListOptions from "../_Example/ListOptions.svelte";
import ToggleOptions from "../_Example/ToggleOptions.svelte";
import ExamplePage from "../_Example/ExamplePage.svelte";
import Checkbox from "../_Example/Checkbox.svelte";
import SelectSize from "../_Example/SelectSize.svelte";
const title = "Tile";
const description = "Basic tiles that can be used for button or anchor content for navigation.";
const code = `
  `;
const props = {
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "default",
  // transitioned: false as boolean, // ThemeTransitioned,
  variant: "default"
};
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<Checkbox label="Full" bind:checked={props.full} />
		<!-- <Checkbox label="Transitioned" bind:checked={props.transitioned} /> -->
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

	{#key props}
		<div class="grid grid-cols-3 gap-4">
			<label for="filled">
				<div class="text-sm">Filled:</div>
				<Tile {...props}>My Profile</Tile>
			</label>
			<label for="filled">
				<div class="text-sm">Outlined:</div>
				<Tile {...props} variant="outline">Some content</Tile>
			</label>
		</div>
	{/key}
	<div class="mt-4">
		<label>Using Grid w/ Full</label>
		<div class="grid grid-cols-8 gap-1 h-48">
			<button>
				<Tile {...props} full>Profile</Tile>
			</button>
			<button>
				<Tile {...props} full>Accounting</Tile>
			</button>
			<button>
				<Tile {...props} full>Invoices</Tile>
			</button>
			<button>
				<Tile {...props} full>Quotes</Tile>
			</button>
			<button>
				<Tile {...props} full>Messages</Tile>
			</button>
			<button>
				<Tile {...props} full>Users</Tile>
			</button>
			<button>
				<Tile {...props} full>Settings</Tile>
			</button>
		</div>
	</div>
</ExamplePage>
