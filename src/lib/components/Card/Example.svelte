<script lang="ts">
	import Card, { type CardVariant } from './';
	import CardContent from '../CardContent';
	import CardHeader from '../CardHeader';
	import CardFooter from '../CardFooter';
	import CardImage from '../CardImage';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
	import Section from '../_Example/Section.svelte';
	import SelectTheme from '../_Example/SelectTheme.svelte';
	import SelectRounded from '../_Example/SelectRounded.svelte';
	import SelectShadowed from '../_Example/SelectShadowed.svelte';
	import ListOptions from '../_Example/ListOptions.svelte';
	import ToggleOptions from '../_Example/ToggleOptions.svelte';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import Checkbox from '../_Example/Checkbox.svelte';
	import SelectSize from '../_Example/SelectSize.svelte';

	const title = 'Card';
	const description = 'Card Component.';
	const code = `
  `;

	const props = {
		rounded: 'lg' as ThemeRounded,
		shadowed: 'lg' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'default' as ThemeColor,
		variant: 'default' as CardVariant,
		wide: false
	};
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<Checkbox label="Wide" bind:checked={props.wide} />
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

	<div class="flex space-x-12">
		{#key props}
			<Card
				variant="divided"
				class="max-w-sm ring-1 ring-black ring-opacity-5"
				rounded={props.rounded}
				shadowed={props.shadowed}
				size={props.size}
				theme={props.theme}
				wide={props.wide}
			>
				<CardHeader>Header</CardHeader>
				<CardContent
					>Advancing to the 1960s, Lorem Ipsum was made popular by typeface manufacturer Letraset,
					who used it in their advertising campaigns. Letraset offered pages of Lorem Ipsum as rub
					down transfer sheets, which were widely used in the pre-computer era for layouts. These
					transfer pages, known as Letraset Body Type, were featured in the company's advertising
					and their popular catalogue.</CardContent
				>
			</Card>

			<Card
				variant="divided"
				class="max-w-sm"
				rounded={props.rounded}
				shadowed={props.shadowed}
				size={props.size}
				theme={props.theme}
				wide={props.wide}
			>
				<CardHeader>Header</CardHeader>
				<CardContent
					>Lorem ipsum was conceived as filler text, formatted in a certain way to enable the
					presentation of graphic elements in documents, without the need for formal copy. Using
					Lorem Ipsum allows designers to put together layouts and the form of the content before
					the content has been created, giving the design and production process more freedom.</CardContent
				>
				<CardFooter variant="soft">Footer</CardFooter>
			</Card>

			<div>
				<Card
					variant="divided"
					class="max-w-sm"
					rounded={props.rounded}
					shadowed={props.shadowed}
					size={props.size}
					theme={props.theme}
					wide={props.wide}
				>
					<!-- For percentage heights wrap in parent with height -->
					<CardImage
						src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png"
						class="h-1/2"
					/>
					<CardContent>Some content</CardContent>
				</Card>
			</div>
		{/key}
	</div>
</ExamplePage>
