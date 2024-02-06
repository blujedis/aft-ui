<script lang="ts">
	import { type SwitchProps, switchDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder, boolToMapValue } from '$lib/utils';
	import type { ElementProps } from '$lib/types';
	import classNames from 'classnames';

	type $$Props = SwitchProps & Omit<ElementProps<'input'>, 'size'>;

	export let {
		checked,
		classBackdrop,
		classFill,
		classHandle,
		disabled,
		focused,
		position,
		shadowed,
		size,
		srtext,
		theme,
		variant,
		unstyled
	} = {
		...defaults
	} as Required<$$Props>;

	let ref: HTMLInputElement;

	const th = themer($themeStore);

	$: labelClasses = th
		.create('SwitchLabel')
		.option('switchButtonSizes', size, size)
		.append('pointer-events-none', disabled)
		.option('focusedRing', theme, focused)
		.append(
			'group relative inline-flex flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:ring-2 focus:outline-none',
			true
		)
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
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('common', 'disabled', disabled)
		.append(
			'pointer-events-none absolute mx-auto rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2',
			true
		)
		.append(classFill, true)
		.compile(true);

	// enabled: translate-x-5 / 0 - border-gray-200 bg-white - h-5 w-5
	$: handleClasses = th
		.create('SwitchHandle')
		.variant('switchHandle', variant, theme, true)
		.option('switchHandleSizes', size, size)
		.option('common', 'disabled', disabled)
		.append(
			'pointer-events-none absolute left-0 inline-block transform rounded-full border shadow ring-0 transition-transform duration-200 ease-in-out',
			true
		)
		.append(classHandle, true)
		.compile(true);

	$: inputClasses = th
		.create('SwitchInput')
		.append('sr-only', true)
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<label class={classNames('flickerless not-sr-only', $$restProps.class)}>
	<div class={labelClasses} aria-checked={checked} aria-disabled={disabled}>
		<span class="sr-only">{srtext}</span>
		<span aria-hidden="true" class={backdropClasses} />
		<span aria-hidden="true" class={fillClasses} aria-disabled={disabled} />
		<span aria-hidden="true" class={handleClasses} aria-disabled={disabled} />
		<input
			{...$$restProps}
			bind:this={ref}
			type="checkbox"
			use:forwardedEvents
			bind:checked
			class={inputClasses}
			{disabled}
		/>
	</div>
</label>

<style>
	.flickerless {
		perspective: 1000;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-transform: translateZ(0.1px);
		transform: translateZ(0.1px); /* needs an actual value */
	}
</style>
