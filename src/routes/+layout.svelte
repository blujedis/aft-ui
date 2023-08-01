<script lang="ts">
	import Colormode from '../lib/components/Colormode';
	import Switch from '../lib/components/Switch';
	import '../app.css';
</script>

<slot />

<Colormode let:checked let:toggle let:reset>
	<Switch {checked} on:change={toggle} class="absolute bottom-4 right-6" />
</Colormode>
