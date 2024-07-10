<script lang="ts">
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { SelectList, type SelectListItem } from '.';
	import { SelectListButton } from '../SelectListButton';
	import { SelectListOption } from '../SelectListOption';
	import { SelectListPanel } from '../SelectListPanel';
	// import { colors } from '$lib/constants';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
	import { Icon } from '../Icon';
	import { themer, themeStore } from '../../theme';

	const th = themer($themeStore);

	const iconClasses = th.create().option('iconCaretSizes', 'md', true).compile(false);

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
			selected: true,
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
			selected: false,
			href: 'https://react.dev/'
		}
	];

	type SourceItem = SelectListItem & Record<string, unknown>;

	const selected = 'javascript';

	let selectList: SelectList<SourceItem>;

	function updateSelectList() {
		selectList.select('python');
	}

	function handleSubmit(
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const dataObj = Object.fromEntries(data.entries());
		console.log(dataObj);
	}

	const props = {
		full: false,
		focused: true,
		hovered: true,
		rounded: 'none' as ThemeRounded,
		// shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		//theme: 'frame' as ThemeColor,
		variant: 'outlined' as any
	};
	const shared = {
		size: 'md'
	} as any;
	const colors = ['frame', 'primary', 'secondary', 'danger', 'success', 'warning'] as ThemeColor[];
</script>

<ExamplePage {title} {description}>
	<div class="grid grid-cols-6 gap-2 mb-4">
		{#each colors as color}
			<SelectList
				{...props}
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
		{/each}
	</div>
	<div class="grid grid-cols-6 gap-2 mb-4">
		{#each colors as color}
			<SelectList
				{...props}
				variant="outlined"
				removable
				items={sourceItems}
				placeholder="Please Select"
				theme={color}
				let:filtered
				full
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
		{/each}
	</div>
	<div class="grid grid-cols-6 gap-2 mb-4">
		{#each colors as color}
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
		{/each}
	</div>
	<div class="grid grid-cols-6 gap-2 mb-4">
		{#each colors as color}
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
		{/each}
	</div>
	<div class="grid grid-cols-6 gap-2 mb-4">
		{#each colors as color}
			<SelectList
				{...props}
				variant="text"
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
		{/each}
	</div>
	<div class="mt-8 mb-2">
		<form on:submit={handleSubmit} class="flex items-center space-x-2">
			<SelectList
				bind:this={selectList}
				{...props}
				{...shared}
				name="language"
				variant="outlined"
				value={selected}
				items={sourceItems}
				placeholder="Filter..."
				theme="frame"
				filterable
				recordless
				let:filtered
				let:filtering
				let:selectedItems
			>
				<SelectListButton />
				<SelectListPanel>
					{#if filtered.length}
						{#each filtered as item}
							<SelectListOption as="button" key={item.value} let:active>
								{item.label}
							</SelectListOption>
						{/each}
					{:else}
						<div class="px-4"></div>
					{/if}

					<!-- {#each filtered as item}
				{#if !selectedItems.includes(item.value)}
					<SelectListOption as="button" key={item.value} let:active>
						<div class="flex justify-between items-center">
							{item.label}
							{#if active && !filtering}
								<Icon icon="mdi:check" class={iconClasses} />
							{/if}
						</div>
					</SelectListOption>
				{/if}
			{/each} -->
				</SelectListPanel>
			</SelectList>
			<SelectList
				bind:this={selectList}
				{...props}
				{...shared}
				name="language"
				variant="outlined"
				value={selected}
				items={sourceItems}
				placeholder="Filter..."
				theme="primary"
				filterable
				recordless
				let:filtered
				let:filtering
				let:selectedItems
			>
				<SelectListButton />
				<SelectListPanel full>
					{#if filtered.length}
						{#each filtered as item}
							<SelectListOption as="button" key={item.value} let:active>
								{item.label}
							</SelectListOption>
						{/each}
					{:else}
						<div class="px-4"></div>
					{/if}
				</SelectListPanel>
			</SelectList>
			<button type="button" class="text-sm">Reset</button>
			<button type="submit" class="text-sm">Submit</button>
		</form>
	</div>
</ExamplePage>
