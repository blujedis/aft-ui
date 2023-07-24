<script>import { menuButtonDefaults as defaults } from "./module";
import themeStore, { themer } from "../..";
import Button from "../Button";
import Icon from "../Icon";
import { getContext } from "svelte";
const context = getContext("MenuController");
export let { caret, full, rounded, roticon, size, shadowed, strategy, theme, variant } = {
  ...defaults,
  ...context?.globals
};
const th = themer($themeStore);
$:
  iconClasses = th.create("MenuButtonIcon").option("iconDropdownSizes", size, true).append("transition-transform duration-300 origin-center", !!caret && roticon).append(
    typeof roticon === "string" ? roticon : "-rotate-180",
    $context.visible && roticon && !!caret
  ).append("ml-2 shrink pointer-events-none pt-px", true).compile();
function handleClick(e) {
  context.toggle();
}
</script>

<svelte:component
	this={Button}
	{...{ full, rounded, shadowed, size, theme, variant, strategy }}
	{...$$restProps}
	on:click={handleClick}
	aria-expanded={$context.visible}
	aria-haspopup="true"
>
	<div class="flex items-center pointer-events-none">
		<div>
			<slot />
		</div>
		{#if caret}
			<slot name="caret">
				<svelte:component this={Icon} icon={caret} class={iconClasses} />
			</slot>
		{/if}
	</div>
</svelte:component>
