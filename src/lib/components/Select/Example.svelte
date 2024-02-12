<script lang="ts">
	import { Select, type SelectVariant } from '.';
	import { SelectOption } from '../SelectOption';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { colors } from '$lib/constants';

	const title = 'Select';
	const description = 'Themed select list.';
	const code = `
  `;

	const props = {
		disabled: false,
		focused: true, // true: focus-visible.
		full: false,
		hovered: true,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'default' as ThemeColor,
		transitioned: false as boolean, // ThemeTransitioned,
		variant: 'outlined' as SelectVariant
	};

	const items = [
		{ label: 'JavaScript', value: 'javascript' },
		{ label: 'Java', value: 'java' },
		{ label: 'Python', value: 'python' },
		{ label: 'React', value: 'react' },
		{ label: 'Rust', value: 'rust' }
	];
</script>

<ExamplePage {title} {description}>
	{#each colors as color}
		<div class="grid grid-cols-5 gap-4 mb-4">
			<label for="filled">
				<Select {...props} variant="filled" selected="react" theme={color}>
					{#each items as item}
						<SelectOption value={item.value}>{item.label}</SelectOption>
					{/each}
				</Select>
			</label>

			<label for="filled">
				<Select {...props} variant="outlined" selected="react" theme={color}>
					{#each items as item}
						<SelectOption value={item.value}>{item.label}</SelectOption>
					{/each}
				</Select>
			</label>

			<label for="outline">
				<Select {...props} variant="soft" selected="java" theme={color}>
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

			<label for="glass">
				<Select {...props} variant="text" selected="rust" theme={color}>
					{#each items as item}
						<SelectOption value={item.value}>{item.label}</SelectOption>
					{/each}
				</Select>
			</label>
		</div>
	{/each}
</ExamplePage>
