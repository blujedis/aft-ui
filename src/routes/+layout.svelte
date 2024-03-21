<script lang="ts">
	import '../app.css';
	import { ColorMode, Switch } from '$lib/components';
</script>

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
