<script>import { CardElement } from "../CardElement";
import { cardFooterDefaults as defaults } from "./module";
export let { size } = {
  ...defaults
};
</script>

<svelte:component this={CardElement} {...$$restProps} type="footer" {size}>
	<slot />
</svelte:component>
