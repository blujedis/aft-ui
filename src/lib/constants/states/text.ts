import { mergeConfigs } from '$lib/theme';

export const textSoft = {
	$base: '',
	default: 'text-frame-300 dark:text-frame-400',
	dark: 'text-frame-400 dark:text-frame-600',
	primary: 'text-primary-300 dark:text-primary-600',
	secondary: 'text-secondary-300 dark:text-secondary-600',
	tertiary: 'text-tertiary-300 dark:text-tertiary-600',
	danger: 'text-danger-300 dark:text-danger-600',
	warning: 'text-warning-300 dark:text-warning-600',
	success: 'text-success-300 dark:text-success-600',
	info: 'text-info-300  dark:text-info-600'
};

export const textHoverSoft = {
	$base: '',
	default: 'hover:text-frame-400 dark:hover:text-frame-600',
	dark: 'hover:text-frame-400 dark:hover:text-frame-700',
	primary: 'hover:text-primary-400 dark:hover:text-primary-600',
	secondary: 'hover:text-secondary-400 dark:hover:text-secondary-600',
	tertiary: 'hover:text-tertiary-400 dark:hover:text-tertiary-600',
	danger: 'hover:text-danger-400 dark:hover:text-danger-600',
	warning: 'hover:text-warning-400 dark:hover:text-warning-600',
	success: 'hover:text-success-400 dark:hover:text-success-600',
	info: 'hover:text-info-400  dark:hover:text-info-600'
};

const textHover = {};

export const textHoverFilled = mergeConfigs(textHover, {
	$base: '',
	default:
		'text-[color:var(--text-dark)] hover:text-[color:var(--text-dark-hover)] dark:text-[color:var(--text-light)] dark:hover:text-[color:var(--text-light-hover)]',
	dark: 'text-[color:var(--text-light)] hover:text-[color:var(--text-light-hover)]',
	primary: 'text-[color:var(--text-light)] hover:text-[color:var(--text-light-hover)]',
	secondary: 'text-[color:var(--text-light)] hover:text-[color:var(--text-light-hover)]',
	tertiary: 'text-[color:var(--text-light)] hover:text-[color:var(--text-light-hover)]',
	danger: 'text-[color:var(--text-light)] hover:text-[color:var(--text-light-hover)]',
	warning: 'text-[color:var(--text-light)] hover:text-[color:var(--text-light-hover)]',
	success: 'text-[color:var(--text-light)] hover:text-[color:var(--text-light-hover)]',
	info: 'text-[color:var(--text-light)] hover:text-[color:var(--text-light-hover)]'
});

export const textExpanded = {
	default:
		'aria-expanded:text-[color:var(--text-dark)] dark:aria-expanded:text-[color:var(--text-light)]',
	dark: 'aria-expanded:text-[color:var(--text-light)] dark:aria-expanded:text-[color:var(--text-light)]',
	primary: 'aria-expanded:text-primary-700 dark:aria-expanded:text-primary-500',
	secondary: 'aria-expanded:text-secondary-700 dark:aria-expanded:text-secondary-500',
	tertiary: 'aria-expanded:text-tertiary-700 dark:aria-expanded:text-tertiary-500',
	danger: 'aria-expanded:text-danger-700 dark:aria-expanded:text-danger-500',
	warning: 'aria-expanded:text-warning-700 dark:aria-expanded:text-warning-500',
	success: 'aria-expanded:text-success-700 dark:aria-expanded:text-success-500',
	info: 'aria-expanded:text-info-700 dark:aria-expanded:text-info-500'
};

export const textSelected = {
	default: 'aria-selected:text-[color:var(--text-dark)]',
	dark: 'aria-selected:text-[color:var(--text-light)]',
	primary: 'aria-selected:text-primary-700 dark:aria-selected:text-primary-500',
	secondary: 'aria-selected:text-secondary-700 dark:aria-selected:text-secondary-500',
	tertiary: 'aria-selected:text-tertiary-700 dark:aria-selected:text-tertiary-500',
	danger: 'aria-selected:text-danger-700 dark:aria-selected:text-danger-500',
	warning: 'aria-selected:text-warning-700 dark:aria-selected:text-warning-500',
	success: 'aria-selected:text-success-700 dark:aria-selected:text-success-500',
	info: 'aria-selected:text-info-700 dark:aria-selected:text-info-500'
};

