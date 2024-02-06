<script lang="ts">
	import { type ModalProps, modalDefaults as defaults } from './module';
	import { themeStore, themer } from '$lib/theme';
	import { transitioner } from '$lib/components/Disclosure';
	import { useDisclosure } from '$lib/stores';
	import { fade } from 'svelte/transition';
	import Placeholder from './Placeholder.svelte';
	import { useFocusTrap } from '$lib/hooks';
	import { boolToMapValue } from '$lib/utils';

	type $$Props = ModalProps;

	export let {
		abortable,
		backdrop,
		content,
		escapable,
		focustrap,
		labelby,
		position,
		contentProps,
		rounded,
		shadowed,
		theme,
		transition,
		visible,
		unmount,
		unstyled
	} = {
		...defaults
	} as Required<$$Props>;

	export const store = useDisclosure({ visible });
	const [bindFocusTrap, handleFocusTrap] = useFocusTrap(focustrap);

	const th = themer($themeStore);

	let panel = null as HTMLDivElement | null;

	$: modalStyles = $store.visible
		? $$restProps.style || '' + ' display:block'
		: ((!unmount && 'display: none') as string);

	$: wrapperClasses = th
		.create('ModalWrapper')
		.append('fixed inset-0 z-10 overflow-y-auto', true)
		.append($$restProps.class, true)
		.compile(true);

	$: containerClasses = th
		.create('ModalContainer')
		.append('flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0', true)
		.append('sm:items-start', ['top', 'top-center'].includes(position))
		.append('sm:items-end', ['bottom', 'bottom-center'].includes(position))
		.append('sm:items-start sm:justify-end', position === 'top-right')
		.append('sm:items-end sm:justify-end', position === 'bottom-right')
		.append('sm:items-start sm:justify-start', position === 'top-left')
		.append('sm:items-end sm:justify-start', position === 'bottom-left')
		.compile(true);

	$: contentClasses = th
		.create('ModalContent')
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.append(
			'bg-white relative transform overflow-hidden px-4 pb-4 pt-5 text-left transition-all sm:my-8 sm:mx-8 sm:w-full sm:max-w-sm sm:p-6',
			true
		)
		.compile(true);

	// $: $store.visible && unmount === false && restart()

	function handleClose() {
		store.close();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!e.repeat && e.key === 'Escape' && escapable && abortable) {
			e.stopPropagation();
			handleClose();
		}
	}

	function handleClick(e: any) {
		if (!panel?.contains(e.target) && abortable) handleClose();
	}
</script>

<svelte:window on:keydown={handleKeydown} on:keydown={handleFocusTrap} />

{#if (unmount && $store.visible) || !unmount}
	<div
		role="button"
		tabindex="-1"
		class="relative z-10"
		style={modalStyles}
		on:click={handleClick}
		on:keydown={handleKeydown}
	>
		{#if backdrop && $store.visible}
			<slot name="backdrop">
				<div
					class="fixed inset-0 bg-slate-600 bg-opacity-50 transition-opacity"
					transition:fade={{ duration: 100 }}
				/>
			</slot>
		{/if}
		<div role="dialog" aria-modal="true" class={wrapperClasses}>
			<div class={containerClasses}>
				<div
					bind:this={panel}
					transition:transitioner={transition}
					use:bindFocusTrap
					class={contentClasses}
				>
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
{/if}
