<script lang="ts">
	import { classnames, useMode } from '@forewind/util';
	import { borderColor } from './constants';
	const themeMode = useMode();
</script>

<footer
	class={classnames('flex p-4 w-full border-t dark:border-gray-600 dark:text-white', borderColor)}
>
	Footer
	<button class="absolute right-4 bottom-4 dark:text-white" on:click={() => themeMode.toggle()}
		>Toggle Mode</button
	>
</footer>
