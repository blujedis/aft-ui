<script>
	import Modal, { ModalComponent } from '.';
	import Button from '../Button';
	import Section from '../_Example/Section.svelte';
	import SelectTheme from '../_Example/SelectTheme.svelte';
	import SelectRounded from '../_Example/SelectRounded.svelte';
	import SelectShadowed from '../_Example/SelectShadowed.svelte';
	import ListOptions from '../_Example/ListOptions.svelte';
	import ToggleOptions from '../_Example/ToggleOptions.svelte';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import Checkbox from '../_Example/Checkbox.svelte';
	import SelectTransition from '../_Example/SelectTransition.svelte';
	const title = 'Modal';
	const description = 'Themed dialog box.';
	const code = `
  `;
	const props = {
		abortable: true,
		backdrop: true,
		escapable: true,
		focustrap: true,
		rounded: 'sm',
		shadowed: 'xl',
		theme: 'default',
		transition: 'fade',
		variant: 'default',
		visible: false,
		unmount: true
	};
	let modal;
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<Checkbox label="Backdrop" bind:checked={props.backdrop} />
		<Checkbox label="Abortable" bind:checked={props.abortable} />
		<Checkbox label="Escapable" bind:checked={props.escapable} />
		<Checkbox label="Focustrap" bind:checked={props.focustrap} />
	</ToggleOptions>
	<ListOptions>
		<SelectTheme bind:value={props.theme} />
		<SelectTransition bind:value={props.transition} />
		<SelectRounded bind:value={props.rounded} />
		<SelectShadowed bind:value={props.shadowed} />
	</ListOptions>

	<Section>
		<hr />
	</Section>

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
