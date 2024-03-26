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
			variant="filled"
			theme="white"
			bind:value={data.criteriaOne}
			let:filtered
			onChange={handleApplyFilter}
		>
			<SelectListButton />
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
			variant="filled"
			theme="white"
			placeholder="Enter value"
			class={valueOneHidden ? 'hidden' : ''}
			on:input={handleApplyFilter}
		/>
	</div>
	<div class="flex items-center space-x-4 my-2">
		<Radio
			name="andor"
			value="and"
			bind:group={data.join}
			focused
			theme="secondary"
			on:change={handleApplyFilter}>AND</Radio
		>
		<Radio
			name="andor"
			value="or"
			bind:group={data.join}
			focused
			theme="secondary"
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
			variant="filled"
			theme="white"
			bind:value={data.criteriaTwo}
			let:filtered
			onChange={handleApplyFilter}
		>
			<SelectListButton />
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
			variant="filled"
			theme="white"
			class={valueTwoHidden ? 'hidden' : ''}
			placeholder="Enter value"
			on:change={handleInputChange}
			on:input={handleApplyFilter}
		/>
	</div>
	<div class="flex items-center space-x-2 mt-4 justify-end pr-1">
		<Button variant="outlined" theme="frame" underlined on:click={resetFilter} size="sm"
			>Reset</Button
		>
		<!-- <Button variant="text" underlined on:click={applyFilter}>Apply</Button> -->
	</div>
</div>
