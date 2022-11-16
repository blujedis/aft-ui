<script lang="ts">
	const components = [
		{ label: 'Button', path: '/components/button' },
		{ label: 'Label', path: '/components/label' },
		{ label: 'Icon', path: '/components/icon' },
		{ label: 'Box', path: '/components/box' },
		{ label: 'Input', path: '/components/input' },
		{ label: 'List', path: '/components/list' },
		{ label: 'Select', path: '/components/select' },
		{ label: 'Switcher', path: '/components/switcher' },
		{ label: 'Table', path: '/components/table' },
		{ label: 'Textarea', path: '/components/textarea' }
	];
</script>

<div class="p-4">
	<div class="grid grid-cols-3 gap-4 md:grid-cols-6">
		{#each components as comp}
			<a
				href={comp.path}
				class="inline-flex items-center justify-center bg-default-100 dark:bg-dark-800 p-6 hover:bg-default-200/75 dark:hover:bg-dark-800/90 dark:text-white border border-gray-200 dark:border-gray-600 rounded-sm shadow-sm"
			>
				{comp.label}
			</a>
		{/each}
	</div>
</div>
