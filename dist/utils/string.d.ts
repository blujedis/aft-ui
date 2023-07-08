type CompileValue = string | number | boolean;
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
export declare function compileTemplate(
	template: string,
	...keys: string[]
): (data: Record<string, unknown> | CompileValue[], ...rest: CompileValue[]) => string;
export {};
