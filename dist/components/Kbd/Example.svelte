<script>import { Kbd } from ".";
import { colors } from "../../constants";
import ExamplePage from "../_Example/ExamplePage.svelte";
const title = "KBD";
const description = "Themed KBD elements and variants.";
const code = `
  `;
const props = {
  full: false,
  rounded: "md",
  shadowed: "none",
  size: "md",
  theme: "default",
  transitioned: false,
  //  ThemeTransitioned,
  variant: "filled"
};
</script>

<ExamplePage {title} {description} {code}>
	{#each colors as color}
		<div class="grid grid-cols-3 gap-4 mb-4">
			<label for="filled">
				<Kbd {...props} variant="filled" theme={color}>space</Kbd>
			</label>
			<label for="filled">
				<Kbd {...props} variant="outline" theme={color}>cmd + i</Kbd>
			</label>
			<label for="filled">
				<Kbd {...props} variant="glass" theme={color}>ctrl + shift</Kbd>
			</label>
		</div>
	{/each}
</ExamplePage>
