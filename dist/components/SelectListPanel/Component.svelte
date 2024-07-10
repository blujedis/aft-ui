<script>import { selectListPanelDefaults as defaults } from "./module";
import { themeStore, themer } from "../../theme";
import { transitioner } from "../Disclosure";
import { getContext } from "svelte";
import { useFocusNav } from "../../hooks";
import { boolToMapValue, cleanObj } from "../../utils";
const context = getContext("SelectListContext");
export let { bordered, full, position, recordless, rounded, shadowed, tags, theme, transition } = {
  ...cleanObj($themeStore?.defaults?.component, ["focused", "hovered", "size", "transitioned"]),
  ...defaults,
  ...cleanObj(context.globals)
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
  recordlessMsg = typeof recordless === "string" ? recordless : `No options available.`;
$:
  panelClasses = th.create("SelectListPanel").option("panelBg", theme, true).option("roundeds", rounded === "full" ? "xl2" : boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).option("elementBorder", theme, bordered).prepend("select-list-panel", true).append("border", bordered).append(position === "right" ? "right-0" : "left-0", true).append(position === "right" ? "origin-top-right" : "origin-top-left", true).append("origin-center", full).append("min-w-full", full).append(`absolute mt-1 text-left min-w-32 outline-none z-30`, true).append($$restProps.class, true).compile();
$:
  recordlessClasses = th.create("SelectListPanelRecordless").option("menuPadding", context.globals?.size, context.globals?.size).option("fieldFontSizes", context.globals?.size, context.globals?.size).compile();
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
  if (!tags && $context.input) {
    context.toggle();
    if (!context.globals?.filterable) {
      context.select(key);
      $context.input?.focus();
    } else {
      setTimeout(() => {
        context.restore(key, false, true);
        $context.input?.focus();
      });
    }
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
			{#if recordless && !$context.filtered.length}
				<slot name="recordless">
					<div class={recordlessClasses}>
						{#if typeof recordless === 'string'}
							<span>{recordless}</span>
						{:else}
							<span>{recordlessMsg}</span>
						{/if}
					</div>
				</slot>
			{:else}
				<slot {activeItem} />
			{/if}
		</div>
	</div>
{/if}
