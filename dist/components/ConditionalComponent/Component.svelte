<script>import {
  conditionaComponentDefaults as defaults
} from "./module";
export let { as, condition } = {
  ...defaults
};
$:
  wrap = typeof condition === "function" ? condition() : condition;
</script>

{#if wrap}
	<svelte:component this={as} {...$$restProps}>
		<slot />
	</svelte:component>
{:else}
	<slot />
{/if}
