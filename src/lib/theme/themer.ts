import { twMerge } from 'tailwind-merge';
import { ensureArray } from './utils';
import classnames from 'classnames';
import type { ClassNameValue } from 'tailwind-merge/dist/lib/tw-join';
import { colors } from './constants';
import { getProperty } from 'dot-prop';

export interface ThemerApi<C extends ThemeConfig> {
	variant<N extends keyof C['components'], V extends keyof C['components'][N]>(
		name: N,
		variant?: V,
		when?: Primitive
	): ThemerApi<C>;

	variant<N extends keyof C['components'], V extends keyof C['components'][N]>(
		name: N,
		variant?: V,
		theme?: ThemeColor,
		when?: Primitive
	): ThemerApi<C>;

	option<K extends ThemeOption>(
		key: K,
		prop: PropsWithoutPrefix<keyof ThemeOptions[K], '$'> | undefined,
		when: Primitive
	): ThemerApi<C>;

	mapped<T extends Record<string, unknown>, K extends Path<T>>(
		obj: T,
		key: K,
		when: Primitive
	): ThemerApi<C>;

	remove(classes: string | string[], when: Primitive): ThemerApi<C>;

	append(arg: ClassNameValue, when: Primitive): ThemerApi<C>;

	compile(withTailwindMerge?: boolean): string;

	classes(): {
		base: string[];
		themed: string[];
		removed: string[];
		appended: classnames.ArgumentArray;
	};
}

export type ThemerInstance<C extends ThemeConfig> = {
	create: (instanceName?: string) => ThemerApi<C>;
};

import type {
	PropsWithoutPrefix,
	ThemeConfig,
	ThemeOption,
	ThemeOptions,
	ThemeColor,
	Path
} from '../types/theme';

type Primitive = boolean | string | number | undefined | Primitive[];

/**
 * Simply flattens array then joins by strings.
 *
 * @param classes the classes to be joined.
 */
function join(...classes: (string | string[])[]) {
	return classes.flat().join(' ');
}

/**
 *
 * @param classes the array of classes that should be merged using TailwindMerge.
 */
function merge(...classes: ClassNameValue[]) {
	return twMerge(...classes);
}

/**
 * Checks if source includes compare value(s).
 *
 * @param source the source value or values.
 * @param values the compare value or values.
 */
function includes(source: Primitive | Primitive[], values: Primitive | Primitive[]) {
	source = ensureArray(source);
	values = ensureArray(values);
	return source.some((v) => (values as Primitive[]).includes(v));
}

/**
 * Simple string formatter that replaces values by positional order of arguments matched.
 *
 * @param template the template to be formatted
 * @param token the token to search for ex: {{theme}}
 * @param args the positional arguments to replace tokens with.
 */
export function formatter(template: string, token: string, ...args: any[]) {
	const exp = new RegExp('{{' + token + '}}', 'g');
	const matches = template.match(exp) || [];
	if (!matches.length) return template; // nothing to do no matching tokens.
	const diff = Math.max(0, matches.length - args.length);
	if (diff > 0)
		// if diff in length use first arg as fill arg.
		args = [...args, ...Array(diff).fill(args[0])];
	for (const i in args) {
		template = template.replace(`{{${token}}}`, args[i] + '');
	}
	return template;
}

