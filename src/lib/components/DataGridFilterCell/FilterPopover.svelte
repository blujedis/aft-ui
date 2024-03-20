<script lang="ts">
	import type { ThemeColor, ThemeRounded } from '$lib/types';
	import {
		SelectList,
		SelectListButton,
		SelectListOption,
		SelectListPanel,
		Input,
		Radio,
		filterPopoverDefaults
	} from '$lib/components';
	import { themeStore, themer } from '$lib/theme';
	import { useColorMode, useFocusTrap } from '$lib/hooks';
	import type { DataGridFilterListItem } from '../DataGrid/filter';

	export let rounded = 'none' as ThemeRounded;
	export let filters = [] as DataGridFilterListItem[];
	export let data = {
		...filterPopoverDefaults
	};
	export let onChange = (value: typeof data) => {};

	let theme = 'frame' as ThemeColor;
	let selectTwo: SelectList<DataGridFilterListItem>;

	const [bindFocusTrap, handleFocusTrap] = useFocusTrap();
	const isDark = useColorMode();

	const th = themer($themeStore);

	$: containerClasses = th
		.create('FilterPopoverContainer')
		.option('common', 'bordered', true)
		.option('panelContainerBg', theme, theme)
		.append('absolute popover flex-col items-center w-56 p-4 shadow-sm border', true)
		.compile();

	function handleChange(e?: any) {
		setTimeout(() => {
			onChange(data);
		});
	}

	function handleInputChange(e?: any) {
		// if (!e.target.value) {
		// 	selectTwo.store.restore();
		// 	return;
		// }
		if (!data.criteriaTwo && data.valueTwo) {
			data.criteriaTwo = 'like';
			// selectTwo.store.select('like');
			handleChange();
		}
	}
</script>

<svelte:window on:keydown={handleFocusTrap} />

<div class={containerClasses} use:bindFocusTrap>
	<div class="flex-col items-center space-y-2">
		<SelectList
			items={filters}
			size="sm"
			{rounded}
			hovered
			focused
			placeholder="Please Select"
			variant={$isDark ? 'soft' : 'outlined'}
			bind:value={data.criteriaOne}
			let:filtered
			onChange={handleChange}
		>
			<SelectListButton class={!$isDark ? 'bg-white' : ''} />
			<SelectListPanel shadowed="md" full class={!$isDark ? 'bg-white' : ''}>
				{#each filtered as item (item)}
					<SelectListOption as="button" key={item.value}>
						{item.label}
					</SelectListOption>
				{/each}
			</SelectListPanel>
		</SelectList>
		{#if !['empty', '!empty'].includes(data.criteriaOne)}
			<Input
				type="text"
				bind:value={data.valueOne}
				size="sm"
				{rounded}
				focused
				full
				variant={$isDark ? 'soft' : 'outlined'}
				on:change={handleChange}
			/>
		{/if}
	</div>
	<div class="flex items-center space-x-4 my-2">
		<Radio
			name="andor"
			value="and"
			bind:group={data.join}
			focused
			theme="secondary"
			on:change={handleChange}>AND</Radio
		>
		<Radio
			name="andor"
			value="or"
			bind:group={data.join}
			focused
			theme="secondary"
			on:change={handleChange}>OR</Radio
		>
	</div>
	<div class="flex-col items-center space-y-2">
		<SelectList
			bind:this={selectTwo}
			items={filters}
			size="sm"
			{rounded}
			hovered
			focused
			placeholder="Please Select"
			variant={$isDark ? 'soft' : 'outlined'}
			bind:value={data.criteriaTwo}
			let:filtered
			onChange={handleChange}
		>
			<SelectListButton class={!$isDark ? 'bg-white' : ''} />
			<SelectListPanel shadowed="md" full class={!$isDark ? 'bg-white' : ''}>
				{#each filtered as item (item)}
					<SelectListOption as="button" key={item.value}>
						{item.label}
					</SelectListOption>
				{/each}
			</SelectListPanel>
		</SelectList>
		{#if !['empty', '!empty'].includes(data.criteriaTwo)}
			<Input
				type="text"
				bind:value={data.valueTwo}
				size="sm"
				{rounded}
				focused
				full
				variant={$isDark ? 'soft' : 'outlined'}
				on:change={handleInputChange}
			/>
		{/if}
	</div>
</div>
<kbd></kbd>
