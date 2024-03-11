<script lang="ts">
	import '../app.css';
	import { ColorMode, Switch } from '$lib/components';
</script>

<svelte:head>
	<script>
		const key = 'darkmode';
		let darkMode = false;
		let prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		if (localStorage.darkmode === 'true' || (!(key in localStorage) && prefersDark)) {
			darkMode = true;
		} else {
			const currentDark = JSON.parse(localStorage[key] || 'false');
			if (currentDark) darkMode = true;
			else darkMode = false;
		}

		if (darkMode) document.documentElement.classList.add('dark');
		else document.documentElement.classList.remove('dark');
		localStorage.setItem('preferdark', prefersDark);
		localStorage.setItem(key, darkMode);
	</script>
</svelte:head>

<slot />

<ColorMode let:dark let:toggle>
	<Switch
		checked={dark}
		on:change={toggle}
		shadowed="md"
		size="sm"
		class="fixed bottom-4 right-6 z-30"
	/>
</ColorMode>
