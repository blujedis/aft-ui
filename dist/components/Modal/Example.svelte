<script>import { Modal, ModalComponent } from ".";
import { Button } from "../Button";
import ExamplePage from "../_Example/ExamplePage.svelte";
const title = "Modal";
const description = "Modal dialog box with built in transitions.";
let visible = false;
const props = {
  abortable: true,
  backdrop: true,
  escapable: true,
  focustrap: true,
  rounded: "sm",
  shadowed: "xl",
  theme: "frame",
  transition: "dissolve",
  unmount: true
};
</script>

<ExamplePage {title} {description}>
	<div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">Modal:</div>
			<Button
				on:click={() => {
					visible = !visible;
				}}>Show/Hide Modal</Button
			>
		</label>
	</div>
	<Modal bind:visible {...props} />
</ExamplePage>
