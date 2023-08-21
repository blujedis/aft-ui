import { mergeConfigs } from '../../theme';
export const textItemFilledActive = {
    $base: 'aria-checked:text-[color:var(--text-light)] group-aria-checked:text-[color:var(--text-light)] aria-current:text-[color:var(--text-light)] aria-expanded:text-[color:var(--text-light)] aria-selected:text-[color:var(--text-light)]',
    default: 'aria-checked:text-inherit group-aria-checked:text-inherit aria-current:text-inherit aria-expanded:text-inherit aria-selected:text-inherit',
    dark: '',
    primary: '',
    secondary: '',
    tertiary: '',
    danger: '',
    warning: '',
    success: '',
    info: ''
};
////////////////////////////////////////////////
export const itemSelectedFilled = {
    $base: '',
    default: 'aria-selected:bg-frame-100 dark:aria-selected:bg-frame-500/50',
    dark: 'aria-selected:bg-frame-600 dark:aria-selected:bg-frame-800',
    primary: 'aria-selected:bg-primary-500',
    secondary: 'aria-selected:bg-secondary-500',
    tertiary: 'aria-selected:bg-tertiary-500',
    danger: 'aria-selected:bg-danger-500',
    warning: 'aria-selected:bg-warning-500',
    success: 'aria-selected:bg-success-500',
    info: 'aria-selected:bg-info-500'
};
export const itemCheckedFilled = {
    $base: '',
    default: 'aria-checked:bg-frame-100 dark:aria-checked:bg-frame-500/50',
    dark: 'aria-checked:bg-frame-600 dark:aria-checked:bg-frame-800',
    primary: 'aria-checked:bg-primary-500',
    secondary: 'aria-checked:bg-secondary-500',
    tertiary: 'aria-checked:bg-tertiary-500',
    danger: 'aria-checked:bg-danger-500',
    warning: 'aria-checked:bg-warning-500',
    success: 'aria-checked:bg-success-500',
    info: 'aria-checked:bg-info-500'
};
export const itemCheckedFilledGroup = {
    $base: '',
    default: 'group-aria-checked:bg-frame-100 dark:group-aria-checked:bg-frame-500/50',
    dark: 'group-aria-checked:bg-frame-600 dark:group-aria-checked:bg-frame-800',
    primary: 'group-aria-checked:bg-primary-500',
    secondary: 'group-aria-checked:bg-secondary-500',
    tertiary: 'group-aria-checked:bg-tertiary-500',
    danger: 'group-aria-checked:bg-danger-500',
    warning: 'group-aria-checked:bg-warning-500',
    success: 'group-aria-checked:bg-success-500',
    info: 'group-aria-checked:bg-info-500'
};
export const itemCurrentFilled = {
    $base: '',
    default: 'aria-current:bg-frame-100 dark:aria-current:bg-frame-500/50',
    dark: 'aria-current:bg-frame-600 dark:aria-current:bg-frame-800',
    primary: 'aria-current:bg-primary-500',
    secondary: 'aria-current:bg-secondary-500',
    tertiary: 'aria-current:bg-tertiary-500',
    danger: 'aria-current:bg-danger-500',
    warning: 'aria-current:bg-warning-500',
    success: 'aria-current:bg-success-500',
    info: 'aria-current:bg-info-500'
};
export const itemExpandedFilled = {
    $base: '',
    default: 'aria-expanded:bg-frame-300 dark:aria-expanded:bg-frame-500/50',
    dark: 'aria-expanded:bg-frame-600 dark:aria-expanded:bg-frame-800',
    primary: 'aria-expanded:bg-primary-500',
    secondary: 'aria-expanded:bg-secondary-500',
    tertiary: 'aria-expanded:bg-tertiary-500',
    danger: 'aria-expanded:bg-danger-500',
    warning: 'aria-expanded:bg-warning-500',
    success: 'aria-expanded:bg-success-500',
    info: 'aria-expanded:bg-info-500'
};
export const variantItemFilledActive = mergeConfigs(textItemFilledActive, itemSelectedFilled, itemCheckedFilled, itemCheckedFilledGroup, itemCurrentFilled, itemExpandedFilled);
////////////////////////////////////////////////
export const textItemGlassActive = {
    $base: 'aria-checked:text-[color:var(--text-light)] group-aria-checked:text-[color:var(--text-light)] aria-current:text-[color:var(--text-light)] aria-expanded:text-[color:var(--text-light)] aria-selected:text-[color:var(--text-light)]',
    default: 'aria-checked:text-inherit group-aria-checked:text-inherit aria-current:text-inherit aria-expanded:text-inherit aria-selected:text-inherit',
    dark: '',
    primary: '',
    secondary: '',
    tertiary: '',
    danger: '',
    warning: '',
    success: '',
    info: ''
};
export const itemSelectedGlass = {
    $base: '',
    default: 'aria-selected:bg-frame-500/20 dark:aria-selected:bg-frame-600/60',
    dark: 'aria-selected:bg-frame-600/40 dark:aria-selected:bg-frame-900/40',
    primary: 'aria-selected:bg-primary-500/20',
    secondary: 'aria-selected:bg-secondary-500/20',
    tertiary: 'aria-selected:bg-tertiary-500/20',
    danger: 'aria-selected:bg-danger-500/20',
    warning: 'aria-selected:bg-warning-500/20',
    success: 'aria-selected:bg-success-500/20',
    info: 'aria-selected:bg-info-500/20'
};
export const itemCheckedGlass = {
    $base: '',
    default: 'aria-expanded:bg-frame-500/20 dark:aria-expanded:bg-frame-600/60',
    dark: 'aria-expanded:bg-frame-600/40 dark:aria-expanded:bg-frame-900/40',
    primary: 'aria-expanded:bg-primary-500/20',
    secondary: 'aria-expanded:bg-secondary-500/20',
    tertiary: 'aria-expanded:bg-tertiary-500/20',
    danger: 'aria-expanded:bg-danger-500/20',
    warning: 'aria-expanded:bg-warning-500/20',
    success: 'aria-expanded:bg-success-500/20',
    info: 'aria-expanded:bg-info-500/20'
};
export const itemCurrentGlass = {
    $base: '',
    default: 'aria-current:bg-frame-500/20 dark:aria-current:bg-frame-600/60',
    dark: 'aria-current:bg-frame-600/40 dark:aria-current:bg-frame-900/40',
    primary: 'aria-current:bg-primary-500/20',
    secondary: 'aria-current:bg-secondary-500/20',
    tertiary: 'aria-current:bg-tertiary-500/20',
    danger: 'aria-current:bg-danger-500/20',
    warning: 'aria-current:bg-warning-500/20',
    success: 'aria-current:bg-success-500/20',
    info: 'aria-current:bg-info-500/20'
};
export const itemCheckedGlassGroup = {
    $base: '',
    default: 'group-aria-checked:bg-frame-500/20 dark:group-aria-checked:bg-frame-600/60',
    dark: 'group-aria-checked:bg-frame-600/40 dark:group-aria-checked:bg-frame-900/40',
    primary: 'group-aria-checked:bg-primary-500/20',
    secondary: 'group-aria-checked:bg-secondary-500/20',
    tertiary: 'group-aria-checked:bg-tertiary-500/20',
    danger: 'group-aria-checked:bg-danger-500/20',
    warning: 'group-aria-checked:bg-warning-500/20',
    success: 'group-aria-checked:bg-success-500/20',
    info: 'group-aria-checked:bg-info-500/20'
};
export const itemExpandedGlass = {
    $base: '',
    default: 'aria-expanded:bg-frame-500/20 dark:aria-expanded:bg-frame-600/60',
    dark: 'aria-expanded:bg-frame-600/40 dark:aria-expanded:bg-frame-900/40',
    primary: 'aria-expanded:bg-primary-500/20',
    secondary: 'aria-expanded:bg-secondary-500/20',
    tertiary: 'aria-expanded:bg-tertiary-500/20',
    danger: 'aria-expanded:bg-danger-500/20',
    warning: 'aria-expanded:bg-warning-500/20',
    success: 'aria-expanded:bg-success-500/20',
    info: 'aria-expanded:bg-info-500/20'
};
export const variantItemGlassActive = mergeConfigs(itemSelectedGlass, itemCheckedGlass, itemCheckedGlassGroup, itemCurrentGlass, itemExpandedGlass);
////////////////////////////////////////////////
export const textItemGhostActive = {
    $base: 'aria-checked:text-[color:var(--text-light)] group-aria-checked:text-[color:var(--text-light)] aria-current:text-[color:var(--text-light)] aria-expanded:text-[color:var(--text-light)] aria-selected:text-[color:var(--text-light)]',
    default: 'aria-checked:text-inherit group-aria-checked:text-inherit aria-current:text-inherit aria-expanded:text-inherit aria-selected:text-inherit',
    dark: '',
    primary: '',
    secondary: '',
    tertiary: '',
    danger: '',
    warning: '',
    success: '',
    info: ''
};
export const itemSelectedGhost = {
    $base: '',
    default: 'aria-selected:bg-frame-100 dark:aria-selected:bg-frame-500/50',
    dark: 'aria-selected:bg-frame-400 dark:aria-selected:bg-frame-900/40',
    primary: 'aria-selected:bg-primary-100 dark:aria-selected:bg-primary-500/50',
    secondary: 'aria-selected:bg-secondary-100 dark:aria-selected:bg-secondary-500/50',
    tertiary: 'aria-selected:bg-tertiary-100 dark:aria-selected:bg-tertiary-500/50',
    danger: 'aria-selected:bg-danger-100 dark:aria-selected:bg-danger-500/50',
    warning: 'aria-selected:bg-warning-100 dark:aria-selected:bg-warning-500/50',
    success: 'aria-selected:bg-success-100 dark:aria-selected:bg-success-500/50',
    info: 'aria-selected:bg-info-100 dark:aria-selected:bg-info-500/50'
};
export const itemCheckedGhost = {
    $base: '',
    default: 'aria-checked:bg-frame-100 dark:aria-checked:bg-frame-500/50',
    dark: 'aria-checked:bg-frame-400 dark:aria-checked:bg-frame-900/40',
    primary: 'aria-checked:bg-primary-100 dark:aria-checked:bg-primary-500/50',
    secondary: 'aria-checked:bg-secondary-100 dark:aria-checked:bg-secondary-500/50',
    tertiary: 'aria-checked:bg-tertiary-100 dark:aria-checked:bg-tertiary-500/50',
    danger: 'aria-checked:bg-danger-100 dark:aria-checked:bg-danger-500/50',
    warning: 'aria-checked:bg-warning-100 dark:aria-checked:bg-warning-500/50',
    success: 'aria-checked:bg-success-100 dark:aria-checked:bg-success-500/50',
    info: 'aria-checked:bg-info-100 dark:aria-checked:bg-info-500/50'
};
export const itemCurrentGhost = {
    $base: '',
    default: 'aria-current:bg-frame-100 dark:aria-current:bg-frame-500/50',
    dark: 'aria-current:bg-frame-400 dark:aria-current:bg-frame-900/40',
    primary: 'aria-current:bg-primary-100 dark:aria-current:bg-primary-500/50',
    secondary: 'aria-current:bg-secondary-100 dark:aria-current:bg-secondary-500/50',
    tertiary: 'aria-current:bg-tertiary-100 dark:aria-current:bg-tertiary-500/50',
    danger: 'aria-current:bg-danger-100 dark:aria-current:bg-danger-500/50',
    warning: 'aria-current:bg-warning-100 dark:aria-current:bg-warning-500/50',
    success: 'aria-current:bg-success-100 dark:aria-current:bg-success-500/50',
    info: 'aria-current:bg-info-100 dark:aria-current:bg-info-500/50'
};
export const itemCheckedGhostGroup = {
    $base: '',
    default: 'group-aria-checked:bg-frame-100 dark:group-aria-checked:bg-frame-500/50',
    dark: 'group-aria-checked:bg-frame-400 dark:group-aria-checked:bg-frame-900/40',
    primary: 'group-aria-checked:bg-primary-100 dark:group-aria-checked:bg-primary-500/50',
    secondary: 'group-aria-checked:bg-secondary-100 dark:group-aria-checked:bg-secondary-500/50',
    tertiary: 'group-aria-checked:bg-tertiary-100 dark:group-aria-checked:bg-tertiary-500/50',
    danger: 'group-aria-checked:bg-danger-100 dark:group-aria-checked:bg-danger-500/50',
    warning: 'group-aria-checked:bg-warning-100 dark:group-aria-checked:bg-warning-500/50',
    success: 'group-aria-checked:bg-success-100 dark:group-aria-checked:bg-success-500/50',
    info: 'group-aria-checked:bg-info-100 dark:group-aria-checked:bg-info-500/50'
};
export const itemExpandedGhost = {
    $base: '',
    default: 'aria-expanded:bg-frame-100 dark:aria-expanded:bg-frame-500/50',
    dark: 'aria-expanded:bg-frame-400 dark:aria-expanded:bg-frame-900/40',
    primary: 'aria-expanded:bg-primary-100 dark:aria-expanded:bg-primary-500/50',
    secondary: 'aria-expanded:bg-secondary-100 dark:aria-expanded:bg-secondary-500/50',
    tertiary: 'aria-expanded:bg-tertiary-100 dark:aria-expanded:bg-tertiary-500/50',
    danger: 'aria-expanded:bg-danger-100 dark:aria-expanded:bg-danger-500/50',
    warning: 'aria-expanded:bg-warning-100 dark:aria-expanded:bg-warning-500/50',
    success: 'aria-expanded:bg-success-100 dark:aria-expanded:bg-success-500/50',
    info: 'aria-expanded:bg-info-100 dark:aria-expanded:bg-info-500/50'
};
export const variantItemGhostActive = mergeConfigs(itemSelectedGhost, itemCheckedGhost, itemCheckedGhostGroup, itemCurrentGhost, itemExpandedGhost);
////////////////////////////////////////////////
