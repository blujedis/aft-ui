<script lang="ts">
	import { type FieldProps, fieldDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import { boolToMapValue, cleanObj } from '$lib/utils';

	type $$Props = FieldProps & Omit<ElementProps<'div'>, 'size'>;

	export let { full, ringed, rounded, shadowed, size, theme, transitioned, variant } = {
		...cleanObj($themeStore.defaults?.component),
		...defaults
	} as Required<FieldProps>;

	const th = themer($themeStore);

	$: fieldClasses = th
		.create('FieldMessage')
		.bundle(['mainBg', 'unfilledText'], theme, variant === 'text')
		.bundle(['softBg', 'softText'], {}, theme, variant === 'soft')
		.option('common', 'transitioned', transitioned)
		.option('fieldFontSizes', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.prepend(`field-message field-message-${variant}`, true)
		.append('w-full', full)
		.append($$restProps.class, true)
		.compile();
</script>

<span {...$$restProps} class={fieldClasses}>
	<slot />
</span>
