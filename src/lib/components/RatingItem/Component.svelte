<script lang="ts">
	import { themeStore, getColor, styler, themer } from '$lib';
	import { getContext } from 'svelte';
	import { type RatingItemProps, ratingDefaults as defaults } from './module';
	import type { RatingContext } from '../Rating';
	import { uniqid } from '$lib/utils';
	import type { ElementProps } from '../../types';

	type $$Props = RatingItemProps & ElementProps<'svg'>;

	const context = getContext('Rating') as RatingContext;

	export let { background, fill, index, size, stroked } = {
		...defaults,
		...context?.globals
	} as Required<RatingItemProps>;

	// let ref: SVGElement | undefined;
	const id = uniqid();
	const initFill = getColor(fill, '#FFA41C'); // accepts color or theme color ex: danger-600
	const strokeColor = stroked ? initFill : undefined;

	$: percentage =
		index > $context.score ? 0 : index < Math.trunc($context.score) ? 1 : $context.score % 1;
	$: isActive = $context.active > -1;

	$: fillColor = isActive
		? index <= $context.active
			? initFill
			: 'currentColor'
		: percentage === 1
			? initFill
			: percentage === 0
				? 'currentColor'
				: `url(#${id})`; // SVG Pattern references Linear Gradient by ID

	const th = themer($themeStore);
	const st = styler($themeStore);

	$: ratingStyles = st
		.create('RatingStyles')
		.add('color', 'transparent', true)
		.add('outline-color', initFill, true)
		.append($$restProps.style, true)
		.compile();

	$: ratingClasses = th
		.create('Rating')
		.option('ratingSizes', size, size)
		.append('pointer-events-none', $context.readonly)
		.append('z-10 focus-visible:outline outline-2', true)
		.append('hover:scale-125', true)
		.append($$restProps.class, true)
		.compile(true);

	$: stops = [
		{ offset: `0%`, 'stop-color': initFill, 'stop-opacity': '1' },
		{ offset: `${percentage * 100}%`, 'stop-color': initFill, 'stop-opacity': '1' },
		{ offset: `${percentage * 100}%`, 'stop-color': 'currentColor', 'stop-opacity': '1' }
	];
</script>

<slot
	{stops}
	uid={id}
	classes={ratingClasses}
	styles={ratingStyles}
	fill={fillColor}
	stroke={strokeColor}
>
	<button
		{...$$restProps}
		class={ratingClasses}
		style={ratingStyles}
		on:mouseover
		on:mouseleave
		on:click
		on:focus
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img">
			<defs>
				<linearGradient {id}>
					{#each stops as stop}
						<stop {...stop} />
					{/each}
				</linearGradient>
			</defs>

			<path
				stroke={strokeColor}
				fill={fillColor}
				fill-rule="evenodd"
				d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
				clip-rule="evenodd"
			>
				<desc>Rating image {index}</desc>
			</path>
		</svg>
	</button>
</slot>
