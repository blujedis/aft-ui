import { Builder, normalize } from '@forewind/util';
import type { PickElement } from '$lib/types';
import themeStore from '../init';
import { get } from 'svelte/store';

export type BadgeElementProps = PickElement<'span', 'size'>;
export type BadgeDefaults = typeof defaults;
export type BadgeProps = BadgeElementProps & BadgeDefaults;

const { palette, components } = get(themeStore);
const features = normalize(components.badge.main, palette);
const main = new Builder(features, palette);

const defaults = main.defaults({
  base: true,
  size: 'md',
  variant: 'filled'
});

export default {
  defaults,
  features,
  main,
  palette,
};