import type { ThemeColor, ThemeFocused, ThemeSize } from '$lib/types';
import type { DataGridColumnConfig } from '../DataGrid/module';

export type DataGridFilterProps = {
	autocols?: boolean;
	columns?: DataGridColumnConfig[];
	focused?: ThemeFocused;
	size?: ThemeSize;
	theme?: ThemeColor;
};

export const gridFilterDefaults: Partial<DataGridFilterProps> = {
	autocols: true,
	focused: true
};
