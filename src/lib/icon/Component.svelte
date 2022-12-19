<script lang="ts">
	import module, { type IconProps } from './module';

	type $$Props = IconProps;

	const icon = module.main.clone();
	const inner = module.inner.clone();

	let { 
		base,
		active,
		disabled,
		hovered,
		rounded,
		shadow,
		size,
		transition,
		theme,
		animate,
		variant,
		...rest
	} = module.main.prepareProps($$props as $$Props, module.defaults);

	const classes = icon
		.addFeature('base', base)
		.addFeature('transition', transition)
		.addFeature('rounded', rounded)
		.addFeature('shadow', shadow)
		.addFeature('animate', animate)
		.addFeature('disabled', disabled)
		.addHandlerClass('hovered', hovered, variant, theme)
		.addVariant(variant, theme)
		.addUserClass(rest.class)
		.bundle();

		const innerClasses = inner
			.addFeature('base', base)
			.addFeature('size', size)
			.bundle();


</script>

<!-- Wrapped in outer span so that padding does not 
     cause inner icon to be scaled down.
-->
<span {...rest} class={classes}>
	<span class={innerClasses}>
		<slot />
	</span>
</span>
