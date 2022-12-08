import { Builder, normalize } from '@forewind/util';
import themeStore from '../init';
import type { PickElement } from '$lib/types';
import { get } from 'svelte/store';

export type ElementProps = PickElement<'button', 'size'>;
export type Props = ElementProps & ReturnType<typeof main.defaults>;

const { palette, components } = get(themeStore);
const features = normalize(components.button.main, palette);

export const main = new Builder(features, palette);

