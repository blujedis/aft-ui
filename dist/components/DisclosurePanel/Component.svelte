<script>import { transitioner } from "../Disclosure/module";
import { getContext } from "svelte";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
import { disclosurePanelDefaults as defaults } from "./module";
export let { as, unmount } = { ...defaults };
const context = getContext("Disclosure");
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

{#if (unmount && $context.visible) || !unmount}
	<svelte:element
		this={as}
		{...$$restProps}
		use:forwardedEvents
		transition:transitioner={context?.transition}
	>
		<slot />
	</svelte:element>
{/if}
