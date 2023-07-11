import { type Writable } from 'svelte/store';
export interface PaginatorOptions<T = any> {
    items?: string | number | T[];
    page?: string | number;
    pageSize?: string | number;
    pages?: string | number;
    ellipsis?: boolean;
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
declare function getPaginator<T = any>(options?: PaginatorOptions<T>): Paginator<any>;
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
declare function usePaginator<T = any>(options: PaginatorOptions<T>): PaginatorStore<T>;
export { getPaginator };
export default usePaginator;
