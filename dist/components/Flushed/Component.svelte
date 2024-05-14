<script>import { themeStore, themer } from "../..";
import { flushedDefaults as defaults } from "./module";
import { cleanObj } from "../../utils";
export let { selected, disabled, focused, group, peer, hovered, theme } = {
  ...cleanObj($themeStore.defaults?.component, ["transitioned", "rounded", "size", "shadowed"]),
  ...defaults
};
const th = themer($themeStore);
$:
  flushWrapperClasses = th.create("FlushedWrapper").append("relative inline-flex group", true).append($$restProps.class, true).compile();
$:
  flushedClasses = th.create("Flushed").option("mainBorder", theme, true).option("mainBorderPeerFocus", theme, true).option("mainBorderGroupHover", theme, true).prepend(`flushed flushed-${theme}`, true).append("group-hover:border", hovered).append("peer-focus:border-t-2", peer).append("group-focus-within:border-t-2", group).append("aria-checked:border-t-2 aria-selected:border-t-2 aria-expanded:border-t-2", selected).append("border-t", selected !== false).append("absolute inset-x-0 bottom-0 border-x-0 border-b-0", true).compile();
</script>

{#if disabled}
	<slot />
{:else}
	<div {...$$restProps} class={flushWrapperClasses}>
		<slot />
		<div class={flushedClasses} aria-hidden="true" />
	</div>
{/if}
