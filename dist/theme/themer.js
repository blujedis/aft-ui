import { twMerge } from 'tailwind-merge';
import { ensureArray, mergeConfigs } from './';
import classnames from 'classnames';
export function themer(themeConfig) {
    // type Component = keyof Components;
    // type Variant<K extends Component> = keyof Components[K];
    // const _components: Components = themeConfig?.components || {};
    const _options = themeConfig?.options || {};
    function create(instanceName = '') {
        const base = [];
        const themed = [];
        let removed = [];
        let prepended = [];
        let appended = [];
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
        function option(key, prop, variantOrWhen, when) {
            if (typeof themeConfig === 'undefined')
                return api;
            if (arguments.length === 3) {
                when = variantOrWhen;
                variantOrWhen = undefined;
            }
            if (typeof prop === 'undefined' || !when)
                return api;
            let opt = (_options[key] || {});
            if (typeof opt === 'undefined')
                throw new Error(`${instanceName} option using property ${prop} was NOT found.`);
            if (typeof variantOrWhen !== 'undefined') {
                opt = opt[prop];
                prop = variantOrWhen;
            }
            const baseValue = opt.$base || '';
            const value = opt[prop] || '';
            if (baseValue && prop !== 'unstyled')
                base.push(baseValue);
            if (value)
                themed.push(value);
            return api;
        }
        function bundle(keys, extendOrProp, propOrWhen, when) {
            if (typeof themeConfig === 'undefined')
                return api;
            let prop;
            let extend;
            if (arguments.length === 4) {
                extend = extendOrProp;
                prop = propOrWhen;
            }
            else {
                when = propOrWhen;
                prop = extendOrProp;
                extend = {};
            }
            if (typeof prop === 'undefined' || !when)
                return api;
            let merged = keys.reduce((result, k) => {
                // top level value in states or value from common options.
                let opt = _options[k];
                const commonOpt = _options.common[k];
                if (!opt && commonOpt)
                    opt = { [prop || '$base']: commonOpt };
                if (typeof opt === 'undefined' && !commonOpt)
                    throw new Error(`${instanceName} option ${k} using property ${prop} was NOT found.`);
                return mergeConfigs(result, opt); // TODO: fix types.
            }, {});
            merged = mergeConfigs(merged, extend);
            const baseValue = merged.$base || '';
            const value = merged[prop] || '';
            if (baseValue && prop !== 'unstyled')
                base.push(baseValue);
            if (value)
                themed.push(value);
            return api;
        }
        function remove(classes, when) {
            if (typeof themeConfig === 'undefined' || !when)
                return api;
            classes = typeof classes === 'string' ? classes.trim().split(' ') : classes;
            removed = [...removed, ...classes];
            return api;
        }
        function prepend(arg, when) {
            if (typeof themeConfig === 'undefined')
                return api;
            arg = arg || '';
            if (when && arg)
                prepended = [...prepended, ...ensureArray(arg)];
            return api;
        }
        function append(arg, when) {
            if (typeof themeConfig === 'undefined')
                return api;
            arg = arg || '';
            if (when && arg)
                appended = [...appended, ...ensureArray(arg)];
            return api;
        }
        function compile(withTailwindMerge = true) {
            if (typeof themeConfig === 'undefined')
                return '';
            const preserves = removed.filter((v) => v.charAt(0) === '!');
            const purge = removed.filter((v) => v.charAt(0) !== '!');
            const baseClean = base.reduce((a, c) => {
                const filtered = c.split(' ').filter((v) => {
                    const preserve = preserves.some((p) => v.startsWith(p.slice(1)));
                    if (preserve)
                        return true;
                    const purged = purge.some((p) => v.startsWith(p));
                    return preserve || !purged;
                });
                return [...a, ...filtered];
            }, []);
            const themedClean = themed.reduce((a, c) => {
                const filtered = c.split(' ').filter((v) => {
                    const preserve = preserves.some((p) => v.startsWith(p.slice(1)));
                    if (preserve)
                        return true;
                    const purged = purge.some((p) => v.startsWith(p));
                    return preserve || !purged;
                });
                return [...a, ...filtered];
            }, []);
            const normalizedPrepended = classnames(...prepended);
            let normalized = classnames(...baseClean, ...themedClean, ...appended).trim();
            normalized = [normalizedPrepended, normalized].join(' ');
            if (!withTailwindMerge)
                return normalized;
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
