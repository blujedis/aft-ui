<script lang="ts">
	import {
		type AvatarProps,
		avatarDefaults as defaults,
		type AvatarNotificationPosition
	} from './module';
	import { themer, themeStore } from '../../theme';
	import { get_current_component } from 'svelte/internal';
	import { getContext } from 'svelte';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementProps } from '../../types';
	import { Icon } from '../Icon';
	import type { AvatarStackContext } from '../AvatarStack';
	import type { IconifyIcon } from '@iconify/svelte';

	type $$Props = AvatarProps & Omit<ElementProps<'img'>, 'placeholder'>;

	const context = getContext<AvatarStackContext>('AvatarStack');

	export let {
		animate,
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
	} as Required<AvatarProps>;

	let _placeholder = placeholder as string | IconifyIcon;
	if (placeholder === true) _placeholder = 'mdi:account';

	let _notification = notification as boolean | AvatarNotificationPosition;
	if (notification === true) _notification = 'top-right' as AvatarNotificationPosition;

	const th = themer($themeStore);

	$: avatarClasses = th
		.create('Avatar')
		.option('avatarSizes', size, size)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.append('ring-2 ring-[color:var(--bg-light)] dark:ring-[color:var(--bg-dark)]', stacked)
		.append('relative', stacked === 'down')
		.append($$restProps.class, true)
		.compile(true);

	$: avatarNotificationClasses =
		(notification &&
			th
				.create('AvatarNotification')
				.variant('globals', variant, theme, true)
				.option('avatarNotificationSizes', size, size)
				.option('animate', animate, animate)
				.remove('ring-inset', variant === 'outlined')
				.append(
					'absolute -right-1 -top-1 block rounded-full ring-2 ring-[color:var(--bg-light)] dark:ring-[color:var(--bg-dark)]',
					true
				)
				.compile(true)) ||
		'';

	$: avatarPlaceholderClasses =
		(_placeholder &&
			th
				.create('AvatarPlaceholder')
				.variant('globals', variant, theme, true)
				.option('roundeds', rounded, rounded)
				.option('shadows', shadowed, shadowed)
				.option('avatarSizes', size, size)
				.option('common', 'ringed', typeof variant === 'undefined')
				.append('relative inline-flex overflow-hidden"', true)
				.compile(true)) ||
		'';

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

{#if _placeholder}
	<span class={avatarPlaceholderClasses}>
		<Icon icon={_placeholder} class="h-full w-full" />
		{#if notification}
			<span class={avatarNotificationClasses} />
		{/if}
	</span>
{:else if notification}
	<span class="relative inline-flex max-w-fit">
		<img use:forwardedEvents src="" alt="Avatar" {...$$restProps} class={avatarClasses} />
		<span class={avatarNotificationClasses} />
	</span>
{:else}
	<img use:forwardedEvents src="" alt="Avatar" {...$$restProps} class={avatarClasses} />
{/if}
