import type { ThemeColor, ThemeSize } from '$lib/types';
import type { DataGridColumnConfig } from '../DataGrid/module';

export type DataGridBodyProps = {
	autocols?: boolean;
	columns?: DataGridColumnConfig[];
	divided?: boolean;
	size?: ThemeSize;
	stacked?: boolean;
	striped?: boolean;
	theme?: ThemeColor;
};

export const gridBodyDefaults: Partial<DataGridBodyProps> = {};
