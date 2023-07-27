<script>import { avatarDefaults as defaults } from "./module";
import themeStore, { themer } from "../..";
import { get_current_component } from "svelte/internal";
import { getContext, onMount } from "svelte";
import { forwardEventsBuilder } from "../../utils";
import Icon from "../Icon";
const context = getContext("AvatarStack");
export let {
  animation,
  notification,
  placeholder,
  rounded,
  shadowed,
  size,
  stacked,
  theme,
  variant
} = {
  ...defaults,
  ...context?.globals
};
let _placeholder = placeholder;
if (placeholder === true)
  _placeholder = "mdi:account";
if (notification === true)
  notification = "top-right";
const th = themer($themeStore);
let mounted = false;
$:
  avatarClasses = th.create("Avatar").variant("avatar", stacked ? "stacked" : variant, theme, true).option("avatarSizes", size, size).option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).append("relative", stacked === "down").append($$restProps.class, true).compile(true);
$:
  avatarNotificationClasses = notification && th.create("AvatarNotification").variant("avatarNotification", "default", theme, true).option("avatarNotificationSizes", size, size).append("absolute right-0 top-0 block rounded-full ring-2", true).append(
    animation === "ping" ? "animate-ping" : animation === "pulse" ? "animate-pulse" : "",
    animation
  ).compile(true) || "";
$:
  avatarPlaceholderClasses = _placeholder && th.create("AvatarPlaceholder").variant("avatarPlaceholder", "default", theme, true).option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).option("avatarSizes", size, size).append('relative inline-block overflow-hidden"', true).compile(true) || "";
const forwardedEvents = forwardEventsBuilder(get_current_component());
onMount(() => {
  mounted = true;
});
</script>

{#if _placeholder}
	<span class={avatarPlaceholderClasses} class:invisible={!mounted}>
		<Icon icon={_placeholder} class="h-full w-full" />
		{#if notification}
			<span class={avatarNotificationClasses} />
		{/if}
	</span>
{:else if notification}
	<span class="relative inline-block" class:invisible={!mounted}>
		<img use:forwardedEvents src="" alt="Avatar" {...$$restProps} class={avatarClasses} />
		<span class={avatarNotificationClasses} />
	</span>
{:else}
	<img use:forwardedEvents src="" alt="Avatar" {...$$restProps} class={avatarClasses} />
{/if}
