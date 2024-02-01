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
		rounded: 'md' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
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
		<div class="text-2xl font-semibold mb-4">Outlined Accordion</div>
		<div class="grid grid-cols-9 gap-2 items-start mb-4">
			{#each colors as color}
				<Accordion {...props} theme={color} variant="outlined" shadowed="md">
					<AccordionOption key={0}>
						<AccordionButton>One</AccordionButton>
						<AccordionContent>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua.
						</AccordionContent>
					</AccordionOption>
					<AccordionOption key={1}>
						<AccordionButton>Two</AccordionButton>
						<AccordionContent>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua.
						</AccordionContent>
					</AccordionOption>
					<AccordionOption key={2}>
						<AccordionButton>Three</AccordionButton>
						<AccordionContent>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua.
						</AccordionContent>
					</AccordionOption>
				</Accordion>
			{/each}
		</div>
	</Section>

	<!-- <Section>
		<div class="text-2xl font-semibold mb-4">Filled Accordion</div>
		<div class="grid grid-cols-9 gap-2 items-start mb-4">
			{#each colors as color}
				<Accordion {...props} theme={color} variant="filled" hovered>
					<AccordionOption key={0}>
						<AccordionButton>One</AccordionButton>
						<AccordionContent key={0}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua.
						</AccordionContent>
					</AccordionOption>
					<AccordionOption key={1} selected={color === 'primary'}>
						<AccordionButton>Two</AccordionButton>
						<AccordionContent key={1}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua.
						</AccordionContent>
					</AccordionOption>
					<AccordionOption key={2}>
						<AccordionButton>Three</AccordionButton>
						<AccordionContent key={2}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua.
						</AccordionContent>
					</AccordionOption>
				</Accordion>
			{/each}
		</div>
	</Section> -->

	<!-- <Section>
		<div class="text-2xl font-semibold mb-4">Flat Accordion</div>
		<div class="grid grid-cols-9 gap-2 items-start mb-4">
			{#each colors as color}
				<Accordion {...props} theme={color} variant="flat">
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
	</Section> -->
</ExamplePage>
