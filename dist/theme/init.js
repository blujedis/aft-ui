import { createStoreInternal, createStore } from './store';
import defaultSettings from './defaults';
import * as defaultOptions from '../components/options';
const defaultTheme = {
    options: defaultOptions,
    defaults: defaultSettings
};
export const themeStore = createStoreInternal(defaultTheme);
export { createStore };
