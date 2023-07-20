<script lang="ts">
	import { type BadgeProps, badgeDefaults as defaults } from './module';
	import themeStore, { themer } from '$lib';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementNativeProps } from '../../types';

	type $$Props = BadgeProps & Omit<ElementNativeProps<'span'>, 'size'>;

	export let { removable, full, rounded, shadowed, size, theme, transitioned, variant, unstyled } =
		{
			...defaults
		} as Required<BadgeProps>;

	const th = themer($themeStore);

	$: badgeClasses = unstyled
		? th
				.create('Badge')
				.option('common', 'transition', transitioned)
				.option('focused', theme, removable)
				.option('focusedRingSizes', 'two', removable)
				.remove('focus:', true)
				.option('badgePadding', size, size && !removable)
				.option('badgeFieldPadding', size, size && removable)
				.option('badgeFontSizes', size, size)
				.option('roundeds', rounded, rounded)
				.option('shadows', shadowed, shadowed)
				.append('w-full', full)
				.append('badge', true)
				.append('badge-removable', removable)
				.append('relative inline-flex items-center', !removable)
				.append($$restProps.class, true)
				.compile(true)
		: th
				.create('Badge')
				.variant('badge', variant, theme, true)
				.option('common', 'transition', transitioned)
				.option('focused', theme, removable)
				.option('focusedRingSizes', 'two', removable)
				.remove('focus:', true)
				.option('badgePadding', size, size && !removable)
				// .option('badgeFieldPadding', size, size && removable)
				.option('badgeFontSizes', size, size)
				.option('roundeds', rounded, rounded)
				.option('shadows', shadowed, shadowed)
				.append('w-full', full)
				.append('z-20 badge', true)
				.append('badge-removable', removable)
				.append('relative inline-flex items-center', !removable)
				.append($$restProps.class, true)
				.compile(true);

	// const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<!-- {#if removable}
	<span {...$$restProps} class={badgeClasses}>
		<slot />
		<slot name="icon">×</slot>
	</span>
	 <button use:forwardedEvents {...$$restProps} class={badgeClasses}>
		<div class="flex flex-row items-center justify-between pointer-events-none">
			<slot />
			<slot name="icon">×</slot>
		</div>
	</button> 
{:else} -->
<span {...$$restProps} class={badgeClasses}>
	<slot />
</span>
<!-- {/if} -->
