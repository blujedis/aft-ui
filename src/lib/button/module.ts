/* eslint-disable prefer-const */
import { Builder, normalize } from '@forewind/util';
import themeStore from '../init';
import type { PickElement } from '$lib/types';
import { get } from 'svelte/store';

export type ElementProps = PickElement<'button', 'size'>;
export type Defaults = typeof defaults;
export type Props = ElementProps & Defaults;

const { palette, components } = get(themeStore);
const features = normalize(components.button.main, palette);
export const main = new Builder(features, palette);
export const defaults = main.defaults({
  base: true,
  size: 'md',
  variant: 'filled'
});
