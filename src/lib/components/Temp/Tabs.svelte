<script lang="ts">
	import { useSelect } from '$lib/stores';
	import { ensureArray } from '$lib/utils';
	import { setContext } from 'svelte';
	import type { TabsContext } from './types';

	export let selected = '';

	const classes = `flex flex-wrap space-x-2`;

	const store = useSelect({ selected: ensureArray(selected), multiple: false });

	const context: TabsContext = {
		...store
	};

	setContext('context', context);

	function mount(node: HTMLElement) {
		const destroy = context.subscribe((s) => {
			if (s.selected) node.replaceChildren(s.selected[0] as HTMLElement);
		});
		return { destroy };
	}
</script>

<ul class={classes}>
	<slot />
</ul>
<div role="tabpanel" use:mount class="flex"></div>
