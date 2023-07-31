<script lang="ts">
	import Select, { type SelectVariant } from '.';
	import SelectOption from '../SelectOption';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	const title = 'Select';
	const description = 'Themed select list.';
	const code = `
  `;

	const props = {
		disabled: false,
		focused: true, // true: focus-visible.
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'light' as ThemeColor,
		transitioned: false as boolean, // ThemeTransitioned,
		variant: 'default' as SelectVariant
	};

	const items = [
		{ label: 'JavaScript', value: 'javascript' },
		{ label: 'Java', value: 'java' },
		{ label: 'Python', value: 'python' },
		{ label: 'React', value: 'react' },
		{ label: 'Rust', value: 'rust' }
	];
</script>

<ExamplePage {title} {description} {code}>

	<div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">Outlined:</div>
			<Select {...props} variant="outlined" selected="react">
				{#each items as item}
					<SelectOption value={item.value}>{item.label}</SelectOption>
				{/each}
			</Select>
		</label>
		<label for="outline">
			<div class="text-sm">Filled:</div>
			<Select {...props} variant="filled" selected="java">
				{#each items as item}
					<SelectOption value={item.value}>{item.label}</SelectOption>
				{/each}
			</Select>
		</label>
		<label for="link">
			<div class="text-sm">Flushed:</div>
			<Select {...props} variant="flushed" selected="rust">
				{#each items as item}
					<SelectOption value={item.value}>{item.label}</SelectOption>
				{/each}
			</Select>
		</label>
	</div>
</ExamplePage>
