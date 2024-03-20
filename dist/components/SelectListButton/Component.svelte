<script>import { selectListButtonDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import {
  Flushed,
  Badge,
  Icon
} from "..";
import { boolToMapValue } from "../../utils";
import { getContext } from "svelte";
const context = getContext("SelectListContext");
export let {
  badgeProps,
  caret,
  disabled,
  filterable,
  focused,
  full,
  hovered,
  name,
  multiple,
  newable,
  placeholder,
  removable,
  rounded,
  roticon,
  size,
  shadowed,
  theme,
  transitioned,
  variant,
  onBeforeAdd,
  onBeforeRemove
} = {
  ...defaults,
  badgeProps: context.globals?.badgeProps,
  disabled: context.globals?.disabled,
  filterable: context.globals?.filterable,
  full: context.globals?.full,
  focused: context.globals?.focused,
  hovered: context.globals?.hovered,
  multiple: context.globals?.multiple,
  newable: context.globals?.newable,
  placeholder: context.globals?.placeholder,
  removable: context.globals?.removable,
  rounded: context.globals?.rounded,
  size: context.globals?.size,
  shadowed: context.globals?.shadowed,
  theme: context.globals?.theme,
  variant: context.globals?.variant,
  transitioned: context.globals?.transitioned
};
const th = themer($themeStore);
$:
  selected = $context.selected.map((v) => $context.items.find((item) => v === item.value)).filter((v) => typeof v !== "undefined");
$:
  labels = selected.map((i) => i.label);
$:
  icons = Array.isArray(caret) ? caret : [caret, caret];
$:
  activeIcon = roticon ? icons[0] : !$context.visible ? icons[0] : icons[1];
$:
  containerClasses = th.create("SelectListButton").bundle(
    ["mainBg", "whiteText", "filledPlaceholder"],
    {
      frame: "text-light dark:text-dark"
    },
    theme,
    variant === "filled"
  ).bundle(
    ["inputText", "mainRing"],
    {
      $base: "ring-1 ring-inset"
    },
    theme,
    variant === "outlined"
  ).bundle(["softBg", "inputText"], theme, variant === "soft").bundle(["mainBorder", "mainBorderGroupHover", "inputText"], theme, variant === "flushed").option("common", "focusedOutlineWithin", focused && variant !== "flushed").option(
    "outlineFocusWithin",
    theme,
    focused && ["filled", "outlined", "ghost", "soft", "text"].includes(variant)
  ).bundle(["inputText"], theme, variant === "text").option("common", "transitioned", transitioned).option("hovered", variant, theme, hovered).option("roundeds", boolToMapValue(rounded), rounded && variant !== "flushed").option("shadows", boolToMapValue(shadowed), shadowed).option("common", "disabled", disabled).prepend("select-list-button", true).append("w-full", full).append("relative peer flex items-center min-w-[176px] outline-none", true).append("outline-none", focused && variant !== "flushed").append("border-0", variant === "flushed").append($$restProps.class, true).compile();
$:
  contentWrapperClasses = th.create("SelectListInputWrapper").option("fieldFontSizes", size, size).option("fieldPadding", size, size).prepend("select-list-content-wrapper", true).append("relative flex flex-1 gap-1 flex-wrap overflow-hidden mr-4", true).compile();
$:
  inputWrapperClasses = th.create("SelectListInput").prepend("select-list-input-wrapper", true).append("relative pl-1", true).append("min-w-12 max-w-fit", multiple).compile();
$:
  badgeButtonClasses = th.create("SelectListButtonTag").append("outline-none inline-flex", true).compile();
$:
  badgeClasses = th.create("SelectListBadge").append("border border-white/50", variant === "filled").append("relative flex whitespace-nowrap overflow-hidden", true).append("pr-2", removable).compile();
$:
  inputClasses = th.create("SelectListInput").prepend("select-list-input", true).append("invisible", disabled).append("caret-transparent", !filterable).append("relative group peer inline w-full bg-transparent outline-none border-none", true).append("cursor-pointer", !multiple && !filterable).compile();
$:
  triggerClasses = th.create("SelectListButtonIconWrapper").append("absolute inset-y-0 right-2 flex items-center outline-none", true).compile();
$:
  iconClasses = th.create("SelectListButtonIcon").option("iconCaretSizes", size, true).append("transition-transform duration-300 origin-center", !!caret && roticon).append(
    typeof roticon === "string" ? roticon : "-rotate-180",
    $context?.visible && roticon && !!caret
  ).append("ml-2 pointer-events-none", true).compile();
async function handleRemoveTag(item) {
  if (!removable)
    return;
  let shouldRemove = false;
  if (item && item.value) {
    shouldRemove = await Promise.resolve(
      onBeforeRemove(item, $context.input)
    );
    if (shouldRemove)
      context.remove(item.value);
  }
  $context.input?.focus();
  return shouldRemove;
}
async function handleAddTag(value) {
  if (!$context.input)
    return;
  const item = await onBeforeAdd(value, $context.input);
  if (item) {
    item.selected = true;
    context.add(item);
    $context.input.value = "";
  }
  $context.input.focus();
}
async function handleFilter(query = "", key = "") {
  if (!$context.filtering && !multiple) {
    context.update((s) => {
      return { ...s, persisted: [...s.selected], selected: [] };
    });
    $context.filtering = true;
  }
  if (!$context.visible) {
    context.open();
    setTimeout(() => {
      if ($context.input) {
        if (key.length === 1)
          $context.input.value = key;
        $context.input.focus();
      }
    });
  } else {
    context.filter(query);
  }
}
function handleClick(e) {
  const isOpen = $context.visible;
  context.toggle();
  setTimeout(() => {
    if (isOpen)
      $context.input?.focus();
  });
}
function handleInputClick(e) {
  if (!multiple && !filterable) {
    const isOpen = $context.visible;
    context.toggle();
    setTimeout(() => {
      if ($context.trigger && isOpen) {
        $context.input?.focus();
      }
    });
  } else if (!filterable && !$context.visible) {
    e.preventDefault();
    context.toggle();
  } else if (multiple) {
    $context.filtering = true;
  }
}
function handleInputUpdate(e) {
}
async function handleInputKeydown(e) {
  if (multiple && $context.input && ["Backspace", "Enter"].includes(e?.key || "")) {
    if (e.key === "Enter" && !newable) {
      $context.input.value = "";
    } else if (e.key === "Backspace" && removable && $context.selected.length && !$context.input.value.length) {
      e.preventDefault();
      const last = selected.slice(-1)[0];
      if (last && removable) {
        const shouldRemove = await handleRemoveTag(last);
        if (shouldRemove) {
          $context.input.focus();
          context.close();
        }
      }
    } else if (multiple && e.key === "Enter" && $context.input.value && newable) {
      const value = $context.input.value || "";
      if (value) {
        e.preventDefault();
        handleAddTag(value);
      }
    }
  } else if ($context.input && filterable) {
    if (["ArrowDown", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
      if (!$context.visible)
        context.open();
      const container = $context.panel?.firstChild;
      const children = !container?.children ? [] : Array.from(container.children);
      if (children[0])
        children[0].focus();
    } else if (["Enter"].includes(e.key)) {
      if ($context.filtering) {
        const current = $context.selected[0];
        if (current)
          context.select(current);
        $context.filtering = false;
        handleFilter("", e.key);
      }
    } else if (!["Backspace", "Enter"].includes(e.key)) {
      let query = $context.input?.value || "";
      if (e.key.length === 1)
        query += e.key;
      handleFilter(query, e.key);
    }
  }
}
async function handleInputKeyUp(e) {
  if (["Backspace"].includes(e.key)) {
    handleFilter($context.input?.value);
  }
}
function setInitialValue(el) {
  if (!multiple && labels.length)
    el.value = labels[0] + "";
}
</script>

<!-- <div> -->
<Flushed disabled={variant !== 'flushed'} {theme} {focused} group>
	<div bind:this={$context.trigger} role="button" aria-disabled={disabled} class={containerClasses}>
		<div class={contentWrapperClasses}>
			{#if multiple && selected.length}
				<slot name="tags" {handleRemoveTag}>
					{#each selected as item}
						<button on:click={() => handleRemoveTag(item)} class={badgeButtonClasses}>
							<Badge {rounded} {theme} {size} {...badgeProps} class={badgeClasses}>
								<span class="pointer-events-none pr-1">
									{item?.label}
								</span>
								{#if removable}
									<span class="absolute inset-y-0 right-1.5 top-0.5">
										<slot name="icon">×</slot>
									</span>
								{/if}
							</Badge>
						</button>
					{/each}
				</slot>
			{/if}
			<div class={inputWrapperClasses}>
				<slot name="input" {handleInputUpdate} {handleInputKeydown} {handleInputClick}>
					<input
						aria-controls={name}
						{...$$restProps}
						bind:this={$context.input}
						use:setInitialValue
						role="combobox"
						type="text"
						aria-expanded={$context.visible}
						aria-haspopup="true"
						aria-disabled={disabled}
						{disabled}
						placeholder={!multiple || (!selected.length && placeholder) ? placeholder || '' : ''}
						class={inputClasses}
						on:input={handleInputUpdate}
						on:keydown={handleInputKeydown}
						on:keyup={handleInputKeyUp}
						on:click={handleInputClick}
					/>
				</slot>
			</div>
		</div>
		<button tabindex="-1" on:click={handleClick} class={triggerClasses}>
			<slot name="caret" handleCaretClick={handleClick}>
				<svelte:component this={Icon} icon={activeIcon} class={iconClasses} />
			</slot>
		</button>
	</div>
</Flushed>
