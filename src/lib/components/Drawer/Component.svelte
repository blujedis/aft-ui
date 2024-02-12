<script lang="ts">
	import {
		type DrawerProps,
		drawerDefaults as defaults,
		drawerSizeMap,
		drawerPositionMap,
		drawerSpeedMap,
		drawerOffsetMap
	} from './module';
	import { themer, themeStore } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import { fade, fly } from 'svelte/transition';
	import { useDisclosure } from '$lib/stores';
	import { boolToMapValue } from '$lib/utils';
	import Placeholder from './Placeholder.svelte';

	type $$Props = DrawerProps & ElementProps<'div'>;

	export let {
		backdrop,
		content,
		escapable,
		contentProps,
		position,
		shadowed,
		size,
		speed,
		theme
	} = {
		...defaults
	} as Required<$$Props>;

	export const store = useDisclosure({ visible: false });

	let panel: HTMLDivElement;

	const th = themer($themeStore);

	$: drawerSizeClasses = th
		.create('DrawerSize')
		.append(drawerSizeMap[size], size)
		.append('pointer-events-auto w-screen', true)

		.compile();

	$: drawerPositionClasses = th
		.create('DrawerPosition')
		.append(drawerPositionMap[position], position)
		.append('pointer-events-none fixed inset-y-0 flex max-w-full', true)
		.compile();

	$: drawerClasses = th
		.create('DrawerWrapper')
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.append('flex h-full flex-col overflow-y-scroll z-20 bg-white', true)
		.append($$restProps.class, true)
		.compile();

	function handleClose() {
		store.close();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!e.repeat && e.key === 'Escape' && escapable) {
			e.stopPropagation();
			handleClose();
		}
	}

	function handleClick(e: any) {
		if (!panel?.contains(e.target)) handleClose();
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $store.visible}
	<div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
		{#if backdrop}
			<div
				role="button"
				tabindex="-1"
				bind:this={panel}
				class="fixed inset-0 bg-slate-600 bg-opacity-50 transition-opacity"
				transition:fade={{ duration: 100 }}
				on:click={handleClick}
				on:keydown={handleKeydown}
			/>
		{/if}

		<div class="fixed inset-0 overflow-hidden">
			<div class="absolute inset-0 overflow-hidden">
				<div class={drawerPositionClasses}>
					<div
						in:fly={{
							x: drawerOffsetMap[size][position],
							duration: drawerSpeedMap[speed]
						}}
						out:fly={{
							x: drawerOffsetMap[size][position],
							duration: drawerSpeedMap[speed] * 1.5,
							opacity: 0.75
						}}
						class={drawerSizeClasses}
					>
						<div class={drawerClasses}>
							<div class="relative flex-1">
								<slot
									visible={$store.visible}
									close={store.close}
									open={store.open}
									toggle={store.toggle}
								>
									{#if content}
										<svelte:component this={content} {...contentProps} />
									{:else}
										<Placeholder close={handleClose} />
									{/if}
								</slot>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
