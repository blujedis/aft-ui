<script>import { CardElement } from "../CardElement";
import { cardHeaderDefaults as defaults } from "./module";
export let { size } = {
  ...defaults
};
</script>

<svelte:component this={CardElement} {...$$restProps} type="header" {size}>
	<slot />
</svelte:component>
