
// dark:text-[color:var(--text-light)]
import { mergeConfigs } from '$lib/theme';
import { common } from './options';

export const textFilled = {
	$base: '',
	default: 'text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]',
	dark: 'text-[color:var(--text-light)]',
	primary: 'text-white',
	secondary: 'text-white',
	tertiary: 'text-white',
	danger: 'text-white',
	warning: 'text-white',
	success: 'text-white',
	info: 'text-white'
};

export const variantFilled = mergeConfigs(textFilled, {
	default: 'bg-frame-100 dark:bg-frame-600',
	dark: 'bg-frame-600 dark:bg-frame-700',
	primary: 'bg-primary-500 ',
	secondary: 'bg-secondary-500',
	tertiary: 'bg-tertiary-500',
	danger: 'bg-danger-500',
	warning: 'bg-warning-500',
	success: 'bg-success-500',
	info: 'bg-info-500'
});

export const variantFilledHover = mergeConfigs(variantFilled, {
	$base: '',
	default: 'hover:bg-frame-200/70 dark:hover:bg-frame-700',
	dark: 'hover:bg-frame-700 dark:hover:bg-frame-900/20',
	primary: 'hover:bg-primary-600',
	secondary: 'hover:bg-secondary-600',
	tertiary: 'hover:bg-tertiary-600',
	danger: 'hover:bg-danger-600',
	warning: 'hover:bg-warning-600',
	success: 'hover:bg-success-600',
	info: 'hover:bg-info-600'
});

////////////////////////////////////////////////

export const textOutlined = {
	$base: 'text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]',
	default: '',
	dark: '',
	primary: '',
	secondary: '',
	tertiary: '',
	danger: '',
	warning: '',
	success: '',
	info: ''
};

export const ring = {
	$base: 'ring-inset ring-1 bg-transparent',
	default: 'ring-frame-200 dark:ring-frame-600',
	dark: 'ring-frame-600 dark:ring-frame-700',
	primary: 'ring-primary-500',
	secondary: 'ring-secondary-500',
	tertiary: 'ring-tertiary-500',
	danger: 'ring-danger-500',
	warning: 'ring-warning-500',
	success: 'ring-success-500',
	info: 'ring-info-500'
};

export const ringHover = {
	$base: 'ring-inset ring-1 bg-transparent',
	default: 'hover:ring-frame-300 dark:hover:ring-frame-700',
	dark: 'hover:ring-frame-700 dark:hover:ring-frame-900',
	primary: 'hover:ring-primary-700 dark:hover:ring-primary-700',
	secondary: 'hover:ring-secondary-700 dark:hover:ring-secondary-700',
	tertiary: 'hover:ring-tertiary-700 dark:hover:ring-tertiary-700',
	danger: 'hover:ring-danger-700 dark:hover:ring-danger-700',
	warning: 'hover:ring-warning-700 dark:hover:ring-warning-700',
	success: 'hover:ring-success-700 dark:hover:ring-success-700',
	info: 'hover:ring-info-700 dark:hover:ring-info-700'
};

export const variantOutlined = mergeConfigs(textOutlined, ring);

export const variantOutlinedHover = mergeConfigs(variantOutlined, ringHover);

////////////////////////////////////////////////

export const textGhost = {
	$base: 'text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]',
	default: '',
	dark: 'text-[color:var(--text-light)]',
	primary: '',
	secondary: '',
	tertiary: '',
	danger: '',
	warning: '',
	success: '',
	info: ''
};

export const textGhostHover = mergeConfigs(textGhost, {
	$base: 'text-inherit dark:text-[color:var(--text-light)]',
	dark: 'hover:text-[color:var(--text-light)]'
});

export const ghost = {
	$base: 'bg-transparent',
	default: 'bg-frame-100 dark:bg-frame-500/50',
	dark: 'bg-frame-600/60 dark:bg-frame-600/10',
	primary: 'bg-primary-100 dark:bg-primary-500/50',
	secondary: 'bg-secondary-100 dark:bg-secondary-500/50',
	tertiary: 'bg-tertiary-100 dark:bg-tertiary-500/50',
	danger: 'bg-danger-100 dark:bg-danger-500/50',
	warning: 'bg-warning-100 dark:bg-warning-500/50',
	success: 'bg-success-100 dark:bg-success-500/50',
	info: 'bg-info-100 dark:bg-info-500/50'
};

export const ghostHover = {
	$base: 'bg-transparent',
	default: 'hover:bg-frame-100 dark:hover:bg-frame-500/50',
	dark: 'hover:bg-frame-400 dark:hover:bg-frame-900/40',
	primary: 'hover:bg-primary-100 dark:hover:bg-primary-500/50',
	secondary: 'hover:bg-secondary-100 dark:hover:bg-secondary-500/50',
	tertiary: 'hover:bg-tertiary-100 dark:hover:bg-tertiary-500/50',
	danger: 'hover:bg-danger-100 dark:hover:bg-danger-500/50',
	warning: 'hover:bg-warning-100 dark:hover:bg-warning-500/50',
	success: 'hover:bg-success-100 dark:hover:bg-success-500/50',
	info: 'hover:bg-info-100 dark:hover:bg-info-500/50'
};

