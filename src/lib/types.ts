import type { defaultColors, shades } from './utils/generate';

// Common

export type ClassNameType = string | number | boolean | undefined | null | Record<string, any>;
export type ClassNameProp = ClassNameType | ClassNameType[];

export type StringOrValue = string & { value?: any };

export type TypeOrValue<Keys extends string | number | symbol> = Keys | StringOrValue;

export type FallbackType = 'undefined' | 'null' | false;

export interface ElementBaseProps {
  class: string;
  style: string;
}

// Theme Colors

export type ThemeDefaultColors = typeof defaultColors;
export type ThemeColor = keyof ThemeDefaultColors;
export type Shade = typeof shades[number];
export type ThemeColors = Record<ThemeColor, Record<Shade | 'DEFAULT', string>>;

// Theme and Variant Helpers

export type ThemeKey<T extends Record<string, unknown>> = keyof T;

export type VariantKey<T extends Record<string, unknown>, K extends keyof T = keyof T> = keyof T[K];

// Picks feature types. 

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type TypedFeaturesBase<T extends Record<string, any>> = { [P in keyof T]:
  T[P] extends object ?
  T[P] extends readonly any[] ? T[P][number] : TypeOrValue<keyof T[P]> : boolean
};

export type TypedFeatures<T extends Record<string, any>, K extends keyof T | true | undefined = undefined> =
  K extends undefined
  ? TypedFeaturesBase<T>
  : K extends keyof T ? Optional<TypedFeaturesBase<T>, K> :
  K extends true ? Partial<TypedFeaturesBase<T>> : never;

// Element Attributes Helper for Picking Typed Options

export type ExclcludedAttributes<T extends HTMLElement> = keyof svelte.JSX.DOMAttributes<T> | 'class' | 'classname' | 'inputmode' | 'unselectable';

export type ElementAttributes<T extends HTMLElement> = Omit<svelte.JSX.HTMLAttributes<T>, ExclcludedAttributes<T>> & Partial<{
  inputmode: 'search' | 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal';
  classname: string;
  class: string;
}>;

// Nested Omit Type

export type NestedKey<O> = {
  [K in Extract<keyof O, string>]: O[K] extends Array<any>
  ? K
  : O[K] extends Record<string, unknown>
  ? `${K}` | `${K}.${NestedKey<O[K]>}`
  : K
}[Extract<keyof O, string>];

export type UnDot<T extends string> =
  T extends `${infer A}.${infer B}`
  ? [A, ...UnDot<B>]
  : [T];

export type Tail<T extends any[]> = ((...t: T) => void) extends ((
  h: any,
  ...r: infer R
) => void)
  ? R
  : never;

export type DeepOmitBase<T, Path extends string[]> = T extends object ?
  Path['length'] extends 1 ? Omit<T, Path[0]> : {
    [K in keyof T]: K extends Path[0] ? DeepOmitBase<T[K], Tail<Path>> : T[K];
  } : T;

export type DeepOmit<T, Path extends NestedKey<T>> = DeepOmitBase<T, UnDot<Path>>;