export function themer<C extends ThemeConfig>(themeConfig: C) {
	const mockApi = {
		variant: mockVariant,
		option: mockOption,
		mapped: mockMapped,
		remove: mockRemove,
		append: mockAppend,
		compile: mockCompile,
		classes: mockClasses
	} as ThemerApi<C>;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function mockVariant(...args: any) {
		return mockApi;
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function mockOption(...args: any) {
		return mockApi;
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function mockMapped(...args: any) {
		return mockApi;
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function mockRemove(...args: any) {
		return mockApi;
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function mockAppend(...args: any) {
		return mockApi;
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function mockCompile(...args: any) {
		return '';
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function mockClasses(...args: any) {
		return {
			base: [],
			themed: [],
			removed: [],
			appended: []
		};
	}
	const mockThemer: ThemerInstance<C> = {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		create: (instanceName = '') => mockApi
	};

	// If no document return mock instance.
	if (typeof document === 'undefined') return mockThemer;

	type Components = typeof themeConfig.components;
	type Defaults = typeof themeConfig.defaults;
	type Options = typeof themeConfig.options;
	type Palette = typeof themeConfig.palette;
	type Component = keyof Components;
	type Variant<K extends Component> = keyof Components[K];

	const _components: Components = themeConfig?.components || {};
	const _options: Options = themeConfig?.options || {};
	const _defaults: Defaults = themeConfig?.defaults || {};
	const _palette: Palette = themeConfig?.palette || {};

	/**
	 * Creates a new instance for generating themes.
	 *
	 * @param instanceName only used in errors to make it easier to determine where you screwed up!
	 */
	function create(instanceName = '') {
		const base = [] as string[];
		const themed = [] as string[];
		let removed = [] as string[];
		let appended = [] as classnames.ArgumentArray;

		const api = {
			variant: getVariant,
			option,
			mapped,
			remove,
			append,
			compile,
			classes
		};

		function getVariant<N extends Component, V extends Variant<N>>(
			name: N,
			variant?: V,
			when?: Primitive
		): typeof api;
		function getVariant<N extends Component, V extends Variant<N>>(
			name: N,
			variant?: V,
			theme?: ThemeColor,
			when?: Primitive
		): typeof api;
		function getVariant<N extends Component, V extends Variant<N>>(
			name: N,
			variant?: V,
			theme?: ThemeColor | Primitive,
			when?: Primitive
		) {
			if (typeof themeConfig === 'undefined') return api;
			const conf = _components[name][variant || ('default' as V)] as Record<string, string>;
			if (!colors.includes(theme as any) && !['white'].includes(theme as any)) {
				when = theme as Primitive;
				theme = '';
			}
			if (!when || !conf) return api;
			const baseVal = conf.$base || '';
			const themeVal = conf[theme as ThemeColor] || '';
			if (baseVal) base.push(baseVal);
			if (themeVal) themed.push(themeVal);
			return api;
		}

		/**
		 * Adds an option to themed classes to be compiled.
		 *
		 * @param key the option key to be add.
		 * @param prop the property of the above key to be applied.
		 * @param when if value is truthy add value otherwise reject.
		 */
		function option<K extends ThemeOption>(
			key: K,
			prop: PropsWithoutPrefix<keyof ThemeOptions[K], '$'> | undefined,
			when: Primitive
		) {
			if (typeof themeConfig === 'undefined') return api;
			if (typeof prop === 'undefined' || !when) return api;
			const opt = (_options[key] || {}) as Record<string, string>;
			if (!opt)
				throw new Error(`${instanceName} option using property ${prop as string} was NOT found.`);
			const baseValue = opt.$base || '';
			const value = opt[prop as string] || '';
			if (baseValue) base.push(baseValue);
			if (value) themed.push(value);
			return api;
		}

		/**
		 * Adds an option to themed classes to be compiled.
		 *
		 * @param key the option key to be add.
		 * @param prop the property of the above key to be applied.
		 * @param when if value is truthy add value otherwise reject.
		 */
		function mapped<T extends Record<string, unknown>, K extends Path<T>>(
			obj: T,
			key: K,
			when: Primitive
		) {
			if (typeof themeConfig === 'undefined') return api;
			if (!when) return api;
			const value = getProperty(obj, key as string);
			if (!value)
				throw new Error(
					`${instanceName} mapped value using property ${key as string} was NOT found.`
				);
			if (typeof value !== 'string')
				throw new Error(
					`${instanceName} mapped value using property ${
						key as string
					} has invalid typeof ${typeof value}.`
				);
			const baseValue = obj.$base || '';
			if (baseValue && typeof baseValue === 'string') base.push(baseValue);
			if (value) themed.push(value);
			return api;
		}

		/**
		 * Removes class strings, called ONLY after classnames() is called
		 * and before Tailwind Merge if enabled.
		 *
		 * @param classes tailwind class strings to be removed.
		 */
		function remove(classes: string | string[], when: Primitive) {
			if (typeof themeConfig === 'undefined') return api;
			if (!when) return api;
			classes = typeof classes === 'string' ? classes.trim().split(' ') : classes;
			removed = [...removed, ...(classes as string[])];
			return api;
		}

		/**
		 * Appends value after options base, andy themed colors.
		 *
		 * @param arg the value to be appended.
		 * @param when if value is truthy add value otherwise reject.
		 */
		function append(arg: ClassNameValue, when: Primitive) {
			if (typeof themeConfig === 'undefined') return api;
			arg = arg || '';
			if (when && arg) appended = [...appended, ...ensureArray(arg)];
			return api;
		}

		/**
		 * Compiles all classes returning single output string.
		 *
		 * @param withTailwindMerge when true runs through Tailwind Merge deduping classes.
		 */
		function compile(withTailwindMerge = false) {
			if (typeof themeConfig === 'undefined') return '';
			let normalized = classnames(...base, ...themed, ...appended).trim();
			normalized = normalized
				.split(' ')
				.filter((v) => {
					return !removed.some((r) => v === r || v.startsWith(r));
				})
				.join(' ');
			if (!withTailwindMerge) return normalized;
			return twMerge(normalized);
		}

		function classes() {
			return {
				base,
				themed,
				removed,
				appended
			};
		}

		return api;
	}

	return {
		create
	};
}

themer.join = join;
themer.merge = merge;
themer.format = formatter;
themer.includes = includes;
