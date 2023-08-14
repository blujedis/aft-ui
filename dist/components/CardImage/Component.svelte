<script>import { cardImageDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { Image } from "../Image";
export let { fit, full, imageClasses } = {
  ...defaults
};
const th = themer($themeStore);
$:
  cardImageClasses = th.create("CardImage").append($$restProps.class, true).compile(true);
</script>

<div class={cardImageClasses}>
	<slot>
		<svelte:component this={Image} {...$$restProps} {fit} {full} class={imageClasses} />
	</slot>
</div>
