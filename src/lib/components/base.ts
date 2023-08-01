/**
 * This file is a base configuration that block level
 * elements inherit from and/or override.
 */
import { mergeConfigs } from '$lib/theme';

export const colors = [
  'white',
  'light',
  'dark',
  'primary',
  'secondary',
  'tertiary',
  'danger',
  'success',
  'warning',
  'info'
] as const;

export const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export const bg = {
  white: 'bg-white',
  light: 'bg-frame-50',
  dark: 'bg-frame-700',
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  tertiary: 'bg-tertiary-500',
  danger: 'bg-danger-500',
  warning: 'bg-warning-500',
  success: 'bg-success-500',
  info: 'bg-info-500'
};

export const bgLighter = {
  white: 'hover:bg-frame-50',
  light: 'hover:bg-frame-100',
  dark: 'hover:bg-frame-300',
  primary: 'hover:bg-primary-100',
  secondary: 'hover:bg-secondary-100',
  tertiary: 'hover:bg-tertiary-100',
  danger: 'hover:bg-danger-100',
  warning: 'hover:bg-warning-100',
  success: 'hover:bg-success-100',
  info: 'hover:bg-info-100'
};

export const bgLightest = {
  white: 'bg-white',
  light: 'bg-frame-50',
  dark: 'bg-frame-50',
  primary: 'bg-primary-50',
  secondary: 'bg-secondary-50',
  tertiary: 'bg-tertiary-50',
  danger: 'bg-danger-50',
  warning: 'bg-warning-50',
  success: 'bg-success-50',
  info: 'bg-info-50'
};

export const bgHover = {
  white: 'hover:bg-frame-50',
  light: 'hover:bg-frame-100',
  dark: 'hover:bg-frame-800',
  primary: 'hover:bg-primary-600',
  secondary: 'hover:bg-secondary-600',
  tertiary: 'hover:bg-tertiary-600',
  danger: 'hover:bg-danger-600',
  warning: 'hover:bg-warning-600',
  success: 'hover:bg-success-600',
  info: 'hover:bg-info-600'
};

export const bgLighterHover = {
  white: 'hover:bg-frame-50',
  light: 'hover:bg-frame-100',
  dark: 'hover:bg-frame-200',
  primary: 'hover:bg-primary-50',
  secondary: 'hover:bg-secondary-50',
  tertiary: 'hover:bg-tertiary-50',
  danger: 'hover:bg-danger-50',
  warning: 'hover:bg-warning-50',
  success: 'hover:bg-success-50',
  info: 'hover:bg-info-50'
};

export const bgGroupHover = {
  white: 'group-hover:bg-frame-50',
  light: 'group-hover:bg-frame-100',
  dark: 'group-hover:bg-frame-800',
  primary: 'group-hover:bg-primary-600',
  secondary: 'group-hover:bg-secondary-600',
  tertiary: 'group-hover:bg-tertiary-600',
  danger: 'group-hover:bg-danger-600',
  warning: 'group-hover:bg-warning-600',
  success: 'group-hover:bg-success-600',
  info: 'group-hover:bg-info-600'
};

export const ring = {
  white: 'ring-white',
  light: 'ring-frame-200',
  dark: 'ring-frame-700',
  primary: 'ring-primary-500',
  secondary: 'ring-secondary-500',
  tertiary: 'ring-tertiary-500',
  danger: 'ring-danger-500',
  warning: 'ring-warning-500',
  success: 'ring-success-500',
  info: 'ring-info-500'
};

export const ringHover = {
  white: 'hover:ring-frame-100',
  light: 'hover:ring-frame-200',
  dark: 'hover:ring-frame-800',
  primary: 'hover:ring-primary-600',
  secondary: 'hover:ring-secondary-600',
  tertiary: 'hover:ring-tertiary-600',
  danger: 'hover:ring-danger-600',
  warning: 'hover:ring-warning-5600',
  success: 'hover:ring-success-600',
  info: 'hover:ring-info-600'
};

