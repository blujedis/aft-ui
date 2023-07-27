<script lang="ts">
	import Section from '../_Example/Section.svelte';
	import SelectTheme from '../_Example/SelectTheme.svelte';
	import SelectSize from '../_Example/SelectSize.svelte';
	import SelectRounded from '../_Example/SelectRounded.svelte';
	import SelectShadowed from '../_Example/SelectShadowed.svelte';
	import ListOptions from '../_Example/ListOptions.svelte';
	import ToggleOptions from '../_Example/ToggleOptions.svelte';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import Checkbox from '../_Example/Checkbox.svelte';
	import SelectList from './';
	import SelectListButton from '../SelectListButton';
	import SelectListOption from '../SelectListOption';
	import SelectListPanel from '../SelectListPanel';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

	const title = 'SelectList';
	const description = 'Comprehensive component for single and multi selection.';
	const code = `
  `;

	const sourceItems = [
		{
			value: 'java',
			label: 'Java',
			description:
				'Java is a multi-platform, object-oriented, and network-centric language that can be used as a platform in itself. It is a fast, secure, reliable programming language for coding everything from mobile apps and enterprise software to big data applications and server-side technologies.',
			selected: false,
			href: 'https://www.java.com/en/'
		},
		{
			value: 'javascript',
			label: 'JavaScript',
			description:
				'JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat.',
			selected: false,
			href: 'https://www.javascript.com/'
		},
		{
			value: 'python',
			label: 'Python',
			description:
				'Python is an interpreted, object-oriented, high-level programming language with dynamic semantics developed by Guido van Rossum. It was originally released in 1991. Designed to be easy as well as fun, the name "Python" is a nod to the British comedy group Monty Python.',
			selected: false,
			href: 'https://www.python.org/'
		},
		{
			value: 'react',
			label: 'React',
			description:
				'React is a JavaScript-based UI development library. Facebook and an open-source developer community run it. Although React is a library rather than a language, it is widely used in web development. The library first appeared in May 2013 and is now one of the most commonly used frontend libraries for web development.',
			selected: true,
			href: 'https://react.dev/'
		}
	];

	const props = {
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'light' as ThemeColor,
		variant: 'default' as any
	};
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<Checkbox label="Full" bind:checked={props.full} />
		<!-- <Checkbox label="Disabled" bind:checked={props.disabled} /> -->
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

	{#key props}
		<div class="grid grid-cols-3 gap-2">
			<label for="filled">
				<div class="text-sm">Filled:</div>
				<SelectList
					{...props}
					tags
					removable
					items={sourceItems}
					placeholder="Please Select"
					let:filtered
				>
					<SelectListButton />
					<SelectListPanel>
						{#each filtered as item}
							<SelectListOption as="button" key={item.value}>
								{item.label}
							</SelectListOption>
						{/each}
					</SelectListPanel>
				</SelectList>
			</label>
		</div>
	{/key}
</ExamplePage>
