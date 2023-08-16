<script lang="ts">
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { Accordion, type AccordianVariant } from '.';
	import { AccordionButton } from '../AccordionButton';
	import { AccordionOption } from '../AccordionOption';
	import { AccordionPanel } from '../AccordionPanel';
	import { colors } from '$lib/constants';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
	import type { DisclosureTransitionOption } from '../Disclosure';

	const title = 'Accordion';
	const description =
		'Accordion component with single or multiple expanded using various transitions.';
	const code = `
  `;

	const props = {
		multiple: false,
		rounded: 'md' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'default' as ThemeColor,
		variant: 'filled' as AccordianVariant,
		transition: 'expand' as DisclosureTransitionOption
	};
</script>

<ExamplePage {title} {description} {code}>
	<div class="text-sm mb-4">
		Use width on top level Accordion element to constrain from full width.
	</div>

	{#each colors as color}
		<div class="grid grid-cols-4 gap-4 items-start mb-4">
			<Accordion {...props} theme={color}>
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
			</Accordion>

			<Accordion {...props} theme={color} variant="glass">
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
			</Accordion>

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
			</Accordion>

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
			</Accordion>
		</div>
	{/each}
</ExamplePage>
