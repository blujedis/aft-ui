<script>import { getContext } from "svelte";
import themeStore, { themer } from "../..";
import { forwardEventsBuilder } from "../../utils";
import { get_current_component } from "svelte/internal";
import { dropdownOptionDefaults as defaults } from "./module";
const context = getContext("Dropdown");
const contextGroup = getContext("DropdownGroup");
export let { element, focused, label, selected, size, theme, value, variant } = {
  ...defaults,
  size: context?.globals.size,
  theme: context?.globals.theme,
  element: context?.strategy === "menu" ? "a" : "button"
};
const forwardedEvents = forwardEventsBuilder(get_current_component());
const th = themer($themeStore);
context.add({ value, label, group: contextGroup, selected });
$:
  isSelected = $context.selected.includes(value);
$:
  optionClasses = th.create("DropdownOption").variant("dropdownOption", variant, theme, variant).option("focused", theme, true).option("focusedRingSizes", "two", focused).remove(focused === "visible" ? "focus:" : "focus-visible:", true).option("fieldFontSizes", size, size).option("fieldPadding", size, size).append("inline-flex items-center justify-between text-left", true).append($$restProps.class, true).compile(true);
function handleClick(e) {
  if (["multiselect", "tags"].includes(context.strategy)) {
    if (context.isSelected(value))
      context.unselect(value);
    else
      context.select(value);
  } else {
    context.select(value);
    setTimeout(() => context.close(), 50);
  }
  if ($context.input)
    $context.input.value = "";
}
</script>

{#if element === 'button'}
	<button
		role="option"
		{...$$restProps}
		use:forwardedEvents
		on:click={handleClick}
		aria-selected={isSelected}
		data-value={value}
		class={optionClasses}
	>
		<slot {isSelected} />
	</button>
{:else}
	<a
		role="menuitem"
		{...$$restProps}
		use:forwardedEvents
		on:click={handleClick}
		class={optionClasses}
		href={$$restProps.href}
		tabindex="0"
	>
		<slot {isSelected} />
	</a>
{/if}
