<script>import { boolToMapValue } from "../../utils";
import { accordionOptionDefaults as defaults } from "./module";
import { styler, themeStore, themer } from "../../theme";
import { getContext, setContext } from "svelte";
const context = getContext("Accordion");
export let {
  as,
  bordered,
  detached,
  focused,
  key,
  rounded,
  selected,
  shadowed,
  size,
  theme,
  transition,
  variant
} = {
  ...defaults,
  bordered: context.globals?.bordered,
  detached: context.globals?.detached,
  focused: context.globals?.focused,
  rounded: context.globals?.rounded,
  shadowed: context.globals?.shadowed,
  size: context.globals?.size,
  theme: context.globals?.theme,
  transition: context.globals?.transition,
  variant: context.globals?.variant
};
setContext("AccordionOption", {
  key
});
$context.selected = selected ? [...$context.selected, key] : $context.selected;
$:
  isSelected = $context.selected?.includes(key);
const th = themer($themeStore);
const st = styler($themeStore);
$:
  isBordered = variant === "outlined" || variant === "filled" && bordered;
$:
  accordionOptionStyles = st.create("AccordionOption").append(`--detatched-margin:${detached === true ? "6px" : detached || "6px"}`, detached).append($$restProps.style, true).compile();
$:
  accordionOptionClasses = th.create("AccordianOption").option("dropshadows", boolToMapValue(shadowed), shadowed).option("outlineFocusVisible", theme, focused).option("common", "focusedOutlineVisible", focused).option("elementDivide", theme, isBordered && variant === "outlined").option("elementBorder", theme, isBordered).option("accordionOptionRoundeds", size, rounded).prepend(`accordian-option`, true).prepend("accordion-collapsed", !isSelected).prepend("accordion-expanded", isSelected).prepend("accordion-detached", detached && ["filled", "outlined"].includes(variant)).append(`focus-visible:outline-offset-0`, focused).append("focus:z-10", true).append("border-t border-r border-l", isBordered).append("border-b", detached && isSelected && isBordered).append("last:border-b", isBordered).append("relative overflow-clip outline-none transition-[margin]", true).append($$restProps.class, true).compile();
</script>

<svelte:element
	this={as}
	id={`${key}-accordion-option`}
	aria-labelledby={`${key}-accordion-heading`}
	tabindex={isSelected ? 0 : -1}
	{...$$restProps}
	class={accordionOptionClasses}
	style={accordionOptionStyles}
>
	<slot />
</svelte:element>

<style>
	.accordion-detached.accordion-expanded:not(:first-child) {
		margin-top: var(--detatched-margin); /* 6px; */
	}
	.accordion-detached.accordion-expanded:not(:last-child) {
		margin-bottom: var(--detatched-margin); /* 6px; */
	}
</style>
