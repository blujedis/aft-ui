<script>import { Switch, Label } from "..";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { colors } from "../../constants";
const title = "Switch";
const description = "Toggle switch component.";
let checked = true;
const props = {
  disabled: false,
  focused: true,
  shadowed: "none",
  transitioned: false
  // ThemeTransitioned,
};
</script>

<ExamplePage {title} {description}>
	<div class="grid grid-cols-3 gap-4">
		{#each colors as color}
			<Label tabindex={-1}>
				<Switch {...props} bind:checked theme={color} size="md" />
			</Label>
		{/each}
	</div>

	<Label>
		<Switch {...props} bind:checked theme="primary" size="md" />
	</Label>
</ExamplePage>
