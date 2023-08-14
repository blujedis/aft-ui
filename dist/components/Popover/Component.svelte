<script>import { themer, themeStore } from "../../theme";
import { popoverDefaults as defaults } from "./module";
import { fade } from "svelte/transition";
export let {
  arrowed,
  content,
  close,
  id,
  rounded,
  sanitizer,
  shadowed,
  size,
  theme,
  transitioned,
  unstyled,
  variant
} = {
  id: "popover",
  ...defaults
};
const role = $$restProps.role ?? arrowed ? "tooltip" : "region";
const th = themer($themeStore);
$:
  popoverClasses = th.create("Popover").variant("popover", variant, theme, variant).option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).option("common", "transition", transitioned).option("fieldFontSizes", size, size).option("popoverSizes", size, size).append("absolute animate-fade-in-down", true).append($$restProps.class, true).compile(true);
</script>

<div
	{role}
	{...$$restProps}
	{id}
	class={popoverClasses}
	transition:fade={{ delay: 250, duration: 500 }}
>
	<slot {close}>
		{#if !!sanitizer}
			{@html sanitizer(content)}
		{:else}
			{content || 'Hello Tooltip!'}
		{/if}
	</slot>
	{#if arrowed}
		<div id="arrow" class="popover__arrow" />
	{/if}
</div>

<style>
	#arrow {
		position: absolute;
		background: inherit;
		width: 8px;
		height: 8px;
		transform: rotate(45deg);
	}
</style>
