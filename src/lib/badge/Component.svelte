<script lang="ts">
	import module, { type BadgeProps } from './module';

	type $$Props = BadgeProps;

	const badge = module.main.clone();

	let { 
		base,
		hovered,
		rounded,
		shadow,
		size,
		theme,
		transform,
		transition,
		variant,
		weight,
		...rest
	} = module.main.prepareProps($$props as $$Props, module.defaults);

	const classes = badge
		.addFeature('base', base)
		.addFeature('rounded', rounded)
		.addFeature('shadow', shadow)
		.addFeature('size', size)
		.addFeature('transform', transform)
		.addFeature('transition', transition)
		.addFeature('weight', weight)
		.addVariant('default', theme)
		.addHandlerClass('hovered', hovered, theme)
		.addUserClass($$restProps.class)
		.bundle();
</script>

<span {...rest} class={classes} on:click>
	<slot />
</span>
