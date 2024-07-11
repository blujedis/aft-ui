<script>import { ButtonGroup } from ".";
import { colors } from "../../constants";
import { ButtonGroupItem } from "../ButtonGroupItem";
import ExamplePage from "../_Example/ExamplePage.svelte";
const title = "Button Groups";
const description = "Themed Buttons within selectable groups.";
const code = `
  `;
const props = {
  disabled: false,
  focused: true,
  full: true,
  // hovered: false,
  multiple: false,
  rounded: "sm",
  shadowed: "none",
  size: "md",
  theme: "frame",
  transitioned: false,
  // ThemeTransitioned,
  underlined: false,
  variant: "filled"
};
const buttons = [
  // { value: 'java', label: 'Java' },
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "react", label: "React" }
];
</script>

<ExamplePage {title} {description}>
	{#each colors as theme}
		<div class="grid grid-cols-5 gap-2 mt-4">
			<ButtonGroup {...props} {theme} class="bg-frame-50 dark:bg-frame-950/50">
				{#each buttons as button}
					<ButtonGroupItem value={button.value}>{button.label}</ButtonGroupItem>
				{/each}
			</ButtonGroup>

			<div>
				<ButtonGroup {...props} variant="outlined" {theme}>
					{#each buttons as button}
						<ButtonGroupItem value={button.value}>{button.label}</ButtonGroupItem>
					{/each}
				</ButtonGroup>
			</div>

			<div>
				<ButtonGroup {...props} variant="flushed" {theme}>
					{#each buttons as button}
						<ButtonGroupItem value={button.value}>{button.label}</ButtonGroupItem>
					{/each}
				</ButtonGroup>
			</div>

			<div>
				<ButtonGroup {...props} variant="ghost" {theme}>
					{#each buttons as button}
						<ButtonGroupItem value={button.value}>{button.label}</ButtonGroupItem>
					{/each}
				</ButtonGroup>
			</div>

			<div>
				<ButtonGroup {...props} variant="soft" {theme}>
					{#each buttons as button}
						<ButtonGroupItem value={button.value}>{button.label}</ButtonGroupItem>
					{/each}
				</ButtonGroup>
			</div>
		</div>
	{/each}
</ExamplePage>
