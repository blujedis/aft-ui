<script lang="ts">
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { Accordion } from '.';
	import { AccordionButton, type AccordionVariant } from '../AccordionButton';
	import { AccordionOption } from '../AccordionOption';
	import { colors } from '$lib/constants';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
	import type { DisclosureTransitionOption } from '../Disclosure';
	import Section from '../_Example/Section.svelte';
	import { AccordionContent } from '../AccordionContent';

	const title = 'Accordion';
	const description =
		'Accordion component with single or multiple expanded using various transitions.';

	const props = {
		focused: true,
		multiple: false,
		hovered: true,
		rounded: 'none' as ThemeRounded,
		// shadowed: 'none' as ThemeShadowed,
		selectable: true,
		size: 'md' as ThemeSize,
		theme: 'frame' as ThemeColor,
		transition: 'expand' as DisclosureTransitionOption
	};
</script>

<ExamplePage {title} {description}>
	<div class="text-sm mb-4">
		Use width on top level Accordion element to constrain from full width.
	</div>

	<Section>
		<div class="text-2xl font-semibold mb-4">Text</div>
		<div class="grid grid-cols-9 gap-2 items-start mb-4">
			{#each colors as color}
				<Accordion {...props}>
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

	<Section>
		<div class="text-2xl font-semibold mb-4">Filled</div>
		<div class="grid grid-cols-9 gap-2 items-start mb-4">
			{#each colors as color}
				<Accordion {...props} theme={color} variant="filled">
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

	<Section>
		<div class="text-2xl font-semibold mb-4">Outlined</div>
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
	</Section>

	<Section>
		<div class="text-2xl font-semibold mb-4">Filled (Detached)</div>
		<div class="grid grid-cols-9 gap-2 items-start mb-4">
			{#each colors as color}
				<Accordion {...props} theme={color} variant="filled" rounded="md" detached>
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
</ExamplePage>
