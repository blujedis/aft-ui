import { createStore } from './state';
import { main, button, box, icon } from './config';
import merge from 'lodash.merge';

export * from './types';
export * from './state';

export const baseTheme = {
  main,
  box,
  button,
  icon
};

/**
 * Extends the theme with custom values.
 * 
 * @param theme the them values to extend to base.
 */
export function extendTheme<T extends typeof baseTheme>(theme = baseTheme as Partial<T>) {
  return merge(baseTheme as Required<T>, theme);
}

/**
 * Creates a Svelte store using extended or default theme.
 * 
 * @param theme the theme to init store with.
 */
export default function createThemeStore<T extends typeof baseTheme>(theme = baseTheme as T) {
  return createStore<T>({ ...theme });
}

