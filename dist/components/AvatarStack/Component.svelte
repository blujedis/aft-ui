<script>import { avatarStackDefaults as defaults } from "./module";
import themeStore, { themer } from "../..";
import { onMount, setContext } from "svelte";
export let { direction } = {
  ...defaults
};
export const context = setContext("AvatarStack", {
  globals: {
    ...$$restProps,
    stacked: "up"
  }
});
let stack;
$:
  avatarStackClasses = themer($themeStore).create("AvatarStack").append("flex -space-x-2 overflow-hidden", true).append("isolate ", direction === "down").append($$restProps.class, true).compile(true);
onMount(() => {
  if (direction !== "down")
    return;
  const nodes = [...stack.children];
  nodes.reverse().forEach((n, i) => {
    const node = n;
    node.style.zIndex = i + "";
  });
});
</script>

<div bind:this={stack} {...$$restProps} class={avatarStackClasses}>
	<slot />
</div>
