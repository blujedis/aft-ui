<script>import { themeStore, themer } from "../..";
import { flushedDefaults as defaults } from "./module";
export let { active, disabled, focused, group, peer, hover, theme } = {
  ...defaults
};
const th = themer($themeStore);
$:
  flushWrapperClasses = th.create("FlushedWrapper").append("relative inline-flex group", true).append($$restProps.class, true).compile();
$:
  flushedClasses = th.create("Flushed").variant("flushed", "default", theme, true).variant("flushed", "hovered", theme, hover).option("focusedBorderPeer", theme, peer).append("peer-focus:border-t-2", peer).append("group-focus-within:border-t-2", group).append("aria-checked:border-t-2 aria-selected:border-t-2 aria-expanded:border-t-2", active).append("border-t", active !== false).append("absolute inset-x-0 bottom-0 border-x-0 border-b-0", true).compile();
</script>

{#if disabled}
	<slot />
{:else}
	<div {...$$restProps} class={flushWrapperClasses}>
		<slot />
		<div class={flushedClasses} aria-hidden="true" />
	</div>
{/if}
