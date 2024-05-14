<script>import { page } from "$app/stores";
import { themer, themeStore } from "../../theme";
import { get_current_component } from "svelte/internal";
import { onMount, setContext } from "svelte";
import { cleanObj, forwardEventsBuilder, boolToMapValue } from "../../utils";
import { BreadcrumbOption } from "../BreadcrumbOption";
import { breadcrumbDefaults as defaults } from "./module";
export let { focused, full, generate, rounded, shadowed, size, theme, transitioned, variant } = {
  ...cleanObj($themeStore.defaults?.component),
  ...defaults
};
setContext("Breadcrumb", {
  globals: {
    focused,
    rounded,
    shadowed,
    size,
    theme,
    transitioned,
    variant
  }
});
const th = themer($themeStore);
$:
  items = generateBreadcrumbs();
$:
  breadcrumbNavClasses = th.create("Breadcrumb").bundle(["mainBg", "filledText"], theme, variant === "filled").bundle(["unfilledText"], theme, variant === "text").bundle(["softBg", "unfilledText"], {}, theme, variant === "soft").option("roundeds", boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).prepend(`breadcrumb breadcrumb-${variant}`, true).append("w-full", full).append(
    "px-4 sm:px-6 lg:px-8 first:px-2 first:sm:px-4 first:lg:px-6 inline-flex items-center",
    true
  ).append("!pl-0", variant === "text").append($$restProps.class, true).compile();
$:
  breadcrumbListClasses = th.create("Breadcrumb").option("fieldFontSizes", size, size).option("breadcrumbSpacings", size, size).append("inline-flex items-center", true).compile();
const forwardedEvents = forwardEventsBuilder(get_current_component());
function generateBreadcrumbs() {
  const split = ($page.route?.id || "").slice(1).split("/").filter((v) => v !== "");
  if (!split.length)
    return [];
  const segments = [];
  const result = split.map((s, i) => {
    s = s.replace(/\(.+\)$/, "");
    segments.push(s);
    const label = s.charAt(0).toUpperCase() + s.slice(1);
    const href = [...segments].join("/");
    return {
      label,
      href: href.startsWith("/") ? href : "/" + href,
      icon: i === 0 ? "mdi:home" : void 0,
      selected: split.length - 1 === i,
      index: i,
      size,
      sronly: i === 0 ? label : void 0,
      theme,
      transitioned,
      variant
    };
  });
  return result;
}
</script>

<nav class={breadcrumbNavClasses} aria-label="Breadcrumb">
	<ol use:forwardedEvents {...$$restProps} class={breadcrumbListClasses}>
		{#if generate}
			{#each items as item}
				<BreadcrumbOption {...item} />
			{/each}
		{/if}
		<slot />
	</ol>
</nav>
