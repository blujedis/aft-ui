<script>import { Input } from ".";
import { colors } from "../../constants";
import ExamplePage from "../_Example/ExamplePage.svelte";
const title = "Input";
const description = "Themed input form elements and variants.";
const props = {
  disabled: false,
  focused: true,
  full: false,
  hovered: true,
  rounded: "md",
  shadowed: "none",
  size: "md",
  theme: "default",
  transitioned: false
  // ThemeTransitioned,
};
</script>

<ExamplePage {title} {description}>
	{#each colors as color}
		<div class="grid grid-cols-5 gap-4 mb-4">
			<label for="outline">
				<Input {...props} variant="filled" theme={color} placeholder="Last Name" />
			</label>

			<label for="filled">
				<Input {...props} variant="outlined" theme={color} placeholder="First Name" />
			</label>

			<label for="outline">
				<Input {...props} variant="soft" theme={color} placeholder="Last Name" />
			</label>

			<label for="flushed">
				<Input {...props} variant="flushed" theme={color} placeholder="DOB" />
			</label>

			<label for="text">
				<Input {...props} variant="text" theme={color} placeholder="DOB" />
			</label>
		</div>
	{/each}
</ExamplePage>
