<script lang="ts">
	/**
	 * This is just a wrapper class because Iconify IconProps is missing
	 * the property class. You can see the documentation at
	 * @see https://docs.iconify.design/icon-components/svelte/dimensions.html#:~:text=%22cil%3Atruck%22-,class,-%3D%22big%2Dicon
	 */

	import { type IconProps, iconDefaults as defaults } from './module';
	import IconBase from '@iconify/svelte';
	import { themeStore, themer } from '$lib';
	type $$Props = IconProps;
	export let { icon, size, unstyled } = { ...defaults } as Required<$$Props>;

	const Icon = IconBase as any; // need to override iconify types.
	const th = themer($themeStore);

	$: iconClasses = unstyled
		? $$restProps.class
		: th
				.create('Icon')
				.option('iconSizes', size, size)
				.append($$restProps.class, true)
				.compile(true);
</script>

<Icon {...$$restProps} {icon} class={iconClasses} aria-hidden={true} />
