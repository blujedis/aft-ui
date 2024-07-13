<script>import { fieldDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { boolToMapValue, cleanObj } from "../../utils";
export let { full, ringed, rounded, shadowed, size, theme, transitioned, variant } = {
  ...cleanObj($themeStore.defaults?.component),
  ...defaults
};
const th = themer($themeStore);
$: fieldClasses = th.create("FieldMessage").bundle(["mainBg", "unfilledText"], theme, variant === "text").bundle(["softBg", "softText"], {}, theme, variant === "soft").option("common", "transitioned", transitioned).option("fieldFontSizes", size, size).option("roundeds", boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).prepend(`field-message field-message-${variant}`, true).append("w-full", full).append($$restProps.class, true).compile();
</script>

<span {...$$restProps} class={fieldClasses}>
	<slot />
</span>
