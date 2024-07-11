<script>import { Icon } from ".";
import { colors } from "../../constants";
import ExamplePage from "../_Example/ExamplePage.svelte";
const title = "Icon";
const description = "Iconify extended icon.";
const props = {
  hovered: true,
  transitioned: true
};
</script>

<ExamplePage {title} {description}>
	<div class="text-xl mb-4">Default (unthemed uses parent color)</div>
	<div class="mb-4 text-primary-300">
		<Icon {...props} icon="mdi-light:home" size="lg" />
	</div>

	<div class="text-xl mb-4">Default (using text-color)</div>
	{#each colors as color}
		<div class="grid grid-cols-6 gap-4">
			<Icon {...props} icon="mdi-light:home" size="xs" theme={color} />
			<Icon {...props} icon="mdi-light:home" size="sm" theme={color} />
			<Icon {...props} icon="mdi-light:home" size="md" theme={color} />
			<Icon {...props} icon="mdi-light:home" size="lg" theme={color} />
			<Icon {...props} icon="mdi-light:home" size="xl" theme={color} />
			<Icon {...props} icon="mdi-light:home" size="xl2" theme={color} />
		</div>
	{/each}
	<div class="text-xl mb-4">Stroke (using stroke-color)</div>
	{#each colors as color}
		<div class="grid grid-cols-6 gap-4">
			<Icon {...props} icon="mdi-light:home" size="xs" stroke theme={color} />
			<Icon {...props} icon="mdi-light:home" size="sm" stroke theme={color} />
			<Icon {...props} icon="mdi-light:home" size="md" stroke theme={color} />
			<Icon {...props} icon="mdi-light:home" size="lg" stroke theme={color} />
			<Icon {...props} icon="mdi-light:home" size="xl" stroke theme={color} />
			<Icon {...props} icon="mdi-light:home" size="xl2" stroke theme={color} />
		</div>
	{/each}
</ExamplePage>
