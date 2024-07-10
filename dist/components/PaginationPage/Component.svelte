<script>import { Icon } from "..";
import { paginationPageDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { get_current_component } from "svelte/internal";
import { getContext } from "svelte";
import { forwardEventsBuilder, boolToMapValue, cleanObj } from "../../utils";
const context = getContext("Pagination");
export let {
  as,
  disabled: initDisabled,
  focused,
  hovered,
  next,
  previous,
  rounded,
  size,
  theme,
  transitioned,
  value,
  variant
} = {
  ...cleanObj($themeStore.defaults?.component, ["shadowed"]),
  ...defaults,
  focused: context.globals?.focused,
  hovered: context.globals?.hovered,
  rounded: context.globals?.rounded,
  size: context.globals?.size,
  theme: context.globals?.theme,
  transitioned: context.globals?.transitioned,
  variant: context.globals?.variant
};
const th = themer($themeStore);
$: disabled = previous && $context.page === 1 || next && $context.page === $context.endPage || initDisabled || false;
$: console.log(disabled);
$: paginationPageClasses = th.create("PaginationPage").bundle(["selectedBgAriaSelected", "filledTextAriaSelected"], theme, variant === "filled").bundle(["selectedSoftBgAriaSelected", "unfilledTextAriaSelected"], theme, variant === "soft").bundle(
  ["selectedBorderAriaSelected", "unfilledTextAriaSelected"],
  theme,
  variant === "flushed"
).option("panelBgHover", theme, hovered && ["filled", "soft"].includes(variant)).option("fieldFontSizes", size, size).option("paginationGroupedPadding", size, size && ["filled", "soft"].includes(variant)).option("paginationFlushedPadding", size, size && variant === "flushed").option("common", "focusedOutlineVisible", focused).option("outlineFocusVisible", theme, focused).option("common", "transitioned", transitioned).option("roundeds", boolToMapValue(rounded), rounded && (previous || next)).option("common", "disabled", disabled).prepend(`pagination-page`, true).append(
  "relative inline-flex items-center justify-center font-semibold focus:z-20",
  ["filled", "soft"].includes(variant)
).append(
  "inline-flex items-center border-t-2 border-transparent font-medium border-x-0 border-b-0",
  variant === "flushed"
).append("z-10", ["filled", "soft"].includes(variant) && $context.page === value).append(
  "hover:border-frame-300 dark:hover:border-frame-600",
  variant === "flushed" && !($context.page === value)
).append("pointer-events-none", value === "..." || $context.page === value).append("px-2", previous || next).append("rounded-r-none", previous).append("rounded-l-none", next).append("cursor-pointer", as === "button").append($$restProps.class, true).compile();
$: paginationPageIconClasses = th.create("PaginationPageIcon").option("paginationIconSizes", size, size && (previous || next)).compile();
const forwardedEvents = forwardEventsBuilder(get_current_component());
function handleClick(p) {
  if (as === "a") return void 0;
  return (e) => {
    context.update((s) => {
      return { ...s, page: p };
    });
  };
}
</script>

<svelte:element
	this={as}
	role={as === 'a' ? 'link' : 'button'}
	tabindex="-1"
	href={next
		? `?page=${Math.min(7, ($context.page || 1) + 1)}`
		: previous
			? `?page=${Math.max(1, ($context.page || 1) - 1)}`
			: `?page=${value}`}
	on:click={handleClick(previous ? $context.page - 1 : next ? $context.page + 1 : value)}
	use:forwardedEvents
	{...$$restProps}
	{disabled}
	class={paginationPageClasses}
	aria-current={$context.page === value ? 'page' : null}
	aria-selected={$context.page === value}
	aria-disabled={disabled}
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
