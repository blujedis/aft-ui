<script>import { selectDefaults as defaults } from "./module";
import themeStore, { ConditionalElement, Flushed, ensureArray, flushed, themer } from "../..";
import { onMount, setContext } from "svelte";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
import { useSelect } from "../../stores/select";
export let {
  disabled,
  focused,
  full,
  multiple,
  placeholder,
  rows,
  rounded,
  selected,
  shadowed,
  size,
  theme,
  transitioned,
  variant,
  unstyled
} = {
  ...defaults
};
const store = useSelect({ multiple, selected: ensureArray(selected) });
export const context = setContext("SelectContext", {
  ...store
});
const th = themer($themeStore);
$:
  inputClasses = th.create("Select").variant("select", variant, theme, true).option("focusedRing", theme, focused && variant !== "flushed").option("common", "transition", transitioned).option("placeholders", theme, true).option("fieldFontSizes", size, size).option("fieldPadding", size, size).option("roundeds", rounded, rounded && variant !== "flushed").option("shadows", shadowed, shadowed).option("disableds", theme, disabled).append("w-full", full).append("border-0 ring-0", variant !== "outlined").append("flex items-center justify-center pr-10 outline-none", true).append(multiple ? "form-multiselect" : "form-select", true).append($$restProps.class, true).compile(true);
const forwardedEvents = forwardEventsBuilder(get_current_component());
const component = Flushed;
$:
  console.log(theme);
</script>

<ConditionalElement as={component} {theme} condition={variant === 'flushed'} />

{#if variant === 'flushed'}
	<Flushed {theme}>
		<select
			{...$$restProps}
			use:forwardedEvents
			{multiple}
			size={rows}
			class={inputClasses}
			value={multiple ? $store.selected : $store.selected[0]}
		>
			{#if placeholder}
				<option value="" disabled selected
					>{typeof placeholder === 'string' ? placeholder : 'Please Select'}</option
				>
			{/if}
			<slot selectedItems={$store.selected} select={context.select} unselect={context.unselect} />
		</select>
	</Flushed>
{:else}
	<select
		{...$$restProps}
		use:forwardedEvents
		{multiple}
		size={rows}
		class={inputClasses}
		value={multiple ? $store.selected : $store.selected[0]}
	>
		{#if placeholder}
			<option value="" disabled selected
				>{typeof placeholder === 'string' ? placeholder : 'Please Select'}</option
			>
		{/if}
		<slot selectedItems={$store.selected} select={context.select} unselect={context.unselect} />
	</select>
{/if}
