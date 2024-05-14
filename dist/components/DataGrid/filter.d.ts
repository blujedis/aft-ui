import type { DataGridColumnConfig } from '.';
export type DataGridFilterListHandler = (value: any, query: any) => boolean;
export type DataGridFilterCriteria<D> = {
    query: string;
    accessor: keyof D;
    condition: any;
    join?: 'and' | 'or';
    handler?: DataGridFilterListHandler;
};
export type DataGridFilterListItem = {
    label: string;
    value: any;
    handler: DataGridFilterListHandler;
};
export declare const gridDefaultFilters: DataGridFilterListItem[];
export declare function filterRows<D extends Record<string, unknown>, C extends DataGridColumnConfig<D>>(criteria?: DataGridFilterCriteria<D>[], rows?: D[], columns?: C[]): D[];
