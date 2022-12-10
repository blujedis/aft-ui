import { Builder, normalize } from '@forewind/util';
import themeStore from '../init';
import type { PickElement } from '$lib/types';
import { get } from 'svelte/store';

export type CheckboxElementProps = PickElement<'input', 'size'>;
export type CheckboxDefaults = typeof defaults;
export type CheckboxProps = CheckboxElementProps & CheckboxDefaults;

const { palette, components } = get(themeStore);
const features = normalize(components.checkbox.main, palette);
const main = new Builder(features, palette);
const defaults = main.defaults({
    base: true,
    size: 'md',
    transition: true,
    hovered: true
  }, ['variant']);

export default {
  defaults,
  features,
  main,
  palette,
};
