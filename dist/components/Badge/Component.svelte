<script>import { badgeDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
export let { removable, full, rounded, shadowed, size, theme, transitioned, variant, unstyled } = {
  ...defaults
};
const th = themer($themeStore);
$:
  badgeClasses = unstyled ? th.create("Badge").append($$restProps.class, true).compile() : th.create("Badge").variant("badge", variant, theme, variant).option("common", "transitioned", transitioned).option("focusedRingVisible", theme, removable).remove("focus:", true).option("badgePadding", size, size && !removable).option("badgeFontSizes", size, size).option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).append("w-full", full).append("z-20 badge font-medium", true).append("badge-removable", removable).append("relative inline-flex items-center leading-tight", !removable).append($$restProps.class, true).compile(true);
</script>

<span {...$$restProps} class={badgeClasses}>
	{#if !removable}
		<span class:mb-0.5={size !== 'xs'}>
			<slot />
		</span>
	{:else}
		<slot />
	{/if}
</span>
