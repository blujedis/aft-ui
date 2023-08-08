import type { ThemeColor, ThemeFocused, ThemeRounded, ThemeSize } from '$lib/types';
import type { DataGridColumnConfig, DataGridVariant } from '../DataGrid/module';

export type DataGridHeaderProps = {
	autocols?: boolean;
	columns?: DataGridColumnConfig[];
	divided?: boolean;
	focused?: ThemeFocused;
	rounded?: ThemeRounded;
	size?: ThemeSize;
	sticky?: boolean;
	theme?: ThemeColor;
	variant?: DataGridVariant;
};

export const gridHeaderDefaults: Partial<DataGridHeaderProps> = {
	autocols: true,
	focused: true,
	variant: 'outlined'
};
