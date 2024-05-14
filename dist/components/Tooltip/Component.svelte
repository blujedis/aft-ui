<script>import { tooltipDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { boolToMapValue, cleanObj } from "../../utils";
import { onMount } from "svelte";
import { createPopoverInstance } from "../../hooks/usePopover";
export let {
  arrowed,
  as,
  escapeable,
  events,
  middleware,
  offset,
  padding,
  placement,
  rounded,
  role,
  shadowed,
  size,
  sticky,
  strategy,
  theme,
  trigger,
  variant,
  onChange
} = {
  ...cleanObj($themeStore.defaults?.component, ["transitioned", "hovered", "focused"]),
  ...defaults
};
let popover;
let placeholderRef;
let arrowRef;
let contentRef;
let triggerRef;
let visible = false;
const th = themer($themeStore);
$:
  popoverClasses = th.create("Badge").bundle(["mainBg", "filledText"], theme, variant === "filled").bundle(
    ["mainRing", "unfilledText"],
    { $base: "ring-1 ring-inset" },
    theme,
    variant === "outlined"
  ).bundle(["softBg", "unfilledText"], {}, theme, variant === "soft").option("badgeFontSizes", size, size).option("roundeds", boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).prepend("popover", true).append("z-50", true).append($$restProps.class, true).compile();
$:
  arrowClasses = th.create("PopoverArrow").prepend("popover-arrow", true).append("absolute pointer-events-none w-2 h-2 rotate-45 bg-inherit border-inherit", true).compile();
function init(node) {
  contentRef = node;
  if (contentRef)
    popover.registerContent(contentRef, { arrowRef: arrowed ? arrowRef : void 0 });
}
function initArrow(node) {
  arrowRef = node;
}
onMount(() => {
  const prevSibling = placeholderRef.previousElementSibling;
  triggerRef = !trigger && prevSibling ? prevSibling : trigger;
  popover = createPopoverInstance({
    events,
    escapeable,
    offset,
    padding,
    placement,
    sticky,
    strategy,
    onChange: (state) => visible = state
  });
  if (triggerRef) {
    popover.registerTrigger(triggerRef);
  }
  return () => {
    if (popover)
      popover.destroy();
  };
});
</script>

{#if !triggerRef}
	<div bind:this={placeholderRef} />
{/if}

{#if visible && triggerRef}
	<svelte:element this={as} use:init {...$$restProps} {role} class={popoverClasses}>
		<slot />
		{#if arrowed}<div use:initArrow class={arrowClasses} />{/if}
	</svelte:element>
{/if}
