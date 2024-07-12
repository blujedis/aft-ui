<script>import {
  notificationsDefaults as defaults,
  notificationsPosition
} from "./module";
import { themer, themeStore } from "../../theme";
import notifications from "../../stores/notification";
import { fly, scale } from "svelte/transition";
import { flip } from "svelte/animate";
export let { Component, duration, group, position, transition } = {
  ...defaults
};
const th = themer($themeStore);
$: notificationContainerClasses = th.create("NotificationContainer").prepend(`notifications-container`, true).append("sm:items-start items-start", position.startsWith("top")).append("sm:items-end items-end", position.startsWith("bottom")).append("pointer-events-none fixed inset-0 flex p-6 sm:p-4 z-50", true).append($$restProps.class, true).compile();
$: notificationListClasses = th.create("NotificationContainerList").prepend(`notifications`, true).append("flex w-full flex-col space-y-2 items-center sm:items-end", true).append("sm:items-start", position === "top-left" || position === "bottom-left").append("sm:items-center", position === "top-center" || position === "bottom-center").compile();
$: filtered = $notifications.filter((item) => item.group === group);
$: delay = $notifications.length <= 1 ? 0 : 150;
notifications.setOptions({ position, group, duration }, true);
</script>

<div aria-live="assertive" class={notificationContainerClasses}>
	<div class={notificationListClasses}>
		{#if transition === 'reveal'}
			{#each filtered as n (n.key)}
				<div
					animate:flip
					in:fly={{ x: notificationsPosition[position].x, duration: 400 }}
					out:fly={{ x: notificationsPosition[position].x, duration: 400 }}
				>
					{#if Component}
						<svelte:component this={Component} {...n} />
					{:else}
						<slot {...n} />
					{/if}
				</div>
			{/each}
		{:else if transition === 'zoom'}
			{#each filtered as n (n.key)}
				<div
					animate:flip
					in:scale={{ delay, start: 0.7, opacity: 0.1, duration: 200 }}
					out:scale={{ start: 0.5, opacity: 0.5, duration: 100 }}
				>
					{#if Component}
						<svelte:component this={Component} {...n} />
					{:else}
						<slot {...n} />
					{/if}
				</div>
			{/each}
		{:else}
			{#each filtered as n (n.key)}
				<div>
					{#if Component}
						<svelte:component this={Component} {...n} />
					{:else}
						<slot {...n} />
					{/if}
				</div>
			{/each}
		{/if}
	</div>
</div>
