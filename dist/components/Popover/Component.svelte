<script>import { popoverDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { onMount } from "svelte";
import { createPopoverInstance } from "../../hooks/usePopover";
export let {
  as,
  escapeable,
  events,
  middleware,
  offset,
  padding,
  placement,
  role,
  sticky,
  strategy,
  trigger,
  onChange
} = {
  ...defaults
};
let popover;
let placeholderRef;
let contentRef;
let triggerRef;
let visible = false;
const th = themer($themeStore);
$: popoverClasses = th.create("Badge").prepend("popover", true).append("z-50", true).append($$restProps.class, true).compile();
function init(node) {
  contentRef = node;
  if (contentRef) popover.registerContent(contentRef, { middleware, placement });
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
    if (popover) popover.destroy();
  };
});
</script>

{#if !triggerRef}
	<div bind:this={placeholderRef} />
{/if}

{#if visible && triggerRef}
	<svelte:element this={as} use:init {...$$restProps} {role} class={popoverClasses}>
		<slot />
	</svelte:element>
{/if}
