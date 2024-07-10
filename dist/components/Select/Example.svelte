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
  hovered: true,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "frame",
  transitioned: false,
  // ThemeTransitioned,
  variant: "outlined"
};
const items = [
  { label: "JavaScript", value: "javascript" },
  { label: "Java", value: "java" },
  { label: "Python", value: "python", checked: true },
  { label: "React", value: "react" },
  { label: "Rust", value: "rust" }
];
</script>

<ExamplePage {title} {description}>
	{#each colors as color}
		<div class="grid grid-cols-5 gap-4 mb-4">
			<Select {...props} variant="filled" value="react" theme={color}>
				{#each items as item}
					<SelectOption value={item.value} selected={item.value === 'react'}
						>{item.label}</SelectOption
					>
				{/each}
			</Select>

			<Select {...props} variant="outlined" value="react" theme={color}>
				{#each items as item}
					<SelectOption value={item.value} selected={item.value === 'react'}
						>{item.label}</SelectOption
					>
				{/each}
			</Select>

			<Select {...props} variant="soft" value="java" theme={color}>
				{#each items as item}
					<SelectOption value={item.value} selected={item.value === 'java'}
						>{item.label}</SelectOption
					>
				{/each}
			</Select>

			<Select {...props} variant="flushed" value="rust" theme={color}>
				{#each items as item}
					<SelectOption value={item.value} selected={item.value === 'rust'}
						>{item.label}</SelectOption
					>
				{/each}
			</Select>

			<Select {...props} variant="text" value="rust" theme={color}>
				{#each items as item}
					<SelectOption value={item.value} selected={item.value === 'rust'}
						>{item.label}</SelectOption
					>
				{/each}
			</Select>
		</div>
	{/each}
</ExamplePage>
