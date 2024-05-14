<script>import { menuButtonDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { Button, Icon } from "..";
import { getContext } from "svelte";
const context = getContext("Menu");
export let { caret, full, rounded, roticon, size, shadowed, theme, variant } = {
  ...defaults,
  ...context?.globals
};
const th = themer($themeStore);
$:
  buttonClasses = th.create("MenuButton").prepend(`menu-button`, true).append("h-full", true).append($$restProps.class, true).compile();
$:
  iconClasses = th.create("MenuButtonIcon").option("iconCaretSizes", size, true).append("transition-transform duration-300 origin-center", !!caret && roticon).append(
    typeof roticon === "string" ? roticon : "-rotate-180",
    $context.visible && roticon && !!caret
  ).append("ml-2 shrink pointer-events-none pt-px", true).compile();
function handleClick(e) {
  context.toggle();
}
</script>

<svelte:component
	this={Button}
	{...{ full, rounded, shadowed, size, theme, variant }}
	{...$$restProps}
	class={buttonClasses}
	on:click={handleClick}
	aria-expanded={$context.visible}
	aria-haspopup="true"
	as="button"
>
	<div class="flex items-center pointer-events-none">
		<slot />
		{#if caret}
			<slot name="caret">
				<svelte:component this={Icon} icon={caret} class={iconClasses} />
			</slot>
		{/if}
	</div>
</svelte:component>
