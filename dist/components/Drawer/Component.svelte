<script>import {
  drawerDefaults as defaults,
  drawerSizeMap,
  drawerPositionMap,
  drawerSpeedMap,
  drawerOffsetMap
} from "./module";
import themeStore, { themer } from "../..";
import { fade, fly } from "svelte/transition";
import { useDisclosure } from "../../stores";
import Placeholder from "./Placeholder.svelte";
export let { backdrop, content, contentProps, position, shadowed, size, speed, theme, variant } = {
  ...defaults
};
export const store = useDisclosure({ visible: false });
const th = themer($themeStore);
$:
  drawerSizeClasses = th.create("DrawerSize").append(drawerSizeMap[size], size).append("pointer-events-auto w-screen", true).compile(true);
$:
  drawerPositionClasses = th.create("DrawerPosition").append(drawerPositionMap[position], position).append("pointer-events-none fixed inset-y-0 flex max-w-full", true).compile(true);
$:
  drawerClasses = th.create("DrawerWrapper").option("shadows", shadowed, shadowed).append("flex h-full flex-col overflow-y-scroll bg-white", true).append($$restProps.class, true).compile(true);
function handleClose() {
  store.close();
}
</script>

{#if $store.visible}
	<div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
		<div
			class="fixed inset-0 bg-slate-600 bg-opacity-50 transition-opacity"
			transition:fade={{ duration: 100 }}
		/>

		<div class="fixed inset-0 overflow-hidden">
			<div class="absolute inset-0 overflow-hidden">
				<div class={drawerPositionClasses}>
					<div
						in:fly={{
							x: drawerOffsetMap[size][position],
							duration: drawerSpeedMap[speed]
						}}
						out:fly={{
							x: drawerOffsetMap[size][position],
							duration: drawerSpeedMap[speed] * 1.5,
							opacity: 0.75
						}}
						class={drawerSizeClasses}
					>
						<div class={drawerClasses}>
							<div class="relative flex-1">
								<slot
									visible={$store.visible}
									close={store.close}
									open={store.open}
									toggle={store.toggle}
								>
									{#if content}
										<svelte:component this={content} {...contentProps} />
									{:else}
										<Placeholder close={handleClose} />
									{/if}
								</slot>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
