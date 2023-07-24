<script>import { multiselectPanelDefaults as defaults } from "./module";
import themeStore, { themer, transitioner } from "../..";
import { getContext } from "svelte";
import { useFocusNav } from "../../hooks";
const context = getContext("MultiselectContext");
export let { origin, position, rounded, shadowed, theme, transition, variant } = {
  ...defaults,
  ...context?.globals
};
const th = themer($themeStore);
$:
  nav = useFocusNav($context.panel?.firstChild);
$:
  selected = $context.selected.map(
    (v) => $context.items.find((item) => item.value === v)
  );
$:
  labels = selected.map((v) => v.label);
nav?.onSelected((el) => {
  const key = el.dataset.key;
  if ($context.selected.includes(key))
    context.unselect(key);
  else
    context.select(key);
  if (!context.globals.tags && $context.input) {
    setTimeout(() => {
      if ($context.input)
        $context.input.value = labels.join(", ");
    });
  }
});
$:
  panelClasses = th.create("MultiselectPanel").variant("multiselectPanel", variant, theme, true).option("roundeds", rounded === "full" ? "xl2" : rounded, rounded).option("shadows", shadowed, shadowed).append(`dropdown-panel absolute z-30 mt-1 min-w-full focus:outline-none text-left`, true).append(position === "right" ? "right-0" : "left-0", true).append(origin === "right" ? "origin-top-right" : "origin-top-left", true).append("origin-center", origin === "center").append($$restProps.class, true).compile(true);
function setFocus(el) {
  el.focus();
}
</script>

{#if $context.visible}
	<div
		role="listbox"
		tabindex="-1"
		{...$$restProps}
		aria-orientation="vertical"
		bind:this={$context.panel}
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
