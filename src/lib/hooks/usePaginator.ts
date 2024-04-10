export interface PaginatorOptions<T = any> {
	items?: string | number | T[]; // the number of items in the collection or a collection itself.
	page?: string | number; // the start page that is selected selected.
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

export function usePaginator<T = any>(options = {} as PaginatorOptions<T>) {

	// eslint-disable-next-line prefer-const
	let { items, page, pageSize, pages, ellipsis } = {
		items: 0,
		page: 1,
		pageSize: 10,
		pages: 10,
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