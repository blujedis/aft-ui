<script>import { paginationPageDefaults as defaults } from "./module";
import { themeStore, themer } from "../..";
import { get_current_component } from "svelte/internal";
import { getContext } from "svelte";
import { forwardEventsBuilder } from "../../utils";
import { Icon } from "../Icon";
const context = getContext("Pagination");
export let { as, focused, next, previous, rounded, size, theme, transitioned, value, variant } = {
  ...defaults,
  ...context?.globals
};
const th = themer($themeStore);
$:
  selected = $context?.page === value;
$:
  paginationPageClasses = th.create("PaginationPage").variant("paginationPage", variant, theme, true).option("focusedRingVisible", theme, focused).option("fieldFontSizes", size, size).option("paginationGroupedPadding", size, size && ["filled", "glass"].includes(variant)).option("paginationFlushedPadding", size, size && variant === "flushed").option("roundeds", rounded, rounded && (previous || next)).append(
    "relative inline-flex items-center justify-center font-semibold focus:z-20",
    ["filled", "glass"].includes(variant)
  ).append("z-10", ["filled", "glass"].includes(variant) && selected).append("pointer-events-none", value === "...").append("px-2", previous || next).append("rounded-r-none", previous).append("rounded-l-none", next).append($$restProps.class, true).compile(true);
$:
  paginationPageIconClasses = th.create("PaginationPageIcon").option("paginationIconSizes", size, size && (previous || next)).compile(true);
const forwardedEvents = forwardEventsBuilder(get_current_component());
function handleSelect(value2) {
  if (previous)
    context.prev();
  else if (next)
    context.next();
  else
    context.goto(value2);
}
</script>

<svelte:element
	this={as}
	role={as === 'a' ? 'link' : 'button'}
	tabindex="-1"
	aria-labelledby=""
	use:forwardedEvents
	{...$$restProps}
	href="#"
	class={paginationPageClasses}
	aria-current={selected ? 'page' : null}
	aria-selected={selected}
	on:click={() => handleSelect(value)}
>
	<slot>
		{#if previous}
			<Icon
				icon={previous === true ? 'mdi:chevron-left' : previous}
				class={paginationPageIconClasses}
			/>
		{:else if next}
			<Icon icon={next === true ? 'mdi:chevron-right' : next} class={paginationPageIconClasses} />
		{:else}
			{value}
		{/if}
	</slot>
</svelte:element>
