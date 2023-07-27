<script>import Section from "../_Example/Section.svelte";
import SelectTheme from "../_Example/SelectTheme.svelte";
import SelectSize from "../_Example/SelectSize.svelte";
import SelectRounded from "../_Example/SelectRounded.svelte";
import SelectShadowed from "../_Example/SelectShadowed.svelte";
import SelectTransition from "../_Example/SelectTransition.svelte";
import Select from "../_Example/Select.svelte";
import ListOptions from "../_Example/ListOptions.svelte";
import ToggleOptions from "../_Example/ToggleOptions.svelte";
import ExamplePage from "../_Example/ExamplePage.svelte";
import Checkbox from "../_Example/Checkbox.svelte";
import Accordion, {} from ".";
import AccordionButton from "../AccordionButton";
import AccordionOption from "../AccordionOption";
import AccordionPanel from "../AccordionPanel";
const title = "Accordion";
const description = "Accordion component with single or multiple expanded using various transitions.";
const code = `
  `;
const props = {
  multiple: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "frame",
  variant: "pills",
  transition: "expand"
};
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<!-- <Checkbox label="Full" bind:checked={props.full} /> -->
		<Checkbox label="Multiple" bind:checked={props.multiple} />
	</ToggleOptions>
	<ListOptions>
		<Select
			label="Variant"
			bind:value={props.variant}
			items={['default', 'outlined', 'flushed', 'pills']}
		/>
		<SelectTheme bind:value={props.theme} />
		<SelectSize bind:value={props.size} />
		<SelectRounded bind:value={props.rounded} />
		<SelectShadowed bind:value={props.shadowed} />
		<SelectTransition bind:value={props.transition} />
	</ListOptions>

	<Section>
		<hr />
	</Section>

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
	<!-- </div> -->
</ExamplePage>
