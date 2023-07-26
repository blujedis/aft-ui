<script>import { onMount } from "svelte";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
import themeStore, { themer } from "../../";
import { buttonDefaults as defaults } from "./module";
export let {
  as,
  disabled,
  focused,
  full,
  strategy,
  rounded,
  shadowed,
  size,
  theme,
  transitioned,
  variant,
  unstyled
} = {
  ...defaults,
  ...$themeStore.defaults.component
};
const th = themer($themeStore);
let mounted = false;
$:
  buttonClasses = unstyled ? th.create("Button").option("focused", theme, focused).option("focusedRingSizes", "two", focused).remove("focusedFilters", focused, focused).option("common", "transition", transitioned).option("fieldFontSizes", size, size).option("buttonPadding", size, size && variant !== "text").option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed && variant !== "text").option("dropshadows", shadowed, shadowed && variant === "text").option("disableds", theme, disabled).append("font-medium", strategy === "button").append("w-full", full).append("inline-flex items-center justify-center outline-none", true).append($$restProps.class, true).compile(true) : th.create("Button").variant("button", variant, theme, true).option("focused", theme, focused).option("focusedRingSizes", "two", focused).remove("focusedFilters", focused, focused).option("common", "transition", transitioned).option("fieldFontSizes", size, size).option("buttonPadding", size, size && variant !== "text").option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed && variant !== "text").option("dropshadows", shadowed, shadowed && variant === "text").option("disableds", theme, disabled).append("font-medium uppercase text-xs", strategy === "button").append("w-full", full).append("inline-flex items-center justify-center outline-none", true).append($$restProps.class, true).compile(true);
const forwardedEvents = forwardEventsBuilder(get_current_component());
onMount(() => {
  mounted = true;
});
</script>

<svelte:element
	this={typeof as === 'undefined' ? 'button' : 'a'}
	use:forwardedEvents
	{...$$restProps}
	class={buttonClasses}
	class:visible={mounted}
	{disabled}
	aria-disabled={disabled}
>
	{#if strategy === 'button' || buttonClasses.includes('uppercase')}
		<div class="pt-px">
			<slot />
		</div>
	{:else}
		<slot />
	{/if}
</svelte:element>
