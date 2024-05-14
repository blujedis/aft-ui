<script>import { breadcrumbOptionDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { Icon } from "../Icon";
import { getContext, onMount } from "svelte";
const context = getContext("Breadcrumb");
export let {
  focused,
  href,
  index,
  icon,
  label,
  selected,
  separator,
  size,
  sronly,
  theme,
  transitioned,
  variant
} = {
  ...defaults,
  ...context?.globals
};
const th = themer($themeStore);
let mounted = false;
$:
  breadcrumbOptionClasses = th.create("BreadcrumbOption").option("common", "focusedOutlineVisible", focused).option("outlineFocusVisible", theme, focused).option("common", "transitioned", transitioned).option("fieldFontSizes", size, size).option("breadcrumbMargins", size, size).prepend("breadcrumb-option", true).append("aria-selected:pointer-events-none outline-none", true).append($$restProps.class, true).compile();
$:
  breadcrumbOptionWrapperClasses = th.create("BreadcrumbOptionWrapper").option("breadcrumbFilledHeight", size, size).prepend("breadcrumb-option-wrapper", true).append("flex items-center", true).compile();
$:
  breadcrumbIconClasses = th.create("BreadcrumbIcon").option("breadcrumbFilledIconWidth", size, size).prepend("breadcrumb-option-icon", true).append("opacity-40", true).append("opacity-20", theme === "frame" && variant === "soft").append("h-full flex-shrink-0 pointer-events-none", true).compile();
onMount(() => {
  mounted = true;
});
</script>

<li>
	<div class={breadcrumbOptionWrapperClasses}>
		<slot>
			{#if separator && index !== 0}
				{#if variant !== 'text'}
					<svg
						class:invisible={!mounted}
						class={breadcrumbIconClasses}
						viewBox="0 0 24 44"
						preserveAspectRatio="none"
						fill="currentColor"
						aria-hidden="true"
					>
						<path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
					</svg>
				{:else}
					<Icon icon={separator} class="flex-shrink-0 pointer-events-none" />
				{/if}
			{/if}
			<a
				{...$$restProps}
				role="tab"
				aria-current={selected ? 'location' : null}
				aria-selected={selected}
				{href}
				class={breadcrumbOptionClasses}
			>
				{#if icon}
					<Icon {icon} class="flex-shrink-0 pointer-events-none" />
				{/if}
				{#if sronly}
					<span class="sr-only">Home</span>
				{:else}
					{label}
				{/if}
			</a>
		</slot>
	</div>
</li>

<style>
	div > a:first-child {
		margin-left: 0;
	}
</style>
