<script>import { paginationDetailDefaults as defaults } from "./module";
import themeStore, { themer } from "../..";
export let { full, rounded, shadowed, size, theme, transitioned, variant, unstyled } = {
  ...defaults
};
$:
  paginationDetailClasses = themer($themeStore).create("PaginationDetail").variant("paginationDetail", variant, theme, true).option("common", "transition", transitioned).option("badgePadding", size, size).option("badgeFontSizes", size, size).option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).append("w-full", full).append("flex items-center justify-center", true).append($$restProps.class, true).compile(true);
</script>

<div {...$$restProps} class={paginationDetailClasses}>
	<p class="text-sm text-gray-700">
		Showing
		<span class="font-medium">1</span>
		to
		<span class="font-medium">10</span>
		of
		<span class="font-medium">97</span>
		results
	</p>
</div>
