<script>import { menuPanelDefaults as defaults } from "./module";
import { themeStore, themer } from "../../theme";
import { transitioner } from "../Disclosure";
import { getContext } from "svelte";
import { useFocusNav } from "../../hooks";
import { boolToMapValue } from "../../utils";
import { writable } from "svelte/store";
const context = getContext("Menu");
export let { bordered, full, position, rounded, shadowed, theme, transition } = {
  ...defaults,
  ...context?.globals
};
const th = themer($themeStore);
$:
  ref = writable();
$:
  nav = useFocusNav($ref?.firstChild, {
    onInit
  });
$:
  panelClasses = th.create("MenuPanel").option("panelBg", theme, true).option("elementRing", theme, true).option("roundeds", rounded === "full" ? "xl2" : boolToMapValue(rounded), rounded).option("elementBorder", theme, bordered).option("shadows", boolToMapValue(shadowed), shadowed).prepend("menu-panel", true).append("border", bordered).append(`absolute z-30 mt-1 min-w-max focus:outline-none none`, true).append(position === "right" ? "right-0" : "left-0", true).append(position === "right" ? "origin-top-right" : "origin-top-left", true).append("origin-center", full).append($$restProps.class, true).compile();
$:
  activeItem = { el: void 0, index: void 0 };
function onInit(items = []) {
  if (!items.length)
    return;
  activeItem = items.reduce(
    (a, c, i) => {
      if (c.classList.contains("menu-option-active")) {
        a.el = c;
        a.index = Math.max(0, i - 1);
      }
      return a;
    },
    { el: void 0, index: void 0 }
  );
  if (!activeItem.el)
    activeItem = { el: items[0], index: 0 };
  activeItem.el?.focus();
}
function setFocus(el) {
  el.focus();
}
</script>

{#if $context.visible}
	<div
		role="menu"
		tabindex="-1"
		{...$$restProps}
		aria-orientation="vertical"
		bind:this={$ref}
		use:setFocus
		on:keydown={nav.onKeydown}
		transition:transitioner={transition}
		class={panelClasses}
	>
		<div class="py-1" role="none">
			<slot />
		</div>
	</div>
{/if}
