import type { ResizerPosition, ResizerRectangle } from '$lib/hooks';
import type { ThemeColor, ThemeFocused, ThemeRounded, ThemeSize } from '$lib/types';
// import type { DataGridColumnConfig } from '../DataGrid/module';

export type DataGridHeaderProps = {
	autocols?: boolean;
	// columns?: DataGridColumnConfig[];
	divided?: boolean;
	focused?: ThemeFocused;
	rounded?: ThemeRounded;
	size?: ThemeSize;
	sticky?: boolean;
	theme?: ThemeColor;
	onAfterResize?: (props: ResizerPosition & ResizerRectangle) => any;
};

export const gridHeaderDefaults: Partial<DataGridHeaderProps> = {
	autocols: true,
	focused: true,
	onAfterResize: () => {}
};
