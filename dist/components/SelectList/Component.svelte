<script>import {
  selectListDefaults as defaults
} from "./module";
import { themeStore, themer, useSelect } from "../..";
import { onMount, setContext, tick } from "svelte";
import { cleanObj, createCustomEvent, ensureArray, isArrayEqual } from "../../utils";
export let {
  autoclose,
  badgeProps,
  disabled,
  escapable,
  exclusive,
  items,
  filterable,
  filter: initFilter,
  full,
  focused,
  hovered,
  min,
  max,
  newable,
  placeholder,
  recordless,
  removable,
  rounded,
  shadowed,
  size,
  tags,
  tagsTheme,
  theme,
  value,
  variant,
  visible,
  transitioned,
  onBeforeAdd,
  onBeforeRemove,
  onChange
} = {
  ...defaults
  // TODO: fix/review types here.
};
let mounted = false;
let removing = false;
let selecting = false;
if (newable) tags = true;
if (removable) tags = true;
if (min) tags = true;
if (max) tags = true;
const store = useSelect({
  visible,
  selected: ensureArray(value),
  min,
  max,
  mode: tags ? "multiple" : "single-array",
  newItems: void 0,
  items: [],
  filtered: [],
  persisted: [],
  onChange: onChangeHandler
});
const globals = cleanObj({
  badgeProps,
  disabled,
  exclusive,
  filterable,
  full,
  focused,
  hovered,
  min,
  max,
  name: $$restProps.name,
  newable,
  removable,
  placeholder,
  recordless,
  rounded,
  shadowed,
  size,
  tags,
  tagsTheme,
  theme,
  variant,
  transitioned,
  onBeforeAdd,
  onBeforeRemove
});
const { class: classes, ...restProps } = $$restProps;
const context = setContext("SelectListContext", {
  ...store,
  isSelected,
  add,
  select,
  remove,
  filter,
  restore,
  open,
  close,
  toggle,
  globals
});
const th = themer($themeStore);
$: {
  if (mounted && (typeof value === "undefined" || !value?.length)) {
    if (tags && !value.length) store.update((s) => ({ ...s, selected: value }));
    setLabel();
  } else if (mounted && $context.input && !$context.input.value && !tags && !filterable) {
    setLabel(value);
  } else if (mounted && tags && !selecting && !filterable) {
    if (!isArrayEqual(value, $store.selected)) {
      if (!removing) {
        store.update((s) => ({ ...s, selected: [...value] }));
      } else {
        value = $store.selected;
      }
    }
    if (!removing && (value === null || !value?.length)) {
      store.update((s) => ({ ...s, selected: [] }));
    }
  }
  if (!removing && !selecting) {
    $store.items = [];
    items.forEach((i) => add({ ...i }));
    if (!items.length) {
      $store.filtered = [];
      $store.selected = [];
    }
  }
}
$: groups = $store.items.reduce(
  (a, c) => {
    if (!c.group) return a;
    a[c.group] = a[c.group] || [];
    a[c.group].push(c);
    return a;
  },
  {}
);
$: groupKeys = Object.keys(groups);
$: controllerClasses = th.create("SelectListController").prepend("select-list", true).append("relative not-sr-only inline-flex", true).append("w-full", full).append(classes, true).compile();
function onChangeHandler(selected) {
  const changedValue = tags ? selected : selected[0];
  value = changedValue;
  if (!value.length) setLabel();
  if (typeof onChange === "function") onChange(changedValue);
}
async function resolveItems(query) {
  if (!query) return $context.items;
  return Promise.resolve(
    initFilter(
      query,
      $context.items,
      $context.selected
    )
  );
}
function getItem(itemOrKey) {
  if (typeof itemOrKey === "object" && typeof itemOrKey.value !== "undefined")
    return itemOrKey;
  return items.find((v) => v.value === itemOrKey);
}
function restore(selectedItemsOrRestoreInput, restoreInput, force = false) {
  if (typeof selectedItemsOrRestoreInput === "boolean") {
    restoreInput = selectedItemsOrRestoreInput;
    selectedItemsOrRestoreInput = void 0;
  }
  if (!$context.filtering && !force) {
    return;
  }
  const normalizedItems = typeof selectedItemsOrRestoreInput !== "undefined" ? ensureArray(selectedItemsOrRestoreInput) : !tags ? $context.persisted : $context.selected;
  if ($context.input) {
    if (restoreInput) {
      if (!tags) {
        const label = $context.items.find((i) => $context.persisted.includes(i.value))?.label;
        if (label) $context.input.value = label || "";
      } else {
        $context.input.value = "";
      }
    } else if (force) {
      if (!tags && normalizedItems.length) {
        $context.input.value = $context.items.find((i) => i.value === normalizedItems[0])?.label || "";
      }
    }
  }
  store.update((s) => {
    return {
      ...s,
      filtered: [...s.items],
      selected: [...normalizedItems],
      persisted: [],
      filtering: false
    };
  });
}
export function isSelected(itemOrKey) {
  const item = getItem(itemOrKey);
  const selected = $store.selected.includes(item?.value);
  return selected;
}
export function setLabel(itemOrKey) {
  const item = !itemOrKey ? null : getItem(itemOrKey);
  if ($context.input) {
    if (item && !tags) $context.input.value = item.label;
    else if (!item) $context.input.value = "";
  }
}
export function open() {
  store.update((s) => ({ ...s, visible: true }));
}
export function close() {
  store.update((s) => ({ ...s, visible: false }));
}
export function toggle() {
  if ($context.visible) close();
  else open();
}
export function add({ value: value2, label, group, selected }) {
  if (typeof label === "undefined") label = value2 + "";
  group = group || "";
  const hasValue = $store.items.find((item) => item.value === value2);
  if (!hasValue) {
    store.update((s) => {
      const items2 = [...s.items, { value: value2, label, group }];
      let selectedItems = [...s.selected];
      if (selected && !selectedItems.includes(value2)) {
        if (tags) selectedItems.push(value2);
        else selectedItems = [value2];
      }
      const filteredItems = !exclusive ? items2 : items2.filter((v) => !selectedItems.includes(v.value));
      return {
        ...s,
        items: items2,
        filtered: filteredItems,
        // [...items],
        selected: selectedItems
      };
    });
  }
}
export async function select(itemOrKey) {
  selecting = true;
  const item = getItem(itemOrKey);
  setLabel(item);
  store.select(item.value);
  if (exclusive) filter("");
  await tick();
  selecting = false;
}
export async function remove(itemOrKey) {
  removing = true;
  let key = itemOrKey;
  if (typeof itemOrKey !== "string") key = itemOrKey.value;
  let newSelected = $store.selected || [];
  store.update((s) => {
    const filteredSelected = s.selected.filter((v) => v !== key);
    newSelected = filteredSelected;
    return { ...s, selected: [...filteredSelected] };
  });
  if (exclusive) filter("");
  await tick();
  removing = false;
  onChangeHandler(newSelected);
}
export async function filter(query) {
  let filtered = await resolveItems(query);
  const filteredValue = !query ? [] : filtered[0] ? [filtered[0].value] : [];
  store.update((s) => {
    filtered = !exclusive ? filtered : filtered.filter((v) => !s.selected.includes(v.value));
    return {
      ...s,
      filtered: [...filtered],
      selected: tags ? s.selected : filtered.length ? filteredValue : []
    };
  });
}
function handleClose(_e) {
  context.close();
}
const clickOutside = createCustomEvent("click", "click_outside", (e, n) => {
  if (tags) {
    restore(true);
  } else if (!tags && filterable) {
    if ($context.input && $context.filtering) {
      restore(true);
    }
  }
  return n && !n.contains(e.target) && !e.defaultPrevented && autoclose && $store.visible || false;
});
function handleKeydown(e) {
  if (e.key === "Escape" && escapable || e.key === "Tab" && $store.visible) {
    e.preventDefault();
    restore(true);
    context.close();
    setTimeout(() => {
      $context.input?.focus();
    });
  } else if (e.key === "ArrowDown") {
    if (!$context.visible) {
      context.open();
      $context.input?.focus();
    }
  }
}
onMount(() => {
  mounted = true;
});
</script>

