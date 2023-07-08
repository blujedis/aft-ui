<script lang="ts">
	import { type SwitchProps, switchDefaults as defaults } from './module';
	import themeStore, { themer } from '$lib';
	import { get_current_component, onMount } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementNativeProps } from '../types';

	type $$Props = SwitchProps & Omit<ElementNativeProps<'input'>, 'size'>;

	export let {
		classBackdrop,
		classFill,
		classHandle,
		disabled,
		focused,
		shadowed,
		size,
		srtext,
		theme,
		variant,
		unstyled
	} = {
		...defaults
	} as Required<$$Props>;

	let checked = false;

	const th = themer($themeStore);

	$: buttonClasses = th
		.create('SwitchButton')
		.option('switchButtonSizes', size, size)
		.option(focused === 'default' ? 'focusedSizes' : 'focusedVisibleSizes', size, focused)
		.option(focused === 'default' ? 'focused' : 'focusedVisible', theme, focused)
		.append('focus:ring-offset-2', focused)
		.append('pointer-events-none', disabled)
		.append(
			'group relative inline-flex flex-shrink-0 cursor-pointer items-center justify-center rounded-full',
			true
		)
		.append($$restProps.class, true)
		.compile(true);

	$: backdropClasses = th
		.create('SwitchBackdrop')
		.variant('switchBackdrop', variant, theme, true)
		.append('pointer-events-none absolute h-full w-full rounded-md', true)
		.append(classBackdrop, true)
		.compile(true);

	// enabled: bg-indigo-600 / bg-gray-200 - h-4 w-9
	$: fillClasses = th
		.create('SwitchFill')
		.variant('switchFill', variant, theme, true)
		.option('switchFillSizes', size, size)
		.option('shadows', shadowed, shadowed)
		.option('disableds', theme, disabled)
		.append(
			'pointer-events-none absolute mx-auto rounded-full transition-colors duration-200 ease-in-out',
			true
		)
		.append(classFill, true)
		.compile(true);

	// enabled: translate-x-5 / 0 - border-gray-200 bg-white - h-5 w-5
	$: handleClasses = th
		.create('SwitchHandle')
		.variant('switchHandle', variant, theme, true)
		.option('switchHandleSizes', size, size)
		.option('disableds', theme, disabled)
		.append(
			'pointer-events-none absolute left-0 inline-block transform rounded-full border shadow ring-0 transition-transform duration-200 ease-in-out',
			true
		)
		.append(classHandle, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<span class="flickerless">
	<button
		type="button"
		class={buttonClasses}
		role="switch"
		aria-checked={checked}
		{disabled}
		aria-disabled={disabled}
		on:click={() => (checked = !checked)}
	>
		<span class="sr-only">{srtext}</span>

		<!-- bg-white otherwise there is a bleed, should be background of page.-->
		<span aria-hidden="true" class={backdropClasses} />

		<!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200"  h-4 w-9  -->
		<span aria-hidden="true" class={fillClasses} aria-disabled={disabled} />

		<!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0"  border-gray-200 bg-white  h-5 w-5  -->
		<span aria-hidden="true" class={handleClasses} aria-disabled={disabled} />

		<input use:forwardedEvents class="hidden" type="checkbox" bind:checked />
	</button>
</span>

<style>
	.flickerless {
		perspective: 1000;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-transform: translateZ(0.1px);
		transform: translateZ(0.1px); /* needs an actual value */
	}
</style>
