<script lang="ts">
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import Accordion, { type AccordianVariant } from '.';
	import AccordionButton from '../AccordionButton';
	import AccordionOption from '../AccordionOption';
	import AccordionPanel from '../AccordionPanel';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
	import type { DisclosureTransitionOption } from '../Disclosure';

	const title = 'Accordion';
	const description =
		'Accordion component with single or multiple expanded using various transitions.';
	const code = `
  `;

	const props = {
		multiple: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'light' as ThemeColor,
		variant: 'pills' as AccordianVariant,
		transition: 'expand' as DisclosureTransitionOption
	};
</script>

<ExamplePage {title} {description} {code}>
	<div class="text-sm mb-4">
		Use width on top level Accordion element to constrain from full width.
	</div>
	{#key props}
		<Accordion {...props} class="w-48">
			<AccordionPanel key={0}>
				<AccordionButton>One</AccordionButton>
				<AccordionOption class="p-4"
					>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
					sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
					est laborum.</AccordionOption
				>
			</AccordionPanel>
			<AccordionPanel key={1}>
				<AccordionButton>Two</AccordionButton>
				<AccordionOption class="p-4"
					>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
					sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
					est laborum.</AccordionOption
				>
			</AccordionPanel>
		</Accordion>
	{/key}
</ExamplePage>
