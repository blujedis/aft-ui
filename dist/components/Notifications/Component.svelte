<script>import { notificationsDefaults as defaults } from "./module";
import { notificationsPosition } from "./config";
import { themeStore, themer } from "../..";
import notifications from "../../stores/notification";
import { fly } from "svelte/transition";
import { flip } from "svelte/animate";
export let { Component, duration, group, position, variant } = {
  ...defaults
};
const th = themer($themeStore);
$:
  notificationContainerClasses = th.create("NotificationContainer").append("sm:items-start items-start", position.startsWith("top")).append("sm:items-end items-end", position.startsWith("bottom")).append("pointer-events-none fixed inset-0 flex p-6 sm:p-4 z-20", true).append($$restProps.class, true).compile(true);
$:
  notificationListClasses = th.create("NotificationContainerList").append("flex w-full flex-col space-y-4 items-center sm:items-end", true).append("sm:items-start", position === "top-left" || position === "bottom-left").append("sm:items-center", position === "top-center" || position === "bottom-center").compile(true);
$:
  filtered = $notifications.filter((item) => item.group === group);
notifications.setOptions({ position, group }, true);
</script>

<div aria-live="assertive" class={notificationContainerClasses}>
	<div class={notificationListClasses}>
		{#each filtered as n (n.key)}
			<div
				animate:flip
				in:fly={{ x: notificationsPosition[position].x, duration: 350 }}
				out:fly={{ x: notificationsPosition[position].x, duration: 350 }}
			>
				{#if Component}
					<svelte:component this={Component} {...n} />
				{:else}
					<slot {...n} />
				{/if}
			</div>
		{/each}
	</div>
</div>
