<script lang="ts">
	import { themer, themeStore } from '$lib/theme';
	import { Icon } from '$lib/components/Icon';
	import { loaderDefaults as defaults, type LoaderProps } from './module';

	type $$Props = LoaderProps;
	export let { position, icon, visible, size } = { ...defaults } as Required<$$Props>;

	const th = themer($themeStore);

	$: loaderWrapperClasses = th
		.create('LoaderWrapper')
		.prepend('loader-wrapper', true)
		.append('flex items-center space-x-2', true)
		.append('flex-row-reverse space-x-reverse', position === 'right')
		.compile();

	$: loaderClasses = th
		.create('Loader')
		.option('iconSizes', size, true)
		.prepend('loader', true)
		.append('animate-spin text-inherit', true)
		.compile();
</script>

{#if $$slots.default}
	<span class={loaderWrapperClasses}>
		{#if visible}
			<Icon {...$$restProps} {icon} class={loaderClasses} />
		{/if}
		<span><slot /></span>
	</span>
{:else if visible}
	<Icon {...$$restProps} {icon} class={loaderClasses} />
{/if}
