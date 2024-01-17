<script>import { inputDefaults as defaults } from "./module";
import { themeStore, themer } from "../..";
import { Flushed } from "../Flushed";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
export let {
  chars,
  disabled,
  focused,
  full,
  rounded,
  shadowed,
  size,
  theme,
  transitioned,
  variant,
  unstyled
} = {
  ...defaults,
  ...$themeStore?.defaults?.component
};
const th = themer($themeStore);
$:
  inputClasses = unstyled ? th.create("Input").append($$restProps.class, true).compile(true) : th.create("Input").variant("input", variant, theme, variant).option("focusedRing", theme, focused && variant !== "flushed").option("placeholders", theme, true).option("common", "transition", transitioned).option("fieldFontSizes", size, size).option("fieldPadding", size, size).option("roundeds", rounded, rounded && variant !== "flushed").option("shadows", shadowed, shadowed).option("disableds", theme, disabled).append("w-full", full).append("focus:outline-none focus:ring-2", focused && variant !== "flushed").append("px-1 peer focus:ring-0 focus:outline-none border-0", variant === "flushed").append("flex items-center justify-center", true).append($$restProps.class, true).compile(true);
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

{#if variant === 'flushed'}
	<svelte:component this={Flushed} {theme} {focused}>
		<input {...$$restProps} use:forwardedEvents size={chars} class={inputClasses} />
	</svelte:component>
{:else}
	<input {...$$restProps} use:forwardedEvents size={chars} class={inputClasses} />
{/if}
