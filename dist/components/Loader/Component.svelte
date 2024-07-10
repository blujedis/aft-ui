<script>import { themer, themeStore } from "../../theme";
import { Icon } from "../Icon";
import { loaderDefaults as defaults } from "./module";
export let { position, icon, visible, size } = { ...defaults };
const th = themer($themeStore);
$: loaderWrapperClasses = th.create("LoaderWrapper").prepend("loader-wrapper", true).append("flex items-center space-x-2", true).append("flex-row-reverse space-x-reverse", position === "right").compile();
$: loaderClasses = th.create("Loader").option("iconSizes", size, true).prepend("loader", true).append("animate-spin text-inherit", true).compile();
</script>

{#if $$slots.default}
	<span class={loaderWrapperClasses}>
		{#if visible}
			<Icon {...$$restProps} {icon} class={loaderClasses} />
		{/if}
		<span><slot /></span>
	</span>
{:else if visible}
	<Icon {...$$restProps} {icon} class={loaderClasses} />
{/if}
