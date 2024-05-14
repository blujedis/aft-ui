<script>import { SvelteComponent, getContext } from "svelte";
import { themeStore, themer } from "../../theme";
import { forwardEventsBuilder } from "../../utils";
import { get_current_component } from "svelte/internal";
export let as = "button";
const context = getContext("Disclosure");
const th = themer($themeStore);
$:
  disclosureButtonClasses = th.create("DisclosureButton").prepend("disclosure-button", true).append($$restProps.class, true).compile();
const forwardedEvents = forwardEventsBuilder(get_current_component());
const isElement = typeof as === "string";
const element = as;
const component = as;
</script>

{#if isElement}
	<svelte:element
		this={element}
		role="button"
		tabindex="-1"
		{...$$restProps}
		class={disclosureButtonClasses}
		use:forwardedEvents
		on:click={() => context.toggle()}
	>
		<slot />
	</svelte:element>
{:else}
	<svelte:component this={component} {...$$restProps} on:click={() => context.toggle()}>
		<slot />
	</svelte:component>
{/if}
