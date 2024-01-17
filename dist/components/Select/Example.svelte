<script>import { Select } from ".";
import { SelectOption } from "../SelectOption";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { colors } from "../../constants";
const title = "Select";
const description = "Themed select list.";
const code = `
  `;
const props = {
  disabled: false,
  focused: true,
  // true: focus-visible.
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "default",
  transitioned: false,
  // ThemeTransitioned,
  variant: "outlined"
};
const items = [
  { label: "JavaScript", value: "javascript" },
  { label: "Java", value: "java" },
  { label: "Python", value: "python" },
  { label: "React", value: "react" },
  { label: "Rust", value: "rust" }
];
</script>

<ExamplePage {title} {description} {code}>
	{#each colors as color}
		<div class="grid grid-cols-4 gap-4 mb-4">
			<label for="filled">
				<Select {...props} variant="outlined" selected="react" theme={color}>
					{#each items as item}
						<SelectOption value={item.value}>{item.label}</SelectOption>
					{/each}
				</Select>
			</label>

			<label for="glass">
				<Select {...props} variant="glass" selected="rust" theme={color}>
					{#each items as item}
						<SelectOption value={item.value}>{item.label}</SelectOption>
					{/each}
				</Select>
			</label>

			<label for="outline">
				<Select {...props} variant="filled" selected="java" theme={color}>
					{#each items as item}
						<SelectOption value={item.value}>{item.label}</SelectOption>
					{/each}
				</Select>
			</label>

			<label for="link">
				<Select {...props} variant="flushed" selected="rust" theme={color}>
					{#each items as item}
						<SelectOption value={item.value}>{item.label}</SelectOption>
					{/each}
				</Select>
			</label>
		</div>
	{/each}
</ExamplePage>
