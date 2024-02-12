import type { ThemeColor, ThemeFocused } from '$lib/types';

export type FlushedProps = {
	disabled?: boolean;
	focused?: ThemeFocused;
	group?: boolean;
	peer?: boolean;
	hovered?: boolean;
	selected?: boolean;
	theme?: ThemeColor;
};

export const flushedDefaults: Partial<FlushedProps> = {
	peer: true,
};
