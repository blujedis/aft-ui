import defaults from './defaults';
import * as defaultOptions from '../components/options';
import * as defaultComponents from '../components/configs';
import { createStoreInternal, createStore } from './store';
//  await import(`file:///${process.cwd().replace(/\\/g, '/')}/server/models/Users`)

const defaultTheme = {
	options: defaultOptions,
	defaults,
	components: defaultComponents
};

export const themeStore = createStoreInternal(defaultTheme);

export { createStore };
