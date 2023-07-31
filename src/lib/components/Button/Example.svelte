<script lang="ts">
	import Button, { type ButtonVariant } from '.';
	import type {
		ThemeRounded,
		ThemeShadowed,
		ThemeSize
	} from '../../types';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	const title = 'Buttons';
	const description = 'Themed Buttons with variants.';
	const code = `
  `;

	const props = {
		disabled: false,
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		variant: 'default' as ButtonVariant,
		underlined: false
	};
</script>

<ExamplePage {title} {description} {code}>

	<div class="grid grid-cols-4 gap-4">
		<label for="filled" class="flex">
			<Button {...props} theme="light">Button</Button>
		</label>
		<label for="outline">
			<Button {...props} variant="outlined" theme="light">Button</Button>
		</label>
		<label for="link">
			<Button {...props} variant="text" theme="light">Button</Button>
		</label>
		<label for="ghost">
			<Button {...props} variant="ghost" theme="light">Button</Button>
		</label>
	</div>

	<div class="grid grid-cols-4 gap-4 mt-4">
		<label for="filled" class="flex">
			<Button {...props} theme="dark">Button</Button>
		</label>
		<label for="outline">
			<Button {...props} variant="outlined" theme="dark">Button</Button>
		</label>
		<label for="link">
			<Button {...props} variant="text" theme="dark">Button</Button>
		</label>
		<label for="ghost">
			<Button {...props} variant="ghost" theme="dark">Button</Button>
		</label>
	</div>

	<div class="grid grid-cols-4 gap-4 mt-4">
		<label for="filled" class="flex">
			<Button {...props} theme="primary">Button</Button>
		</label>
		<label for="outline">
			<Button {...props} variant="outlined" theme="primary">Button</Button>
		</label>
		<label for="link">
			<Button {...props} variant="text" theme="primary">Button</Button>
		</label>
		<label for="ghost">
			<Button {...props} variant="ghost" theme="primary">Button</Button>
		</label>
	</div>

	<div class="grid grid-cols-4 gap-4 mt-4">
		<label for="filled" class="flex">
			<Button {...props} theme="secondary">Button</Button>
		</label>
		<label for="outline">
			<Button {...props} variant="outlined" theme="secondary">Button</Button>
		</label>
		<label for="link">
			<Button {...props} variant="text" theme="secondary">Button</Button>
		</label>
		<label for="ghost">
			<Button {...props} variant="ghost" theme="secondary">Button</Button>
		</label>
	</div>


	<div class="grid grid-cols-4 gap-4 mt-4">
		<label for="filled" class="flex">
			<Button {...props} theme="tertiary">Button</Button>
		</label>
		<label for="outline">
			<Button {...props} variant="outlined" theme="tertiary">Button</Button>
		</label>
		<label for="link">
			<Button {...props} variant="text" theme="tertiary">Button</Button>
		</label>
		<label for="ghost">
			<Button {...props} variant="ghost" theme="tertiary">Button</Button>
		</label>
	</div>

	<div class="grid grid-cols-4 gap-4 mt-4">
		<label for="filled" class="flex">
			<Button {...props} theme="danger">Button</Button>
		</label>
		<label for="outline">
			<Button {...props} variant="outlined" theme="danger">Button</Button>
		</label>
		<label for="link">
			<Button {...props} variant="text" theme="danger">Button</Button>
		</label>
		<label for="ghost">
			<Button {...props} variant="ghost" theme="danger">Button</Button>
		</label>
	</div>


	<div class="grid grid-cols-4 gap-4 mt-4">
		<label for="filled" class="flex">
			<Button {...props} theme="warning">Button</Button>
		</label>
		<label for="outline">
			<Button {...props} variant="outlined" theme="warning">Button</Button>
		</label>
		<label for="link">
			<Button {...props} variant="text" theme="warning">Button</Button>
		</label>
		<label for="ghost">
			<Button {...props} variant="ghost" theme="warning">Button</Button>
		</label>
	</div>

	<div class="grid grid-cols-4 gap-4 mt-4">
		<label for="filled" class="flex">
			<Button {...props} theme="success">Button</Button>
		</label>
		<label for="outline">
			<Button {...props} variant="outlined" theme="success">Button</Button>
		</label>
		<label for="link">
			<Button {...props} variant="text" theme="success">Button</Button>
		</label>
		<label for="ghost">
			<Button {...props} variant="ghost" theme="success">Button</Button>
		</label>
	</div>

	<div class="grid grid-cols-4 gap-4 mt-4">
		<label for="filled" class="flex">
			<Button {...props} theme="info">Button</Button>
		</label>
		<label for="outline">
			<Button {...props} variant="outlined" theme="info">Button</Button>
		</label>
		<label for="link">
			<Button {...props} variant="text" theme="info">Button</Button>
		</label>
		<label for="ghost">
			<Button {...props} variant="ghost" theme="info">Button</Button>
		</label>
	</div>





</ExamplePage>
