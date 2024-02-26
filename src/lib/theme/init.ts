import defaultSettings from './defaults';
import * as defaultOptions from '../components/options';
// import * as defaultComponents from '../components/configs';
import { createStoreInternal, createStore } from './store';

const defaultTheme = {
	options: defaultOptions,
	defaults: defaultSettings,
	//components: defaultComponents
};

export const themeStore = createStoreInternal(defaultTheme);

export { createStore };
