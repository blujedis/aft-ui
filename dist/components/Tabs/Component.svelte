<script>import { tabsDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { setContext } from "svelte";
import { cleanObj, boolToMapValue } from "../../utils";
import { writable } from "svelte/store";
export let {
  condensed,
  focused,
  full,
  hovered,
  rounded,
  selected,
  shadowed,
  size,
  theme,
  transitioned,
  variant,
  underlined,
  class: klass,
  navWrapperClasses,
  navContainerClasses,
  navClasses
} = {
  ...defaults
};
const store = writable({ tabs: [], selected: void 0, currentIndex: -1 });
const globals = cleanObj({
  focused,
  full,
  hovered,
  rounded,
  size,
  theme,
  transitioned,
  variant,
  underlined
});
export const context = setContext("Tabs", {
  ...store,
  globals
});
let panel;
const th = themer($themeStore);
$:
  tabsClasses = th.create("TabsWrapper").option("formBorder", theme, variant === "flushed").option("shadows", boolToMapValue(shadowed), shadowed && variant !== "text").prepend(`tabs tabs-${variant}`, true).append("-mb-px", ["flushed", "filled"].includes(variant)).append("divide-x", variant === "filled").append("border-b", variant === "flushed").append("w-full", full).append("space-x-2", ["flushed", "pills"].includes(variant)).append("mb-1", variant === "text").append("divide-frame-900/20 dark:divide-frame-600", variant === "filled").append("not-sr-only isolate inline-flex flex-wrap mb-4", true).append($$restProps.class, true).compile();
$:
  selectClasses = th.create("TabsSelect").prepend(`tabs-${variant}`, true).prepend("tabs", true).append("sr-only mb-4", true).compile();
function mount(node) {
  const destroy = context.subscribe((s) => {
    if (s.selected)
      node.replaceChildren(s.selected);
  });
  return { destroy };
}
</script>

<div>
	<ul {...$$restProps} class={tabsClasses} role="tablist">
		<slot />
	</ul>
	<select
		aria-controls={`tab-panel-${$context.currentIndex}`}
		class={selectClasses}
		on:change={(e) => {
			const index = e.currentTarget.selectedIndex;
			$context.tabs[index].$select();
		}}
	>
		{#each $context.tabs as tab, i}
			<option value={tab.innerText} selected={i === $context.currentIndex}>{tab.innerText}</option>
		{/each}
	</select>
	<div
		bind:this={panel}
		role="tabpanel"
		aria-labelledby={`tab-${$context.currentIndex}`}
		use:mount
		class="flex"
	></div>
</div>
