<script>import { switchDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder, boolToMapValue } from "../../utils";
import { Label } from "../Label";
export let {
  checked,
  classHandle,
  classSlider,
  disabled,
  focused,
  for: labelFor,
  hovered,
  shadowed,
  size,
  srtext,
  theme,
  transitioned,
  unlabeled
} = {
  ...defaults
};
let ref;
const th = themer($themeStore);
$: labelClasses = th.create("SwitchLabel").option("switchButtonSizes", size, size).option("common", "focusedOutlineVisible", focused).option("outlineFocusVisible", theme, focused).option("hovered", "filled", theme, hovered).option("common", "transitioned", transitioned).append("pointer-events-none", disabled).append(
  "group relative inline-flex flex-shrink-0 cursor-pointer items-center justify-center rounded-full",
  true
).compile();
$: backdropClasses = th.create("SwitchBackdrop").prepend("switch-backdrop", true).append("pointer-events-none absolute h-full w-full rounded-md", true).compile();
$: fillClasses = th.create("SwitchFill").bundle(["switchBgAriaChecked"], theme, true).option("switchFillSizes", size, size).option("shadows", boolToMapValue(shadowed), shadowed).option("common", "disabled", disabled).prepend("switch-slider", true).append(
  "pointer-events-none absolute mx-auto rounded-full transition-colors duration-200 ease-in-out ring-0",
  true
).append(classSlider, true).compile();
$: handleClasses = th.create("SwitchHandle").option("switchHandleSizes", size, size).option("common", "disabled", disabled).prepend("switch-handle", true).append("bg-white border-frame-300", true).append(
  "pointer-events-none absolute left-0 inline-block transform rounded-full border shadow ring-0 transition-transform duration-200 ease-in-out",
  true
).append(classHandle, true).compile();
$: inputClasses = th.create("SwitchInput").append("sr-only", true).append($$restProps.class, true).compile();
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<Label for={labelFor} visible={unlabeled !== false} class={$$restProps.class}>
	<span class="switch-wrapper flickerless">
		<slot />
		<span
			role="switch"
			tabindex="0"
			class={labelClasses}
			aria-checked={checked}
			aria-disabled={disabled}
		>
			<span class="sr-only">{srtext}</span>
			<span aria-hidden="true" class={backdropClasses} />
			<span aria-hidden="true" class={fillClasses} aria-checked={checked} />
			<span aria-hidden="true" class={handleClasses} />
			<input
				{...$$restProps}
				tabindex="-1"
				bind:this={ref}
				type="checkbox"
				use:forwardedEvents
				bind:checked
				class={inputClasses}
				{disabled}
			/>
		</span>
	</span>
</Label>

<style>
	.flickerless {
		perspective: 1000;
		backface-visibility: hidden;
		transform: translateZ(0.1px); /* needs an actual value */
	}
</style>
