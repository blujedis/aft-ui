import { createStoreInternal, createStore } from './store';
import defaultTheme from './theme.json';
import type { ThemeConfig } from '../types';
// @ts-ignore
// import userTheme from '../../../../../aft.theme.json';
import userTheme from '@root/aft.theme.json';
export const themeStore = createStoreInternal(userTheme, defaultTheme as unknown as ThemeConfig);
export { createStore };
