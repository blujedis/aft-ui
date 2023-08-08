<script>import ExamplePage from "../_Example/ExamplePage.svelte";
import { popover } from "../../hooks";
const title = "Popover";
const description = "Uses Popper to position tooltips and popover informational components.";
const code = `
  `;
const props = {
  arrowed: true,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "light",
  transitioned: false,
  variant: "filled"
};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4 p-4">
		<label>
			<div class="text-sm">Default Using Title Attribute:</div>
			<button use:popover={{ action: 'hover' }} title="Hello Tooltip">Tooltip Button</button>
		</label>
	</div>
</ExamplePage>
