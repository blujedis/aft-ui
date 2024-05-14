<script>import {
  avatarDefaults as defaults
} from "./module";
import { themer, themeStore } from "../../theme";
import { get_current_component } from "svelte/internal";
import { getContext } from "svelte";
import { forwardEventsBuilder, boolToMapValue, lazyImage, cleanObj } from "../../utils";
import { Icon } from "../Icon";
const context = getContext("AvatarStack");
export let {
  animate,
  counter,
  hovered,
  notification,
  placeholder,
  rounded,
  shadowed,
  size,
  src,
  stacked,
  theme,
  variant
} = {
  ...cleanObj($themeStore.defaults?.component, ["transitioned", "focused"]),
  ...defaults,
  ...context?.globals
};
let _placeholder = placeholder;
if (placeholder === true)
  _placeholder = "mdi:account";
let _notification = notification;
if (notification === true)
  _notification = "top-right";
const lazyload = lazyImage();
const th = themer($themeStore);
$:
  avatarClasses = th.create("Avatar").option("avatarSizes", size, size).option("roundeds", boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).option("hovered", variant, theme, hovered).prepend(`avatar avatar-${variant}`, true).append(
    "ring-2 ring-[color:rgb(var(--body-bg-light))] dark:ring-[color:rgb(var(--body-bg-dark))]",
    stacked
  ).append("relative", stacked === "down").append($$restProps.class, true).compile();
$:
  avatarPlaceholderClasses = _placeholder && th.create("AvatarPlaceholder").bundle(["mainBg", "filledText"], theme, variant === "filled").bundle(["mainRing", "unfilledText"], { $base: "ring-1" }, theme, variant === "outlined").bundle(["softBg", "unfilledText"], {}, theme, variant === "soft").prepend(`avatar avatar-${variant} avatar-placeholder`, true).option("roundeds", boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).option("hovered", variant, theme, hovered).option("avatarSizes", size, size).append(
    "ring-4 ring-[color:rgb(var(--body-bg-light))] dark:ring-[color:rgb(var(--body-bg-dark))]",
    stacked
  ).append("relative", stacked === "down").append("relative inline-flex overflow-hidden", true).compile(true) || "";
$:
  avatarNotificationClasses = notification && th.create("Avatar").bundle(["mainBg", "filledText"], theme, variant === "filled").bundle(["mainRing", "unfilledText"], theme, variant === "outlined").bundle(["softBg", "unfilledText"], {}, theme, variant === "soft").prepend("avatar-notification", true).option("avatarNotificationSizes", size, size && typeof counter === "undefined").option("avatarCounterSizes", size, size && typeof counter !== "undefined").option("avatarCounterTextSizes", size, size && typeof counter !== "undefined").option("animate", animate, animate).option("avatarNotificationOffsets", size, size).append(
    "absolute block rounded-full inline-flex items-center justify-center ring-2 ring-[color:rgb(var(--body-bg-light))] dark:ring-[color:rgb(var(--body-bg-dark))] ",
    true
  ).append(
    "w-auto px-0.5 -right-2",
    typeof counter !== "undefined" && (counter + "").length > 2
  ).compile(true) || "";
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

{#if _placeholder}
	<span class={avatarPlaceholderClasses}>
		<slot>
			<Icon icon={_placeholder} class="h-full w-full" />
			{#if notification}
				<span class={avatarNotificationClasses}>
					{#if counter}
						{counter}
					{/if}
				</span>
			{/if}
		</slot>
	</span>
{:else}
	<span class="relative inline-flex max-w-fit">
		<img
			use:forwardedEvents
			use:lazyload={src}
			alt="Avatar"
			{...$$restProps}
			class={avatarClasses}
		/>
		{#if notification}
			<span class={avatarNotificationClasses}>
				{#if counter}
					{counter}
				{/if}
			</span>
		{/if}
	</span>
{/if}
<!-- {:else}
	<span>
		<img use:forwardedEvents src="" alt="Avatar" {...$$restProps} class={avatarClasses} />
	</span>
{/if} -->
