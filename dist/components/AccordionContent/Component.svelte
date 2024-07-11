<script>import { transitioner } from "../Disclosure";
import { getContext } from "svelte";
import { accordionContentDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
const context = getContext("Accordion");
const optionContext = getContext("AccordionOption");
export let { as, key, size, theme, transition, variant } = {
  ...defaults,
  key: optionContext?.key,
  size: context.globals?.size,
  theme: context.globals?.theme,
  variant: context.globals?.variant
};
$: isSelected = $context.selected.includes(key);
const th = themer($themeStore);
$: accordionContentClasses = th.create("AccordionContent").option("fieldFontSizes", size, size).option("buttonPadding", size, size).prepend(`accordion-content`, true).append($$restProps.class, true).compile();
</script>

{#if isSelected}
	<svelte:element
		this={as}
		{...$$restProps}
		class={accordionContentClasses}
		transition:transitioner={transition}
	>
		<slot />
	</svelte:element>
{/if}
