<script>import Section from "../_Example/Section.svelte";
import ExamplePage from "../_Example/ExamplePage.svelte";
import { Breadcrumb } from ".";
import { BreadcrumbOption } from "../BreadcrumbOption";
import { colors } from "../../constants";
const title = "Breadcrumb";
const description = "Component for displaying breadcrumbs as paths.";
const code = `
  `;
const props = {
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "frame",
  transitioned: false,
  variant: "text"
};
</script>

<ExamplePage {title} {description}>
	<div class="mb-4">
		<Breadcrumb {...props} generate />
	</div>
	<div class="mb-8 grid grid-cols-2 gap-4">
		{#each colors as color}
			<Breadcrumb {...props} theme={color}>
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" selected />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>
		{/each}
	</div>
	<div class="mb-8 grid grid-cols-2 gap-4">
		{#each colors as color}
			<Breadcrumb {...props} variant="filled" theme={color}>
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" selected />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>
		{/each}
	</div>

	<div class="mb-8 grid grid-cols-2 gap-4">
		{#each colors as color}
			<Breadcrumb {...props} variant="soft" theme={color}>
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" selected />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>
		{/each}
	</div>
</ExamplePage>
