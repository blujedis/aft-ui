import { useStore, type PersistentStore } from './_hooks';
// import { useVars } from '@forewind/util';

// configuration.
import { palette, config } from './_config';

// Components
import badge from './badge/config';
import button from './button/config';
import checkbox from './checkbox/config';
import combobox from './combobox/config';
import comboboxOption from './combobox/option/config';
import dropdown from './button/config';
import icon from './icon/config';
import input from './input/config';
import inputAddon from './input/addon/config';
import kbd from './kbd/config';
import label from './label/config';
import radio from './radio/config';
import select from './select/config';
import slider from './slider/config';
import switcher from './switcher/config';
import text from './text/config';
import textarea from './textarea/config';

const STORE_KEY = '__forewind_theme__';
// const isDev = import.meta.env.DEV;

const components = {
	badge,
	button,
	checkbox,
	combobox,
	comboboxOption,
	dropdown,
	icon,
	input,
	inputAddon,
	kbd,
	label,
	radio,
	select,
	slider,
	switcher,
	text,
	textarea
};

const baseConfig = {
	palette,
	config,
	components
};

let themeStore: PersistentStore<typeof baseConfig>;

function initStore() {
	if (typeof themeStore !== 'undefined') return themeStore;

	// if (isDev)
	//   storage.remove(STORE_KEY);

	themeStore = useStore(baseConfig, {
		persistKey: STORE_KEY,
		persistProps: ['palette']
	});

	// const vars = useVars(storeConfig.palette);

	// themeStore.subscribe(storeConfig => {
	//     vars.update(storeConfig.palette);
	// });

	return themeStore;
}

export { STORE_KEY, palette, config, components };

export default initStore();
