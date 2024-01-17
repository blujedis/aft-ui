<script>import { accordionOptionDefaults as defaults } from "./module";
import { themeStore, themer, transitioner } from "../..";
import { getContext, setContext } from "svelte";
const context = getContext("Accordion");
export let { as, unflip, key, rounded, size, theme, transition } = {
  ...defaults,
  size: context.globals?.size,
  theme: context.globals?.theme,
  transition: context?.globals.transition
};
setContext("AccordionOption", {
  key
});
const th = themer($themeStore);
$:
  accordionClasses = th.create("AccordianOption").append($$restProps.class, true).compile(true);
</script>

<svelte:element
	this={as}
	id={`${key}-accordion-option`}
	aria-labelledby={`${key}-accordion-heading`}
	{...$$restProps}
	class={accordionClasses}
>
	<slot />
</svelte:element>
