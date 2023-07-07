import { get, writable, type Writable } from 'svelte/store';

export interface PaginatorOptions<T = any> {
	items?: string | number | T[]; // the number of items in the collection or a collection itself.
	page?: string | number; // the current page selected.
	pageSize?: string | number; // the number of items per page ex: 10, 25, 50.
	pages?: string | number; // number of pages shown, your button count.
	ellipsis?: boolean; // when true include ellipsis in active pages collection.
}

export interface Paginator<T = any> extends PaginatorOptions<T> {
	items: number;
	page: number;
	pageSize: number;
	pages: number;
	ellipsis: boolean;

	totalPages: number;
	startPage: number;
	endPage: number;
	startRecord: number;
	endRecord: number;
	activePages: (string | number)[];
}

// function getPaginator<T = any>(options: PaginatorOptions<T>): Paginator<T>;
// function getPaginator<T = any>(
//   items?: string | number | T[],
//   page?: string | number,
//   size?: string | number,
//   pages?: string | number
// ): Paginator<T>;
// function getPaginator<T = any>(
//   itemsOrOptions?: string | number | T[] | PaginatorOptions<T>,
//   page?: string | number,
//   pageSize?: string | number,
//   pages?: string | number
// ) {

function getPaginator<T = any>(options = {} as PaginatorOptions<T>) {
	// let items = itemsOrOptions as string | number | T[];

	// if (!Array.isArray(itemsOrOptions) && typeof itemsOrOptions === 'object') {
	//   const { items: initItems, page: initPage, pageSize: initDisplayed, pages: initButtons } = itemsOrOptions;
	//   items = initItems as string | number | T[];
	//   page = initPage as string | number;
	//   pageSize = initDisplayed as string | number;
	//   pages = initButtons as string | number;
	// }

	// eslint-disable-next-line prefer-const
	let { items, page, pageSize, pages, ellipsis } = {
		items: 0,
		page: 1,
		pageSize: 10,
		pages: 3,
		ellipsis: false,
		...options
	} as Required<PaginatorOptions<T>>;

	// Ensure ints as user may pass a string.
	if (Array.isArray(items)) items = items.length;

	items = parseInt(items as string);
	page = parseInt(page as string);
	pageSize = parseInt(pageSize as string);
	pages = parseInt(pages as string);

	// Total number of pages based on the
	// size or number of items to display.
	const totalPages = Math.ceil(items / pageSize);

	// ensure current page isn't out of range
	if (page < 1) page = 1;
	else if (page > totalPages) page = totalPages;

	let startPage: number;
	let endPage: number;

	// Total is less than shown so show all pages.
	if (totalPages <= pages) {
		startPage = 1;
		endPage = totalPages;
	} else {
		// Caclulate before/after current page.
		const pagesBeforeCurrent = Math.floor(pages / 2);
		const pagesAfterCurrent = Math.ceil(pages / 2) - 1;

		// Calculate start
		if (page <= pagesBeforeCurrent) {
			startPage = 1;
			endPage = pages;
		}

		// Calcutate end
		else if (page + pagesAfterCurrent >= totalPages) {
			startPage = totalPages - pages + 1;
			endPage = totalPages;
		}

		// Calcluate middle of range.
		else {
			startPage = page - pagesBeforeCurrent;
			endPage = page + pagesAfterCurrent;
		}
	}

	// Get start record for range.
	const startRecord = (page - 1) * pageSize;

	// Get end record for range.
	const endRecord = Math.min(startRecord + pageSize - 1, items - 1);

	// Array of pages.
	let activePages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i) as (
		| string
		| number
	)[];

	if (ellipsis) {
		const prefix = [] as (string | number)[];
		const suffix = [] as (string | number)[];

		if (!activePages.includes(1)) {
			prefix.push(1);
			if ((activePages[0] as number) > 2) prefix.push('...');
		}

		if (!activePages.includes(totalPages - 1)) suffix.push('...');
		if (!activePages.includes(totalPages)) suffix.push(totalPages);

		activePages = [...prefix, ...activePages, ...suffix];
	}

	const api: Paginator = {
		items, // collection length of items
		page, // the current page.
		pageSize, // the items size/count shown per page.
		pages, // the number of page buttons to display.
		ellipsis, // when true ellipsis are included as needed.

		totalPages, // total pages based on size/count of items displayed.
		startPage, // the start page in the pages array.
		endPage, // the end page in the pages array.
		startRecord, // the starting index in the range.
		endRecord, // the ending index in the range.
		activePages // the array of pages number for current config.
	};

	return api;
}

export type PaginatorStore<T = any> = Writable<Paginator<T>> & {
	getRange(items?: T[]): T[] | null;
	update(options: PaginatorOptions<T>): void;
	hasPage(page: string | number): boolean;
	hasPrev(): boolean;
	hasNext(): boolean;
	goto(page: string | number): void;
	prev(): void;
	next(): void;
	reset(options?: PaginatorOptions<T>): void;
};

/**
 * Gets new pagination store.
 *
 * @param options paginator options for pagination store.
 */
function usePaginator<T = any>(options: PaginatorOptions<T>): PaginatorStore<T> {
	const initialOptions = { ...options };
	const initialPaginator = getPaginator(options);

	const store = writable({ ...initialPaginator });

	/**
	 * Gets the current store's items.
	 */
	function getStore() {
		return get(store);
	}

	/**
	 * Updates the store using new or partial options.
	 *
	 * @param options paginator options to update the store with.
	 */
	function update(options: PaginatorOptions<T>) {
		store.update((s) => {
			const { items, page, pageSize, pages, ellipsis } = s;
			return getPaginator({ items, page, pageSize, pages, ellipsis, ...options });
		});
	}

	/**
	 * Gets a range of items using start and end rage values.
	 *
	 * @param items optional items used to parse out current range of items.
	 */
	function getRange(items?: T[]) {
		const { items: storeItems, startRecord: rangeStart, endRecord: rangeEnd } = getStore();
		if (Array.isArray(items)) return items.slice(rangeStart, rangeEnd + 1);
		else if (Array.isArray(storeItems)) return storeItems.slice(rangeStart, rangeEnd + 1);
		else return null;
	}

	/**
	 * Navigate to a specific page.
	 *
	 * @param page the page number to navigate to.
	 */
	function goto(page: string | number) {
		update({ page });
	}

	/**
	 * Navigate to a the previous page.
	 */
	function prev() {
		goto(getStore().page - 1);
	}

	/**
	 * Navigate to a the next page.
	 */
	function next() {
		goto(getStore().page + 1);
	}

	function hasPage(page: string | number) {
		const { startPage, endPage } = getStore();
		page = parseInt(page + '');
		return page >= startPage && page <= endPage;
	}

	function hasNext() {
		return hasPage(getStore().page + 1);
	}

	function hasPrev() {
		return hasPage(getStore().page - 1);
	}

	/**
	 * Reset the store with initial options merged with new options provided if any.
	 */
	function reset(options?: PaginatorOptions<T>) {
		store.set(getPaginator({ ...initialOptions, ...options }));
	}

	return {
		...store,
		getRange,
		update,
		hasPage,
		hasPrev,
		hasNext,
		goto,
		prev,
		next,
		reset
	};
}

export { getPaginator };

export default usePaginator;
