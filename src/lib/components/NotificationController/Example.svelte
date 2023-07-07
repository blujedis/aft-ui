<script lang="ts">
	import type { NotificationVariant } from '../Notification';
	import NotificationController, { type NotificationPosition } from '.';
	import notification from '$lib/stores/notification';
	import type {
		ThemeColor,
		ThemeRounded,
		ThemeShadowed,
		ThemeSize,
		ThemeTransitioned
	} from '$lib/theme';
	import Section from '../_Example/Section.svelte';
	import SelectTheme from '../_Example/SelectTheme.svelte';
	import SelectSize from '../_Example/SelectSize.svelte';
	import SelectRounded from '../_Example/SelectRounded.svelte';
	import SelectShadowed from '../_Example/SelectShadowed.svelte';
	import ListOptions from '../_Example/ListOptions.svelte';
	import ToggleOptions from '../_Example/ToggleOptions.svelte';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import Checkbox from '../_Example/Checkbox.svelte';
	import SelectTransition from '../_Example/SelectTransition.svelte';
	import SelectPosition from '../_Example/SelectPosition.svelte';

	const title = 'Notifications';
	const description = 'Themed alert notification components and controller.';
	const code = `
  `;

	let textarea: HTMLTextAreaElement;

	const props = {
		position: 'top-right' as NotificationPosition,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'default' as ThemeColor,
		variant: 'default' as NotificationVariant
	};

	const themes = [
		'light',
		'dark',
		'smoke',
		'primary',
		'secondary',
		'tertiary',
		'danger',
		'success',
		'warning',
		'info'
	];

	function getRandomNumber(min = 0, max = 7) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function getRandomTheme() {
		return (themes[getRandomNumber()] || 'smoke') as any;
	}

	function notify() {
		notification.add({
			theme: getRandomTheme(),
			description: textarea.value
		});
	}
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<span class="italic">No Toggle Options</span>
	</ToggleOptions>
	<ListOptions>
		<SelectTheme bind:value={props.theme} />
		<SelectSize bind:value={props.size} />
		<SelectRounded bind:value={props.rounded} />
		<SelectShadowed bind:value={props.shadowed} />
		<SelectPosition bind:value={props.position} />
	</ListOptions>

	<Section>
		<hr />
	</Section>

	<div class="grid grid-cols-3 gap-4">
		<div>
			<label for="notification" class="flex flex-col"
				><span class="text-sm">Create Notification</span>
				<textarea
					bind:this={textarea}
					id="notification"
					class="text-sm mt-2"
					placeholder="Enter your Notification message."
				/>
			</label>
			<button
				class="bg-primary-600 hover:bg-primary-500 px-8 py-2 text-white text-sm rounded-sm mt-4"
				on:click={notify}>Notify</button
			>
		</div>
	</div>

	<NotificationController position={props.position} />
</ExamplePage>
