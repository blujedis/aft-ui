<script>import { themer, themeStore } from "../../theme";
import { buttonGroupItemDefaults as defaults } from "./module";
import { Button } from "../Button";
import { getContext, SvelteComponent } from "svelte";
import { cleanObj } from "../../utils";
import { ConditionalElement } from "../ConditionalElement";
import { Flushed } from "../Flushed";
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
  buttonClasses = th.create("ButtonGroupItem").variant("buttonGroupItem", variant, theme, variant).option("buttonPadding", size, size).append("px-1", variant === "text").append(
    "relative first:ml-0 focus:z-10  -ml-px first:rounded-r-none last:rounded-l-none aria-checked:pointer-events-none",
    true
  ).append($$restProps.class, true).compile(true);
function handleSelect(value2) {
  if ($context?.selected?.includes(value2))
    context.unselect(value2);
  else
    context.select(value2);
}
</script>

<ConditionalElement
	as={Flushed}
	condition={variant === 'text'}
	props={{
		active: $context?.selected?.includes(value),
		theme,
		group: true,
		hover: true,
		focused: true
	}}
>
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
</ConditionalElement>
