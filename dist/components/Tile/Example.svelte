<script>import { Tile } from ".";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { colors } from "../../constants";
const title = "Tile";
const description = "Basic tiles that can be used for button or anchor content for navigation.";
const code = `
  `;
const props = {
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "light",
  // transitioned: false as boolean, // ThemeTransitioned,
  variant: "filled"
};
</script>

<ExamplePage {title} {description} {code}>
	{#each colors as color}
		<div class="grid grid-cols-3 gap-4 mb-4">
			<label for="filled">
				<Tile {...props} theme={color}>My Profile</Tile>
			</label>
			<label for="filled">
				<Tile {...props} full theme={color} variant="glass">Some content</Tile>
			</label>
			<label for="filled">
				<Tile {...props} variant="outline" theme={color}>Some content</Tile>
			</label>
		</div>
	{/each}

	<!-- <div class="mt-4">
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
	</div> -->
</ExamplePage>
