<script lang="ts">
	import { type BadgeProps, badgeDefaults as defaults } from './module';
	import { themer, themeStore } from '../../theme';
	import type { ElementProps } from '../../types';

	type $$Props = BadgeProps & Omit<ElementProps<'span'>, 'size'>;

	export let { removable, full, rounded, shadowed, size, theme, transitioned, variant, unstyled } =
		{
			...defaults
		} as Required<BadgeProps>;

	const th = themer($themeStore);

	$: badgeClasses = unstyled
		? th.create('Badge').append($$restProps.class, true).compile()
		: th
				.create('Badge')
				.variant('globals', variant, theme, variant)
				.option('common', 'transition', transitioned)
				.option('focusedRingVisible', theme, removable)
				.remove('focus:', true)
				.option('badgePadding', size, size && !removable)
				.option('badgeFontSizes', size, size)
				.option('roundeds', rounded, rounded)
				.option('shadows', shadowed, shadowed)
				.append('w-full', full)
				.append('z-20 badge font-medium', true)
				.append('badge-removable', removable)
				.append('relative inline-flex items-center', !removable)
				.append($$restProps.class, true)
				.compile(true);
</script>

<span {...$$restProps} class={badgeClasses}>
	<slot />
</span>
