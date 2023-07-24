<script>import { multiselectOptionDefaults as defaults } from "./module";
import themeStore, { themer } from "../..";
import { forwardEventsBuilder } from "../../utils";
import { get_current_component } from "svelte/internal";
import { getContext } from "svelte";
const context = getContext("MultiselectContext");
export let { as, size, theme, key, variant } = {
  ...defaults,
  ...context?.globals
};
const th = themer($themeStore);
$:
  selected = $context.selected.map(
    (v) => $context.items.find((item) => item.value === v)
  );
$:
  labels = selected.map((v) => v.label);
$:
  optionClasses = th.create("MultiselectOption").variant("multiselectOption", variant, theme, variant).append("focus:outline outline-default-400 outline-2", true).option("focusedOutline", theme, true).option("focusedOutlineSizes", "two", true).remove("focus-visible:", true).option("fieldFontSizes", size, size).option("menuPadding", size, size).append("block w-full", true).append($$restProps.class, true).compile(true);
const forwardedEvents = forwardEventsBuilder(get_current_component());
function handleClick(e) {
  if (context.isSelected(key))
    context.unselect(key);
  else
    context.select(key);
  if (!context.globals.tags && $context.input) {
    setTimeout(() => {
      if ($context.input)
        $context.input.value = labels.join(", ");
    });
  }
}
</script>

<button
	role="option"
	{...$$restProps}
	use:forwardedEvents
	on:click={handleClick}
	aria-selected={$context.selected.includes(key)}
	data-key={key}
	class={optionClasses}
>
	<slot />
</button>
