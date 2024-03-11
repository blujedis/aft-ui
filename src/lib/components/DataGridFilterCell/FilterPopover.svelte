<script lang="ts">
	import type { ThemeColor, ThemeRounded } from '$lib/types';
	import {
		SelectList,
		SelectListButton,
		SelectListOption,
		SelectListPanel,
		Input,
		Radio
	} from '$lib/components';
	import { themeStore, themer } from '$lib/theme';
	import { useColorMode, useFocusTrap } from '$lib/hooks';

	export let onChange = (data: Record<string, any>) => {};
	export let rounded = 'none' as ThemeRounded;
	export let queryByOne = '=';
	export let queryValueOne: string;
	export let queryByTwo = '=';
	export let queryValueTwo = '';
	export let queryAndOr = 'and';

	let theme = 'frame' as ThemeColor;

	const [bindFocusTrap, handleFocusTrap] = useFocusTrap();
	const isDark = useColorMode();

	const items = [
		{ label: 'Equal', value: '=' },
		{ label: 'Not Equal', value: '!=' },
		{ label: 'Greater than', value: '>' },
		{ label: 'Greater than or equal', value: '>=' },
		{ label: 'Less than', value: '<' },
		{ label: 'Less than or equal', value: '<=' },
		{ label: 'Empty', value: '0' }, // should we do null char? '\0'
		{ label: 'Not Empty', value: '!0' }
	];

	$: data = {
		byOne: '=',
		valueOne: queryValueOne,
		byTwo: '=',
		valueTwo: ''
	};

	const th = themer($themeStore);

	$: containerClasses = th
		.create('FilterPopoverContainer')
		.option('common', 'bordered', true)
		.option('panelContainerBg', theme, theme)
		.append('absolute popover flex-col items-center w-56 p-4 shadow-sm border', true)
		.compile();

		function handleChange() {
			onChange(data);
		}
</script>

<svelte:window on:keydown={handleFocusTrap} />

<div class={containerClasses} use:bindFocusTrap>
	<div class="flex-col items-center space-y-2">
		<SelectList
			{items}
			size="sm"
			{rounded}
			hovered
			focused
			placeholder="Please Select"
			variant={$isDark ? 'soft' : 'outlined'}
			bind:value={data.byOne}
			let:filtered
		>
			<SelectListButton class={!$isDark ? 'bg-white' : ''} />
			<SelectListPanel shadowed="md" full class={!$isDark ? 'bg-white' : ''}>
				{#each filtered as item}
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
			variant={$isDark ? 'soft' : 'outlined'}
		/>
	</div>
	<div class="flex items-center space-x-4 my-2">
		<Radio name="andor" value="and" bind:group={queryAndOr} focused theme="secondary">AND</Radio>
		<Radio name="andor" value="or" bind:group={queryAndOr} focused theme="secondary">OR</Radio>
	</div>
	<div class="flex-col items-center space-y-2">
		<SelectList
			{items}
			size="sm"
			{rounded}
			hovered
			focused
			placeholder="Please Select"
			variant={$isDark ? 'soft' : 'outlined'}
			bind:value={data.byTwo}
			let:filtered
		>
			<SelectListButton class={!$isDark ? 'bg-white' : ''} />
			<SelectListPanel shadowed="md" full class={!$isDark ? 'bg-white' : ''}>
				{#each filtered as item}
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
			variant={$isDark ? 'soft' : 'outlined'}
		/>
	</div>
</div>
