import { twMerge, type ClassNameValue } from 'tailwind-merge';
import { ensureArray, mergeConfigs } from '$lib/theme';
import classnames from 'classnames';
import type {
	PropsWithoutPrefix,
	ThemeConfig,
	ThemeOption,
	ThemeOptions,
} from '../types/theme';

type PrimitiveBase = boolean | string | number | undefined | null;

type Primitive = PrimitiveBase | Record<string, any> | PrimitiveBase[];

export interface ThemerApi<C extends ThemeConfig> {
	// variant<N extends keyof C['components'], V extends keyof C['components'][N]>(
	// 	name: N,
	// 	variant: V,
	// 	when?: Primitive
	// ): ThemerApi<C>;

	// variant<N extends keyof C['components'], V extends keyof C['components'][N]>(
	// 	name: N,
	// 	variant: V,
	// 	theme?: ThemeColor,
	// 	when?: Primitive
	// ): ThemerApi<C>;

	/**
	 * Adds an option to themed classes to be compiled.
	 *
	 * @param key the option key to be add.
	 * @param prop the property of the above key to be applied.
	 * @param when if value is truthy add value otherwise reject.
	 */
	option<K extends ThemeOption>(
		key: K,
		prop: PropsWithoutPrefix<keyof ThemeOptions[K], '$'> | undefined,
		when: Primitive
	): ThemerApi<C>;

	/**
	 * Adds an option to themed classes to be compiled.
	 *
	 * @param key the option key to be add.
	 * @param prop the property of the above key to be applied.
	 * @param variant option contains nested variants.
	 * @param when if value is truthy add value otherwise reject.
	 */
	option<K extends ThemeOption, P extends keyof ThemeOptions[K]>(
		key: K,
		prop: PropsWithoutPrefix<keyof ThemeOptions[K], '$'> | undefined,
		variant: PropsWithoutPrefix<keyof ThemeOptions[K][P], '$'>,
		when: Primitive
	): ThemerApi<C>;

	bundle<K extends ThemeOption, P extends keyof ThemeOptions[K]>(
		keys: K[],
		prop: PropsWithoutPrefix<P, '$'> | undefined,
		when: Primitive
	): ThemerApi<C>;

	bundle<K extends ThemeOption, P extends keyof ThemeOptions[K]>(
		keys: K[],
		extend: Record<string, any>,
		prop: PropsWithoutPrefix<P, '$'> | undefined,
		when: Primitive
	): ThemerApi<C>;

	/**
	 * Removes class strings, called ONLY after classnames() is called
	 * and before Tailwind Merge if enabled.
	 *
	 * @param classes tailwind class strings to be removed.
	 * @param when if the value is truth otherwise reject.
	 */
	remove(classes: string | string[], when: Primitive): ThemerApi<C>;

	/**
	 * Prepends value before options base, and themed colors.
	 *
	 * @param arg the value to be appended.
	 * @param when if value is truthy add value otherwise reject.
	 */
	prepend(arg: ClassNameValue, when: Primitive): ThemerApi<C>;

	/**
	 * Appends value after options base, and themed colors.
	 *
	 * @param arg the value to be appended.
	 * @param when if value is truthy add value otherwise reject.
	 */
	append(arg: ClassNameValue, when: Primitive): ThemerApi<C>;

	/**
	 * Compiles all classes returning single output string.
	 *
	 * @param withTailwindMerge when true (default) Tailwind Merge dedupes classes.
	 */
	compile(withTailwindMerge?: boolean): string;

	classes(): {
		base: string[];
		themed: string[];
		removed: string[];
		prepended: classnames.ArgumentArray;
		appended: classnames.ArgumentArray;
	};
}

export type ThemerInstance<C extends ThemeConfig> = {
	/**
	 * Creates a new instance for generating themes.
	 *
	 * @param instanceName simply gives you a reference in console on where the Themer failed.
	 */
	create: (instanceName: string) => ThemerApi<C>;
};

