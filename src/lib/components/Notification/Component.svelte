<script lang="ts">
	import { type NotificationProps, notificationDefaults as defaults } from './module';
	import useNotifications from '$lib/stores/notification';
	import { themeStore, themer } from '$lib';
	import type { ElementNativeProps } from '../../types';
	import { Icon } from '../Icon';

	type $$Props = NotificationProps & ElementNativeProps<'div'>;

	export let {
		key,
		description,
		dismissible,
		duration,
		group,
		icon,
		rounded,
		shadowed,
		title,
		theme,
		variant
	} = {
		...defaults
	} as Required<$$Props>;

	const th = themer($themeStore);

	$: notificationClasses = th
		.create('Notification')
		.variant('notification', variant, theme, true)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.append('pointer-events-auto w-full max-w-sm overflow-hidden border-l-4 w-80', true)
		.append($$restProps.class, true)
		.compile(true);

	$: notificationIconClasses = th
		.create('NotificationIcon')
		.variant('notificationIcon', variant, theme, true)
		.append('pr-2 pt-1', true)
		.compile(true);

	$: notificationTitleClasses = th
		.create('NotificaionTitle')
		.variant('notificationTitle', variant, theme, true)
		.append('font-semibold', true)
		.compile(true);
</script>

<div
	role="alert"
	class={notificationClasses}
	on:mouseenter={() => useNotifications.lock(group)}
	on:mouseleave={() => useNotifications.unlock(group)}
>
	<div class="flex p-4">
		{#if icon}
			<div class={notificationIconClasses}>
				<Icon {icon} />
			</div>
		{/if}

		<div class="flex flex-col flex-1">
			{#if title}
				<div class={notificationTitleClasses}>{title}</div>
			{/if}
			{#if description}
				<div class="text-sm">{description}</div>
			{/if}
		</div>

		{#if dismissible}
			<div>
				<button
					type="button"
					class="inline-flex rounded-sm text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-0"
					on:click={() => useNotifications.remove(key)}
				>
					<span class="sr-only">Remove</span>
					<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path
							d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
						/>
					</svg>
				</button>
			</div>
		{/if}
	</div>
</div>