export const text = {
  white: 'text-inherit',
  light: 'text-inherit',
  dark: 'text-inherit',
  primary: 'text-primary-500',
  secondary: 'text-secondary-500',
  tertiary: 'text-tertiary-500',
  danger: 'text-danger-500',
  warning: 'text-warning-500',
  success: 'text-success-500',
  info: 'text-info-500'
};

export const textHover = {
  white: 'hover:text-frame-900',
  light: 'hover:text-frame-900',
  dark: 'hover:text-frame-900',
  primary: 'hover:text-primary-700',
  secondary: 'hover:text-secondary-700',
  tertiary: 'hover:text-tertiary-700',
  danger: 'hover:text-danger-700',
  warning: 'hover:text-warning-700',
  success: 'hover:text-success-700',
  info: 'hover:text-info-700'
};

export const border = {
  white: 'border-white',
  light: 'border-frame-300',
  dark: 'border-frame-500',
  primary: 'border-primary-400',
  secondary: 'border-secondary-400',
  tertiary: 'border-tertiary-400',
  danger: 'border-danger-400',
  warning: 'border-warning-400',
  success: 'border-success-400',
  info: 'border-info-400'
};

export const borderHover = {
  white: 'hover:border-frame-50',
  light: 'hover:border-frame-400',
  dark: 'hover:border-frame-800',
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
  light: 'group-hover:border-frame-400',
  dark: 'group-hover:border-frame-800',
  primary: 'group-hover:border-primary-600',
  secondary: 'group-hover:border-secondary-600',
  tertiary: 'group-hover:border-tertiary-600',
  danger: 'group-hover:border-danger-600',
  warning: 'group-hover:border-warning-600',
  success: 'group-hover:border-success-600',
  info: 'group-hover:border-info-600'
};

export const bgAriaChecked = {
  white: 'aria-checked:bg-gray-200',
  dark: 'aria-checked:bg-gray-200',
  light: 'aria-checked:bg-frame-400',
  primary: 'aria-checked:bg-primary-500',
  secondary: 'aria-checked:bg-secondary-500',
  tertiary: 'aria-checked:bg-tertiary-500',
  danger: 'aria-checked:bg-danger-500',
  warning: 'aria-checked:bg-warning-500',
  success: 'aria-checked:bg-success-500',
  info: 'aria-checked:bg-info-500'
};

export const bgGroupAriaChecked = {
  white: 'group-aria-checked:bg-gray-200',
  dark: 'group-aria-checked:bg-gray-200',
  light: 'group-aria-checked:bg-frame-400',
  primary: 'group-aria-checked:bg-primary-500',
  secondary: 'group-aria-checked:bg-secondary-500',
  tertiary: 'group-aria-checked:bg-tertiary-500',
  danger: 'group-aria-checked:bg-danger-500',
  warning: 'group-aria-checked:bg-warning-500',
  success: 'group-aria-checked:bg-success-500',
  info: 'group-aria-checked:bg-info-500'
};

//////////////////////////////////////////////////////////////
// Block Elements
//////////////////////////////////////////////////////////////

export const variantText = mergeConfigs(text, textHover, {
  $base: 'border-0 bg-transparent',
});

export const variantFilled = mergeConfigs(bg, bgHover, {
  $base: 'text-white border border-transparent ring-0',
  white: 'text-inherit',
  light: 'text-inherit'
});

export const variantOutlined = mergeConfigs(variantText, ring, ringHover, {
  $base: 'bg-transparent ring-1 border border-transparent',
  light: 'ring-frame-300 hover:ring-frame-400',
});

export const variantGhost = mergeConfigs(variantText, bgLighterHover, {
  $base: 'border border-transparent bg-transparent text-inherit',
  info: 'hover:bg-info-100 hover:ring-info-100'
});

export const variantFlushed = mergeConfigs(text, border, borderGroupHover, bgLightest, bgLighterHover, {
  $base: 'border border-x-0 border-b-0',
});

//////////////////////////////////////////////////////////////