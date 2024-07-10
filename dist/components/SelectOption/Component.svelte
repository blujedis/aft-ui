<script>import { selectOptionDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
import { getContext } from "svelte";
const context = getContext("Select");
export let { disabled, size, value } = {
  ...defaults,
  ...context.globals
};
const th = themer($themeStore);
$: selectOptionClasses = th.create("SelectOption").option("fieldFontSizes", size, size).option("fieldPadding", size, size).option("common", "disabled", disabled).append("flex items-center", true).append($$restProps.class, true).compile();
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<option use:forwardedEvents {...$$restProps} {value} {disabled} class={selectOptionClasses}>
	<slot />
</option>
