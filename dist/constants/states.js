import { mergeConfigs } from '../theme';
export const disableds = {
    $base: 'aria-disabled:saturate-50 aria-disabled:brightness-95 aria-disabled:pointer-events-none',
    white: 'aria-disabled:text-frame-500',
    dark: 'aria-disabled:text-frame-700',
    light: 'aria-disabled:text-frame-300',
    primary: 'aria-disabled:text-primary-300',
    secondary: 'aria-disabled:text-secondary-300',
    tertiary: 'aria-disabled:text-tertiary-300',
    danger: 'aria-disabled:text-danger-300',
    warning: 'aria-disabled:text-warning-300',
    success: 'aria-disabled:text-success-300',
    info: 'aria-disabled:text-info-300'
};
const placeholdersDark = {
    white: 'dark:placeholder:text-frame-500',
    light: 'dark:placeholder:text-frame-500',
    dark: 'dark:placeholder:text-frame-400',
    primary: 'dark:placeholder:text-primary-700',
    secondary: 'dark:placeholder:text-secondary-700',
    tertiary: 'dark:placeholder:text-tertiary-700',
    danger: 'dark:placeholder:text-danger-700',
    warning: 'dark:placeholder:text-warning-700',
    success: 'dark:placeholder:text-success-700',
    info: 'dark:placeholder:text-info-700'
};
const placeholdersDisabled = {
    white: 'aria-disabled:placeholder:text-frame-500',
    light: 'aria-disabled:placeholder:text-frame-200',
    dark: 'aria-disabled:placeholder:text-frame-500',
    primary: 'aria-disabled:placeholder:text-primary-300',
    secondary: 'aria-disabled:placeholder:text-secondary-300',
    tertiary: 'aria-disabled:placeholder:text-tertiary-300',
    danger: 'aria-disabled:placeholder:text-danger-300',
    warning: 'aria-disabled:placeholder:text-warning-300',
    success: 'aria-disabled:placeholder:text-success-300',
    info: 'aria-disabled:placeholder:text-info-300'
};
export const placeholders = mergeConfigs(placeholdersDark, placeholdersDisabled, {
    white: 'placeholder:text-frame-400',
    light: 'placeholder:text-frame-400',
    dark: 'placeholder:text-frame-400',
    primary: 'placeholder:text-primary-300',
    secondary: 'placeholder:text-secondary-300',
    tertiary: 'placeholder:text-tertiary-300',
    danger: 'placeholder:text-danger-300',
    warning: 'placeholder:text-warning-300',
    success: 'placeholder:text-success-300',
    info: 'placeholder:text-info-300'
});
export const bgAriaChecked = {
    white: 'aria-checked:bg-frame-100',
    light: 'aria-checked:bg-frame-200',
    dark: 'aria-checked:bg-frame-700',
    primary: 'aria-checked:bg-primary-600',
    secondary: 'aria-checked:bg-secondary-600',
    tertiary: 'aria-checked:bg-tertiary-600',
    danger: 'aria-checked:bg-danger-600',
    warning: 'aria-checked:bg-warning-600',
    success: 'aria-checked:bg-success-600',
    info: 'aria-checked:bg-info-600'
};
export const bgGroupAriaChecked = {
    white: 'group-aria-checked:bg-frame-100',
    light: 'group-aria-checked:bg-frame-200',
    dark: 'group-aria-checked:bg-frame-700',
    primary: 'group-aria-checked:bg-primary-600',
    secondary: 'group-aria-checked:bg-secondary-600',
    tertiary: 'group-aria-checked:bg-tertiary-600',
    danger: 'group-aria-checked:bg-danger-600',
    warning: 'group-aria-checked:bg-warning-600',
    success: 'group-aria-checked:bg-success-600',
    info: 'group-aria-checked:bg-info-600'
};
export const bgAriaSelected = {
    white: 'aria-selected:bg-frame-100',
    light: 'aria-selected:bg-frame-200',
    dark: 'aria-selected:bg-frame-600',
    primary: 'aria-selected:bg-primary-500',
    secondary: 'aria-selected:bg-secondary-500',
    tertiary: 'aria-selected:bg-tertiary-500',
    danger: 'aria-selected:bg-danger-500',
    warning: 'aria-selected:bg-warning-500',
    success: 'aria-selected:bg-success-500',
    info: 'aria-selected:bg-info-500'
};
export const bgAriaExpanded = {
    white: 'aria-expanded:bg-frame-100 dark:aria-expanded:bg-frame-100',
    light: 'aria-expanded:bg-frame-200 dark:aria-expanded:bg-frame-200',
    dark: 'aria-expanded:bg-frame-600 dark:aria-expanded:bg-frame-600',
    primary: 'aria-expanded:bg-primary-500 dark:aria-expanded:bg-primary-500',
    secondary: 'aria-expanded:bg-secondary-500 dark:aria-expanded:bg-secondary-500',
    tertiary: 'aria-expanded:bg-tertiary-500 dark:aria-expanded:bg-tertiary-500',
    danger: 'aria-expanded:bg-danger-500 dark:aria-expanded:bg-danger-500',
    warning: 'aria-expanded:bg-warning-500 dark:aria-expanded:bg-warning-500',
    success: 'aria-expanded:bg-success-500 dark:aria-expanded:bg-success-500',
    info: 'aria-expanded:bg-info-500 dark:aria-expanded:bg-info-500'
};
export const bgAriaGlassExpanded = {
    white: 'aria-expanded:bg-frame-500/20 dark:aria-expanded:bg-frame-500/20',
    light: 'aria-expanded:bg-frame-500/20 dark:aria-expanded:bg-frame-500/20',
    dark: 'aria-expanded:bg-frame-900/30 dark:aria-expanded:bg-frame-900/40',
    primary: 'aria-expanded:bg-primary-500/20 dark:aria-expanded:bg-primary-500/20',
    secondary: 'aria-expanded:bg-secondary-500/20 dark:aria-expanded:bg-secondary-500/20',
    tertiary: 'aria-expanded:bg-tertiary-500/20 dark:aria-expanded:bg-tertiary-500/20',
    danger: 'aria-expanded:bg-danger-500/20 dark:aria-expanded:bg-danger-500/20',
    warning: 'aria-expanded:bg-warning-500/20 dark:aria-expanded:bg-warning-500/20',
    success: 'aria-expanded:bg-success-500/20 dark:aria-expanded:bg-success-500/20',
    info: 'aria-expanded:bg-info-500/20 dark:aria-expanded:bg-info-500/20'
};
export const bgAriaGlassSelected = {
    white: 'aria-selected:bg-frame-500/20 dark:aria-selected:bg-frame-500/20',
    light: 'aria-selected:bg-frame-500/20 dark:aria-selected:bg-frame-500/20',
    dark: 'aria-selected:bg-frame-900/30 dark:aria-selected:bg-frame-900/40',
    primary: 'aria-selected:bg-primary-500/20 dark:aria-selected:bg-primary-500/20',
    secondary: 'aria-selected:bg-secondary-500/20 dark:aria-selected:bg-secondary-500/20',
    tertiary: 'aria-selected:bg-tertiary-500/20 dark:aria-selected:bg-tertiary-500/20',
    danger: 'aria-selected:bg-danger-500/20 dark:aria-selected:bg-danger-500/20',
    warning: 'aria-selected:bg-warning-500/20 dark:aria-selected:bg-warning-500/20',
    success: 'aria-selected:bg-success-500/20 dark:aria-selected:bg-success-500/20',
    info: 'aria-selected:bg-info-500/20 dark:aria-selected:bg-info-500/20'
};
export const textAriaExpanded = {
    white: 'aria-expanded:text-[color:var(--text-dark-hover)] dark:aria-expanded:text-[color:var(--text-dark-hover)]',
    light: 'aria-expanded:text-[color:var(--text-dark-hover)] dark:aria-expanded:text-[color:var(--text-dark-hover)]',
    dark: 'aria-expanded:text-[color:var(--text-light-hover)] dark:aria-expanded:text-[color:var(--text-dark-hover)]',
    primary: 'aria-expanded:text-primary-700',
    secondary: 'aria-expanded:text-secondary-700',
    tertiary: 'aria-expanded:text-tertiary-700',
    danger: 'aria-expanded:text-danger-700',
    warning: 'aria-expanded:text-warning-700',
    success: 'aria-expanded:text-success-700',
    info: 'aria-expanded:text-info-700'
};
export const textAriaSelected = {
    white: 'aria-selected:text-[color:var(--text-dark-hover)]',
    light: 'aria-selected:text-[color:var(--text-dark-hover)]',
    dark: 'aria-selected:text-[color:var(--text-light-hover)]',
    primary: 'aria-selected:text-primary-700 dark:aria-selected:text-primary-500',
    secondary: 'aria-selected:text-secondary-700 dark:aria-selected:text-secondary-500',
    tertiary: 'aria-selected:text-tertiary-700 dark:aria-selected:text-tertiary-500',
    danger: 'aria-selected:text-danger-700 dark:aria-selected:text-danger-500',
    warning: 'aria-selected:text-warning-700 dark:aria-selected:text-warning-500',
    success: 'aria-selected:text-success-700 dark:aria-selected:text-success-500',
    info: 'aria-selected:text-info-700 dark:aria-selected:text-info-500'
};
export const textAriaSelectedSoft = {
    white: 'aria-selected:text-frame-300 dark:aria-selected:text-frame-400',
    light: 'aria-selected:text-frame-300  dark:aria-selected:text-frame-500',
    dark: 'aria-selected:text-frame-300 dark:aria-selected:text-frame-600',
    primary: 'aria-selected:text-primary-300 dark:aria-selected:text-primary-700',
    secondary: 'aria-selected:text-secondary-300 dark:aria-selected:text-secondary-700',
    tertiary: 'aria-selected:text-tertiary-300 dark:aria-selected:text-tertiary-700',
    danger: 'aria-selected:text-danger-300 dark:aria-selected:text-danger-700',
    warning: 'aria-selected:text-warning-300 dark:aria-selected:text-warning-700',
    success: 'aria-selected:text-success-300 dark:aria-selected:text-success-700',
    info: 'aria-selected:text-info-300 dark:aria-selected:text-info-700'
};
export const textAriaCurrent = {
    white: 'aria-current:text-[color:var(--text-dark-hover)]',
    light: 'aria-current:text-[color:var(--text-dark-hover)]',
    dark: 'aria-current:text-[color:var(--text-light-hover)]',
    primary: 'aria-current:text-primary-700 dark:aria-current:text-primary-500',
    secondary: 'aria-current:text-secondary-700 dark:aria-current:text-secondary-500',
    tertiary: 'aria-current:text-tertiary-700 dark:aria-current:text-tertiary-500',
    danger: 'aria-current:text-danger-700 dark:aria-current:text-danger-500',
    warning: 'aria-current:text-warning-700 dark:aria-current:text-warning-500',
    success: 'aria-current:text-success-700 dark:aria-current:text-success-500',
    info: 'aria-current:text-info-700  dark:aria-current:text-info-500'
};
export const borderAriaSelected = {
    $base: 'border',
    white: 'aria-selected:border-frame-50  dark:aria-selected:border-frame-50',
    light: 'aria-selected:border-frame-300 dark:aria-selected:border-frame-300',
    dark: 'aria-selected:border-frame-700 dark:aria-selected:border-frame-600',
    primary: 'aria-selected:border-primary-600 dark:aria-selected:border-primary-600',
    secondary: 'aria-selected:border-secondary-600  dark:aria-selected:border-secondary-600',
    tertiary: 'aria-selected:border-tertiary-600  dark:aria-selected:border-tertiary-600',
    danger: 'aria-selected:border-danger-600 dark:aria-selected:border-danger-600',
    warning: 'aria-selected:border-warning-600  dark:aria-selected:border-warning-600',
    success: 'aria-selected:border-success-600  dark:aria-selected:border-success-600',
    info: 'aria-selected:border-info-600  dark:aria-selected:border-info-600'
};
export const borderAriaExpanded = {
    $base: 'border',
    white: 'aria-expanded:border-frame-50',
    light: 'aria-expanded:border-frame-300',
    dark: 'aria-expanded:border-frame-700',
    primary: 'aria-expanded:border-primary-600',
    secondary: 'aria-expanded:border-secondary-600',
    tertiary: 'aria-expanded:border-tertiary-600',
    danger: 'aria-expanded:border-danger-600',
    warning: 'aria-expanded:border-warning-600',
    success: 'aria-expanded:border-success-600',
    info: 'aria-expanded:border-info-600'
};
