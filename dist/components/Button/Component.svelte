<script>import { buttonPadding } from "../options";
import { onMount } from "svelte";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
import { themeStore, themer } from "../../";
import { buttonDefaults as defaults } from "./module";
export let {
  as,
  disabled,
  focused,
  full,
  rounded,
  shadowed,
  size,
  strong,
  theme,
  transitioned,
  variant,
  underlined,
  unstyled
} = {
  ...defaults,
  ...$themeStore.defaults.component
};
const th = themer($themeStore);
$:
  isStrong = strong || as === "button" && typeof strong === "undefined";
$:
  buttonClasses = unstyled ? th.create("Button").append($$restProps.class, true).compile() : th.create("Button").variant("button", variant, theme, true).option("focusedRingVisible", theme, focused).option("common", "transition", transitioned).option("fieldFontSizes", size, size).option("buttonPadding", size, size && variant !== "text").option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed && variant !== "text").option("dropshadows", shadowed, shadowed && variant === "text").option("disableds", theme, disabled).append("underline", underlined && underlined !== "hover").append("hover:underline", underlined === "hover").append("w-full", full).append(
    "inline-flex items-center justify-center focus:outline-none focus:ring-2 cursor-pointer",
    true
  ).append($$restProps.class, true).compile(true);
$:
  console.log(buttonPadding, size);
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<svelte:element
	this={typeof as === 'undefined' ? 'button' : 'a'}
	use:forwardedEvents
	{...$$restProps}
	class={buttonClasses}
	{disabled}
	aria-disabled={disabled}
>
	{#if isStrong || buttonClasses.includes('uppercase')}
		<div class="pt-px">
			<slot />
		</div>
	{:else}
		<slot />
	{/if}
</svelte:element>
