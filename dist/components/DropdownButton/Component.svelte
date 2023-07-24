<script>import { Button } from "../Button";
import { getContext } from "svelte";
import { dropdownButtonDefaults as defaults } from "./module";
import { Icon } from "../Icon";
import themeStore, { themer } from "../..";
const context = getContext("Dropdown");
const { multiple, ...rest } = context.globals;
export let {
  as,
  caret,
  disabled,
  focused,
  full,
  href,
  placeholder,
  rounded,
  roticon,
  size,
  shadowed,
  theme,
  transitioned,
  underlined,
  variant,
  unstyled
} = {
  ...defaults,
  ...rest
};
const buttonProps = {
  as: context.strategy !== "menu" || !href ? as : "a",
  disabled,
  focused,
  full,
  rounded,
  size,
  shadowed,
  theme,
  transitioned,
  underlined,
  variant,
  unstyled
  // class: 'justify-between capitalize '
};
$$restProps.class = "justify-between " + $$restProps.class;
let ref;
const th = themer($themeStore);
$:
  ref && context.update((s) => ({ ...s, button: ref }));
$:
  selected = $context.items.filter((item) => $context.selected.includes(item.value))[0];
$:
  label = selected ? selected.label : placeholder || "";
$:
  iconClasses = th.create("DropdownButtonIcon").option("iconDropdownSizes", size, true).append("transition-transform duration-300 origin-center", !!caret && roticon).append(
    typeof roticon === "string" ? roticon : "-rotate-180",
    $context.visible && roticon && !!caret
  ).append("ml-2 shrink pointer-events-none pt-px", true).compile();
function handleClick(e) {
  if (context.trigger !== "click")
    return;
  e.preventDefault();
  e.stopPropagation();
  if (e.target)
    ref = e.target;
  context.toggle();
}
function handleMouseEnter() {
  if (context.trigger !== "hover")
    return;
  context.toggle();
}
function setButtonRef(el) {
  context.update((s) => ({ ...s, button: el }));
}
</script>

<div>
	<Button
		{...buttonProps}
		{...$$restProps}
		on:click={handleClick}
		on:mouseenter={handleMouseEnter}
		strategy="text"
		aria-expanded={$context.visible}
		aria-haspopup="true"
	>
		<div class="flex items-center pointer-events-none">
			<slot>
				{#if ['select', 'multiselect'].includes(context.strategy)}
					<div>
						{label}
					</div>
				{/if}
			</slot>
			{#if caret}
				<Icon icon={caret} class={iconClasses} />
			{/if}
		</div>
	</Button>
</div>
