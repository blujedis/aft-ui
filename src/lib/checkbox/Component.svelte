<script lang="ts">
	import module, { type CheckboxProps } from './module';

	type $$Props = CheckboxProps & {
		checked?: boolean;
		group?: any;
	};

	export let checked = false;

	const checkbox = module.main.clone();

	let { 
		base,
		active,
		disabled,
		ringed,
		hovered,
		rounded,
		shadow,
		size,
		transition,
		theme,
		value,
		...rest
	} = module.main.prepareProps($$props as $$Props, module.defaults);


	const classes = checkbox
		.addFeature('base', base)
		.addFeature('active', active)
		.addFeature('disabled', disabled == true)
		.addFeature('ringed', ringed)
		.addFeature('rounded', rounded)
		.addFeature('shadow', shadow)
		.addFeature('size', size)
		.addFeature('transition', transition)
		.addHandlerClass('hovered', hovered, theme)
		.addUserClass($$restProps.class)
		.addVariant('default', theme)
		.bundle();
</script>

<input {...rest} type="checkbox" {value} class={classes} bind:checked on:change />
