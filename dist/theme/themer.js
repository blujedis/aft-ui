import { twMerge } from 'tailwind-merge';
import { ensureArray } from './utils';
import classnames from 'classnames';
import { colors } from './constants';
import { getProperty } from 'dot-prop';
/**
 * Simply flattens array then joins by strings.
 *
 * @param classes the classes to be joined.
 */
function join(...classes) {
    return classes.flat().join(' ');
}
/**
 *
 * @param classes the array of classes that should be merged using TailwindMerge.
 */
function merge(...classes) {
    return twMerge(...classes);
}
/**
 * Checks if source includes compare value(s).
 *
 * @param source the source value or values.
 * @param values the compare value or values.
 */
function includes(source, values) {
    source = ensureArray(source);
    values = ensureArray(values);
    return source.some((v) => values.includes(v));
}
/**
 * Simple string formatter that replaces values by positional order of arguments matched.
 *
 * @param template the template to be formatted
 * @param token the token to search for ex: {{theme}}
 * @param args the positional arguments to replace tokens with.
 */
export function formatter(template, token, ...args) {
    const exp = new RegExp('{{' + token + '}}', 'g');
    const matches = template.match(exp) || [];
    if (!matches.length)
        return template; // nothing to do no matching tokens.
    const diff = Math.max(0, matches.length - args.length);
    if (diff > 0)
        // if diff in length use first arg as fill arg.
        args = [...args, ...Array(diff).fill(args[0])];
    for (const i in args) {
        template = template.replace(`{{${token}}}`, args[i] + '');
    }
    return template;
}
export function themer(themeConfig) {
    const mockApi = {
        variant: mockVariant,
        option: mockOption,
        mapped: mockMapped,
        remove: mockRemove,
        append: mockAppend,
        compile: mockCompile,
        classes: mockClasses
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function mockVariant(...args) {
        return mockApi;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function mockOption(...args) {
        return mockApi;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function mockMapped(...args) {
        return mockApi;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function mockRemove(...args) {
        return mockApi;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function mockAppend(...args) {
        return mockApi;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function mockCompile(...args) {
        return '';
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function mockClasses(...args) {
        return {
            base: [],
            themed: [],
            removed: [],
            appended: []
        };
    }
    const mockThemer = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        create: (instanceName = '') => mockApi
    };
    // If no document return mock instance.
    if (typeof document === 'undefined')
        return mockThemer;
    const _components = themeConfig?.components || {};
    const _options = themeConfig?.options || {};
    const _defaults = themeConfig?.defaults || {};
    const _palette = themeConfig?.palette || {};
    /**
     * Creates a new instance for generating themes.
     *
     * @param instanceName only used in errors to make it easier to determine where you screwed up!
     */
    function create(instanceName = '') {
        const base = [];
        const themed = [];
        let removed = [];
        let appended = [];
        const api = {
            variant: getVariant,
            option,
            mapped,
            remove,
            append,
            compile,
            classes
        };
        function getVariant(name, variant, theme, when) {
            if (typeof themeConfig === 'undefined')
                return api;
            const conf = _components[name][variant || 'default'];
            if (!colors.includes(theme) && !['white'].includes(theme)) {
                when = theme;
                theme = '';
            }
            if (!when || !conf)
                return api;
            const baseVal = conf.$base || '';
            const themeVal = conf[theme] || '';
            if (baseVal)
                base.push(baseVal);
            if (themeVal)
                themed.push(themeVal);
            return api;
        }
        /**
         * Adds an option to themed classes to be compiled.
         *
         * @param key the option key to be add.
         * @param prop the property of the above key to be applied.
         * @param when if value is truthy add value otherwise reject.
         */
        function option(key, prop, when) {
            if (typeof themeConfig === 'undefined')
                return api;
            if (typeof prop === 'undefined' || !when)
                return api;
            const opt = (_options[key] || {});
            if (!opt)
                throw new Error(`${instanceName} option using property ${prop} was NOT found.`);
            const baseValue = opt.$base || '';
            const value = opt[prop] || '';
            if (baseValue)
                base.push(baseValue);
            if (value)
                themed.push(value);
            return api;
        }
        /**
         * Adds an option to themed classes to be compiled.
         *
         * @param key the option key to be add.
         * @param prop the property of the above key to be applied.
         * @param when if value is truthy add value otherwise reject.
         */
        function mapped(obj, key, when) {
            if (typeof themeConfig === 'undefined')
                return api;
            if (!when)
                return api;
            const value = getProperty(obj, key);
            if (!value)
                throw new Error(`${instanceName} mapped value using property ${key} was NOT found.`);
            if (typeof value !== 'string')
                throw new Error(`${instanceName} mapped value using property ${key} has invalid typeof ${typeof value}.`);
            const baseValue = obj.$base || '';
            if (baseValue && typeof baseValue === 'string')
                base.push(baseValue);
            if (value)
                themed.push(value);
            return api;
        }
        /**
         * Removes class strings, called ONLY after classnames() is called
         * and before Tailwind Merge if enabled.
         *
         * @param classes tailwind class strings to be removed.
         */
        function remove(classes, when) {
            if (typeof themeConfig === 'undefined')
                return api;
            if (!when)
                return api;
            classes = typeof classes === 'string' ? classes.trim().split(' ') : classes;
            removed = [...removed, ...classes];
            return api;
        }
        /**
         * Appends value after options base, andy themed colors.
         *
         * @param arg the value to be appended.
         * @param when if value is truthy add value otherwise reject.
         */
        function append(arg, when) {
            if (typeof themeConfig === 'undefined')
                return api;
            arg = arg || '';
            if (when && arg)
                appended = [...appended, ...ensureArray(arg)];
            return api;
        }
        /**
         * Compiles all classes returning single output string.
         *
         * @param withTailwindMerge when true runs through Tailwind Merge deduping classes.
         */
        function compile(withTailwindMerge = false) {
            if (typeof themeConfig === 'undefined')
                return '';
            let normalized = classnames(...base, ...themed, ...appended).trim();
            normalized = normalized
                .split(' ')
                .filter((v) => {
                return !removed.some((r) => v === r || v.startsWith(r));
            })
                .join(' ');
            if (!withTailwindMerge)
                return normalized;
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
