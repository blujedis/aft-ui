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
		hovered,
		position,
		shadowed,
		size,
		srtext,
		theme,
		transitioned
	} = {
		...defaults
	} as Required<$$Props>;

	let ref: HTMLInputElement;

	const th = themer($themeStore);

	// focus:ring-2 focus:outline-none
	$: labelClasses = th
		.create('SwitchLabel')
		.option('switchButtonSizes', size, size)
		.append('pointer-events-none', disabled)
		.option('hovered', 'filled', theme, hovered)
		.option('common', 'transitioned', transitioned)
		.append(
			'group relative inline-flex flex-shrink-0 cursor-pointer items-center justify-center rounded-full',
			true
		)
		.compile();

	$: backdropClasses = th
		.create('SwitchBackdrop')
		.append('pointer-events-none absolute h-full w-full rounded-md', true)
		.append(classBackdrop, true)
		.compile();

	// enabled: bg-indigo-600 / bg-gray-200 - h-4 w-9
	// focus:outline-none focus:ring-2 focus:ring-offset-2
	$: fillClasses = th
		.create('SwitchFill')
		.bundle(['switchBgAriaChecked'], theme, true)
		.option('switchFillSizes', size, size)
		.option('common', 'focusedOutline', focused)
		.option('outlineGroupFocus', theme, focused)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('common', 'disabled', disabled)
		.option('common', 'ringed', true)
		.append(
			'pointer-events-none absolute mx-auto rounded-full transition-colors duration-200 ease-in-out ring-0',
			true
		)
		.append(classFill, true)
		.compile();

	// enabled: translate-x-5 / 0 - border-gray-200 bg-white - h-5 w-5
	$: handleClasses = th
		.create('SwitchHandle')
		.option('switchHandleSizes', size, size)
		.option('common', 'disabled', disabled)
		.append('bg-white border-frame-400 dark:border-frame-600', true)
		.append(
			'pointer-events-none absolute left-0 inline-block transform rounded-full border shadow ring-0 transition-transform duration-200 ease-in-out',
			true
		)
		.append(classHandle, true)
		.compile();

	$: inputClasses = th
		.create('SwitchInput')
		.append('sr-only', true)
		.append($$restProps.class, true)
		.compile();

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<label for={$$restProps.id} class={classNames('flickerless not-sr-only', $$restProps.class)}>
	<span
		role="switch"
		tabindex="-1"
		class={labelClasses}
		aria-checked={checked}
		aria-disabled={disabled}
	>
		<span class="sr-only">{srtext}</span>
		<span aria-hidden="true" class={backdropClasses} />
		<span aria-hidden="true" class={fillClasses} aria-checked={checked} />
		<span aria-hidden="true" class={handleClasses} />
		<input
			{...$$restProps}
			bind:this={ref}
			type="checkbox"
			use:forwardedEvents
			bind:checked
			class={inputClasses}
			{disabled}
		/>
	</span>
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
