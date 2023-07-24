<script>import {
  dropdownDefaults as defaults
} from "./module";
import themeStore, { themer } from "../..";
import { useDisclosure } from "../../stores";
import { createCustomEvent, ensureArray } from "../../utils";
import { setContext } from "svelte";
export let {
  autoclose,
  disabled,
  escapable,
  filterable,
  filter,
  focused,
  full,
  placeholder,
  rounded,
  strategy,
  selected,
  shadowed,
  size,
  items,
  theme,
  transitioned,
  trigger,
  underlined,
  unstyled,
  visible,
  selectProps
} = {
  ...defaults
};
export const store = useDisclosure({
  visible,
  selected: ensureArray(selected),
  items: [],
  filtered: [],
  input: void 0,
  panel: void 0
});
export const context = setContext("Dropdown", {
  ...store,
  add,
  remove,
  isSelected,
  strategy,
  select,
  trigger,
  unselect,
  filter: filterItems,
  reset,
  globals: {
    disabled,
    full,
    multiple: strategy === "multiselect" || strategy === "tags",
    placeholder,
    rounded,
    shadowed,
    size,
    theme,
    variant: "outlined"
  }
});
let div;
let selref;
const th = themer($themeStore);
$:
  groups = $store.items.reduce((a, c) => {
    if (!c.group)
      return a;
    a[c.group] = a[c.group] || [];
    a[c.group].push(c);
    return a;
  }, {});
$:
  groupKeys = Object.keys(groups);
$:
  dropdownClasses = th.create().append("w-full", full).append("relative inline-block text-left not-sr-only", true).append($$restProps.class, true).compile(true);
const clickOutside = createCustomEvent("click", "click_outside", (e, n) => {
  return n && !n.contains(e.target) && !e.defaultPrevented && autoclose && $store.visible || false;
});
function handleClose(e) {
  store.close();
}
function handleKeydown(e) {
  if (e.key === "Escape" && escapable || e.key === "Tab" && $store.visible)
    return store.close();
  if (!$store.visible && e.key === "ArrowDown")
    return store.open();
}
function add({ value, label, group, selected: selected2 }) {
  if (typeof label === "undefined")
    label = value + "";
  group = group || "";
  const hasValue = $store.items.find((item) => item.value === value);
  if (!hasValue) {
    store.update((s) => {
      const items2 = [...s.items, { value, label, group }];
      let selectedItems = [...s.selected];
      if (selected2 && !selectedItems.includes(value)) {
        if (selected2 && selectedItems.length && ["multiselect", "tags"].includes(strategy))
          selectedItems.push(value);
        else
          selectedItems = [value];
      }
      return {
        ...s,
        items: items2,
        filtered: [...items2],
        selected: selectedItems
      };
    });
  }
}
function remove(value) {
  store.update((s) => {
    const filteredItems = s.items.filter((i) => value !== i.value);
    const filteredSelected = s.selected.filter((v) => v !== value);
    return { ...s, items: filteredItems, selected: filteredSelected };
  });
}
function select(key) {
  if (typeof key === "undefined")
    return;
  store.update((s) => {
    let keys = [key];
    const clone = [...s.selected];
    if (["multiselect", "tags"].includes(strategy) && !clone.includes(key)) {
      clone.push(key);
      keys = clone;
    }
    return { ...s, selected: keys };
  });
}
function unselect(key) {
  if (typeof key === "undefined")
    return;
  store.update((s) => {
    return { ...s, selected: s.selected.filter((v) => v !== key) };
  });
}
function isSelected(key) {
  if (typeof key === "undefined")
    return false;
  return $store.selected.includes(key);
}
function filterItems(query = "") {
  store.update((s) => {
    const newItems = !query?.length ? [...s.items] : filter(query, s.items);
    if (!query)
      console.log(s.items);
    return { ...s, filtered: [...newItems] };
  });
}
function reset() {
  store.update((s) => {
    return { ...s, filtered: [...s.items] };
  });
}
store.subscribe((s) => {
  if (!selref || !s.selected.length)
    return;
  const options = selref.querySelectorAll("option");
  if (options?.length) {
    options.forEach((node) => {
      node.selected = false;
      if (s.selected.includes(node.value))
        node.selected = true;
    });
  }
  if (s.visible && s.panel)
    s.panel.focus();
});
if (items?.length)
  items.forEach((item) => add(item));
</script>

<div
	role="presentation"
	bind:this={div}
	{...$$restProps}
	use:clickOutside
	on:click_outside={handleClose}
	on:keydown={handleKeydown}
	class={dropdownClasses}
>
	<slot
		visible={$store.visible}
		selected={$store.selected}
		filtered={$store.filtered}
		{select}
		open={store.open}
		close={store.close}
		toggle={store.toggle}
	/>
	<!-- Native select is only shown for screen readers -->
	<slot name="select">
		<select
			bind:this={selref}
			class="sr-only"
			{...$$restProps}
			multiple={['multiselect'].includes(strategy)}
		>
			{#if groupKeys.length}
				{#each Object.entries(groups) as [group, items]}
					<optgroup>{group}</optgroup>
					{#each items as item}
						<option value={item.value}>{item.label}</option>
					{/each}
				{/each}
			{:else}
				{#each $store.items as item}
					<option value={item.value} selected={$store.selected.includes(item.value)}
						>{item.label}</option
					>
				{/each}
			{/if}
		</select>
	</slot>
</div>
