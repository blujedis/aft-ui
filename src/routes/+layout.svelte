<script lang="ts">
	import '../app.css';
	import { ColorMode, Switch } from '$lib/components';
</script>

<svelte:head>
	<script>
		let darkMode = false;
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		if (localStorage.darkmode === 'true' || (!('darkmode' in localStorage) && prefersDark)) {
			darkMode = true;
		} else {
			const currentDark = JSON.parse(localStorage['darkmode'] || 'false');
			if (currentDark) darkMode = true;
			else darkMode = false;
		}

		if (darkMode) document.documentElement.classList.add('dark');
		else document.documentElement.classList.remove('dark');
		localStorage.setItem('preferdark', prefersDark);
		localStorage.setItem('darkmode', darkMode);
	</script>
</svelte:head>

<slot />

<ColorMode let:dark let:toggle>
	<Switch
		checked={dark}
		on:change={toggle}
		shadowed="md"
		size="sm"
		class="fixed top-4 right-6 z-50"
	/>
</ColorMode>
