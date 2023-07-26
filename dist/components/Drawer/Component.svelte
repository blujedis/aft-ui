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
export let {
  backdrop,
  content,
  escapable,
  contentProps,
  position,
  shadowed,
  size,
  speed,
  theme,
  variant
} = {
  ...defaults
};
export const store = useDisclosure({ visible: false });
let panel;
const th = themer($themeStore);
$:
  drawerSizeClasses = th.create("DrawerSize").append(drawerSizeMap[size], size).append("pointer-events-auto w-screen", true).compile(true);
$:
  drawerPositionClasses = th.create("DrawerPosition").append(drawerPositionMap[position], position).append("pointer-events-none fixed inset-y-0 flex max-w-full", true).compile(true);
$:
  drawerClasses = th.create("DrawerWrapper").option("shadows", shadowed, shadowed).append("flex h-full flex-col overflow-y-scroll z-20 bg-white", true).append($$restProps.class, true).compile(true);
function handleClose() {
  store.close();
}
function handleKeydown(e) {
  if (!e.repeat && e.key === "Escape" && escapable) {
    e.stopPropagation();
    handleClose();
  }
}
function handleClick(e) {
  if (!panel?.contains(e.target))
    handleClose();
}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $store.visible}
	<div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
		{#if backdrop}
			<div
				role="button"
				tabindex="-1"
				bind:this={panel}
				class="fixed inset-0 bg-slate-600 bg-opacity-50 transition-opacity"
				transition:fade={{ duration: 100 }}
				on:click={handleClick}
				on:keydown={handleKeydown}
			/>
		{/if}

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
