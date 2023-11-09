<script lang="ts">
	import type { ElementProps } from '../../types';
	type $$Props = ElementProps<'div'> & Record<string, any>;
</script>

<div class={('mb-8 ' + ($$restProps.class || '')).trim()}>
	<slot />
</div>
