<script lang="ts">
	import Dropdown from '.';
	import DropdownButton from '../DropdownButton';
	import DropdownPanel from '../DropdownPanel';
	import DropdownOption from '../DropdownOption';
	import DropdownInput from '../DropdownInput';
	import Icon from '../Icon';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
	import type { ButtonVariant } from '../Button';
	import Section from '../_Example/Section.svelte';
	import SelectTheme from '../_Example/SelectTheme.svelte';
	import SelectSize from '../_Example/SelectSize.svelte';
	import SelectRounded from '../_Example/SelectRounded.svelte';
	import SelectShadowed from '../_Example/SelectShadowed.svelte';
	import ListOptions from '../_Example/ListOptions.svelte';
	import ToggleOptions from '../_Example/ToggleOptions.svelte';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import Checkbox from '../_Example/Checkbox.svelte';

	const title = 'Dropdown';
	const description = 'Dropdown element which supports menus, combobox, select and tags.';
	const code = `
  `;

	const props = {
		disabled: false,
		focused: true, // true: focus-visible.
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'default' as ThemeColor,
		variant: 'default' as ButtonVariant
	};

	const sourceItems = [
		{
			value: 'java',
			label: 'Java',
			description:
				'Java is a multi-platform, object-oriented, and network-centric language that can be used as a platform in itself. It is a fast, secure, reliable programming language for coding everything from mobile apps and enterprise software to big data applications and server-side technologies.',
			selected: false
		},
		{
			value: 'javascript',
			label: 'JavaScript',
			description:
				'JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat.',
			selected: false
		},
		{
			value: 'python',
			label: 'Python',
			description:
				'Python is an interpreted, object-oriented, high-level programming language with dynamic semantics developed by Guido van Rossum. It was originally released in 1991. Designed to be easy as well as fun, the name "Python" is a nod to the British comedy group Monty Python.',
			selected: false
		},
		{
			value: 'react',
			label: 'React',
			description:
				'React is a JavaScript-based UI development library. Facebook and an open-source developer community run it. Although React is a library rather than a language, it is widely used in web development. The library first appeared in May 2013 and is now one of the most commonly used frontend libraries for web development.',
			selected: true
		}
	];
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<Checkbox label="Full" bind:checked={props.full} />
		<Checkbox label="Disabled" bind:checked={props.disabled} />
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

	<div class="grid grid-cols-4 gap-4">
		{#key props}
			<label for="filled">
				<span class="text-sm block mb-2">Select Filled Example:</span>
				<div class="flex">
					<Dropdown strategy="select" selected={['react']} {...props}>
						<DropdownButton />
						<DropdownPanel>
							{#each sourceItems as item, i}
								<DropdownOption value={item.value} let:selected>
									{item.label}
									{#if selected}
										<Icon
											icon="mdi:check"
											size="sm"
											class="group-aria-selected:text-current group-hover:!text-white"
										/>
									{/if}
								</DropdownOption>
							{/each}
						</DropdownPanel>
					</Dropdown>
					<!-- <Dropdown mode="multiselect" selected={['react']} {...props}>
						<DropdownInput newable />
						<DropdownPanel>
							{#each sourceItems as item, i}
								<DropdownOption value={item.value} let:selected>
									{item.label}
									{#if selected}
										<Icon
											icon="mdi:check"
											size="sm"
											class="group-aria-selected:text-current group-hover:!text-white"
										/>
									{/if}
								</DropdownOption>
							{/each}
						</DropdownPanel>
					</Dropdown> -->
				</div>
			</label>
			<label for="outlined">
				<span class="text-sm block mb-2">Select Outlined Example:</span>
				<Dropdown strategy="select" {...props} variant="outlined">
					<DropdownButton />
					<DropdownPanel>
						{#each sourceItems as item, i}
							<DropdownOption value={item.value} let:selected>
								{item.label}
								{#if selected}
									<Icon
										icon="mdi:check"
										size="sm"
										class="group-aria-selected:text-current group-hover:!text-white"
									/>
								{/if}
							</DropdownOption>
						{/each}
					</DropdownPanel>
				</Dropdown>
			</label>
			<label for="text">
				<span class="text-sm block mb-2">Menu Example:</span>
				<Dropdown strategy="menu" {...props} variant="text">
					<DropdownButton>Select Language</DropdownButton>
					<DropdownPanel>
						{#each sourceItems as item, i}
							<DropdownOption value={item.value} let:selected>
								{item.label}
								{#if selected}
									<Icon
										icon="mdi:check"
										size="sm"
										class="group-aria-selected:text-current group-hover:!text-white"
									/>
								{/if}
							</DropdownOption>
						{/each}
					</DropdownPanel>
				</Dropdown>
			</label>
			<label for="ghost">
				<span class="text-sm block">Select Link Example:</span>
				<Dropdown strategy="select" selected={[]} {...props} variant="ghost">
					<DropdownButton />
					<DropdownPanel>
						{#each sourceItems as item, i}
							<DropdownOption value={item.value} let:selected>
								{item.label}
								{#if selected}
									<Icon
										icon="mdi:check"
										size="sm"
										class="group-aria-selected:text-current group-hover:!text-white"
									/>
								{/if}
							</DropdownOption>
						{/each}
					</DropdownPanel>
				</Dropdown>
			</label>
		{/key}
	</div>

	<div class="mt-4 grid grid-cols-4 gap-4">
		{#key props}
			<label for="input">
				<span class="text-sm block mb-2">Tags Example:</span>
				<Dropdown strategy="tags" selected={['react']} items={sourceItems} {...props} let:filtered>
					<DropdownInput newable filterable />
					<DropdownPanel>
						{#each filtered as item, i}
							<DropdownOption value={item.value} let:selected>
								{item.label}
								{#if selected}
									<Icon
										icon="mdi:check"
										size="sm"
										class="group-aria-selected:text-current group-hover:!text-white"
									/>
								{/if}
							</DropdownOption>
						{/each}
					</DropdownPanel>
				</Dropdown>
			</label>
		{/key}
	</div>
</ExamplePage>
