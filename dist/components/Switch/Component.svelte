<script>import { switchDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
import { onMount } from "svelte";
import classNames from "classnames";
export let {
  checked,
  classBackdrop,
  classFill,
  classHandle,
  disabled,
  focused,
  position,
  shadowed,
  size,
  srtext,
  theme,
  variant,
  unstyled
} = {
  ...defaults
};
let ref;
const th = themer($themeStore);
$:
  labelClasses = th.create("SwitchLabel").option("switchButtonSizes", size, size).append("pointer-events-none", disabled).option("focusedRing", theme, focused).append(
    "group relative inline-flex flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:ring-2 focus:outline-none",
    true
  ).compile(true);
$:
  backdropClasses = th.create("SwitchBackdrop").variant("switchBackdrop", variant, theme, true).append("pointer-events-none absolute h-full w-full rounded-md", true).append(classBackdrop, true).compile(true);
$:
  fillClasses = th.create("SwitchFill").variant("switchFill", variant, theme, true).option("switchFillSizes", size, size).option("shadows", shadowed, shadowed).option("common", "disabled", disabled).append(
    "pointer-events-none absolute mx-auto rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2",
    true
  ).append(classFill, true).compile(true);
$:
  handleClasses = th.create("SwitchHandle").variant("switchHandle", variant, theme, true).option("switchHandleSizes", size, size).option("common", "disabled", disabled).append(
    "pointer-events-none absolute left-0 inline-block transform rounded-full border shadow ring-0 transition-transform duration-200 ease-in-out",
    true
  ).append(classHandle, true).compile(true);
$:
  inputClasses = th.create("SwitchInput").append("sr-only", true).append($$restProps.class, true).compile(true);
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<label class={classNames('flickerless not-sr-only', $$restProps.class)}>
	<div class={labelClasses} aria-checked={checked} aria-disabled={disabled}>
		<span class="sr-only">{srtext}</span>
		<span aria-hidden="true" class={backdropClasses} />
		<span aria-hidden="true" class={fillClasses} aria-disabled={disabled} />
		<span aria-hidden="true" class={handleClasses} aria-disabled={disabled} />
		<input
			{...$$restProps}
			bind:this={ref}
			type="checkbox"
			use:forwardedEvents
			bind:checked
			class={inputClasses}
			{disabled}
		/>
	</div>
</label>

<style>
	.flickerless {
		perspective: 1000;
		backface-visibility: hidden;
		transform: translateZ(0.1px); /* needs an actual value */
	}
</style>
