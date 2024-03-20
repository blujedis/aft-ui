import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

import type { BreadcrumbVariant } from '../BreadcrumbOption/module';

export type BreadcrumbContext = {
	globals: {
		focused: boolean;
		rounded: ThemeRounded;
		shadowed: ThemeShadowed;
		size: ThemeSize;
		theme: ThemeColor;
		transitioned: boolean;
		variant: BreadcrumbVariant;
	};
};

export type BreadcrumbProps = {
	focused?: boolean;
	full?: boolean;
	generate?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	variant?: BreadcrumbVariant;
};

export const breadcrumbDefaults: Partial<BreadcrumbProps> = {
	size: 'md',
	theme: 'frame',
	variant: 'text'
};
