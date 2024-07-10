<script>import ExamplePage from "../_Example/ExamplePage.svelte";
import { Alert } from ".";
import { colors } from "../../constants";
import { Button } from "../Button";
const title = "Alerts";
const description = "Simple component for displaying tags, notification counts and more.";
let visible = false;
const props = {
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "frame",
  transitioned: false,
  variant: "filled"
};
const staticProps = {
  ...props,
  removable: false,
  escapable: false,
  visible: true
};
const _colors = [...colors, "white", "black"];
</script>

<ExamplePage {title} {description}>
	{#each _colors as color}
		<div class="grid grid-cols-4 gap-2 mb-4">
			<Alert {...staticProps} theme={color}>Some alert message.</Alert>
			<Alert {...staticProps} variant="outlined" theme={color}>Some alert message.</Alert>
			<Alert {...staticProps} variant="soft" theme={color}>Some alert message.</Alert>
		</div>
	{/each}
	<Alert {...props} bind:visible variant="soft" theme="danger" position="top" full
		>Some alert message.</Alert
	>
	<Button on:click={() => (visible = true)}>Toggle Alert</Button>
</ExamplePage>
