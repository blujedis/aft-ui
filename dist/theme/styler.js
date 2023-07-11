import { getProperty } from 'dot-prop';
/**
 * Creates a new styler instance.
 *
 * @param name the name of the styler used in errors/logging.
 */
export function styler(themeConfig) {
    // type Component = keyof Components;
    // type Variant<K extends Component> = keyof Components[K];
    // const _components: Components = themeConfig?.components || {};
    const _options = themeConfig?.options || {};
    // const _defaults: Defaults = themeConfig?.defaults || {};
    const _palette = themeConfig?.palette || {};
    function create(instanceName) {
        let styles = [];
        let appends = [];
        const api = {
            add,
            option,
            palette,
            mapped,
            append,
            remove,
            compile
        };
        /**
         * Adds a new key and value to the styles array.
         *
         * @param key the style key to be added.
         * @param value the key's value.
         * @param when if true the key/value are added.
         */
        function add(key, value, when) {
            if (typeof themeConfig === 'undefined')
                return api;
            if (!when)
                return api;
            if (styles.some((v) => v.startsWith(key)))
                throw new Error(`Styler "${instanceName}" cannot add duplicate style key "${key}".`);
            styles.push(key + ': ' + value);
            return api;
        }
        /**
         * Adds a style key/value to be compiled.
         *
         * @param name the option key to be add.
         * @param path the property of the above key to be applied.
         * @param key the style key to be added.
         * @param when if value is truthy add value otherwise reject.
         */
        function option(name, path, key, when) {
            if (typeof themeConfig === 'undefined')
                return api;
            if (typeof path === 'undefined' || !when)
                return api;
            const opt = (_options[name] || {});
            if (!opt)
                throw new Error(`${instanceName} option using property ${path} was NOT found.`);
            const baseValue = opt.$base || '';
            if (baseValue)
                append(baseValue, true);
            const value = opt[path] || '';
            add(key, value, true);
            return api;
        }
        /**
         * Adds palette color/shade to be compiled.
         *
         * @param theme the theme color.
         * @param shade the theme color shade.
         * @param key the key name of the style to be added.
         * @param when if value is truthy add value otherwise reject.
         */
        function palette(theme, shade, key, when) {
            if (typeof themeConfig === 'undefined')
                return api;
            if (!when)
                return api;
            if (theme === 'white')
                return add(key, '#fff', true);
            const shades = (_palette[theme] || {});
            if (!shades || shade === null)
                throw new Error(`${instanceName} color palette using theme ${theme} was NOT found.`);
            const value = shades[shade] || '';
            if (!value)
                throw new Error(`${instanceName} color using shade ${shade} was NOT found.`);
            add(key, value, true);
            return api;
        }
        /**
         * Creates style key/value using value picked from map.
         *
         * @param obj the object to pick path from.
         * @param path a valid path in the above object.
         * @param key the style key to create.
         * @param when if true the key/value are added.
         */
        function mapped(obj, path, key, when) {
            if (typeof themeConfig === 'undefined')
                return api;
            if (!when)
                return api;
            const value = getProperty(obj, path);
            if (!value)
                throw new Error(`${instanceName} mapped value using property ${key} was NOT found.`);
            add(key, value, true);
            return api;
        }
        /**
         * Appends existing styles to the collection.
         *
         * @param value the string style value to be appended.
         * @param when if true the value is appended to the collection.
         */
        function append(value, when) {
            if (typeof themeConfig === 'undefined')
                return api;
            if (!when)
                return api;
            appends = [...appends, ...(value || '').split(/;\s?/g).map((v) => v.trim())];
            return api;
        }
        /**
         * Removes a key from the styles array using "startsWith" only.
         *
         * @param key the key to be removed.
         * @param when if true the key is removed.
         */
        function remove(key, when) {
            if (typeof themeConfig === 'undefined')
                return api;
            if (!when)
                return api;
            styles = styles.filter((v) => !v.startsWith(key));
            return api;
        }
        /**
         * Compiles all styles and returns a string value.
         */
        function compile() {
            if (typeof themeConfig === 'undefined')
                return '';
            return [...styles, ...appends].join('; ').trim();
        }
        return api;
    }
    return {
        create
    };
}
