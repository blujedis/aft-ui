<script lang="ts">
	import { getContext } from 'svelte';
	import type { TabsContext } from './types';

  export let title = '';
  export let visible = false;

  const classes = `inline-block text-sm font-medium text-center disabled:cursor-not-allowed`;
  const context = getContext<TabsContext>('context');

  function mount(node: HTMLElement) {
      context.select(node);
    const destroy = context.subscribe(s => { 
      if (!s.selected.includes(node)) 
        visible = false;
    });
    return { destroy };
  }

</script>

<li class={classes}>

  <button on:click={() => visible = true} class={classes}>
    <slot name="title">
      {title}
    </slot>
  </button>


  {#if visible}
    <div class="hidden">
      <div use:mount>
        <slot />
      </div>
    </div>
  {/if}
</li>