<script lang="ts">
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
	import { Disclosure } from './';
	import { DisclosureButton } from '../DisclosureButton';
	import { DisclosurePanel } from '../DisclosurePanel';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	const title = 'Disclosure';
	const description = 'Base component for disclosing an element or group of elements.';
	const code = `
  `;

	const props = {
		disabled: false,
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'default' as ThemeColor
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
	<div class="grid grid-cols-4 gap-4">
		{#key props}
			<label for="filled">
				<span class="text-sm block mb-2">Disclosure Example:</span>
				<div class="flex">
					<Disclosure transition="zoom">
						<DisclosureButton>Show Me</DisclosureButton>
						<DisclosurePanel
							class="p-8 ring-1 ring-black ring-opacity-10 shadow-md rounded-md mt-2"
						>
							My Disclosure Panel
						</DisclosurePanel>
					</Disclosure>
				</div>
			</label>
		{/key}
	</div>
</ExamplePage>
