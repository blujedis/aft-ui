<script>import { onMount, onDestroy, createEventDispatcher } from "svelte";
import { infiniteScrollDefaults as defaults } from "./module";
export let { threshold, horizontal, element, hasMore, reverse, window } = {
  ...defaults
};
const dispatch = createEventDispatcher();
let isLoading = false;
let component;
let beforeScrollHeight;
let beforeScrollTop;
let el;
$: if (el) {
  if (reverse) {
    el.scrollTop = el.scrollHeight;
  }
  el.addEventListener("scroll", handleScroll);
  el.addEventListener("resize", handleScroll);
}
$: if (el && isLoading && reverse) {
  el.scrollTop = el.scrollHeight - beforeScrollHeight + beforeScrollTop;
}
const handleScroll = (e) => {
  if (!hasMore) return;
  const target = e.target;
  const offset = getOffset(target, reverse, horizontal);
  if (offset <= threshold) {
    if (!isLoading && hasMore) {
      dispatch("load");
      beforeScrollHeight = target.scrollHeight;
      beforeScrollTop = target.scrollTop;
    }
    isLoading = true;
  } else {
    isLoading = false;
  }
};
const getOffset = (target, reverse2, horizontal2) => {
  const element2 = target.documentElement ? target.documentElement : target;
  if (reverse2) {
    return horizontal2 ? element2.scrollLeft : element2.scrollTop;
  }
  return horizontal2 ? element2.scrollWidth - element2.clientWidth - element2.scrollLeft : element2.scrollHeight - element2.clientHeight - element2.scrollTop;
};
onMount(() => {
  if (element) el = element;
  else if (document) el = document.body;
  else el = component.parentNode;
});
onDestroy(() => {
  if (el) {
    el.removeEventListener("scroll", handleScroll);
    el.removeEventListener("resize", handleScroll);
  }
});
</script>

{#if !window && !element}
	<div bind:this={component} id="infinite-scroll" style="width: 0;" />
{/if}
