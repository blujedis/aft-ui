<script>import { themer, themeStore } from "../../theme";
import { RatingItem } from "../RatingItem";
import {
  ratingControllerDefaults as defaults
} from "./module";
import { setContext } from "svelte";
import { writable } from "svelte/store";
import { boolToMapValue } from "../../utils";
export let {
  arrowable,
  background,
  count,
  fill,
  hoverable,
  readonly,
  score,
  shadowed,
  size,
  stroked,
  updatable
} = {
  ...defaults
};
const store = writable({ active: -1, readonly, score, selected: -1 });
setContext("Rating", {
  ...store,
  globals: {
    background,
    fill,
    shadowed,
    size,
    stroked
  },
  events: {
    handleCleanup
  }
});
let ref;
const th = themer($themeStore);
$:
  ratingControllerClasses = th.create("RatingController").option("dropshadows", boolToMapValue(shadowed), shadowed).append("inline-flex spacing-x-0", true).append($$restProps.class, true).compile();
function handleSelect(selected, e) {
  if (readonly)
    return;
  e.stopPropagation();
  e.currentTarget.focus();
  store.update((s) => {
    const updateScore = updatable ? selected + 1 : s.score;
    return { ...s, score: updateScore, selected };
  });
}
function handleMouseover(active, e) {
  if (readonly || !hoverable)
    return;
  store.update((s) => ({ ...s, active }));
}
function handleMouseleave(active, e) {
  if (readonly || !hoverable)
    return;
  store.update((s) => ({ ...s, active: -1 }));
}
function handleNavigation(up = false) {
  let active = $store.active;
  const div = ref;
  const el = document.activeElement;
  if (!div || !div.contains(el))
    return;
  const items = Array.from(
    div.querySelectorAll(el.tagName.toLowerCase())
  );
  if (!items?.length) {
    console.warn(`Rating elements missing or undefined.`);
    return;
  }
  const currentIndex = items.indexOf(el);
  if (currentIndex > count - 1 || currentIndex < 0) {
    console.warn(`Rating index of ${currentIndex} is invalid or out of count scope.`);
    return;
  }
  active = up ? currentIndex + 1 : currentIndex - 1;
  if (active > count - 1)
    active = count - 1;
  if (active < 0)
    active = 0;
  store.update((s) => {
    items[s.score && active === -1 ? s.score - 1 : active].focus();
    return { ...s, active };
  });
}
function handleNavigationSelect() {
  store.update((s) => {
    const selected = s.active + 1;
    const updateScore = updatable ? selected : s.score;
    return { ...s, score: updateScore, selected };
  });
}
function handleKeydown(e) {
  if (readonly || !arrowable || e.repeat)
    return;
  if (["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(e.key)) {
    handleNavigation(e.key === "ArrowUp" || e.key === "ArrowRight");
  } else if (e.key === " ") {
    handleNavigationSelect();
  }
}
function handleCleanup(e) {
}
function handleReset() {
  if (readonly)
    return;
  store.update((s) => ({ ...s, score, active: -1, selected: -1 }));
}
</script>

<div
	{...$$restProps}
	role="listbox"
	tabindex="-1"
	bind:this={ref}
	class={ratingControllerClasses}
	on:keydown={handleKeydown}
	on:focusout={handleCleanup}
>
	<slot
		score={$store.score}
		active={$store.active}
		selected={$store.selected}
		mouseover={handleMouseover}
		mouseleave={handleMouseleave}
		select={handleSelect}
		reset={handleReset}
	>
		{#each Array(count) as r, index}
			<RatingItem
				{index}
				on:mouseover={(e) => handleMouseover(index, e)}
				on:mouseleave={(e) => handleMouseleave(index, e)}
				on:click={(e) => handleSelect(index, e)}
			/>
		{/each}
	</slot>
</div>
