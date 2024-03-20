<script>import { Kbd } from ".";
import { colors } from "../../constants";
import ExamplePage from "../_Example/ExamplePage.svelte";
const title = "KBD";
const description = "Themed KBD elements and variants.";
const code = `
  `;
const props = {
  full: false,
  hovered: true,
  rounded: "md",
  shadowed: "none",
  size: "md",
  theme: "default",
  transitioned: false,
  //  ThemeTransitioned,
  variant: "filled"
};
</script>

<ExamplePage {title} {description}>
	{#each colors as color}
		<div class="grid grid-cols-3 gap-4 mb-4">
			<label for="filled">
				<Kbd {...props} variant="filled" theme={color}>space</Kbd>
			</label>
			<label for="filled">
				<Kbd {...props} variant="outlined" theme={color}>cmd + i</Kbd>
			</label>
			<label for="filled">
				<Kbd {...props} variant="soft" theme={color}>ctrl + shift</Kbd>
			</label>
		</div>
	{/each}
</ExamplePage>
