<script>import { menuOptionDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { forwardEventsBuilder } from "../../utils";
import { get_current_component } from "svelte/internal";
import { getContext } from "svelte";
const context = getContext("Menu");
export let { active, as, key, focused, hovered, size, theme, transitioned } = {
  ...defaults,
  ...context?.globals
};
const th = themer($themeStore);
$:
  optionClasses = th.create("MenuOption").option("panelBgHover", theme, hovered).option("common", "transitioned", transitioned).option("common", "focusedOutlineVisible", focused).option("outlineFocusVisible", theme, focused).option("fieldFontSizes", size, size).option("menuPadding", size, size).append("block w-full", true).append("hover:brightness-125", true).append($$restProps.class, true).compile();
const forwardedEvents = forwardEventsBuilder(get_current_component());
function handleClick(e) {
  setTimeout(() => context.close());
}
</script>

{#if as === 'button'}
	<button
		role="menuitem"
		{...$$restProps}
		use:forwardedEvents
		on:click={handleClick}
		aria-current={active}
		data-key={key}
		class={optionClasses}
	>
		<slot />
	</button>
{:else}
	<a
		role="menuitem"
		tabindex="-1"
		{...$$restProps}
		use:forwardedEvents
		on:click={handleClick}
		aria-current={active}
		class={optionClasses}
		href={$$restProps.href}
		data-key={key}
	>
		<slot />
	</a>
{/if}