export const textCurrent = {
	default: 'aria-current:text-[color:var(--text-dark)]',
	dark: 'aria-current:text-[color:var(--text-light)]',
	primary: 'aria-current:text-primary-700 dark:aria-current:text-primary-500',
	secondary: 'aria-current:text-secondary-700 dark:aria-current:text-secondary-500',
	tertiary: 'aria-current:text-tertiary-700 dark:aria-current:text-tertiary-500',
	danger: 'aria-current:text-danger-700 dark:aria-current:text-danger-500',
	warning: 'aria-current:text-warning-700 dark:aria-current:text-warning-500',
	success: 'aria-current:text-success-700 dark:aria-current:text-success-500',
	info: 'aria-current:text-info-700  dark:aria-current:text-info-500'
};

// export const textFlat = {
// 	$base:
// 		'aria-checked:text-[color:var(--text-light)] group-aria-checked:text-[color:var(--text-light)] aria-current:text-[color:var(--text-light)] aria-expanded:text-[color:var(--text-light)] aria-selected:text-[color:var(--text-light)]',
// 	default:
// 		'aria-checked:text-inherit group-aria-checked:text-inherit aria-current:text-inherit aria-expanded:text-inherit aria-selected:text-inherit',
// 	dark: '',
// 	primary: '',
// 	secondary: '',
// 	tertiary: '',
// 	danger: '',
// 	warning: '',
// 	success: '',
// 	info: ''
// };

// export const textFilledActive = {
// 	$base:
// 		'aria-checked:text-[color:var(--text-light)] group-aria-checked:text-[color:var(--text-light)] aria-current:text-[color:var(--text-light)] aria-expanded:text-[color:var(--text-light)] aria-selected:text-[color:var(--text-light)]',
// 	default:
// 		'aria-checked:text-inherit group-aria-checked:text-inherit aria-current:text-inherit aria-expanded:text-inherit aria-selected:text-inherit',
// 	dark: '',
// 	primary: '',
// 	secondary: '',
// 	tertiary: '',
// 	danger: '',
// 	warning: '',
// 	success: '',
// 	info: ''
// };

// export const textGhostActive = {
// 	$base:
// 		'aria-checked:text-[color:var(--text-light)] group-aria-checked:text-[color:var(--text-light)] aria-current:text-[color:var(--text-light)] aria-expanded:text-[color:var(--text-light)] aria-selected:text-[color:var(--text-light)]',
// 	default:
// 		'aria-checked:text-inherit group-aria-checked:text-inherit aria-current:text-inherit aria-expanded:text-inherit aria-selected:text-inherit',
// 	dark: '',
// 	primary: '',
// 	secondary: '',
// 	tertiary: '',
// 	danger: '',
// 	warning: '',
// 	success: '',
// 	info: ''
// };

// export const textGlassActive = {
// 	$base:
// 		'aria-checked:text-[color:var(--text-light)] group-aria-checked:text-[color:var(--text-light)] aria-current:text-[color:var(--text-light)] aria-expanded:text-[color:var(--text-light)] aria-selected:text-[color:var(--text-light)]',
// 	default:
// 		'aria-checked:text-inherit group-aria-checked:text-inherit aria-current:text-inherit aria-expanded:text-inherit aria-selected:text-inherit',
// 	dark: '',
// 	primary: '',
// 	secondary: '',
// 	tertiary: '',
// 	danger: '',
// 	warning: '',
// 	success: '',
// 	info: ''
// };

// export const textSelectedSoft = {
// 	default: 'aria-selected:text-frame-300  dark:aria-selected:text-frame-500',
// 	dark: 'aria-selected:text-frame-300 dark:aria-selected:text-frame-600',
// 	primary: 'aria-selected:text-primary-300 dark:aria-selected:text-primary-700',
// 	secondary: 'aria-selected:text-secondary-300 dark:aria-selected:text-secondary-700',
// 	tertiary: 'aria-selected:text-tertiary-300 dark:aria-selected:text-tertiary-700',
// 	danger: 'aria-selected:text-danger-300 dark:aria-selected:text-danger-700',
// 	warning: 'aria-selected:text-warning-300 dark:aria-selected:text-warning-700',
// 	success: 'aria-selected:text-success-300 dark:aria-selected:text-success-700',
// 	info: 'aria-selected:text-info-300 dark:aria-selected:text-info-700'
// };
