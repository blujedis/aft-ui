<script lang="ts">
	import type { NotificationVariant } from '../Notification';
	import Notifications, { type NotificationPosition } from '.';
	import notification from '$lib/stores/notification';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	const title = 'Notifications';
	const description = 'Alert notifications with 6 optional positions.';
	const code = `
  `;

	let textarea: HTMLTextAreaElement;

	const props = {
		position: 'top-right' as NotificationPosition,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'light' as ThemeColor,
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

	<div class="grid grid-cols-3 gap-4">
		<div>
			<label for="notification" class="flex flex-col"
				><span class="text-sm">Create Notification</span>
				<textarea
					bind:this={textarea}
					id="notification"
					class="text-sm mt-2 p-4"
					placeholder="Enter your Notification message."
				/>
			</label>
			<button
				class="bg-primary-600 hover:bg-primary-500 px-8 py-2 text-white text-sm rounded-sm mt-4"
				on:click={notify}>Notify</button
			>
		</div>
	</div>

	<Notifications position={props.position} />
</ExamplePage>
