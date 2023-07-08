<script>
	import ButtonGroup from '.';
	import ButtonGroupItem from '../ButtonGroupItem';
	import Section from '../_Example/Section.svelte';
	import SelectTheme from '../_Example/SelectTheme.svelte';
	import SelectSize from '../_Example/SelectSize.svelte';
	import SelectRounded from '../_Example/SelectRounded.svelte';
	import SelectShadowed from '../_Example/SelectShadowed.svelte';
	import ListOptions from '../_Example/ListOptions.svelte';
	import ToggleOptions from '../_Example/ToggleOptions.svelte';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import Checkbox from '../_Example/Checkbox.svelte';
	const title = 'Button Groups';
	const description = 'Themed Buttons within selectable groups.';
	const code = `
  `;
	let visible = false;
	let darkmode = false;
	const props = {
		disabled: false,
		focused: true,
		full: false,
		multiple: false,
		rounded: 'none',
		shadowed: 'none',
		size: 'md',
		theme: 'default',
		transitioned: false,
		underlined: false,
		variant: 'default'
	};
	const buttons = [
		{ value: 'java', label: 'Java' },
		{ value: 'javascript', label: 'JavaScript' },
		{ value: 'python', label: 'Python' },
		{ value: 'react', label: 'React' }
	];
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<Checkbox label="Focused" bind:checked={props.focused} />
		<Checkbox label="Full" bind:checked={props.full} />
		<Checkbox label="Transitioned" bind:checked={props.transitioned} />
		<Checkbox label="Disabled" bind:checked={props.disabled} />
		<Checkbox label="Underlined" bind:checked={props.underlined} />
	</ToggleOptions>
	<ListOptions>
		<SelectTheme bind:value={props.theme} />
		<SelectSize bind:value={props.size} />
		<SelectRounded bind:value={props.rounded} />
		<SelectShadowed bind:value={props.shadowed} />
	</ListOptions>

	<Section>
		<hr />
	</Section>

	<div class={darkmode ? 'bg-gray-900 p-4' : 'bg-white'}>
		<div class="grid grid-cols-2 gap-2">
			<div>
				<div class="text-sm">Filled:</div>
				{#key props}
					<ButtonGroup {...props}>
						{#each buttons as button}
							<ButtonGroupItem value={button.value}>{button.label}</ButtonGroupItem>
						{/each}
					</ButtonGroup>
				{/key}
			</div>
			<div>
				<div class="text-sm">Outlined:</div>
				{#key props}
					<ButtonGroup {...props} variant="outlined">
						{#each buttons as button}
							<ButtonGroupItem value={button.value}>{button.label}</ButtonGroupItem>
						{/each}
					</ButtonGroup>
				{/key}
			</div>
			<div>
				<div class="text-sm">Link:</div>
				{#key props}
					<ButtonGroup {...props} variant="link">
						{#each buttons as button}
							<ButtonGroupItem value={button.value}>{button.label}</ButtonGroupItem>
						{/each}
					</ButtonGroup>
				{/key}
			</div>
			<div>
				<div class="text-sm">Ghost:</div>
				{#key props}
					<ButtonGroup {...props} variant="ghost">
						{#each buttons as button}
							<ButtonGroupItem value={button.value}>{button.label}</ButtonGroupItem>
						{/each}
					</ButtonGroup>
				{/key}
			</div>
		</div>
	</div>
</ExamplePage>
