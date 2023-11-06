<script lang="ts">
	import { type CheckboxProps, checkboxDefaults as defaults } from './module';
	import { themer, themeStore } from '../../theme';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementProps } from '../../types';

	type $$Props = CheckboxProps & Omit<ElementProps<'input'>, 'size'>;

	export let {
		disabled,
		focused,
		full,
		rounded,
		shadowed,
		size,
		theme,
		transitioned,
		variant,
		unstyled
	} = {
		...defaults
	} as Required<$$Props>;

	$: checkboxClasses = themer($themeStore)
		.create('Checkbox')
		.variant('checkbox', variant, theme, variant)
		.option('focusedRing', typeof focused === 'string' ? focused : theme, focused)
		.option('common', 'transition', transitioned)
		.option('checkboxSizes', size, size)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.option('disableds', theme, disabled)
		.append('w-full', full)
		.append(
			'flex items-center justify-center form-checkbox focus:outline-none focus:ring-2 focus:ring-offset-2',
			true
		)
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<input {...$$restProps} type="checkbox" use:forwardedEvents class={checkboxClasses} />
