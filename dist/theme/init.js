import { createStoreInternal, createStore } from './store';
import defaultTheme from './theme.json';
// @ts-ignore
import userTheme from '../../../../../aft.theme.json';
export const themeStore = createStoreInternal(userTheme, defaultTheme);
export { createStore };
