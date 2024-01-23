<script lang="ts">
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { Accordion } from '.';
	import { AccordionButton, type AccordionVariant } from '../AccordionButton';
	import { AccordionOption } from '../AccordionOption';
	import { colors } from '$lib/constants';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
	import type { DisclosureTransitionOption } from '../Disclosure';
	import Section from '../_Example/Section.svelte';
	import { AccordionContent } from '../AccordionContent';

	const title = 'Accordion';
	const description =
		'Accordion component with single or multiple expanded using various transitions.';
	const code = `
  `;

	const props = {
		multiple: false,
		size: 'md' as ThemeSize,
		theme: 'default' as ThemeColor,
		variant: 'filled' as AccordionVariant,
		transition: 'expand' as DisclosureTransitionOption
	};
</script>

<ExamplePage {title} {description} {code}>
	<div class="text-sm mb-4">
		Use width on top level Accordion element to constrain from full width.
	</div>

	<Section>
		<div class="text-2xl font-semibold mb-4">Filled Accordion</div>
		<div class="grid grid-cols-9 gap-2 items-start mb-4">
			{#each colors as color}
				<Accordion {...props} theme={color} variant="filled">
					<AccordionOption key={0}>
						<AccordionButton>One</AccordionButton>
						<AccordionContent key={0}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua.
						</AccordionContent>
					</AccordionOption>
					<AccordionOption key={1}>
						<AccordionButton>Two</AccordionButton>
						<AccordionContent key={1}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua.
						</AccordionContent>
					</AccordionOption>
				</Accordion>
			{/each}
		</div>
	</Section>

	<Section>
		<div class="text-2xl font-semibold mb-4">Outlined Accordion</div>
		<div class="grid grid-cols-9 gap-2 items-start mb-4">
			{#each colors as color}
				<Accordion {...props} theme={color} variant="outlined">
					<AccordionOption key={0}>
						<AccordionButton>One</AccordionButton>
						<AccordionContent key={0}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua.
						</AccordionContent>
					</AccordionOption>
					<AccordionOption key={1}>
						<AccordionButton>Two</AccordionButton>
						<AccordionContent key={1}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua.
						</AccordionContent>
					</AccordionOption>
				</Accordion>
			{/each}
		</div>
	</Section>

	<Section>
		<div class="text-2xl font-semibold mb-4">Flushed Accordion</div>
		<div class="grid grid-cols-9 gap-2 items-start mb-4">
			{#each colors as color}
				<Accordion {...props} theme={color} variant="flushed">
					<AccordionOption key={0}>
						<AccordionButton>One</AccordionButton>
						<AccordionContent key={0}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua.
						</AccordionContent>
					</AccordionOption>
					<AccordionOption key={1}>
						<AccordionButton>Two</AccordionButton>
						<AccordionContent key={1}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua.
						</AccordionContent>
					</AccordionOption>
				</Accordion>
			{/each}
		</div>
	</Section>

	<!-- <Section>
		<div class="text-2xl font-semibold mb-4">Ghost Accordion</div>
		<div class="grid grid-cols-9 gap-2 items-start mb-4">
			{#each colors as color}
				<Accordion {...props} theme={color} variant="ghost">
					<AccordionPanel key={0}>
						<AccordionButton>One</AccordionButton>
						<AccordionOption class="p-4"
							>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua.</AccordionOption
						>
					</AccordionPanel>
					<AccordionPanel key={1}>
						<AccordionButton>Two</AccordionButton>
						<AccordionOption class="p-4"
							>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua.</AccordionOption
						>
					</AccordionPanel>
				</Accordion>
			{/each}
		</div>
	</Section> -->
	<!-- 
	<Section>
		<div class="text-2xl font-semibold mb-4">Flushed Accordion</div>
		<div class="grid grid-cols-9 gap-2 items-start mb-4">
			{#each colors as color}
				<Accordion {...props} theme={color} variant="flushed">
					<AccordionPanel key={0}>
						<AccordionButton>One</AccordionButton>
						<AccordionOption class="p-4"
							>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua.</AccordionOption
						>
					</AccordionPanel>
					<AccordionPanel key={1}>
						<AccordionButton>Two</AccordionButton>
						<AccordionOption class="p-4"
							>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua.</AccordionOption
						>
					</AccordionPanel>
				</Accordion>
			{/each}
		</div>
	</Section> -->
</ExamplePage>
<!-- 
<Accordion {...props} variant="outlined" theme={color}>
	<AccordionPanel key={0}>
		<AccordionButton>One</AccordionButton>
		<AccordionOption class="p-4"
			>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
			incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
			exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
			dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
			Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
			mollit anim id est laborum.</AccordionOption
		>
	</AccordionPanel>
	<AccordionPanel key={1}>
		<AccordionButton>Two</AccordionButton>
		<AccordionOption class="p-4"
			>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
			incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
			exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
			dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
			Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
			mollit anim id est laborum.</AccordionOption
		>
	</AccordionPanel>
</Accordion> -->
<!-- 
<Accordion {...props} variant="flushed" theme={color}>
	<AccordionPanel key={0}>
		<AccordionButton>One</AccordionButton>
		<AccordionOption class="p-4"
			>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
			incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
			exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
			dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
			Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
			mollit anim id est laborum.</AccordionOption
		>
	</AccordionPanel>
	<AccordionPanel key={1}>
		<AccordionButton>Two</AccordionButton>
		<AccordionOption class="p-4"
			>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
			incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
			exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
			dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
			Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
			mollit anim id est laborum.</AccordionOption
		>
	</AccordionPanel>
</Accordion> -->
