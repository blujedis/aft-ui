<script>import { accordionOptionDefaults as defaults } from "./module";
import themeStore, { themer, transitioner } from "../..";
import { getContext } from "svelte";
const context = getContext("Accordion");
const panelContext = getContext("AccordionPanel");
export let { as, key, rounded, size, theme, transition } = {
  ...defaults,
  key: panelContext?.key,
  size: context.globals?.size,
  theme: context.globals?.theme,
  transition: context?.globals.transition
};
const th = themer($themeStore);
$:
  accordionClasses = th.create("AccordianOption").option("fieldFontSizes", size, size).append($$restProps.class, true).compile(true);
</script>

{#if $context.selected?.includes(key)}
	<svelte:element
		this={as}
		id={`${key}-accordion-option`}
		aria-labelledby={`${key}-accordion-heading`}
		transition:transitioner={transition}
		{...$$restProps}
		class={accordionClasses}
	>
		<slot />
	</svelte:element>
{/if}
