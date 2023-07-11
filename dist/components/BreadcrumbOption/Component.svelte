<script>import { breadcrumbOptionDefaults as defaults } from "./module";
import themeStore, { themer } from "../..";
import Icon from "../Icon";
import { getContext } from "svelte";
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
$:
  breadcrumbOptionClasses = th.create("Breadcrumb").variant("breadcrumbOption", variant, theme, true).option(
    focused === true || focused === "always" ? "focusedRingSizes" : "focusedVisibleRingSizes",
    size,
    focused
  ).option(focused === true || focused === "always" ? "focused" : "focusedVisible", theme, focused).option("focusedOffsetSizes", "two", focused).option("common", "transition", transitioned).option("fieldFontSizes", size, size).option("breadcrumbMargins", size, size).append("pointer-events-none", selected).append($$restProps.class, true).compile(true);
</script>

<li>
	<div class="flex items-center">
		<slot>
			{#if separator && index !== 0}
				{#if variant === 'filled'}
					<svg
						class="h-full w-6 flex-shrink-0 pointer-events-none"
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
