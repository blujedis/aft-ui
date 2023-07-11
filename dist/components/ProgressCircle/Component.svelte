<script>import { tweened } from "svelte/motion";
import { progressCircleDefaults as defaults } from "./module";
import themeStore, { styler, themer } from "../..";
export let {
  animate,
  delay,
  duration,
  easing,
  interpolate,
  max,
  shadowed,
  size,
  text,
  textunit,
  theme,
  value,
  variant,
  tracksize
} = {
  ...defaults
};
export const store = tweened(value, {
  delay,
  duration: !animate ? 0 : duration,
  easing,
  interpolate
});
const [diameter, trackwidth] = normalizeSize();
const center = diameter / 2;
const radius = center - trackwidth;
$:
  strokeArray = 2 * 3.14 * radius;
$:
  strokeOffset = strokeArray * ((100 - $store) / 100);
const th = themer($themeStore);
const st = styler($themeStore);
$:
  progressCircleStyles = st.create("ProgressCircleStyles").add("height", diameter, true).add("width", diameter, true).add("transform", "rotate(-90deg)", true).compile();
$:
  progressCircleClasses = th.create("ProgressCircle").option("dropshadows", shadowed, shadowed).append($$restProps.class, true).compile(true);
$:
  progressCircleTrackClasses = th.create("ProgressCircleTrack").variant("progressCircleTrack", variant, theme, true).append("fill-transparent", true).compile(true);
$:
  progressCircleValueClasses = th.create("ProgressCircleValue").variant("progressCircleValue", variant, theme, true).append("fill-transparent", true).compile(true);
$:
  progressCircleTextClasses = th.create("ProgressCircleText").variant("progressCircleText", variant, theme, true).option("progressCircleTextSizes", size, typeof size === "string").compile(true);
function normalizeSize() {
  let nsize = 0;
  let ntsize = 0;
  if (typeof size === "number")
    nsize = size;
  else
    nsize = $themeStore.options.progressCircleSizes[size];
  if (typeof tracksize === "undefined" && typeof size === "string" || typeof tracksize === "string")
    ntsize = $themeStore.options.progressCircleTrackSizes[tracksize || size];
  else if (typeof tracksize === "number")
    ntsize = tracksize;
  return [nsize, ntsize];
}
</script>

<svg
	{...$$restProps}
	viewBox={`0 0 ${diameter} ${diameter}`}
	class={progressCircleClasses}
	style={progressCircleStyles}
>
	<circle
		class={progressCircleTrackClasses}
		cx={center}
		cy={center}
		r={radius}
		stroke-width={trackwidth}
	/>
	<circle
		class={progressCircleValueClasses}
		cx={center}
		cy={center}
		r={radius}
		stroke-width={trackwidth}
		stroke-dasharray={strokeArray}
		stroke-dashoffset={strokeOffset}
	/>
	<slot>
		{#if text}
			<text
				class={progressCircleTextClasses}
				x="50%"
				y="-50%"
				dy=".1em"
				text-anchor="middle"
				alignment-baseline="middle"
				transform="rotate(90)">{Math.round($store)}{textunit}</text
			>
		{/if}
	</slot>
</svg>
