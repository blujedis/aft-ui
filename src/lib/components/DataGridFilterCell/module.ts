import type { ThemeColor, ThemeFocused, ThemeSize } from '$lib/types';
import type { DataGridColumnConfig } from '../DataGrid/module';

export type DataGridFilterCellProps = {
	column?: DataGridColumnConfig;
	focused?: ThemeFocused;
	size?: ThemeSize;
	stacked?: boolean;
	theme?: ThemeColor;
};

export const filterPopoverDefaults = {
	criteriaOne: 'like',
	valueOne: '',
	criteriaTwo: '',
	valueTwo: '',
	join: 'and' as 'and' | 'or'
};

export const gridFilterCellDefaults: Partial<DataGridFilterCellProps> = {
	focused: true
};
