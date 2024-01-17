<script>import { Switch } from ".";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { colors } from "../../constants";
const title = "Switch";
const description = "Toggle switch component.";
const code = `
  `;
let checked = true;
const props = {
  disabled: false,
  focused: "focusVisible",
  shadowed: "none",
  size: "lg",
  theme: "dark",
  transitioned: false
  // ThemeTransitioned,
};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4">
		<Switch {...props} bind:checked theme="light" size="xs" />
		<Switch {...props} bind:checked theme="light" size="sm" />
		<Switch {...props} bind:checked theme="light" size="md" />
		<Switch {...props} bind:checked theme="light" size="lg" />
		<Switch {...props} bind:checked theme="light" size="xl" />
		<Switch {...props} bind:checked theme="light" size="xl2" />
	</div>

	<!-- <div class="grid grid-cols-3 gap-4">
		{#each colors as color}
			<label for={color}>
				<Switch {...props} bind:checked theme={color} />
			</label>
		{/each}
	</div> -->
</ExamplePage>
