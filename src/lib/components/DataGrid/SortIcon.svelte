<script lang="ts">
	import type { ThemeColor, ThemeSize } from '$lib/types';
	import { Icon } from '../Icon';

	export let state = 0 as 0 | 1 | -1;
	export let theme = 'primary' as ThemeColor;
	export let stroke = false;
	export let size = 'md' as ThemeSize;

	$: activeTheme = [-1, 1, 'asc', 'desc'].includes(state) ? theme : 'frame';
</script>

{#if !state}
	<Icon icon="radix-icons:caret-sort" theme={activeTheme} {size} {stroke} hovered transitioned />
{:else if state === 1}
	<Icon icon="radix-icons:caret-up" theme={activeTheme} {size} {stroke} hovered transitioned />
{:else}
	<Icon icon="radix-icons:caret-down" theme={activeTheme} {size} {stroke} hovered transitioned />
{/if}
