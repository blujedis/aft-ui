import type { SelectStore, SelectValue } from '$lib/stores/select';
import type {
	ThemeColor,
	ThemeFocused,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '$lib/theme';
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

export const tabControllerDefaults: Partial<TabControllerProps> = {
	condensed: true,
	focused: true,
	theme: 'default',
	variant: 'default'
};
