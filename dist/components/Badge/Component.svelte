<script>import { badgeDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { boolToMapValue, cleanObj } from "../../utils";
export let {
  focused,
  full,
  hovered,
  removable,
  rounded,
  shadowed,
  size,
  theme,
  transitioned,
  variant
} = {
  ...cleanObj($themeStore.defaults?.component),
  ...defaults
};
const th = themer($themeStore);
const additionalProps = focused ? { tabindex: 0 } : {};
$: badgeClasses = th.create("Badge").bundle(["mainBg", "filledText"], theme, variant === "filled").bundle(
  ["mainRing", "unfilledText"],
  { $base: "ring-1 ring-inset" },
  theme,
  variant === "outlined"
).bundle(["softBg", "softText"], {}, theme, variant === "soft").option("common", "transitioned", transitioned).option("common", "focusedOutlineVisible", focused).option("outlineFocusVisible", theme, focused).option("badgeFontSizes", size, size).option("roundeds", boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).prepend(`badge badge-${variant}`, true).append("w-full", full).append("z-20 badge", true).append("relative inline-flex items-center leading-tight justify-center", !removable).append($$restProps.class, true).compile();
$: badgeInnerClasses = th.create("BadgeInner").option("badgeInnerMargin", size, size).compile();
</script>

<span {...additionalProps} {...$$restProps} class={badgeClasses}>
	<div class={badgeInnerClasses}>
		<slot />
	</div>
</span>
