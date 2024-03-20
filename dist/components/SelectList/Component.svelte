<script>import {
  selectListDefaults as defaults
} from "./module";
import { themeStore, themer, useSelect } from "../..";
import { setContext } from "svelte";
import { cleanObj, createCustomEvent, ensureArray } from "../../utils";
export let {
  autoclose,
  badgeProps,
  disabled,
  escapable,
  items,
  filterable,
  filter: initFilter,
  full,
  focused,
  hovered,
  multiple,
  newable,
  placeholder,
  removable,
  rounded,
  shadowed,
  size,
  store: initStore,
  theme,
  value,
  variant,
  visible,
  transitioned,
  onBeforeAdd,
  onBeforeRemove
} = {
  ...defaults
};
export const store = initStore || useSelect({
  multiple,
  visible,
  selected: ensureArray(value),
  items: [],
  filtered: [],
  persisted: []
});
const globals = cleanObj({
  badgeProps,
  disabled,
  filterable,
  full,
  focused,
  hovered,
  newable: multiple ? newable : false,
  multiple,
  placeholder,
  removable: multiple ? removable : false,
  rounded,
  shadowed,
  size,
  theme,
  variant,
  transitioned,
  onBeforeAdd,
  onBeforeRemove
});
const { class: classes, ...restProps } = $$restProps;
export const context = setContext("SelectListContext", {
  ...store,
  open,
  close,
  isSelected,
  add,
  toggle,
  remove,
  restoreSelected,
  filter,
  globals
});
const th = themer($themeStore);
$:
  groups = $store.items.reduce(
    (a, c) => {
      if (!c.group)
        return a;
      a[c.group] = a[c.group] || [];
      a[c.group].push(c);
      return a;
    },
    {}
  );
$:
  groupKeys = Object.keys(groups);
$:
  controllerClasses = th.create("SelectListController").prepend("select-list", true).append("relative not-sr-only inline-flex", true).append("w-full", full).append(classes, true).compile();
function open() {
  store.update((s) => ({ ...s, visible: true }));
}
function close() {
  store.update((s) => ({ ...s, visible: false }));
}
function toggle() {
  if ($context.visible)
    close();
  else
    open();
}
function add({ value: value2, label, group, selected }) {
  if (typeof label === "undefined")
    label = value2 + "";
  group = group || "";
  const hasValue = $store.items.find((item) => item.value === value2);
  if (!hasValue) {
    store.update((s) => {
      const items2 = [...s.items, { value: value2, label, group }];
      let selectedItems = [...s.selected];
      if (selected && !selectedItems.includes(value2)) {
        if (selected && selectedItems.length && multiple)
          selectedItems.push(value2);
        else
          selectedItems = [value2];
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
function remove(itemOrKey) {
  let key = itemOrKey;
  if (typeof itemOrKey !== "string")
    key = itemOrKey.value;
  store.update((s) => {
    const filteredSelected = s.selected.filter((v) => v !== key);
    return { ...s, selected: filteredSelected };
  });
}
async function resolveItems(query) {
  if (!query)
    return $context.items;
  return Promise.resolve(
    initFilter(
      query,
      $context.items,
      $context.selected
    )
  );
}
async function filter(query) {
  const filtered = await resolveItems(query);
  const filteredValue = !query ? [] : filtered[0] ? [filtered[0].value] : [];
  store.update((s) => {
    return {
      ...s,
      filtered: [...filtered],
      selected: multiple ? s.selected : filtered.length ? filteredValue : []
    };
  });
}
function isSelected(itemOrKey) {
  let key = itemOrKey;
  if (typeof itemOrKey !== "string")
    key = itemOrKey.value;
  return $store.selected.includes(key);
}
function restoreSelected(selectedItemsOrRestoreInput, restoreInput) {
  if (!$context.filtering)
    return;
  if (typeof selectedItemsOrRestoreInput === "boolean") {
    restoreInput = selectedItemsOrRestoreInput;
    selectedItemsOrRestoreInput = void 0;
  }
  if ($context.input && restoreInput) {
    if (!multiple) {
      const label = $context.items.find((i) => $context.persisted.includes(i.value))?.label;
      if (label)
        $context.input.value = label || "";
    } else {
      $context.input.value = "";
    }
  }
  const normalizedItems = typeof selectedItemsOrRestoreInput !== "undefined" ? ensureArray(selectedItemsOrRestoreInput) : !multiple ? $context.persisted : $context.selected;
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
function handleClose(_e) {
  context.close();
}
const clickOutside = createCustomEvent("click", "click_outside", (e, n) => {
  if (multiple) {
    restoreSelected(true);
  } else if (!multiple && filterable) {
    if ($context.input && $context.filtering) {
      restoreSelected(true);
    }
  }
  return n && !n.contains(e.target) && !e.defaultPrevented && autoclose && $store.visible || false;
});
function handleKeydown(e) {
  if (e.key === "Escape" && escapable || e.key === "Tab" && $store.visible) {
    e.preventDefault();
    restoreSelected(true);
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
items.forEach((i) => add(i));
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
				isSelected={context.isSelected}
				open={context.open}
				close={context.close}
				toggle={store.toggle}
			/>
		</div>

		<slot name="select">
			<select tabindex="-1" class="sr-only" {...restProps} {value} {multiple}>
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
</div>
