<script>import classNames from "classnames";
export let config;
</script>

<div class="mt-4">
	<div class="grid grid-cols-5 gap-4">
		{#if config}
			{#each Object.entries(config) as [color, value]}
				{#if color !== '$base'}
					<div class={classNames('flex items-center text-center justify-center w-20 h-20', value)}>
						{color}
					</div>
				{/if}
			{/each}
		{/if}
	</div>
</div>
