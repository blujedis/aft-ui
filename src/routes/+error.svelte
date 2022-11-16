<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex w-full h-full justify-center items-center">
	<div class="p-10 w-full flex justify-center">
		<div class="h-60 flex items-center">
			<div class="border-r border-rose-500 text-7xl pr-4 text-rose-700">{$page.status}</div>
			<div class="pl-4 text-lg text-rose-700">{$page.error?.message}</div>
		</div>
	</div>
</div>
