import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '../../theme';
import type { breadcrumbNav } from './config';
export type BreadcrumbContext = {
	globals: {
		rounded: ThemeRounded;
		shadowed: ThemeShadowed;
		size: ThemeSize;
		theme: ThemeColor;
		transitioned: ThemeTransitioned;
		variant: BreadcrumbVariant;
	};
};
export type BreadcrumbVariant = keyof typeof breadcrumbNav;
export type BreadcrumbProps = {
	full?: boolean;
	generated?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: BreadcrumbVariant;
};
export declare const breadcrumbDefaults: Partial<BreadcrumbProps>;
