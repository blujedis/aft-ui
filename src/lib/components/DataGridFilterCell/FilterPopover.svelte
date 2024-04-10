<script lang="ts">
	import type { ThemeColor, ThemeRounded } from '$lib/types';
	import {
		SelectList,
		SelectListButton,
		SelectListOption,
		SelectListPanel,
		Input,
		Radio,
		filterPopoverDefaults,
		Button
	} from '$lib/components';
	import { themeStore, themer } from '$lib/theme';
	import { useColorMode, useFocusTrap } from '$lib/hooks';
	import type { DataGridFilterListItem } from '../DataGrid/filter';

	export let rounded = 'sm' as ThemeRounded;
	export let filters = [] as DataGridFilterListItem[];
	export let data = {
		...filterPopoverDefaults
	};
	export let applyFilter = () => {};
	export let resetFilter = () => {};

	let theme = 'frame' as ThemeColor;
	let selectTwo: SelectList<DataGridFilterListItem>;

	const [bindFocusTrap, handleFocusTrap] = useFocusTrap();
	const isDark = useColorMode();

	$: valueOneHidden = ['empty', '!empty'].includes(data.criteriaOne);
	$: valueTwoHidden = ['empty', '!empty'].includes(data.criteriaTwo);

	const th = themer($themeStore);

	$: containerClasses = th
		.create('FilterPopoverContainer')
		.option('panelBorder', theme, true)
		.option('panelContainerBg', theme, true)
		.append('absolute popover flex-col items-center w-56 p-4 shadow-sm border', true)
		.compile();

	function handleApplyFilter() {
		setTimeout(() => {
			applyFilter();
		});
	}

	function handleInputChange(e?: any) {
		if (typeof data.valueTwo === 'string' && !data.criteriaTwo) {
			data.criteriaTwo = 'like';
			selectTwo.select('like');
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
			full
			placeholder="Please Select"
			variant="outlined"
			theme="frame"
			bind:value={data.criteriaOne}
			let:filtered
			onChange={handleApplyFilter}
		>
			<SelectListButton class="bg-white dark:bg-frame-800" />
			<SelectListPanel shadowed="md" full>
				{#each filtered as item (item)}
					<SelectListOption as="button" key={item.value}>
						{item.label}
					</SelectListOption>
				{/each}
			</SelectListPanel>
		</SelectList>
		<Input
			type="text"
			bind:value={data.valueOne}
			size="sm"
			{rounded}
			focused
			full
			variant="outlined"
			theme="frame"
			placeholder="Enter value"
			class={valueOneHidden ? 'hidden' : 'bg-white dark:bg-frame-800'}
			on:input={handleApplyFilter}
		/>
	</div>
	<div class="flex items-center space-x-4 my-2">
		<Radio
			id="and"
			name="andor"
			value="and"
			bind:group={data.join}
			focused
			theme="primary"
			on:change={handleApplyFilter}>AND</Radio
		>
		<Radio
			id="or"
			name="andor"
			value="or"
			bind:group={data.join}
			focused
			theme="primary"
			on:change={handleApplyFilter}>OR</Radio
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
			full
			placeholder="Please Select"
			variant="outlined"
			theme="frame"
			bind:value={data.criteriaTwo}
			let:filtered
			onChange={handleApplyFilter}
		>
			<SelectListButton class="bg-white dark:bg-frame-800" />
			<SelectListPanel shadowed="md" full>
				{#each filtered as item (item)}
					<SelectListOption as="button" key={item.value}>
						{item.label}
					</SelectListOption>
				{/each}
			</SelectListPanel>
		</SelectList>
		<Input
			type="text"
			bind:value={data.valueTwo}
			size="sm"
			{rounded}
			focused
			full
			variant="outlined"
			theme="frame"
			class={valueTwoHidden ? 'hidden' : 'bg-white dark:bg-frame-800'}
			placeholder="Enter value"
			on:change={handleInputChange}
			on:input={handleApplyFilter}
		/>
	</div>
	<div class="flex items-center space-x-2 mt-4 justify-end pr-1">
		<Button
			variant="outlined"
			theme="frame"
			on:click={resetFilter}
			size="sm"
			class="bg-white dark:bg-frame-800">Reset</Button
		>
	</div>
</div>
