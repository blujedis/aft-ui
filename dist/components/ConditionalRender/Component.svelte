<script>import { conditionalRenderDefaults as defaults } from "./module";
export let { condition } = {
  ...defaults
};
$:
  shouldRender = typeof condition === "function" ? condition() : condition;
</script>

{#if shouldRender}
	<slot />
{:else}
	<slot name="unsatisfied" />
{/if}
