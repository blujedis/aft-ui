<script lang="ts">
	import { Modal, ModalComponent } from '.';
	import type { ThemeColor, ThemeRounded, ThemeShadowed } from '$lib/types';
	import { Button } from '../Button';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import type { DisclosureTransitionOption } from '../Disclosure';

	const title = 'Modal';
	const description = 'Modal dialog box with built in transitions.';

	let visible = false;

	const props = {
		abortable: true,
		backdrop: true,
		escapable: true,
		focustrap: true,
		rounded: 'sm' as ThemeRounded,
		shadowed: 'xl' as ThemeShadowed,
		theme: 'frame' as ThemeColor,
		transition: 'dissolve' as DisclosureTransitionOption,
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
