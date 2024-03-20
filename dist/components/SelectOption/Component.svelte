<script>import { selectOptionDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
import { getContext } from "svelte";
export let { disabled, size, theme, transitioned, value, variant, unstyled } = {
  ...defaults
};
const th = themer($themeStore);
$:
  inputClasses = th.create("SelectOption").option("common", "transitioned", transitioned).option("fieldFontSizes", size, size).option("fieldPadding", size, size).option("common", "disabled", disabled).append("flex items-center", true).append($$restProps.class, true).compile();
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<option use:forwardedEvents {...$$restProps} {value} class={inputClasses}>
	<slot />
</option>
