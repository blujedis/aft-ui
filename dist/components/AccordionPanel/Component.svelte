<script>import { getContext, setContext } from "svelte";
import {
  accordionPanelDefaults as defaults
} from "./module";
import { themeStore, themer } from "../..";
const context = getContext("Accordion");
export let { as, key } = {
  ...defaults
};
setContext("AccordionPanel", {
  key
});
const th = themer($themeStore);
$:
  accordionPanelClasses = th.create("AccordionPanel").append($$restProps.class, true).compile(true);
</script>

<svelte:element this={as} {...$$restProps} class={accordionPanelClasses}>
	<slot open={() => context.select(key)} close={() => context.select(key)} />
</svelte:element>
