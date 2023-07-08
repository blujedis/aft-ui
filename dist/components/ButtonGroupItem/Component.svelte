<script>
	import themeStore, { themer } from '../..';
	import { buttonGroupItemDefaults as defaults } from './module';
	import Button from '../Button';
	import { getContext } from 'svelte';
	const context = getContext('ButtonGroup');
	export let {
		disabled,
		focused,
		full,
		rounded,
		size,
		theme,
		transitioned,
		underlined,
		value,
		variant
	} = {
		...defaults,
		...context?.globals
	};
	const th = themer($themeStore);
	const passthru = {
		disabled,
		focused,
		full,
		rounded,
		size,
		theme,
		transitioned,
		underlined,
		variant
	};
	$: buttonClasses = th
		.create('ButtonGroupItem')
		.variant('buttonGroupItem', variant, theme, true)
		.option('buttonPadding', size, size)
		.append(
			'relative focus:z-10 first:ml-0 -ml-px first:ml-0 first:rounded-r-none last:rounded-l-none',
			true
		)
		.append($$restProps.class, true)
		.compile(true);
	function handleSelect(value) {
		if ($context?.selected?.includes(value)) context.unselect(value);
		else context.select(value);
	}
</script>

<svelte:component
	this={Button}
	{...$$restProps}
	{...passthru}
	role="listitem"
	class={buttonClasses}
	aria-checked={$context?.selected?.includes(value)}
	aria-labelledby={value + ''}
	on:click={() => handleSelect(value)}
>
	<slot />
</svelte:component>
