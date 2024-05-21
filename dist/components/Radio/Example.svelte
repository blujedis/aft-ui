<script>import { Radio } from ".";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { colors } from "../../constants/colors";
const title = "Radio";
const description = "Themed radio input element.";
const code = `
  `;
const props = {
  disabled: false,
  full: false,
  focused: true,
  rounded: "full",
  shadowed: "none",
  size: "md",
  transitioned: false
  // ThemeTransitioned,
};
</script>

<ExamplePage {title} {description}>
	<!-- <div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">Outlined:</div>
			<Radio {...props} />
		</label>
	</div> -->
	<div class="grid grid-cols-8 gap-2">
		{#each colors as color}
			<Radio {...props} theme={color} />
		{/each}
	</div>
</ExamplePage>
