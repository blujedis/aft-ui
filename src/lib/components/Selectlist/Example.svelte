<script lang="ts">
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { SelectList } from '.';
	import { SelectListButton } from '../SelectListButton';
	import { SelectListOption } from '../SelectListOption';
	import { SelectListPanel } from '../SelectListPanel';
	import { Input } from '../Input';
	import { Button } from '../Button';
	import { colors, placeholder } from '$lib/constants';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

	const title = 'SelectList';
	const description = 'Comprehensive component for single and multi selection.';

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
		focused: true,
		hovered: true,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		//theme: 'default' as ThemeColor,
		variant: 'outlined' as any
	};
	const shared = {
		size: 'md'
	} as any;
</script>

<ExamplePage {title} {description}>
	<!-- {#each colors as color}
		<div class="grid grid-cols-5 gap-2 mb-4">
			<label for="filled">
				<SelectList
					{...props}
					tags
					removable
					items={sourceItems}
					placeholder="Please Select"
					theme={color}
					variant="filled"
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

			<label for="outlined">
				<SelectList
					{...props}
					variant="outlined"
					tags
					removable
					items={sourceItems}
					placeholder="Please Select"
					theme={color}
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

			<label for="glass">
				<SelectList
					{...props}
					variant="soft"
					tags
					removable
					items={sourceItems}
					placeholder="Please Select"
					theme={color}
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

			<label for="flushed">
				<SelectList
					{...props}
					variant="flushed"
					tags
					removable
					items={sourceItems}
					placeholder="Please Select"
					theme={color}
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

			<label for="glass">
				<SelectList
					{...props}
					variant="text"
					tags
					removable
					items={sourceItems}
					placeholder="Please Select"
					theme={color}
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
	{/each} -->

	<div class="flex">
		<SelectList
			{...props}
			{...shared}
			rounded="none"
			variant="outlined"
			items={sourceItems}
			placeholder="Please Select"
			theme="primary"
			let:filtered
			tags
			newable
			class="flex-1"
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
		<Input {...shared} type="text" placeholder="Enter name" />
		<Button {...shared}>Hello World</Button>
	</div>

	<!-- </label> -->
</ExamplePage>
