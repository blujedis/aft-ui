import { createStoreInternal, createStore } from './store';
import defaultTheme from './theme.json';
import type { ThemeConfig } from '../types';
// @ts-ignore
import userTheme from '../../../../../aft.theme.json';
export const themeStore = createStoreInternal(userTheme, defaultTheme as ThemeConfig);
export { createStore };