export function themer<C extends ThemeConfig>(themeConfig: C) {
	// type Components = typeof themeConfig.components;
	type Options = typeof themeConfig.options;
	// type Component = keyof Components;
	// type Variant<K extends Component> = keyof Components[K];

	// const _components: Components = themeConfig?.components || {};
	const _options: Options = themeConfig?.options || {};

	function create(instanceName = ''): ThemerApi<C> {
		const base = [] as string[];
		const themed = [] as string[];
		let removed = [] as string[];
		let prepended = [] as classnames.ArgumentArray;
		let appended = [] as classnames.ArgumentArray;

		const api = {
			// variant: getVariant,
			option,
			bundle,
			remove,
			prepend,
			append,
			compile,
			classes
		};

		// function getVariant<N extends Component, V extends Variant<N>>(
		// 	name: N,
		// 	variant: V,
		// 	theme?: ThemeColor | Primitive,
		// 	when?: Primitive
		// ) {
		// 	if (typeof themeConfig === 'undefined') return api;
		// 	const comp = _components[name] || ({} as any);
		// 	if (!comp || !variant) return api;
		// 	const conf = comp[variant] as Record<string, string>;
		// 	if (!colors.includes(theme as any)) {
		// 		when = theme as Primitive;
		// 		theme = '';
		// 	}
		// 	if (!when || !conf) return api;
		// 	const baseVal = conf.$base || '';
		// 	const themeVal = conf[theme as ThemeColor] || '';
		// 	if (baseVal && theme !== 'unstyled') base.push(baseVal);
		// 	if (themeVal) themed.push(themeVal);
		// 	return api;
		// }

		function option<K extends ThemeOption, P extends keyof ThemeOptions[K]>(
			key: K,
			prop: PropsWithoutPrefix<P, '$'> | undefined,
			variantOrWhen: keyof ThemeOptions[K][P] | Primitive,
			when?: Primitive
		) {
			if (typeof themeConfig === 'undefined') return api;
			if (arguments.length === 3) {
				when = variantOrWhen as Primitive;
				variantOrWhen = undefined;
			}
			if (typeof prop === 'undefined' || !when) return api;
			let opt = (_options[key] || {}) as Record<string, any>;
			if (typeof opt === 'undefined')
				throw new Error(`${instanceName} option using property ${prop as string} was NOT found.`);
			if (typeof variantOrWhen !== 'undefined') {
				opt = opt[prop as any];
				prop = variantOrWhen as any;
			}
			const baseValue = opt.$base || '';
			const value = opt[prop as string] || '';
			if (baseValue && prop !== 'unstyled') base.push(baseValue);
			if (value) themed.push(value);
			return api;
		}

		function bundle<K extends ThemeOption, P extends keyof ThemeOptions[K]>(
			keys: K[],
			extendOrProp: Record<string, any> | PropsWithoutPrefix<P, '$'> | undefined,
			propOrWhen: PropsWithoutPrefix<P, '$'> | undefined | Primitive,
			when?: Primitive
		) {
			if (typeof themeConfig === 'undefined') return api;
			let prop: PropsWithoutPrefix<P, '$'> | undefined;
			let extend: Record<string, any> | undefined;
			if (arguments.length === 4) {
				extend = extendOrProp as Record<string, any>;
				prop = propOrWhen as PropsWithoutPrefix<P, '$'> | undefined;
			} else {
				when = propOrWhen as Primitive;
				prop = extendOrProp as PropsWithoutPrefix<P, '$'> | undefined;
				extend = {};
			}
			if (typeof prop === 'undefined' || !when) return api;
			let merged = keys.reduce(
				(result, k) => {
					const opt = _options[k];
					if (typeof opt === 'undefined')
						throw new Error(
							`${instanceName} option ${k} using property ${prop as string} was NOT found.`
						);
					return mergeConfigs(result, opt as any); // TODO: fix types.
				},
				{} as Record<string, any>
			);
			merged = mergeConfigs(merged, extend);
			const baseValue = merged.$base || '';
			const value = merged[prop as string] || '';
			if (baseValue && prop !== 'unstyled') base.push(baseValue);
			if (value) themed.push(value);
			return api;
		}

		function remove(classes: string | string[], when?: Primitive) {
			if (typeof themeConfig === 'undefined' || !when) return api;
			classes = typeof classes === 'string' ? classes.trim().split(' ') : classes;
			removed = [...removed, ...(classes as string[])];
			return api;
		}

		function prepend(arg: ClassNameValue, when: Primitive) {
			if (typeof themeConfig === 'undefined') return api;
			arg = arg || '';
			if (when && arg) prepended = [...prepended, ...ensureArray(arg)];
			return api;
		}

		function append(arg: ClassNameValue, when: Primitive) {
			if (typeof themeConfig === 'undefined') return api;
			arg = arg || '';
			if (when && arg) appended = [...appended, ...ensureArray(arg)];
			return api;
		}

		function compile(withTailwindMerge = true) {
			if (typeof themeConfig === 'undefined') return '';

			const preserves = removed.filter((v) => v.charAt(0) === '!');
			const purge = removed.filter((v) => v.charAt(0) !== '!');

			const baseClean = base.reduce((a, c) => {
				const filtered = c.split(' ').filter((v) => {
					const preserve = preserves.some((p) => v.startsWith(p.slice(1)));
					if (preserve) return true;
					const purged = purge.some((p) => v.startsWith(p));
					return preserve || !purged;
				});
				return [...a, ...filtered];
			}, [] as string[]);

			const themedClean = themed.reduce((a, c) => {
				const filtered = c.split(' ').filter((v) => {
					const preserve = preserves.some((p) => v.startsWith(p.slice(1)));
					if (preserve) return true;
					const purged = purge.some((p) => v.startsWith(p));
					return preserve || !purged;
				});
				return [...a, ...filtered];
			}, [] as string[]);

			const normalizedPrepended = classnames(...prepended);
			let normalized = classnames(...baseClean, ...themedClean, ...appended).trim();
			normalized = [normalizedPrepended, normalized].join(' ');

			if (!withTailwindMerge) return normalized;

			return twMerge(normalized);
		}

		function classes() {
			return {
				base,
				themed,
				removed,
				prepended,
				appended
			};
		}

		return api;
	}

	return {
		create
	};
}
