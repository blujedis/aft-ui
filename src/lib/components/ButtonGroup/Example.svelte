<script lang="ts">
	import { ButtonGroup } from '.';
	import { colors } from '$lib/constants';
	import { ButtonGroupItem, type ButtonGroupVariant } from '../ButtonGroupItem';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import type {
		ThemeColor,
		ThemeRounded,
		ThemeShadowed,
		ThemeSize,
		ThemeFocused
	} from '$lib/types';

	const title = 'Button Groups';
	const description = 'Themed Buttons within selectable groups.';
	const code = `
  `;

	const props = {
		disabled: false,
		focused: 'focusVisible' as ThemeFocused,
		full: false,
		multiple: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'default' as ThemeColor,
		transitioned: false as boolean, // ThemeTransitioned,
		underlined: false,
		variant: 'filled' as ButtonGroupVariant
	};

	const buttons = [
		// { value: 'java', label: 'Java' },
		{ value: 'javascript', label: 'JavaScript' },
		{ value: 'python', label: 'Python' },
		{ value: 'react', label: 'React' }
	];

</script>

<ExamplePage {title} {description}>
	{#each colors as theme}
		<div class="grid grid-cols-5 gap-2 mt-4">
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


			<div>
				<ButtonGroup {...props} variant="soft" {theme}>
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
