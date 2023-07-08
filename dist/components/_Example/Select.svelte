<script>
	export let label = 'List';
	export let value = '';
	export let placeholder = 'Please Select';
	export let items = [];
	$: list = items.map((v) =>
		typeof v === 'string' ? { label: v.charAt(0).toUpperCase() + v.slice(1), value: v } : v
	);
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
