<script>import { Range } from "./";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { colors } from "../../constants/colors";
const title = "Range";
const description = "Input range component.";
const props = {
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "sm"
  // theme: 'primary' as ThemeColor
};
</script>

<ExamplePage {title} {description}>
	<div class="grid grid-cols-3 gap-4">
		{#each colors as color}
			<div class="grid grid-cols-3 gap-2 mb-8">
				<Range value="65" {...props} theme={color} size="xs" />
				<Range value="50" {...props} theme={color} size="sm" />
				<Range value="25" {...props} theme={color} size="md" />
				<Range value="36" {...props} theme={color} size="lg" />
				<Range value="70" {...props} theme={color} size="xl" />
				<Range value="40" {...props} theme={color} size="xl2" />
			</div>
		{/each}
	</div>
	<!-- <input
		type="range"
		value="65"
		class="appearance-none bg-gray-500 h-1 accent-success hover:accent-success-300"
	/> -->
</ExamplePage>
