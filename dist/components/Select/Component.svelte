<script>import { selectDefaults as defaults } from "./module";
import { ConditionalComponent, Flushed } from "..";
import { themeStore, themer } from "../../theme";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder, boolToMapValue } from "../../utils";
export let {
  disabled,
  focused,
  full,
  hovered,
  placeholder,
  rows,
  rounded,
  value,
  shadowed,
  size,
  theme,
  transitioned,
  variant
} = {
  ...$themeStore?.defaults?.component,
  ...defaults
};
const th = themer($themeStore);
$:
  inputClasses = th.create("Select").bundle(
    ["mainBg", "whiteText", "filledPlaceholder"],
    {
      frame: "text-light dark:text-dark"
    },
    theme,
    variant === "filled"
  ).bundle(
    ["inputText", "mainRing"],
    { $base: "ring-1 ring-inset" },
    theme,
    variant === "outlined"
  ).bundle(["softBg", "inputText"], theme, variant === "soft").bundle(["mainBorder", "mainBorderGroupHover", "inputText"], theme, variant === "flushed").option("common", "focusedOutline", focused && variant !== "flushed").option("outlineFocus", theme, focused && variant !== "flushed").bundle(["inputText"], theme, variant === "text").option("common", "transitioned", transitioned).option("hovered", variant, theme, hovered).option("fieldFontSizes", size, size).option("fieldPadding", size, size).option("roundeds", boolToMapValue(rounded), rounded && variant !== "flushed").option("shadows", boolToMapValue(shadowed), shadowed).option("common", "disabled", disabled).prepend(`select select-${variant} select-${theme}`, true).append("min-w-min", true).append("w-full", full || variant === "flushed").append("dark:bg-transparent", ["outlined", "flushed", "text", "ghost"].includes(variant)).append("peer px-2", variant === "flushed").append(
    "inline-flex items-center justify-center pr-10 focus:ring-0 outline-none border-0",
    true
  ).append($$restProps.multiple ? "form-multiselect" : "form-select", true).append($$restProps.class, true).compile();
const forwardedEvents = forwardEventsBuilder(get_current_component());
const component = Flushed;
</script>

<ConditionalComponent as={component} condition={variant === 'flushed'} {theme}>
	<select {...$$restProps} use:forwardedEvents size={rows} class={inputClasses} bind:value>
		{#if placeholder}
			<option value="" disabled selected
				>{typeof placeholder === 'string' ? placeholder : 'Please Select'}</option
			>
		{/if}
		<slot />
	</select>
</ConditionalComponent>

<style>
	.select-filled:not(.select-frame) {
		background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>');
	}
</style>
