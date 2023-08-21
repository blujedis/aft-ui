<script lang="ts">
	import { type AvatarStackProps, avatarStackDefaults as defaults } from './module';
	import { themer, themeStore } from '../../theme';
	import { onMount, setContext } from 'svelte';
	import type { ElementProps } from '../../types';

	type $$Props = AvatarStackProps & Omit<ElementProps<'span'>, 'size'>;

	export let { direction } = {
		...defaults
	} as Required<AvatarStackProps>;

	export const context = setContext('AvatarStack', {
		globals: {
			...$$restProps,
			stacked: 'up'
		}
	});

	let stack: HTMLDivElement;

	$: avatarStackClasses = themer($themeStore)
		.create('AvatarStack')
		.append('flex -space-x-2 overflow-hidden', true)
		.append('isolate ', direction === 'down')
		.append($$restProps.class, true)
		.compile(true);

	// Prevents user from having to decorate each
	// Avatar with a z-index, should we do this?
	onMount(() => {
		if (direction !== 'down') return;
		const nodes = [...(stack.children as any)];
		nodes.reverse().forEach((n, i) => {
			const node = n as HTMLElement;
			node.style.zIndex = i + '';
		});
	});
</script>

<div bind:this={stack} {...$$restProps} class={avatarStackClasses}>
	<slot />
</div>
