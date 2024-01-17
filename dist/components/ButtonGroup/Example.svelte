<script>import { ButtonGroup } from ".";
import { ButtonGroupItem } from "../ButtonGroupItem";
import ExamplePage from "../_Example/ExamplePage.svelte";
const title = "Button Groups";
const description = "Themed Buttons within selectable groups.";
const code = `
  `;
const props = {
  disabled: false,
  focused: "focusVisible",
  full: false,
  multiple: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "default",
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
const themes = [
  "default",
  "dark",
  "primary",
  "secondary",
  "tertiary",
  "danger",
  "warning",
  "success",
  "info"
];
</script>

<ExamplePage {title} {description} {code}>
	{#each themes as theme}
		<div class="grid grid-cols-4 gap-2 mt-4">
			<div>
				<ButtonGroup {...props} {theme}>
					{#each buttons as button}
						<ButtonGroupItem value={button.value}>{button.label}</ButtonGroupItem>
					{/each}
				</ButtonGroup>
			</div>

			<div>
				<ButtonGroup {...props} variant="outlined" {theme}>
					{#each buttons as button}
						<ButtonGroupItem value={button.value}>{button.label}</ButtonGroupItem>
					{/each}
				</ButtonGroup>
			</div>

			<div>
				<ButtonGroup {...props} variant="text" {theme}>
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
		</div>
	{/each}

	<!-- <div class="grid grid-cols-4 gap-2">

		<div>
				<ButtonGroup {...props}>
					{#each buttons as button}
						<ButtonGroupItem value={button.value}>{button.label}</ButtonGroupItem>
					{/each}
				</ButtonGroup>
		</div>

		<div>
				<ButtonGroup {...props} variant="outlined">
					{#each buttons as button}
						<ButtonGroupItem value={button.value}>{button.label}</ButtonGroupItem>
					{/each}
				</ButtonGroup>
		</div>

		<div>
				<ButtonGroup {...props} variant="text">
					{#each buttons as button}
						<ButtonGroupItem value={button.value}>{button.label}</ButtonGroupItem>
					{/each}
				</ButtonGroup>
		</div>

		<div>
				<ButtonGroup {...props} variant="ghost">
					{#each buttons as button}
						<ButtonGroupItem value={button.value}>{button.label}</ButtonGroupItem>
					{/each}
				</ButtonGroup>
		</div>

	</div> -->
</ExamplePage>
