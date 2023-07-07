<script lang="ts">
	export let label = 'List';
	export let value = '' as any;
	export let placeholder = 'Please Select' as string | null | false;
	export let items = [] as (string | { label: string; value: string | number })[];

	$: list = items.map((v) =>
		typeof v === 'string' ? { label: v.charAt(0).toUpperCase() + v.slice(1), value: v } : v
	) as { label: string; value: string }[];
</script>

<label class="flex flex-col">
	<div class="mb-1 text-sm font-semibold">{label}:</div>
	<div>
		<select bind:value class="text-sm border-slate-300 form-select">
			{#if placeholder}
				<option selected disabled value=""
					>{typeof placeholder === 'string' ? placeholder : 'Please Select'}</option
				>
			{/if}
			{#each list as item}
				<option value={item.value}>{item.label}</option>
			{/each}
		</select>
	</div>
</label>
