import type { ThemeColor, DeepPartial } from '$lib/types';

type ThemeTokenTuple = [string | number, (string | number)?]
type ThemeTokenValue = string | number | ThemeTokenTuple;
type ThemeTokenConfig = Record<ThemeColor | 'base', ThemeTokenValue>;
type ThemeTokenNormalizedConfig = Record<ThemeColor | 'base', [string, string]>;
// type ThemeTokenType = 'bg' | 'text' | 'ring' | 'border';
// type ThemeTokenGroup = 'root' | 'selected' | 'expanded' | 'current' | 'focused';
// type ThemeTokenMap = Record<ThemeTokenType, Record<ThemeTokenGroup, ThemeTokenConfig>>;

const colors = {
  default: 'frame',
  dark: 'frame',
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  danger: 'danger',
  warning: 'warning',
  success: 'success',
  info: 'info',
};

const tokenMap = {

  // [COMMON]

  ring: {
    base: 'bg-filled.base',
    default: 'bg-filled.default',
    dark: 'bg-filled.dark'
  },

  border: {
    base: 'ring.base',
    default: 'ring.default',
    dark: 'ring.dark'
  },

  // [FILLED]

  'bg-filled': {
    base: 500,
    default: ['frame-200', 'frame-600'],
    dark: ['frame-500', 'frame-800'],
  },

  'bg-filled-selected': {
    base: 'bg-filled.base',
    default: 'bg-filled.default',
    dark: 'bg-filled.dark'
  },

  'text-filled': {
    base: 'text-white',
    default: ['--text-dark', '--text-light'],
    dark: '--text-light'
  },

  // [OUTLINED]

  'outlined-filled': {
    base: 'bg-filled.base',
    default: 'bg-filled.default',
    dark: 'bg-filled.dark'
  },


  // [GHOST]

  'bg-ghost': {
    base: '500/50',
    default: ['frame-200/50', 'frame-500/50'],
    dark: 'frame-700/50',
  },

  'bg-ghost-selected': {
    base: 'bg-ghost.base',
    default: 'bg-ghost.default',
    dark: 'bg-ghost.dark'
  },

};

function ensureTuple(value?: ThemeTokenValue): ThemeTokenTuple {
  if (typeof value === 'undefined' || value === null || Array.isArray(value))
    return (value || []) as ThemeTokenTuple;
  return [value];
}

function normalizeConfig(conf: DeepPartial<ThemeTokenConfig>): ThemeTokenNormalizedConfig {
  const clone = JSON.parse(JSON.stringify({ ...conf }));

  return clone;
}

function parseTokens<T extends DeepPartial<Record<keyof typeof tokenMap, ThemeTokenConfig>>, C extends Record<string, string>>(tokens: T, colors: C) {

  for (const [key, obj] of Object.entries(tokens)) {
    const conf = normalizeConfig(obj);
  }

}




