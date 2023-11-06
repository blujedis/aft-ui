import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned,
} from '$lib/types';

import type { BreadcrumbVariant } from '../BreadcrumbOption/module';

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

export type BreadcrumbProps = {
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
	theme: 'default',
	variant: 'text'
};
