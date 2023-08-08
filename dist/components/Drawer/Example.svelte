<script>import { Drawer } from ".";
import ExamplePage from "../_Example/ExamplePage.svelte";
const title = "Drawer";
const description = "Component for revealing a drawer which can be used for menus or settings as an example";
const code = `
  `;
let drawer;
const props = {
  position: "right",
  shadowed: "xl",
  size: "md",
  speed: "medium",
  theme: "light"
};
function show() {
  drawer?.store?.open();
}
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">
				Default: <button class="text-primary underline pl-4" on:click={show}>Show Drawer</button>
			</div>
			<Drawer bind:this={drawer} {...props} />
		</label>
	</div>
</ExamplePage>
