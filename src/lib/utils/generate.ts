import type { ThemeColor, DeepPartial } from '$lib/types';

type ThemeTokenValue = string | number | [string | number, (string | number)?];
type ThemeTokenType = 'bg' | 'text' | 'ring' | 'border';
type ThemeTokenGroup = 'root' | 'selected' | 'expanded' | 'current' | 'focused';
type ThemeTokenConfig = Record<ThemeColor | 'base', ThemeTokenValue>;
type ThemeTokenMap = Record<ThemeTokenType, Record<ThemeTokenGroup, ThemeTokenConfig>>;

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

const temp = {

  bg: {
    filled: {},
    ghost: {},
    text: {},
    flushed: {}
  },
  text: {
    filled: {},
    ghost: {},
    text: {},
    flushed: {}
  },
  ring: {
    filled: {},
    ghost: {},
    text: {},
    flushed: {}
  },
  border: {
    filled: {},
    ghost: {},
    text: {},
    flushed: {}
  },

};

const common = {
  ring: {
    root: {
      base: 'filled.bg.base',
      default: 'filled.bg.default',
      dark: 'filled.bg.dark'
    },
  },
};

const filled = {
  bg: {
    root: {
      base: 500,
      default: ['frame-200', 'frame-600'],
      dark: ['frame-500', 'frame-800'],
    },
    selected: {
      base: 'filled.bg.root.base',
      default: 'filled.bg.root.default',
      dark: 'filled.bg.root.dark'
    },

  },

  text: {
    root: {
      base: '--text-white',
      default: ['--text-dark', '--text-light'],
      dark: '--text-light',
    },
    selected: {
      base: 'filled.text.root.base',
      default: 'filled.text.root.default',
      dark: 'filled.text.root.dark'
    }
  },

};

const ghost = {
  bg: {
    root: {
      base: '500/50',
      default: ['frame-200/50', 'frame-500/50'],
      dark: 'frame-700/50',
    },
    selected: {
      base: 'ghost.bg.root.base',
      default: 'ghost.bg.root.default',
      dark: 'ghost.bg.root.dark'
    },

  },

  text: {
    root: {
      base: 500,
      default: '--text-dark',
      dark: '--text-light',
    },
    selected: {
      base: 'ghost.text.root.base',
      default: 'ghost.text.root.default',
      dark: 'ghost.text.root.dark'
    }
  },

};




const map = { common, filled, ghost };

function parseTokens<T extends DeepPartial<Record<keyof typeof map, ThemeTokenMap>>, C extends Record<string, string>>(tokens: T, colors: C) {
  //

}




