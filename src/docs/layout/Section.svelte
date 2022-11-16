<script lang="ts">
	import { classnames } from '@forewind/util';
	import { borderColor } from './constants';

	export let section = '';
</script>

<p class={classnames('text-gray-700 dark:text-gray-300 font-semibold border-b mb-6', borderColor)}>
	{section}
</p>
