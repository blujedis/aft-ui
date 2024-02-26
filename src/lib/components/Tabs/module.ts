import type { SelectStore, SelectStoreValue } from '../../stores/select';
import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
} from '$lib/types';
import { type Writable } from 'svelte/store';
import type { TabVariant } from '../Tab';

export type TabsProps = {
	condensed?: boolean;
	focused?: boolean;
	hovered?: boolean;
	full?: boolean;
	rounded?: ThemeRounded;
	selected: SelectStoreValue;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	variant?: TabVariant;
	navWrapperClasses?: string;
	navContainerClasses?: string;
	navClasses?: string;
};

export type TabsStore = {
	tabs: (HTMLElement & { $select: () => any })[];
	selected?: HTMLElement;
	currentIndex: number;
}

export type TabsContext = Writable<TabsStore> & {
	globals: {
		focused?: boolean;
		hovered: boolean;
		full: boolean;
		rounded: ThemeRounded;
		size: ThemeSize;
		theme: ThemeColor;
		transitioned: boolean;
		variant: TabVariant;
	};
}

// export type TabsContext = SelectStore & {
// 	globals: {
// 		focused: ThemeFocused;
// 		hovered: boolean;
// 		full: boolean;
// 		rounded: ThemeRounded;
// 		size: ThemeSize;
// 		theme: ThemeColor;
// 		transitioned: boolean;
// 		variant: TabVariant;
// 	};
// };

export const tabsDefaults: Partial<TabsProps> = {
	condensed: true,
	focused: true,
	size: 'md',
	theme: 'frame',
	variant: 'flushed'
};
