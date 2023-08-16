<script lang="ts">
	import { Card } from './';
	import { CardContent } from '../CardContent';
	import { CardHeader } from '../CardHeader';
	import { CardFooter } from '../CardFooter';
	import { CardImage } from '../CardImage';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
	import { colors } from '$lib/constants';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	const title = 'Card';
	const description = 'Component for creating organized card content.';
	const code = `
  `;

	const props = {
		rounded: 'lg' as ThemeRounded,
		shadowed: 'lg' as ThemeShadowed,
		size: 'md' as ThemeSize,
		width: 'sm' as ThemeSize,
		theme: 'default' as ThemeColor
	};
</script>

<ExamplePage {title} {description} {code}>
	<div class="mb-4">
		<Card divided rounded={props.rounded} shadowed={props.shadowed} size={props.size}>
			<CardHeader variant="filled">Header</CardHeader>
			<CardContent
				>Lorem ipsum was conceived as filler text, formatted in a certain way to enable the
				presentation of graphic elements in documents.</CardContent
			>
			<CardFooter>Footer</CardFooter>
		</Card>
	</div>
	{#each colors as color}
		<div class="grid grid-cols-4 gap-2 mb-4">
			<Card rounded={props.rounded} shadowed={props.shadowed} size={props.size} theme={color}>
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
				divided
				rounded={props.rounded}
				shadowed={props.shadowed}
				size={props.size}
				theme={color}
			>
				<CardHeader variant="filled">Header</CardHeader>
				<CardContent
					>Lorem ipsum was conceived as filler text, formatted in a certain way to enable the
					presentation of graphic elements in documents, without the need for formal copy. Using
					Lorem Ipsum allows designers to put together layouts and the form of the content before
					the content has been created, giving the design and production process more freedom.
				</CardContent>
				<CardFooter>Footer</CardFooter>
			</Card>

			<Card
				divided
				rounded={props.rounded}
				shadowed={props.shadowed}
				size={props.size}
				variant="ghost"
				theme={color}
			>
				<CardHeader variant="filled">Header</CardHeader>
				<CardContent
					>Lorem ipsum was conceived as filler text, formatted in a certain way to enable the
					presentation of graphic elements in documents, without the need for formal copy. Using
					Lorem Ipsum allows designers to put together layouts and the form of the content before
					the content has been created, giving the design and production process more freedom.
				</CardContent>
				<CardFooter>Footer</CardFooter>
			</Card>

			<Card
				divided
				rounded={props.rounded}
				shadowed={props.shadowed}
				size={props.size}
				theme={color}
			>
				<!-- For percentage heights wrap in parent with height -->
				<CardImage
					src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png"
					class="h-1/2"
				/>
				<CardContent>Some content</CardContent>
			</Card>
		</div>
	{/each}
	{#each colors as color}
		<div class="grid grid-cols-4 gap-2 mb-4">
			<Card rounded={props.rounded} shadowed={props.shadowed} size={props.size} theme={color}>
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
				divided
				rounded={props.rounded}
				shadowed={props.shadowed}
				size={props.size}
				theme={color}
				variant="glass"
			>
				<CardHeader variant="filled">Header</CardHeader>
				<CardContent
					>Lorem ipsum was conceived as filler text, formatted in a certain way to enable the
					presentation of graphic elements in documents, without the need for formal copy. Using
					Lorem Ipsum allows designers to put together layouts and the form of the content before
					the content has been created, giving the design and production process more freedom.
				</CardContent>
				<CardFooter>Footer</CardFooter>
			</Card>
		</div>
	{/each}
</ExamplePage>
