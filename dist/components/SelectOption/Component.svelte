<script>import { selectOptionDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
import { getContext } from "svelte";
export let { disabled, size, theme, transitioned, value, variant, unstyled } = {
  ...defaults
};
const context = getContext("SelectContext");
const th = themer($themeStore);
$:
  inputClasses = th.create("SelectOption").variant("selectOption", variant, theme, true).option("common", "transition", transitioned).option("fieldFontSizes", size, size).option("fieldPadding", size, size).option("disableds", theme, disabled).append("flex items-center justify-center", true).append($$restProps.class, true).compile(true);
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<option
	{...$$restProps}
	use:forwardedEvents
	{value}
	class={inputClasses}
	on:click={() => context.select(value)}
>
	<slot selected={() => context.isSelected(value)} />
</option>