export const variantGhost = mergeConfigs(textGhost, ghost);

export const variantGhostHover = mergeConfigs(textGhostHover, ghostHover);

////////////////////////////////////////////////

export const flushed = {
	$base: '',
	default: 'border-frame-200 dark:border-frame-300',
	dark: 'border-frame-600',
	primary: 'border-primary-400',
	secondary: 'border-secondary-400',
	tertiary: 'border-tertiary-400',
	danger: 'border-danger-400',
	warning: 'border-warning-400',
	success: 'border-success-400',
	info: 'border-info-400'
};

export const flushedHover = {
	$base: '',
	default: 'group-hover:border-frame-300 dark:group-hover:border-frame-400',
	dark: 'group-hover:border-frame-500',
	primary: 'group-hover:border-primary-600',
	secondary: 'group-hover:border-secondary-600',
	tertiary: 'group-hover:border-tertiary-600',
	danger: 'group-hover:border-danger-600',
	warning: 'group-hover:border-warning-600',
	success: 'group-hover:border-success-600',
	info: 'group-hover:border-info-600'
};

export const variantFlushed = mergeConfigs(flushed, {});

export const variantFlushedHover = mergeConfigs(variantFlushed, flushedHover);

////////////////////////////////////////////////

export const glass = {
	$base: '',
	default: 'bg-frame-500/10 dark:bg-frame-600/30',
	dark: 'bg-frame-600/30 dark:bg-frame-700/20',
	primary: 'bg-primary-500/10',
	secondary: 'bg-secondary-500/10',
	tertiary: 'bg-tertiary-500/10',
	danger: 'bg-danger-500/10',
	warning: 'bg-warning-500/10',
	success: 'bg-success-500/10',
	info: 'bg-info-500/10'
};

export const glassHover = {
	$base: '',
	default: 'hover:bg-frame-500/20 dark:hover:bg-frame-600/60',
	dark: 'hover:bg-frame-600/40 dark:hover:bg-frame-900/40',
	primary: 'hover:bg-primary-500/20',
	secondary: 'hover:bg-secondary-500/20',
	tertiary: 'hover:bg-tertiary-500/20',
	danger: 'hover:bg-danger-500/20',
	warning: 'hover:bg-warning-500/20',
	success: 'hover:bg-success-500/20',
	info: 'hover:bg-info-500/20'
};

export const variantGlass = mergeConfigs(textGhost, glass, {
	dark: 'text-[color:var(--text-dark)]'
});

export const variantGlassHover = mergeConfigs(variantGlass, glassHover);

////////////////////////////////////////////////

export const text = {
	$base: 'border-0 bg-transparent',
	default: 'text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]',
	dark: 'text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]',
	primary: 'text-primary-500',
	secondary: 'text-secondary-500',
	tertiary: 'text-tertiary-500',
	danger: 'text-danger-500',
	warning: 'text-warning-500',
	success: 'text-success-500',
	info: 'text-info-500'
};

export const textHover = {
	$base: 'border-0 bg-transparent',
	default:
		'hover:text-[color:var(--text-dark-hover)] dark:hover:text-[color:var(--text-light-hover)]',
	dark: 'hover:text-[color:var(--text-dark-hover)] dark:hover:text-[color:var(--text-light-hover)]',
	primary: 'hover:text-primary-700',
	secondary: 'hover:text-secondary-700',
	tertiary: 'hover:text-tertiary-700',
	danger: 'hover:text-danger-700',
	warning: 'hover:text-warning-700',
	success: 'hover:text-success-700',
	info: 'hover:text-info-700'
};

export const variantText = { ...text };

export const variantTextHover = mergeConfigs(variantText, textHover);

////////////////////////////////////////////////

export const textSoft = {
	$base: '',
	default: 'text-frame-300',
	dark: 'text-frame-300',
	primary: 'text-primary-300',
	secondary: 'text-secondary-300',
	tertiary: 'text-tertiary-300',
	danger: 'text-danger-300',
	warning: 'text-warning-300',
	success: 'text-success-300',
	info: 'text-info-300'
};

export const filledTextHover = {
	$base: '',
	default: 'hover:text-[color:var(--text-dark-hover)]',
	dark: 'hover:text-[color:var(--text-light-hover)]',
	primary: 'hover:text-primary-100',
	secondary: 'hover:text-secondary-100',
	tertiary: 'hover:text-tertiary-100',
	danger: 'hover:text-danger-100',
	warning: 'hover:text-warning-100',
	success: 'hover:text-success-100',
	info: 'hover:text-info-100'
};

////////////////////////////////////////////////

