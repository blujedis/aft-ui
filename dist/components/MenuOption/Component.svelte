<script>import { menuOptionDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { forwardEventsBuilder, cleanObj } from "../../utils";
import { get_current_component } from "svelte/internal";
import { getContext } from "svelte";
const context = getContext("Menu");
export let { active, as, focused, hovered, size, theme, transitioned } = {
  ...defaults,
  ...cleanObj(context?.globals)
};
const th = themer($themeStore);
$: optionClasses = th.create("MenuOption").option("bgFocus", theme, focused).bundle(
  ["selectedBgAriaCurrentpage"],
  { $base: 'aria-[current="page"]:text-white' },
  theme,
  theme
).option("panelBgHover", theme, hovered).option("common", "transitioned", transitioned).option("fieldFontSizes", size, size).option("menuPadding", size, size).prepend("menu-option", true).prepend("menu-option-active", active).append("block w-full", true).append('outline-none [[data-active="true"]]:bg-info-500', true).append($$restProps.class, true).compile();
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
		aria-current={active ? 'page' : undefined}
		class={optionClasses}
	>
		<slot />
	</button>
{:else}
	<a
		role="menuitem"
		tabindex="0"
		{...$$restProps}
		use:forwardedEvents
		on:click={handleClick}
		aria-current={active ? 'page' : undefined}
		class={optionClasses}
		href={$$restProps.href}
	>
		<slot />
	</a>
{/if}
