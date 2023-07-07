<script lang="ts">
	import type { ElementProps } from '../types';
	type $$Props = ElementProps<'div'> & {};
</script>

<div class={('mb-8 ' + $$restProps.class).trim()}>
	<slot />
</div>
