
import { Builder, normalize } from '@forewind/util';
import themeStore from '../init';
import type { PickElement } from '$lib/types';
import { get } from 'svelte/store';

export type IconElementProps = PickElement<'span', 'size'>;
export type IconDefaults = typeof defaults;
export type IconProps = IconElementProps & IconDefaults;

const { palette, components } = get(themeStore);
const features = normalize(components.icon.main, palette);
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
