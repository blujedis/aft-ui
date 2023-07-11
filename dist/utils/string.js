/**
 * Compiles template literal as a template.
 * When using array keys names negligible
 * values replaced by their index.
 *
 * @example
 * const myTemplate = compileTemplate`My name is ${'name'} I'm ${'age'} years old.`;
 * const fromObject = myTemplate({ name: 'Bob', age: 25 });
 * const fromArray = myTemplate(['bob', 31]);
 *
 * @param template a string template using back ticks
 * @param keys the keys extracted from the template literal.
 */
export function compileTemplate(template, ...keys) {
    return (data, ...rest) => {
        if (data === null || typeof data === 'undefined')
            return template;
        const isArray = Array.isArray(data);
        let clone;
        if (isArray)
            clone = [...data, ...rest];
        else if (typeof data !== 'object')
            clone = [data, ...rest];
        else
            clone = { ...data };
        const strArr = template.slice();
        keys.forEach((k, i) => {
            const dataVal = Array.isArray(clone) ? clone[i] : clone[k];
            strArr[i] = strArr[i] + dataVal;
        });
        return strArr.join('');
    };
}
