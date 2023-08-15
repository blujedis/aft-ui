import { createStoreInternal, createStore } from './store';
import baseTheme from './theme.json';
import userTheme from '../../../../../aft.theme.json';
export const themeStore = createStoreInternal(userTheme, baseTheme);
export { createStore };
