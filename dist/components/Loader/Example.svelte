<script>import { Loader } from ".";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { colors } from "../../constants/colors";
const title = "Loader";
const description = "HTML themed Loader/spinner element.";
let text = "Show Loaders";
let visible = false;
const props = {
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "xl2",
  theme: "frame",
  transitioned: false
};
function toggleLoader() {
  if (visible) text = "Show Loaders";
  else text = "Hide Loaders";
  visible = !visible;
}
</script>

<ExamplePage {title} {description}>
	<div class="mb-12 grid grid-cols-8 gap-2">
		{#each colors as color}
			<Loader {...props} {visible} theme={color} />
		{/each}
	</div>
	<div>
		<button
			on:click={toggleLoader}
			class="px-3 py-1.5 text-white rounded-sm"
			class:bg-primary-500={visible === false}
			class:bg-danger-500={visible === true}
		>
			{text}
		</button>
	</div>
</ExamplePage>
