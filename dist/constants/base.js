export const text = {
    white: 'text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]',
    light: 'text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]',
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
    white: 'hover:text-[color:var(--text-dark-hover)] dark:hover:text-[color:var(--text-light-hover)]',
    light: 'hover:text-[color:var(--text-dark-hover)] dark:hover:text-[color:var(--text-light-hover)]',
    dark: 'hover:text-[color:var(--text-dark-hover)] dark:hover:text-[color:var(--text-light-hover)]',
    primary: 'hover:text-primary-700',
    secondary: 'hover:text-secondary-700',
    tertiary: 'hover:text-tertiary-700',
    danger: 'hover:text-danger-700',
    warning: 'hover:text-warning-700',
    success: 'hover:text-success-700',
    info: 'hover:text-info-700'
};
export const filledText = {
    white: 'text-[color:var(--text-dark)]',
    light: 'text-[color:var(--text-dark)]',
    dark: 'dark:text-[color:var(--text-light)]',
    primary: 'text-white',
    secondary: 'text-white',
    tertiary: 'text-white',
    danger: 'text-white',
    warning: 'text-white',
    success: 'text-white',
    info: 'text-white'
};
export const filledTextSoft = {
    white: 'text-frame-300',
    light: 'text-frame-300',
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
    white: 'hover:text-[color:var(--text-dark-hover)]',
    light: 'hover:text-[color:var(--text-dark-hover)]',
    dark: 'hover:text-[color:var(--text-light-hover)]',
    primary: 'hover:text-primary-100',
    secondary: 'hover:text-secondary-100',
    tertiary: 'hover:text-tertiary-100',
    danger: 'hover:text-danger-100',
    warning: 'hover:text-warning-100',
    success: 'hover:text-success-100',
    info: 'hover:text-info-100'
};
export const solid = {
    $base: '',
    white: 'bg-white',
    light: 'bg-frame-100',
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
    white: 'hover:bg-frame-100',
    light: 'hover:bg-frame-200/70',
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
    white: 'bg-white',
    light: 'bg-frame-500/10',
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
    white: 'hover:bg-frame-100',
    light: 'hover:bg-frame-500/20',
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
    white: 'bg-white',
    light: 'bg-frame-50',
    dark: 'bg-frame-600/20',
    primary: 'bg-primary-50',
    secondary: 'bg-secondary-50',
    tertiary: 'bg-tertiary-50',
    danger: 'bg-danger-50',
    warning: 'bg-warning-50',
    success: 'bg-success-50',
    info: 'bg-info-50'
};
// export const solidGhostHoverDark = {
//   white: 'dark:hover:bg-frame-500/10',
//   light: 'dark:hover:bg-frame-500/10',
//   dark: 'hover:text-white dark:hover:bg-frame-900/30',
//   primary: 'dark:hover:bg-primary-500/10',
//   secondary: 'dark:hover:bg-secondary-500/10',
//   tertiary: 'dark:hover:bg-tertiary-500/10',
//   danger: 'dark:hover:bg-danger-500/10',
//   warning: 'dark:hover:bg-warning-500/10',
//   success: 'hover:bg-success-50 dark:hover:bg-success-500/10',
//   info: 'dark:hover:bg-info-500/10',
// };
// export const solidGhostHover = mergeConfigs(solidGhostHoverDark, {
//   white: 'hover:bg-frame-100/75',
//   light: 'hover:bg-frame-100/75',
//   dark: 'hover:text-white hover:bg-frame-600',
//   primary: 'hover:bg-primary-50',
//   secondary: 'hover:bg-secondary-50',
//   tertiary: 'hover:bg-tertiary-50',
//   danger: 'hover:bg-danger-50',
//   warning: 'hover:bg-warning-50',
//   success: 'hover:bg-success-50',
//   info: 'hover:bg-info-50',
// });
export const fill = {
    $base: '',
    white: 'fill-white',
    light: 'fill-[color:var(--text-dark)] dark:fill-[color:var(--text-light)]',
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
    white: 'stroke-white',
    light: 'stroke-frame-200',
    dark: 'stroke-frame-600',
    primary: 'stroke-primary-500',
    secondary: 'stroke-secondary-500',
    tertiary: 'stroke-tertiary-500',
    danger: 'stroke-danger-500',
    warning: 'stroke-warning-500',
    success: 'stroke-success-500',
    info: 'stroke-info-500'
};
export const ring = {
    base: 'ring-offset-0',
    white: 'ring-white',
    light: 'ring-frame-200 dark:ring-frame-400',
    dark: 'ring-frame-600',
    primary: 'ring-primary-500 dark:ring-primary-700',
    secondary: 'ring-secondary-500 dark:ring-secondary-700',
    tertiary: 'ring-tertiary-500 dark:ring-tertiary-700',
    danger: 'ring-danger-500 dark:ring-danger-700',
    warning: 'ring-warning-500 dark:ring-warning-700',
    success: 'ring-success-500 dark:ring-success-700',
    info: 'ring-info-500 dark:ring-info-700'
};
export const ringHover = {
    white: 'hover:ring-frame-200',
    light: 'hover:ring-frame-300 dark:hover:ring-frame-200',
    dark: 'hover:ring-frame-700 dark:hover:ring-frame-400',
    primary: 'hover:ring-primary-600 dark:hover:ring-primary-400',
    secondary: 'hover:ring-secondary-600 dark:hover:ring-secondary-500',
    tertiary: 'hover:ring-tertiary-600 dark:hover:ring-tertiary-400',
    danger: 'hover:ring-danger-600 dark:hover:ring-danger-400',
    warning: 'hover:ring-warning-600 dark:hover:ring-warning-400',
    success: 'hover:ring-success-700 dark:hover:ring-success-400',
    info: 'hover:ring-info-600 dark:hover:ring-info-400'
};
export const border = {
    $base: 'border',
    white: 'border-white',
    light: 'border-frame-200',
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
    white: 'hover:border-frame-50',
    light: 'hover:border-frame-300',
    dark: 'hover:border-frame-700',
    primary: 'hover:border-primary-600',
    secondary: 'hover:border-secondary-600',
    tertiary: 'hover:border-tertiary-600',
    danger: 'hover:border-danger-600',
    warning: 'hover:border-warning-600',
    success: 'hover:border-success-600',
    info: 'hover:border-info-600'
};
export const borderGroupHover = {
    white: 'group-hover:border-frame-50',
    light: 'group-hover:border-frame-300',
    dark: 'group-hover:border-frame-400',
    primary: 'group-hover:border-primary-600',
    secondary: 'group-hover:border-secondary-600',
    tertiary: 'group-hover:border-tertiary-600',
    danger: 'group-hover:border-danger-600',
    warning: 'group-hover:border-warning-600',
    success: 'group-hover:border-success-600',
    info: 'group-hover:border-info-600'
};
