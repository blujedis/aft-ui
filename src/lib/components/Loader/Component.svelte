<script lang="ts">
	import { themer, themeStore } from '$lib/theme';
	import { Icon } from '$lib/components/Icon';
	import { loaderDefaults as defaults, type LoaderProps } from './module';

	type $$Props = LoaderProps;
	export let { icon, visible, size } = { ...defaults } as Required<$$Props>;

	const th = themer($themeStore);

	$: loaderClasses = th
		.create('Loader')
		.option('iconSizes', size, true)
		.append('animate-spin text-inherit', true)
		.compile();
</script>

{#if visible}
	<Icon {...$$restProps} {icon} class={loaderClasses} />
{/if}
