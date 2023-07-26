import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '$lib/types';
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
	flush?: boolean;
	full?: boolean;
	generate?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: BreadcrumbVariant;
};

export const breadcrumbDefaults: Partial<BreadcrumbProps> = {
	size: 'md',
	theme: 'frame',
	variant: 'default'
};
