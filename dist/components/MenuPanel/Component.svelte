<script>import { menuPanelDefaults as defaults } from "./module";
import { themeStore, themer } from "../../theme";
import { transitioner } from "../Disclosure";
import { getContext } from "svelte";
import { useFocusNav } from "../../hooks";
import { boolToMapValue } from "../../utils";
import { writable } from "svelte/store";
const context = getContext("Menu");
export let { origin, position, rounded, shadowed, theme, transition } = {
  ...defaults,
  ...context?.globals
};
const th = themer($themeStore);
$:
  ref = writable();
$:
  nav = useFocusNav($ref?.firstChild);
$:
  panelClasses = th.create("MenuPanel").bundle(["panelBg"], theme, true).option("common", "ringed", true).option("roundeds", rounded === "full" ? "xl2" : boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).prepend("dropdown-panel", true).append(`absolute z-30 mt-1 min-w-max focus:outline-none none`, true).append(position === "right" ? "right-0" : "left-0", true).append(origin === "right" ? "origin-top-right" : "origin-top-left", true).append("origin-center", origin === "center").append($$restProps.class, true).compile();
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
