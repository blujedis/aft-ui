<script lang="ts">
	import '../lib';
	import Nav from '$docs/layout/Nav.svelte';
	import Sidebar from '$docs/layout/Sidebar.svelte';
	import { useMode } from '@forewind/util';
	import '../app.css';
	const themeMode = useMode();
</script>

<header class="flex w-full">
	<Nav />
</header>

<main class="flex-1 w-full relative">
	<div class="flex h-full">
		<Sidebar />
		<slot />
	</div>
</main>

<footer class="flex p-4 w-full border-t border-t-gray-200 dark:border-gray-600 dark:text-white">
	Footer
	<button class="absolute right-4 bottom-4 dark:text-white" on:click={() => themeMode.toggle()}
		>Toggle Mode</button
	>
</footer>
