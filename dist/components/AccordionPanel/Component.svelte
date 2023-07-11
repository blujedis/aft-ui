<script>import { getContext, setContext } from "svelte";
import {
  accordionPanelDefaults as defaults
} from "./module";
import themeStore, { themer } from "../..";
const context = getContext("Accordion");
export let { as, name } = {
  ...defaults
};
setContext("AccordionPanel", {
  name
});
const th = themer($themeStore);
$:
  accordionPanelClasses = th.create("AccordionPanel").append($$restProps.class, true).compile(true);
</script>

<svelte:element this={as} {...$$restProps} class={accordionPanelClasses}>
	<slot open={() => context.select(name)} close={() => context.select(name)} />
</svelte:element>
