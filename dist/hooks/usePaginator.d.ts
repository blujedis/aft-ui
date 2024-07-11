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
export declare function usePaginator<T = any>(options?: PaginatorOptions<T>): Paginator<any>;
