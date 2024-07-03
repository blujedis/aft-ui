<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { infiniteScrollDefaults as defaults, type InfiniteScrollProps } from './module';

	type $$Props = InfiniteScrollProps;

	export let { threshold, horizontal, element, hasMore, reverse, window } = {
		...defaults
	} as Required<$$Props>;

	const dispatch = createEventDispatcher<{ load: undefined }>();

	let isLoading: boolean = false;
	let component: HTMLElement;
	let beforeScrollHeight: number;
	let beforeScrollTop: number;
	let el: HTMLElement | null;

	$: if (el) {
		if (reverse) {
			el.scrollTop = el.scrollHeight;
		}
		el.addEventListener('scroll', handleScroll);
		el.addEventListener('resize', handleScroll);
	}

	$: if (el && isLoading && reverse) {
		el.scrollTop = el.scrollHeight - beforeScrollHeight + beforeScrollTop;
	}

	const handleScroll = (e: Event) => {
		if (!hasMore) return;

		const target = e.target as HTMLElement;
		const offset = getOffset(target, reverse!, horizontal!);

		if (offset <= threshold!) {
			if (!isLoading && hasMore) {
				dispatch('load');
				beforeScrollHeight = target.scrollHeight;
				beforeScrollTop = target.scrollTop;
			}
			isLoading = true;
		} else {
			isLoading = false;
		}
	};

	const getOffset = (target: any, reverse: boolean, horizontal: boolean) => {
		const element: HTMLElement = target.documentElement ? target.documentElement : target;

		if (reverse) {
			return horizontal ? element.scrollLeft : element.scrollTop;
		}
		return horizontal
			? element.scrollWidth - element.clientWidth - element.scrollLeft
			: element.scrollHeight - element.clientHeight - element.scrollTop;
	};

	onMount(() => {
		if (element) el = element;
		else if (document) el = document.body;
		else el = component.parentNode as HTMLElement;

		// if (window) el = document as unknown as HTMLElement;
		// else if (element) el = element;
		// else el = component.parentNode as unknown as HTMLElement;
	});

	onDestroy(() => {
		if (el) {
			el.removeEventListener('scroll', handleScroll);
			el.removeEventListener('resize', handleScroll);
		}
	});
</script>

{#if !window && !element}
	<div bind:this={component} id="infinite-scroll" style="width: 0;" />
{/if}
