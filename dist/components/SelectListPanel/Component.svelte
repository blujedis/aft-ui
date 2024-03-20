<script>import { selectListPanelDefaults as defaults } from "./module";
import { themeStore, themer } from "../../theme";
import { transitioner } from "../Disclosure";
import { getContext } from "svelte";
import { useFocusNav } from "../../hooks";
import { boolToMapValue } from "../../utils";
const context = getContext("SelectListContext");
export let { full, multiple, origin, position, rounded, shadowed, theme, transition } = {
  ...defaults,
  full: context.globals?.full,
  multiple: context.globals?.multiple,
  rounded: context.globals?.rounded,
  shadowed: context.globals?.shadowed,
  theme: context.globals?.theme
};
const th = themer($themeStore);
$:
  nav = useFocusNav($context.panel?.firstChild, {
    onSelected,
    onFind,
    onInit,
    onNavigate
  });
$:
  activeItem = { el: void 0, index: void 0 };
$:
  panelClasses = th.create("SelectListPanel").option("panelBg", theme, theme).option("roundeds", rounded === "full" ? "xl2" : boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).option("common", "bordered", true).prepend("select-list-panel", true).append("outline-none", true).append(`absolute z-30 mt-1 text-left min-w-32 border`, true).append(position === "right" ? "right-0" : "left-0", true).append(origin === "right" ? "origin-top-right" : "origin-top-left", true).append("origin-center", origin === "center").append("min-w-full", full).append($$restProps.class, true).compile();
function onInit(items = []) {
  if (!items.length || $context.filtering)
    return;
  activeItem = items.reduce(
    (a, c, i) => {
      if (c.classList.contains("select-list-option-selected")) {
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
function onNavigate(el, index) {
  activeItem = { el, index };
}
function onSelected(el, e) {
  e.preventDefault();
  const key = el.dataset.key;
  if (!multiple && $context.input) {
    context.toggle();
    context.restoreSelected(key, false);
    setTimeout(() => {
      if ($context.input) {
        const nextValue = $context.items.find((i) => key === i.value)?.label || "";
        $context.input.value = nextValue;
        $context.input.focus();
      }
    });
  } else {
    context.select(key);
    setTimeout(() => {
      $context.input?.focus();
    });
  }
}
function onFind(items) {
  let found = items.find((el) => el.classList.contains("select-list-option-selected"));
  if (!found)
    found = items.find((el) => el.classList.contains("select-list-option"));
  return found;
}
</script>

{#if $context.visible}
	<div
		role="listbox"
		tabindex="-1"
		{...$$restProps}
		aria-orientation="vertical"
		bind:this={$context.panel}
		on:keydown={nav.onKeydown}
		transition:transitioner={transition}
		class={panelClasses}
	>
		<div class="py-1" role="none">
			<slot currentElement={activeItem.el} currentIndex={activeItem.index} />
		</div>
	</div>
{/if}
