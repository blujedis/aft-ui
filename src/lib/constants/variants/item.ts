import { mergeConfigs } from '$lib/theme';

const bgItemHover = {
  $base: '',
  default: 'hover:bg-frame-200 dark:hover:bg-frame-500',
  dark: 'hover:bg-frame-500 dark:hover:bg-frame-800',
  primary: 'hover:bg-primary-500',
  secondary: 'hover:bg-secondary-500',
  tertiary: 'hover:bg-tertiary-500',
  danger: 'hover:bg-danger-500',
  warning: 'hover:bg-warning-500',
  success: 'hover:bg-success-500',
  info: 'hover:bg-info-500'
};

const bgItemSelected = {
  default: 'aria-selected:bg-frame-200 dark:aria-selected:bg-frame-500',
  dark: 'aria-selected:bg-frame-500 dark:aria-selected:bg-frame-800',
  primary: 'aria-selected:bg-primary-500',
  secondary: 'aria-selected:bg-secondary-500',
  tertiary: 'aria-selected:bg-tertiary-500',
  danger: 'aria-selected:bg-danger-500',
  warning: 'aria-selected:bg-warning-500',
  success: 'aria-selected:bg-success-500',
  info: 'aria-selected:bg-info-500'
};

const bgItemCurrent = {
  default: 'aria-current:bg-frame-200 dark:aria-current:bg-frame-500',
  dark: 'aria-current:bg-frame-500 dark:aria-current:bg-frame-900',
  primary: 'aria-current:bg-primary-500',
  secondary: 'aria-current:bg-secondary-500',
  tertiary: 'aria-current:bg-tertiary-500',
  danger: 'aria-current:bg-danger-500',
  warning: 'aria-current:bg-warning-500',
  success: 'aria-current:bg-success-500',
  info: 'aria-current:bg-info-500'
};

const bgItemExpanded = {
  default: 'aria-expanded:bg-frame-200 dark:aria-expanded:bg-frame-500',
  dark: 'aria-expanded:bg-frame-500 dark:aria-expanded:bg-frame-900',
  primary: 'aria-expanded:bg-primary-500 dark:aria-expanded:bg-primary-500',
  secondary: 'aria-expanded:bg-secondary-500 dark:aria-expanded:bg-secondary-500',
  tertiary: 'aria-expanded:bg-tertiary-500 dark:aria-expanded:bg-tertiary-500',
  danger: 'aria-expanded:bg-danger-500 dark:aria-expanded:bg-danger-500',
  warning: 'aria-expanded:bg-warning-500 dark:aria-expanded:bg-warning-500',
  success: 'aria-expanded:bg-success-500 dark:aria-expanded:bg-success-500',
  info: 'aria-expanded:bg-info-500 dark:aria-expanded:bg-info-500'
};

const bgItemChecked = {
  default: 'aria-checked:bg-frame-200 dark:aria-checked:bg-frame-500',
  dark: 'aria-checked:bg-frame-500 dark:aria-checked:bg-frame-900',
  primary: 'aria-checked:bg-primary-500 dark:aria-checked:bg-primary-500',
  secondary: 'aria-checked:bg-secondary-500 dark:aria-checked:bg-secondary-500',
  tertiary: 'aria-checked:bg-tertiary-500 dark:aria-checked:bg-tertiary-500',
  danger: 'aria-checked:bg-danger-500 dark:aria-checked:bg-danger-500',
  warning: 'aria-checked:bg-warning-500 dark:aria-checked:bg-warning-500',
  success: 'aria-checked:bg-success-500 dark:aria-checked:bg-success-500',
  info: 'aria-checked:bg-info-500 dark:aria-checked:bg-info-500'
};

const bgItemCheckedGhost = {
  $base: 'bg-transparent',
  default: 'aria-checked:bg-frame-100 dark:aria-checked:bg-frame-500/50',
  dark: 'aria-checked:bg-frame-600/50 dark:aria-checked:bg-frame-900/40',
  primary: 'aria-checked:bg-primary-100 dark:aria-checked:bg-primary-500/50',
  secondary: 'aria-checked:bg-secondary-100 dark:aria-checked:bg-secondary-500/50',
  tertiary: 'aria-checked:bg-tertiary-100 dark:aria-checked:bg-tertiary-500/50',
  danger: 'aria-checked:bg-danger-100 dark:aria-checked:bg-danger-500/50',
  warning: 'aria-checked:bg-warning-100 dark:aria-checked:bg-warning-500/50',
  success: 'aria-checked:bg-success-100 dark:aria-checked:bg-success-500/50',
  info: 'aria-checked:bg-info-100 dark:aria-checked:bg-info-500/50'
};

const bgItemCheckedFilled = {
  $base: '',
  default: 'aria-checked:bg-frame-200/70 dark:aria-checked:bg-frame-600',
  dark: 'aria-checked:bg-frame-600 dark:aria-checked:bg-frame-900',
  primary: 'aria-checked:bg-primary-600',
  secondary: 'aria-checked:bg-secondary-600',
  tertiary: 'aria-checked:bg-tertiary-600',
  danger: 'aria-checked:bg-danger-600',
  warning: 'aria-checked:bg-warning-600',
  success: 'aria-checked:bg-success-600',
  info: 'aria-checked:bg-info-600'
};

export const variantItemHover = mergeConfigs(bgItemHover, {
  $base: 'hover:text-[color:var(--text-light)]',
  default: 'hover:text-inherit'
});

export const variantItemSelected = mergeConfigs(bgItemSelected, {
  $base: 'aria-expanded:text-[color:var(--text-light)]',
  default: 'aria-expanded:text-inherit'
});

export const variantItemCurrent = mergeConfigs(bgItemCurrent, {
  $base: 'aria-expanded:text-[color:var(--text-light)]',
  default: 'aria-expanded:text-inherit'
});

export const variantItemChecked = mergeConfigs(bgItemChecked, {
  $base: 'aria-checked:text-[color:var(--text-light)]',
  default: 'aria-checked:text-inherit'
});

export const variantItemCheckedGhost = mergeConfigs(bgItemCheckedGhost, {
  $base: 'aria-checked:text-inherit',
  default: 'aria-checked:text-inherit',
  dark: 'hover:text-[color:var(--text-light)] aria-checked:text-[color:var(--text-light)]'
});

export const variantItemCheckedFilled = mergeConfigs(bgItemCheckedFilled, {
  $base: 'aria-checked:text-[color:var(--text-light)]',
  default: 'aria-checked:text-inherit'
});

export const variantItemExpanded = mergeConfigs(bgItemExpanded, {
  $base: 'aria-expanded:text-[color:var(--text-light)]',
  default: 'aria-expanded:text-inherit'
});
