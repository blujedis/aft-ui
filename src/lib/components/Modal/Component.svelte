<script lang="ts">
	import {
		type ModalProps,
		modalDefaults as defaults,
		type ModalTransition,
		transitions,
		type TransitionParams
	} from './module';
	import themeStore, { themer } from '$lib';
	import { useDisclosure } from '$lib/stores';
	import { fly, fade, scale } from 'svelte/transition';
	import Placeholder from './Placeholder.svelte';
	import { useFocusTrap } from '$lib/hooks';

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
		variant,
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
		.variant('modal', variant, theme, true)
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
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
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

	function transitioner(node: HTMLElement, { type }: { type: ModalTransition }) {
		if (typeof type === 'function') return type(node);

		const options = transitions[type] as TransitionParams;

		if (type === 'none') {
			return { duration: 0 };
		}

		if (type === 'announce') {
			if (position === 'top') {
				options.duration = 200;
				options.y = -200;
			}
			return fly(node, options);
		}
		if (type === 'reveal') {
			if (position === 'bottom') {
				options.duration = 200;
				options.y = 200;
			}
			return fly(node, options);
		}
		if (type === 'zoom') {
			return scale(node, options);
		}
		return fade(node, options);
	}
</script>

<svelte:window on:keydown={handleKeydown} on:keydown={handleFocusTrap} />

{#if (unmount && $store.visible) || !unmount}
	<div
		role="dialog"
		aria-modal="true"
		class="relative z-10"
		style={modalStyles}
		aria-labelledby={labelby}
		on:click={handleClick}
		on:keydown={handleKeydown}
	>
		{#if backdrop && $store.visible}
			<div
				class="fixed inset-0 bg-slate-600 bg-opacity-50 transition-opacity"
				transition:fade={{ duration: 100 }}
			/>
		{/if}
		<div class={wrapperClasses}>
			<div class={containerClasses}>
				<div
					bind:this={panel}
					transition:transitioner={{ type: transition }}
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
