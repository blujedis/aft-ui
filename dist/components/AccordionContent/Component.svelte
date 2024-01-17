<script>import { transitioner } from "../Disclosure";
import { getContext } from "svelte";
import { accordionContentDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
const context = getContext("Accordion");
const optionContext = getContext("AccordionOption");
export let { as, key, size, theme, transition, variant } = {
  ...defaults,
  key: optionContext?.key,
  size: context?.globals.size,
  theme: context?.globals.theme,
  variant: context?.globals.variant
};
const th = themer($themeStore);
$:
  accordionContentClasses = th.create("AccordionContent").variant("accordionContent", variant, theme, variant).option("fieldFontSizes", size, size).option("fieldPadding", size, size).append("mb-2", true).append($$restProps.class, true).compile(true);
</script>

{#if $context.selected.includes(key)}
	<svelte:element
		this={as}
		{...$$restProps}
		class={accordionContentClasses}
		transition:transitioner={transition}
	>
		<slot />
	</svelte:element>
{/if}
