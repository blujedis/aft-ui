import { Builder, normalize } from '@forewind/util';
import themeStore from '../init';
import type { PickElement } from '$lib/types';
import { get } from 'svelte/store';

export type ElementProps = PickElement<'button', 'size'>;
export type Defaults = ReturnType<typeof b.defaults>;

const { palette, components } = get(themeStore);
const button = normalize(components.button.main, palette);
const b = new Builder(button, palette);

const defaults = b.defaults({
  base: true,
  size: 'md'
});
