<script>import { Modal, ModalComponent } from ".";
import { Button } from "../Button";
import ExamplePage from "../_Example/ExamplePage.svelte";
const title = "Modal";
const description = "Modal dialog box with built in transitions.";
const code = `
  `;
const props = {
  abortable: true,
  backdrop: true,
  escapable: true,
  focustrap: true,
  rounded: "sm",
  shadowed: "xl",
  theme: "default",
  transition: "dissolve",
  visible: false,
  unmount: true
};
let modal;
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">Modal:</div>
			<Button
				on:click={() => {
					modal.store?.open();
				}}>Show/Hide Modal</Button
			>
		</label>
	</div>
	<Modal bind:this={modal} {...props} />
</ExamplePage>
