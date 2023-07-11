<script>import TabController from ".";
import Tab, {} from "../Tab";
import TabPanel from "../TabPanel";
import Section from "../_Example/Section.svelte";
import SelectTheme from "../_Example/SelectTheme.svelte";
import SelectRounded from "../_Example/SelectRounded.svelte";
import SelectShadowed from "../_Example/SelectShadowed.svelte";
import ListOptions from "../_Example/ListOptions.svelte";
import ToggleOptions from "../_Example/ToggleOptions.svelte";
import ExamplePage from "../_Example/ExamplePage.svelte";
import Checkbox from "../_Example/Checkbox.svelte";
import SelectSize from "../_Example/SelectSize.svelte";
const title = "Tabs";
const description = "Themed Tabs and Tab controller component.";
const code = `
  `;
const props = {
  condensed: true,
  focused: true,
  full: false,
  multiple: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "default",
  transitioned: false,
  // ThemeTransitioned,
  underlined: false,
  variant: "accented"
};
const tabs = [
  {
    value: "java",
    label: "Java",
    description: "Java is a multi-platform, object-oriented, and network-centric language that can be used as a platform in itself. It is a fast, secure, reliable programming language for coding everything from mobile apps and enterprise software to big data applications and server-side technologies."
  },
  {
    value: "javascript",
    label: "JavaScript",
    description: "JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat."
  },
  {
    value: "python",
    label: "Python",
    description: 'Python is an interpreted, object-oriented, high-level programming language with dynamic semantics developed by Guido van Rossum. It was originally released in 1991. Designed to be easy as well as fun, the name "Python" is a nod to the British comedy group Monty Python.'
  },
  {
    value: "react",
    label: "React",
    description: "React is a JavaScript-based UI development library. Facebook and an open-source developer community run it. Although React is a library rather than a language, it is widely used in web development. The library first appeared in May 2013 and is now one of the most commonly used frontend libraries for web development."
  }
];
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<Checkbox label="Full" bind:checked={props.full} />
		<Checkbox label="Transitioned" bind:checked={props.transitioned} />
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

	<div class="mb-4">
		<div class="text-sm mb-4">Underlined:</div>
		{#key props}
			<TabController {...props} variant="flushed" selected="python">
				<svelte:fragment slot="tabs">
					{#each tabs as tab}
						<Tab as="a" value={tab.value}>{tab.label}</Tab>
					{/each}
				</svelte:fragment>
				<svelte:fragment slot="panels">
					{#each tabs as tab}
						<TabPanel value={tab.value} class="flex p-4">{tab.description}</TabPanel>
					{/each}
				</svelte:fragment>
			</TabController>
		{/key}
	</div>
	<div class="mb-4">
		<div class="text-sm mb-4">Accented:</div>
		{#key props}
			<TabController {...props} variant="grouped" selected="react">
				<svelte:fragment slot="tabs">
					{#each tabs as tab}
						<Tab as="a" value={tab.value}>{tab.label}</Tab>
					{/each}
				</svelte:fragment>
				<svelte:fragment slot="panels">
					{#each tabs as tab}
						<TabPanel value={tab.value} class="flex p-4">{tab.description}</TabPanel>
					{/each}
				</svelte:fragment>
			</TabController>
		{/key}
	</div>
	<div class="mb-4">
		<div class="text-sm mb-4">Pills:</div>
		{#key props}
			<TabController {...props} variant="pills" selected="java">
				<svelte:fragment slot="tabs">
					{#each tabs as tab}
						<Tab as="a" value={tab.value}>{tab.label}</Tab>
					{/each}
				</svelte:fragment>
				<svelte:fragment slot="panels">
					{#each tabs as tab}
						<TabPanel value={tab.value} class="flex p-4">{tab.description}</TabPanel>
					{/each}
				</svelte:fragment>
			</TabController>
		{/key}
	</div>
	<div class="mb-4">
		<div class="text-sm mb-4">Labeled:</div>
		{#key props}
			<TabController {...props} variant="labeled" selected="javascript">
				<svelte:fragment slot="tabs">
					{#each tabs as tab}
						<Tab as="a" value={tab.value}>{tab.label}</Tab>
					{/each}
				</svelte:fragment>
				<svelte:fragment slot="panels">
					{#each tabs as tab}
						<TabPanel value={tab.value} class="flex p-4">{tab.description}</TabPanel>
					{/each}
				</svelte:fragment>
			</TabController>
		{/key}
	</div>
</ExamplePage>
