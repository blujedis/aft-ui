import type { ThemeColor, ThemeFocused } from '../../types';
import type { flushed } from './config';

export type FlushedVariant = keyof typeof flushed;

export type FlushedProps = {
	disabled?: boolean;
	focused?: ThemeFocused;
	group?: boolean;
	peer?: boolean;
	theme?: ThemeColor;
	variant?: FlushedVariant;
};

export const flushedDefaults: Partial<FlushedProps> = {
	peer: true,
	theme: 'light',
	variant: 'flushed'
};
