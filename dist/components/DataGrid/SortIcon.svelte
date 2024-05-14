<script>import { Icon } from "../Icon";
export let state = 0;
export let theme = "primary";
export let stroke = false;
export let size = "md";
$:
  activeTheme = [-1, 1, "asc", "desc"].includes(state) ? theme : "frame";
</script>

{#if !state}
	<Icon icon="radix-icons:caret-sort" theme={activeTheme} {size} {stroke} hovered transitioned />
{:else if state === 1}
	<Icon icon="radix-icons:caret-up" theme={activeTheme} {size} {stroke} hovered transitioned />
{:else}
	<Icon icon="radix-icons:caret-down" theme={activeTheme} {size} {stroke} hovered transitioned />
{/if}
