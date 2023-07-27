<script>import themeStore, { themer } from "../..";
import { buttonGroupItemDefaults as defaults } from "./module";
import Button from "../Button";
import { getContext } from "svelte";
import { cleanObj } from "../../utils";
const context = getContext("ButtonGroup");
export let { disabled, focused, full, rounded, size, theme, transitioned, value, variant } = {
  ...defaults,
  ...context?.globals
};
const th = themer($themeStore);
const passthru = cleanObj({
  disabled,
  focused,
  full,
  rounded,
  size,
  theme,
  transitioned,
  variant
});
$:
  buttonClasses = th.create("ButtonGroupItem").variant("buttonGroupItem", variant, theme, true).option("buttonPadding", size, size).append("relative first:ml-0 focus:z-10  -ml-px first:rounded-r-none last:rounded-l-none", true).append($$restProps.class, true).compile(true);
function handleSelect(value2) {
  if ($context?.selected?.includes(value2))
    context.unselect(value2);
  else
    context.select(value2);
}
</script>

<svelte:component
	this={Button}
	{...$$restProps}
	{...passthru}
	role="listitem"
	class={buttonClasses}
	aria-checked={$context?.selected?.includes(value)}
	aria-labelledby={value + ''}
	on:click={() => handleSelect(value)}
>
	<slot />
</svelte:component>
