<script lang="ts">
	import Modal, { type ModalVariant, ModalComponent } from '.';
	import type { ThemeColor, ThemeRounded, ThemeShadowed } from '$lib/types';
	import Button from '../Button';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import type { DisclosureTransitionOption } from '../Disclosure';

	const title = 'Modal';
	const description = 'Modal dialog box with built in transitions.';
	const code = `
  `;

	const props = {
		abortable: true,
		backdrop: true,
		escapable: true,
		focustrap: true,
		rounded: 'sm' as ThemeRounded,
		shadowed: 'xl' as ThemeShadowed,
		theme: 'light' as ThemeColor,
		transition: 'dissolve' as DisclosureTransitionOption,
		variant: 'default' as ModalVariant,
		visible: false,
		unmount: true
	};

	let modal: ModalComponent;
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
