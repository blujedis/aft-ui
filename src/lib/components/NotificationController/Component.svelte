<script lang="ts">
	/**
	 * https://github.com/mzohaibqc/svelte-toasts/blob/main/src/ToastContainer.svelte
	 */
	import {
		type NotificationControllerProps,
		notificationControllerDefaults as defaults
	} from './module';
	import { notificationPosition } from './config';
	import themeStore, { themer } from '$lib';
	import notifications from '$lib/stores/notification';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import type { ElementNativeProps } from '../types';

	type $$Props = NotificationControllerProps & ElementNativeProps<'div'>;

	export let { Component, duration, group, position, variant } = {
		...defaults
	} as Required<NotificationControllerProps>;

	const th = themer($themeStore);

	$: notificationContainerClasses = th
		.create('NotificationContainer')
		.variant('notificationController', variant, true)
		.append('sm:items-start items-start', position.startsWith('top'))
		.append('sm:items-end items-end', position.startsWith('bottom'))
		.append('pointer-events-none fixed inset-0 flex p-6 sm:p-4 z-20', true)
		.append($$restProps.class, true)
		.compile(true);

	$: notificationListClasses = th
		.create('NotificationContainerList')
		.append('flex w-full flex-col space-y-4 items-center sm:items-end', true)
		.append('sm:items-start', position === 'top-left' || position === 'bottom-left')
		.append('sm:items-center', position === 'top-center' || position === 'bottom-center')
		.compile(true);

	$: filtered = $notifications.filter((item) => item.group === group);

	notifications.setOptions({ position, group }, true);
</script>

<div aria-live="assertive" class={notificationContainerClasses}>
	<div class={notificationListClasses}>
		{#each filtered as n (n.key)}
			<div
				animate:flip
				in:fly={{ x: notificationPosition[position].x, duration: 350 }}
				out:fly={{ x: notificationPosition[position].x, duration: 350 }}
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
