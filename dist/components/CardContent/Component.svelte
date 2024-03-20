<script>import { CardElement } from "..";
import { cardContentDefaults as defaults } from "./module";
export let { size } = {
  ...defaults
};
</script>

<svelte:component this={CardElement} {...$$restProps} type="content" {size}>
	<slot />
</svelte:component>
