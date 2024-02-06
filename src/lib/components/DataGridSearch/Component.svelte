<script lang="ts">
	import { type DataGridSearchProps, gridSearchDefaults as defaults } from './module';
	import { themeStore, pickCleanProps, themer } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import type { DataGridContext } from '$lib/components/DataGrid';
	import { getContext } from 'svelte';
	import { DataGridCell } from '$lib/components/DataGridCell';
	import { debounce, boolToMapValue } from '$lib/utils';

	type $$Props = DataGridSearchProps & ElementProps<'div'>;

	const context = getContext('DataGrid') as DataGridContext;

	export let { action, focused, method, rounded, size, strategy, theme, variant } = {
		...defaults,
		focused: context.globals?.focused,
		rounded: context.globals?.rounded,
		size: context.globals?.size,
		theme: context.globals?.theme,
		variant: context.globals.variant,
		// ...pickCleanProps(
		// 	context?.globals,
		// 	'autocols',
		// 	'columns',
		// 	'focused',
		// 	'rounded',
		// 	'size',
		// 	'theme',
		// 	'variant'
		// )
	} as Required<$$Props>;

	const th = themer($themeStore);

	$: gridSearchClasses = th
		.create('DataGridSearch')
		.prepend('datagrid__search', true)
		//.append('py-2 px-4', true)
		.compile(true);

	$: gridSearchInputClasses = th
		.create('DataGridSearchInput')
		// .variant('gridSearch', variant, theme, variant)
		.option('fieldFontSizes', size, size)
		.option('fieldPadding', size, size)
		.option('focusedOutline', typeof focused === 'string' ? focused : theme, focused)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.prepend('datagrid__search_input', true)
		.append('pl-10 focus:outline-none bg-transparent px-4 py-2 w-full rounded-b-none', true)
		.compile();

	function handleSearchSubmit(
		e: Event & {
			readonly submitter: HTMLElement | null;
		} & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	): void {
		if (strategy !== 'submit' || method || action) return;
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		if (form) {
			debounce(() => {
				const data = new FormData(form);
				context.filter(data.get('search')?.toString() || '');
			})();
		}
	}
	function handleSearchInput(
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		e.preventDefault();
		const input = e.target as HTMLInputElement;
		if (input)
			debounce(() => {
				context.filter(input.value || '');
			})();
	}
</script>

<DataGridCell size="unstyled" class={gridSearchClasses} full>
	<slot search={context.filter}>
		<form id="search_form" name="search_form" {action} {method} on:submit={handleSearchSubmit}>
			<div class="flex items-center">
				<div class="flex-1 relative p-1">
					<svg
						class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-frame-400 ml-4"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
							clip-rule="evenodd"
						/>
					</svg>
					{#if strategy === 'input'}
						<input
							type="search"
							name="search"
							placeholder="filter"
							class={gridSearchInputClasses}
							on:input={handleSearchInput}
						/>
					{:else}
						<input
							type="search"
							name="search"
							placeholder="filter"
							class={gridSearchInputClasses}
						/>
					{/if}
				</div>
			</div>
		</form>
	</slot>
</DataGridCell>
