<script>import ExamplePage from "../_Example/ExamplePage.svelte";
import { Tooltip } from ".";
import { colors } from "../../constants";
import { Button } from "..";
const title = "Tooltip";
const description = "Tooltip component.";
const props = {
  rounded: "full",
  shadowed: "none",
  size: "md",
  theme: "default",
  hovered: true,
  transitioned: false,
  variant: "filled"
};
</script>

<ExamplePage {title} {description}>
	<Button>Show Tooltip</Button>
	<Tooltip offset={10} placement="top" class="px-4 py-2 inline-flex" rounded="md"
		>Hello Tooltip</Tooltip
	>
</ExamplePage>
