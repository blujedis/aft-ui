import type { DataGridDataItem } from '../DataGrid/module';
import { type PaginationProps } from '../Pagination/module';
import type { PaginationPageProps } from '../PaginationPage';
export type DataGridPagerProps<Tag, D extends Record<string, any> = DataGridDataItem> = PaginationProps<D> & Pick<PaginationPageProps<Tag>, 'as' | 'focused' | 'next' | 'previous'>;
export declare const gridPagerDefaults: Partial<DataGridPagerProps<'button'>>;
