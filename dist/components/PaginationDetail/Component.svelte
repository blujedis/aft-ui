<script>import { paginationDetailDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { boolToMapValue } from "../../utils";
export let { full, rounded, shadowed, size, theme, transitioned, variant, unstyled } = {
  ...defaults
};
$: paginationDetailClasses = themer($themeStore).create("PaginationDetail").option("common", "transitioned", transitioned).option("kbdPadding", size, size).option("badgeFontSizes", size, size).option("roundeds", boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).prepend(`pagination-detail`, true).append("w-full", full).append("flex items-center justify-center", true).append($$restProps.class, true).compile();
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
