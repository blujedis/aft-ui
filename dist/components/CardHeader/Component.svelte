<script>
	import CardContent from '../CardContent';
	import { cardHeaderDefaults as defaults } from './module';
	export let { size } = {
		...defaults
	};
</script>

<svelte:component this={CardContent} {...$$restProps} mode="header" {size}>
	<slot />
</svelte:component>
