import type { SelectStore, SelectStoreValue } from '../../stores/select';
import type {
	ThemeColor,
	ThemeFocused,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '$lib/types';
import type { TabVariant } from '../Tab';

export type TabsProps = {
	condensed?: boolean;
	focused?: ThemeFocused;
	full?: boolean;
	rounded?: ThemeRounded;
	selected: SelectStoreValue;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: TabVariant;
	navWrapperClasses?: string;
	navContainerClasses?: string;
	navClasses?: string;
};

export type TabsContext = SelectStore & {
	globals: {
		focused: ThemeFocused;
		full: boolean;
		rounded: ThemeRounded;
		size: ThemeSize;
		theme: ThemeColor;
		transitioned: ThemeTransitioned;
		variant: TabVariant;
	};
};

export const tabsDefaults: Partial<TabsProps> = {
	condensed: true,
	focused: 'visible',
	size: 'md',
	theme: 'frame',
	variant: 'default'
};
