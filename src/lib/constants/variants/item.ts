import { mergeConfigs } from '$lib/theme';
import { bgItemChecked, bgItemCheckedFilled, bgItemCheckedGhost, bgItemCurrent, bgItemExpanded, bgItemHover, bgItemSelected } from '../states';


export const variantItemHover = mergeConfigs(bgItemHover, {
  $base: 'hover:text-[color:var(--text-light)]',
  default: 'hover:text-inherit'
});

export const variantItemSelected = mergeConfigs(bgItemSelected, {
  $base: 'aria-expanded:text-[color:var(--text-light)]',
  default: 'aria-expanded:text-inherit'
});

export const variantItemCurrent = mergeConfigs(bgItemCurrent, {
  $base: 'aria-expanded:text-[color:var(--text-light)]',
  default: 'aria-expanded:text-inherit'
});

export const variantItemChecked = mergeConfigs(bgItemChecked, {
  $base: 'aria-checked:text-[color:var(--text-light)]',
  default: 'aria-checked:text-inherit'
});

export const variantItemCheckedGhost = mergeConfigs(bgItemCheckedGhost, {
  $base: 'aria-checked:text-inherit',
  default: 'aria-checked:text-inherit',
  dark: 'hover:text-[color:var(--text-light)] aria-checked:text-[color:var(--text-light)]'
});

export const variantItemCheckedFilled = mergeConfigs(bgItemCheckedFilled, {
  $base: 'aria-checked:text-[color:var(--text-light)]',
  default: 'aria-checked:text-inherit'
});

export const variantItemExpanded = mergeConfigs(bgItemExpanded, {
  $base: 'aria-expanded:text-[color:var(--text-light)]',
  default: 'aria-expanded:text-inherit'
});