<div class={controllerClasses}>
	<div
		role="none"
		{...restProps}
		use:clickOutside
		on:click_outside={handleClose}
		on:keydown={handleKeydown}
		class="w-full"
	>
		<div class="w-full">
			<slot
				visible={$store.visible}
				selectedItems={$store.selected}
				filtered={$store.filtered}
				filtering={$store.filtering}
				{groups}
				open={context.open}
				close={context.close}
				toggle={store.toggle}
				select={store.select}
			/>
		</div>

		<!-- Select cannot have a dynamic "multiple when using bind."-->
		<slot name="select">
			{#if tags}
				<select tabindex="-1" class="sr-only" multiple {...restProps} bind:value>
					{#if groupKeys.length}
						{#each Object.entries(groups) as [group, items]}
							<optgroup>{group}</optgroup>
							{#each items as item}
								<option value={item.value}>{item.label}</option>
							{/each}
						{/each}
					{:else}
						{#each $store.items as item}
							<option value={item.value} selected={isSelected(item.value)}>{item.label}</option>
						{/each}
					{/if}
				</select>
			{:else}
				<select tabindex="-1" class="sr-only" {...restProps} bind:value>
					{#if groupKeys.length}
						{#each Object.entries(groups) as [group, items]}
							<optgroup>{group}</optgroup>
							{#each items as item}
								<option value={item.value}>{item.label}</option>
							{/each}
						{/each}
					{:else}
						{#each $store.items as item}
							<option value={item.value} selected={isSelected(item.value)}>{item.label}</option>
						{/each}
					{/if}
				</select>
			{/if}
		</slot>
	</div>
</div>
