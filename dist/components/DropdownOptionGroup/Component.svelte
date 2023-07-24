<script>import { getContext, setContext } from "svelte";
import themeStore, { themer } from "../..";
import { dropdownOptionGroupDefaults as defaults } from "./module";
const context = getContext("Dropdown");
export let { group, size, theme, variant } = {
  ...defaults,
  ...context?.globals
};
setContext("DropdownGroup", group);
const th = themer($themeStore);
$:
  optionGroupClasses = th.create("DropdownGroup").variant("dropdownOptionGroup", variant, theme, variant).option("fieldFontSizes", size, size).option("fieldPadding", size, size).append($$restProps.class, true).compile(true);
</script>

{#if context.strategy !== 'menu'}
	<optgroup class={optionGroupClasses}>{group}</optgroup>
{/if}