export const textPanel = {
	$base: 'text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]',
	default: '',
	dark: '',
	primary: '',
	secondary: '',
	tertiary: '',
	danger: '',
	warning: '',
	success: '',
	info: ''
}

export const variantPanel = mergeConfigs(textPanel, {
	$base: ['bg-white dark:bg-frame-700', common.ringed].join(' '),
});


////////////////////////////////////////////////


export const solid = {
	$base: '',
	default: 'bg-frame-100 bg-frame-900/50',
	dark: 'bg-frame-600',
	primary: 'bg-primary-500',
	secondary: 'bg-secondary-500',
	tertiary: 'bg-tertiary-500',
	danger: 'bg-danger-500',
	warning: 'bg-warning-500',
	success: 'bg-success-500',
	info: 'bg-info-500'
};

export const solidHover = {
	$base: '',

	default: 'hover:bg-frame-200/70',
	dark: 'hover:bg-frame-700',
	primary: 'hover:bg-primary-600',
	secondary: 'hover:bg-secondary-600',
	tertiary: 'hover:bg-tertiary-600',
	danger: 'hover:bg-danger-600',
	warning: 'hover:bg-warning-600',
	success: 'hover:bg-success-600',
	info: 'hover:bg-info-600'
};

export const solidGlass = {
	$base: '',
	default: 'bg-frame-500/10',
	dark: 'bg-frame-900/20 dark:bg-frame-900/30',
	primary: 'bg-primary-500/10',
	secondary: 'bg-secondary-500/10',
	tertiary: 'bg-tertiary-500/10',
	danger: 'bg-danger-500/10',
	warning: 'bg-warning-500/10',
	success: 'bg-success-500/10',
	info: 'bg-info-500/10'
};

export const solidGlassHover = {
	$base: '',
	default: 'hover:bg-frame-500/20 dark:hover:bg-frame-900/70',
	dark: 'hover:bg-frame-900/30 dark:hover:bg-frame-900/50',
	primary: 'hover:bg-primary-500/20',
	secondary: 'hover:bg-secondary-500/20',
	tertiary: 'hover:bg-tertiary-500/20',
	danger: 'hover:bg-danger-500/20',
	warning: 'hover:bg-warning-500/20',
	success: 'hover:bg-success-500/20',
	info: 'hover:bg-info-500/20'
};

export const solidGhost = {
	$base: '',
	default: 'bg-frame-50 dark:bg-frame-500/20',
	dark: 'bg-frame-600/20',
	primary: 'bg-primary-50',
	secondary: 'bg-secondary-50',
	tertiary: 'bg-tertiary-50',
	danger: 'bg-danger-50',
	warning: 'bg-warning-50',
	success: 'bg-success-50',
	info: 'bg-info-50'
};

export const fill = {
	$base: '',
	default: 'fill-[color:var(--text-dark)] dark:fill-[color:var(--text-light)]',
	dark: 'fill-[color:var(--text-dark)] dark:fill-[color:var(--text-light)]',
	primary: 'fill-primary-500',
	secondary: 'fill-secondary-500',
	tertiary: 'fill-tertiary-500',
	danger: 'fill-danger-500',
	warning: 'fill-warning-500',
	success: 'fill-success-500',
	info: 'fill-info-500'
};

export const stroke = {
	$base: '',
	dark: 'stroke-frame-600',
	primary: 'stroke-primary-500', secondary: 'stroke-secondary-500',
	tertiary: 'stroke-tertiary-500',
	danger: 'stroke-danger-500',
	warning: 'stroke-warning-500',
	success: 'stroke-success-500',
	info: 'stroke-info-500'
};

export const border = {
	$base: 'border',
	default: 'border-frame-200 dark:border-frame-400',
	dark: 'border-frame-600',
	primary: 'border-primary-500',
	secondary: 'border-secondary-500',
	tertiary: 'border-tertiary-500',
	danger: 'border-danger-500',
	warning: 'border-warning-500',
	success: 'border-success-500',
	info: 'border-info-500'
};

export const borderHover = {
	$base: 'border',
	default: 'hover:border-frame-300 dark:hover:border-frame-500',
	dark: 'hover:border-frame-500',
	primary: 'hover:border-primary-600',
	secondary: 'hover:border-secondary-600',
	tertiary: 'hover:border-tertiary-600',
	danger: 'hover:border-danger-600',
	warning: 'hover:border-warning-600',
	success: 'hover:border-success-600',
	info: 'hover:border-info-600'
};

export const borderGroupHover = {
	default: 'group-hover:border-frame-300 dark:group-hover:border-frame-400',
	dark: 'group-hover:border-frame-500',
	primary: 'group-hover:border-primary-600',
	secondary: 'group-hover:border-secondary-600',
	tertiary: 'group-hover:border-tertiary-600',
	danger: 'group-hover:border-danger-600',
	warning: 'group-hover:border-warning-600',
	success: 'group-hover:border-success-600',
	info: 'group-hover:border-info-600'
};
