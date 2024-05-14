<script>import { transitioner } from "../Disclosure/module";
import { getContext } from "svelte";
import { themeStore, themer } from "../../theme";
import { get_current_component } from "svelte/internal";
import { useFocusTrap } from "../../hooks";
import { forwardEventsBuilder } from "../../utils";
import { disclosurePanelDefaults as defaults } from "./module";
const context = getContext("Disclosure");
export let { as, focustrap, unmount } = {
  ...defaults,
  focustrap: context.focustrap
};
const th = themer($themeStore);
$:
  disclosurePanelClasses = th.create("DisclosurePanel").prepend("disclosure-panel", true).append($$restProps.class, true).compile();
const [bindFocusTrap, handleFocusTrap] = useFocusTrap(focustrap);
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<svelte:window on:keydown={handleFocusTrap} />

{#if (unmount && $context.visible) || !unmount}
	<svelte:element
		this={as}
		tabindex="-1"
		{...$$restProps}
		bind:this={$context.panel}
		use:forwardedEvents
		use:bindFocusTrap
		transition:transitioner={context?.transition}
		class={disclosurePanelClasses}
	>
		<slot />
	</svelte:element>
{/if}
