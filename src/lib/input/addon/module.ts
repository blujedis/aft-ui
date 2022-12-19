
import { Builder, normalize } from '@forewind/util';
import themeStore from '../../init';
import type { PickElement } from '$lib/types';
import { get } from 'svelte/store';

export type InputAddonElementProps = PickElement<'input', 'size'>;
export type InputAddonDefaults = typeof defaults;
export type InputAddonProps = InputAddonElementProps & InputAddonDefaults;

const { palette, components } = get(themeStore);
const features = normalize(components.input.main, palette);
const main = new Builder(features, palette);
const defaults = main.defaults({
  base: true,
  size: 'md'
});

export default {
  defaults,
  features,
  main,
  palette,
};
