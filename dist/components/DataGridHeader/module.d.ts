import type { ResizerPosition, ResizerRectangle } from '../../hooks';
import type { ThemeColor, ThemeFocused, ThemeRounded, ThemeSize } from '../../types';
export type DataGridHeaderProps = {
    autocols?: boolean;
    divided?: boolean;
    focused?: ThemeFocused;
    rounded?: ThemeRounded;
    size?: ThemeSize;
    stacked?: boolean;
    sticky?: boolean;
    theme?: ThemeColor;
    onAfterResize?: (props: ResizerPosition & ResizerRectangle) => any;
};
export declare const gridHeaderDefaults: Partial<DataGridHeaderProps>;
