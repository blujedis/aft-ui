import {} from 'svelte/store';
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
export const tabsDefaults = {
    condensed: true,
    focused: true,
    size: 'md',
    theme: 'frame',
    variant: 'flushed'
};
