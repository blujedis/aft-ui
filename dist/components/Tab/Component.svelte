<script>import themeStore, { themer } from "../..";
import { tabDefaults as defaults } from "./module";
import { getContext } from "svelte";
const context = getContext("TabController");
export let {
  as,
  disabled,
  focused,
  full,
  rounded,
  size,
  theme,
  transitioned,
  underlined,
  value,
  variant
} = {
  ...defaults,
  ...context?.globals
};
const th = themer($themeStore);
$:
  tabClasses = th.create("Tab").variant("tab", variant, theme, true).option("buttonPadding", size, size).option("fieldFontSizes", size, size).option("roundeds", rounded, rounded).append(
    "rounded-br-none rounded-bl-none",
    ["labeled", "default", "underlined"].includes(variant)
  ).append("inline-flex items-center justify-center", true).append("whitespace-nowrap", variant === "flushed").append("w-full", full && ["grouped", "labeled"].includes(variant)).append("px-10", full && ["pills", "underlined", "default"].includes(variant)).append(
    "relative focus:z-10 first:ml-0 -ml-px first:ml-0 first:rounded-r-none last:rounded-l-none",
    variant === "grouped"
  ).append("pointer-events-none", $context?.selected?.includes(value)).append($$restProps.class, true).compile(true);
function handleSelect(value2) {
  if ($context?.selected?.includes(value2))
    context.unselect(value2);
  else
    context.select(value2);
}
</script>

<svelte:element
	this={as}
	{...$$restProps}
	role={as === 'a' ? 'link' : 'button'}
	tabindex="-1"
	class={tabClasses}
	aria-current={$context?.selected?.includes(value)}
	aria-selected={$context?.selected?.includes(value)}
	aria-labelledby={value + ''}
	on:click={() => handleSelect(value)}
>
	<slot />
</svelte:element>
