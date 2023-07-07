<script lang="ts">
	export let label = 'Option:';
	export let checked = false;
</script>

<label class="inline-flex items-center">
	<span class="mr-3 text-sm">{label}:</span>
	<input
		type="checkbox"
		bind:checked
		class="text-slate-600 border-slate-400 focus:outline-none focus:ring-offset-2 focus:ring-slate-600/30 form-checkbox"
	/>
</label>
