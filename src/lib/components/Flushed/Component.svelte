<script lang="ts">
	import { themeStore, themer, type ElementProps } from '$lib';
	import { type FlushedProps, flushedDefaults as defaults } from './module';

	type $$Props = FlushedProps & ElementProps<'div'>;

	export let { disabled, focused, group, peer, hover, theme } = {
		...defaults
	} as Required<$$Props>;

	const th = themer($themeStore);

	$: flushWrapperClasses = th
		.create('FlushedWrapper')
		.append('relative inline-flex group', true)
		.append($$restProps.class, true)
		.compile();

	$: flushedClasses = th
		.create('Flushed')
		.variant('globals', 'flushed', theme, true)
		.variant('globals', 'flushedHover', theme, hover)
		.option('focusedBorderPeer', theme, true)
		.append('absolute border inset-x-0 bottom-0 border-t border-x-0 border-b-0', true)
		.append('peer-focus:border-t-2', peer)
		.append('group-focus-within:border-t-2', group)
		.compile();
</script>

{#if disabled}
	<slot />
{:else}
	<div {...$$restProps} class={flushWrapperClasses}>
		<slot />
		<div class={flushedClasses} aria-hidden="true" />
	</div>
{/if}
