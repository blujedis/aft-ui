<script lang="ts">
	import module, { type ButtonProps } from './module';
	type $$Props = ButtonProps;

	const button = module.main.clone();

	let { 
		base,
		active,
		full, 
		ringed,
		hovered,
		rounded,
		shadow,
		size,
		transition,
		theme,
		transform,
		variant,
		weight,
		...rest
	} = module.main.prepareProps($$props as $$Props, module.defaults);

	const classes = button
		.addFeature('base', base)
		.addFeature('active', active)
		.addFeature('disabled', rest.disabled === true)
		.addFeature('full', full)
		.addFeature('transition', transition)
		.addFeature('ringed', ringed)
		.addFeature('rounded', rounded)
		.addFeature('shadow', shadow)
		.addFeature('size', size)
		.addFeature('transform', transform)
		.addFeature('weight', weight)
		.addVariant(variant, theme)
		.addHandlerClass('hovered', hovered, variant, theme)
		.addUserClass(rest.class)
		.bundle();
</script>

<button {...rest} class={classes}>
	<slot />
</button>
