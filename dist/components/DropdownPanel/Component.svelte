<script>import { dropdownPanelDefaults as defaults } from "./module";
import themeStore, { themer } from "../..";
import { getContext } from "svelte";
import { scale } from "svelte/transition";
import { useFocusTrap } from "../../hooks";
const context = getContext("Dropdown");
export let {
  delay,
  duration,
  easing,
  focustrap,
  opacity,
  position,
  rounded,
  shadowed,
  start,
  theme,
  unmount,
  variant,
  width
} = {
  ...defaults,
  ...context.globals
};
let ref;
const [bindFocusTrap, handleFocusTrap] = useFocusTrap(focustrap);
$:
  unmounted = false;
$:
  panelStyles = $context.visible ? $$restProps.style : !unmount ? "display:none;" : $$restProps.style;
$:
  panelClasses = themer($themeStore).create("DropdownPanel").variant("dropdownPanel", variant, theme, true).option("roundeds", rounded === "full" ? "xl2" : rounded, rounded).option("shadows", shadowed, shadowed).append(`dropdown-panel absolute z-20 mt-1 min-w-full focus:outline-none`, true).append(position === "right" ? "right-0" : "left-0", true).append(position === "right" ? "origin-top-right" : "origin-top-left", !duration).append("origin-center", duration).append("invisible", !unmounted).append($$restProps.class, true).compile(true);
function getChildren() {
  const container = ref?.firstChild;
  const items = Array.from(container.children) || [];
  return [items, container];
}
function handleNavigation(e) {
  if (e.repeat || !["ArrowUp", "ArrowDown", " "].includes(e.key))
    return;
  const [items, container] = getChildren();
  if (!items.length)
    return;
  const activeNode = document.activeElement;
  if (e.key === " " && container.contains(activeNode)) {
    if ($context.selected.includes(activeNode.dataset.value))
      return;
    context.select(activeNode.dataset.value);
  } else {
    let currentNode;
    if (container.contains(activeNode)) {
      const currentIndex = items.indexOf(activeNode);
      const nextIndex = e.key === "ArrowDown" ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex < 0 || nextIndex > items.length - 1)
        return;
      currentNode = items[nextIndex];
    } else {
      const selectedNode = items.find(
        (node) => $context.selected.includes(node.dataset.value)
      );
      currentNode = selectedNode || items[0];
    }
    if (currentNode)
      currentNode.focus();
  }
}
function initPanel(node) {
  unmounted = unmount;
}
</script>

{#if (unmounted && $context.visible) || !unmounted}
	<div
		{...$$restProps}
		bind:this={ref}
		use:initPanel
		use:bindFocusTrap
		on:keydown={handleFocusTrap}
		on:keydown={handleNavigation}
		transition:scale={{ duration, start, delay, easing, opacity }}
		class={panelClasses}
		style={panelStyles}
		role={context.mode === 'menu' ? 'menu' : 'listbox'}
		aria-orientation="vertical"
		tabindex="-1"
	>
		<div class="py-1 flex flex-col" role="none">
			<slot items={$context.filtered} />
		</div>
	</div>
{/if}
