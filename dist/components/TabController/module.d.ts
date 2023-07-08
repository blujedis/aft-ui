import type { SelectStore, SelectValue } from '../../stores/select';
import type {
	ThemeColor,
	ThemeFocused,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '../../theme';
import type { TabVariant } from '../Tab';
export type TabControllerProps = {
	condensed?: boolean;
	focused?: ThemeFocused;
	full?: boolean;
	rounded?: ThemeRounded;
	selected: SelectValue;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: TabVariant;
	navWrapperClasses?: string;
	navContainerClasses?: string;
	navClasses?: string;
};
export type TabControllerContext = SelectStore & {
	globals: {
		focused: boolean;
		full: boolean;
		rounded: ThemeRounded;
		size: ThemeSize;
		theme: ThemeColor;
		transitioned: ThemeTransitioned;
		variant: TabVariant;
	};
};
export declare const tabControllerDefaults: Partial<TabControllerProps>;
