<script>import CardContent from "../CardContent";
import { cardFooterDefaults as defaults } from "./module";
export let { size } = {
  ...defaults
};
</script>

<svelte:component this={CardContent} {...$$restProps} type="footer" {size}>
	<slot />
</svelte:component>
