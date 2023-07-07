import { mergeConfigs } from '$lib/theme';

// VARIANTS TEMPLATES
//////////////////////////////////////////////////////////////

// NOTE: Tailwind shades step too far and aren't ideal for
// bg color changes on hover. Use opacity modifier to get a
// consistent and desired effect. You can also use Tailwind
// Linear-Gradients but you lose smooth transitions unless
// you add an extra element with a transition at a lower z-index.
// This limitation on gradients may change but as of writing this
// that's the only way I'm aware of.
export const variantFilled = {
	white: 'text-inherit bg-white hover:bg-default-100',
	default: 'text-inherit bg-default-200 hover:bg-default-300/90',
	primary: 'bg-primary-500 hover:bg-primary-600',
	secondary: 'bg-secondary-500 hover:bg-secondary-600/90',
	tertiary: 'bg-tertiary-500 hover:bg-tertiary-600/90',
	danger: 'bg-danger-500 hover:bg-danger-600/90',
	warning: 'bg-warning-500 hover:bg-warning-600/80',
	success: 'bg-success-500 hover:bg-success-600/[0.85]',
	info: 'bg-info-500 hover:bg-info-600/[0.85]'
};

export const variantText = {
	white: 'text-white hover:text-default-200',
	default: 'text-default-600 hover:text-default-900',
	primary: 'text-primary-600 hover:text-primary-700',
	secondary: 'text-secondary-600 hover:text-secondary-700',
	tertiary: 'text-tertiary-600 hover:text-tertiary-700',
	danger: 'text-danger-600 hover:text-danger-700',
	warning: 'text-warning-600 hover:text-warning-700',
	success: 'text-success-600 hover:text-success-700',
	info: 'text-info-600 hover:text-info-700'
};

export const variantOutlined = mergeConfigs(variantText, {
	white: 'border-white hover:border-default-100',
	default: 'border-default-200 hover:border-default-300',
	primary: 'border-primary-500 hover:border-primary-600',
	secondary: 'border-secondary-500 hover:border-secondary-600',
	tertiary: 'border-tertiary-500 hover:border-tertiary-600',
	danger: 'border-danger-500 hover:border-danger-600',
	warning: 'border-warning-500 hover:border-warning-600',
	success: 'border-success-500 hover:border-success-600',
	info: 'border-info-500 hover:border-info-600'
});

export const variantGhost = mergeConfigs(variantText, {
	white: 'text-inherit hover:text-inherit hover:bg-default-100 ',
	default: 'hover:bg-default-100',
	primary: 'hover:bg-primary-100',
	secondary: 'hover:bg-secondary-100',
	tertiary: 'hover:bg-tertiary-100',
	danger: 'hover:bg-danger-100',
	warning: 'hover:bg-warning-100',
	success: 'hover:bg-success-100',
	info: 'hover:bg-info-100'
});
