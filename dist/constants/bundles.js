/**
 * This file is a base configuration that block level
 * elements inherit from and/or override.
 */
import { mergeConfigs } from '../theme/utils';
import { ring, ringHover, solid, solidHover, text, textHover, borderGroupHover, borderHover, border, solidGlass, solidGlassHover, solidGhost } from './base';
import { placeholder } from './placeholder';
export const variantFilled = mergeConfigs(solid, {
    $base: 'text-white',
    white: 'text-[color:var(--text-dark)]',
    light: 'text-[color:var(--text-dark)]'
});
export const variantFilledHover = mergeConfigs(solid, solidHover, {
    $base: 'text-white',
    white: 'text-[color:var(--text-dark)]',
    light: 'text-[color:var(--text-dark)]'
});
export const variantGlass = mergeConfigs(text, solidGlass, {
    $base: 'text-[color:var(--text-dark)]',
    white: 'text-[color:var(--text-dark)]',
    light: 'text-[color:var(--text-dark)]'
});
export const variantGlassHover = mergeConfigs(text, solidGlass, solidGlassHover, {
    $base: 'text-[color:var(--text-dark)]',
    white: 'text-[color:var(--text-dark)] dark:text-[color:var(--text-dark)]',
    light: 'text-[color:var(--text-dark)]'
});
export const variantOutlinedHover = mergeConfigs(text, ring, ringHover, {
    $base: 'bg-transparent ring-1 ring-inset'
});
export const variantOutlined = mergeConfigs(text, ring, {
    $base: 'bg-transparent ring-1 ring-inset'
});
export const variantText = mergeConfigs(text, textHover, {
    $base: 'border-0 bg-transparent'
});
export const variantGhost = mergeConfigs(text, solidGhost, {
    $base: 'border border-transparent bg-transparent',
    white: 'dark:hover:text-[color:var(--text-dark)]'
});
export const variantGhostHover = mergeConfigs(text, solidGlassHover, {
    $base: 'border border-transparent bg-transparent',
    white: 'dark:hover:text-[color:var(--text-dark)]'
});
export const variantFlushed = mergeConfigs(text, borderGroupHover, {
    $base: 'border border-x-0 border-b-0 dark:bg-transparent',
    white: 'bg-white border-white',
    light: 'border-frame-200',
    dark: 'border-frame-600',
    primary: 'border-primary-400',
    secondary: 'border-secondary-400',
    tertiary: 'border-tertiary-400',
    danger: 'border-danger-400',
    warning: 'border-warning-400',
    success: 'border-success-400',
    info: 'border-info-400'
});
export const panel = mergeConfigs(placeholder, {
    $base: 'ring-1 ring-black ring-opacity-5 dark:ring-opacity-40 bg-white dark:bg-frame-700'
});
export const row = mergeConfigs(placeholder, {
    $base: 'hover:bg-frame-100 dark:bg-frame-700'
});
export const tile = mergeConfigs(border, borderHover, {
    light: 'border-frame-200 hover:border-frame-300'
});
export const checkradio = mergeConfigs(text, tile);
