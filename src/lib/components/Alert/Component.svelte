<script lang="ts">
	import { type AlertProps, alertDefaults as defaults, alertIcons } from './module';
	import { themer, themeStore } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import { boolToMapValue, cleanObj } from '$lib/utils';
	import { transitioner } from '$lib/components/Disclosure';
	import { Icon } from '../Icon';
	import { ConditionalElement } from '../ConditionalElement';
	import { useColorMode, useFocusTrap } from '$lib/hooks';

	type $$Props = AlertProps & ElementProps<'div'>;

	export let {
		escapable,
		focustrap,
		full,
		icon,
		position,
		removable,
		rounded,
		shadowed,
		size,
		theme,
		transition,
		unmount,
		variant,
		visible
	} = {
		...cleanObj($themeStore.defaults?.component),
		...defaults
	} as Required<AlertProps>;

	const mode = useColorMode();
	const [bindFocusTrap, handleFocusTrap] = useFocusTrap(focustrap);
	let alert: HTMLDivElement;

	const th = themer($themeStore);

	// NOTE: using position prop requires "relative" parent.
	$: alertWrapperClasses = th
		.create('AlertWrapper')
		.prepend('alert-wrapper', true)
		.append('absolute transform -translate-x-1/2  max-w-7xl', position !== 'unstyled')
		.append(position === 'top' ? 'top-6' : 'bottom-6', position !== 'unstyled')
		.append($mode ? 'body-dark' : 'body-light', position !== 'unstyled' && variant === 'soft')
		.append('w-full', full)
		.append('z-[999999]', true)
		.compile();

	$: alertClasses = th
		.create('Alert')
		.bundle(['mainBg', 'filledText'], theme, variant === 'filled')
		.bundle(
			['mainRing', 'unfilledText'],
			{ $base: 'ring-1 ring-inset' },
			theme,
			variant === 'outlined'
		)
		.bundle(['softBg', 'softText'], {}, theme, variant === 'soft')
		.option('fieldFontSizes', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('alertPadding', size, size)
		.prepend(`alert alert-${variant}`, true)
		.prepend('alert-removable', removable)
		.append('inline-flex', true)
		.append('flex', full)
		.append($$restProps.class, true)
		.compile();

	//bg-green-50 hover:bg-green-100 text-green-500 focus:ring-green-600 focus:ring-offset-green-50
	$: alertButtonClasses = th
		.create('AlertButton')
		.option('common', 'focusedOutline', true)
		.option('outlineFocus', theme, true)
		.append('inline-flex rounded-md p-1.5', true)
		.compile();

	$: alertIconClasses = th
		.create('AlertIcon')
		.option('alertIconSizes', size, size)
		.prepend('alert-icon', true)
		.compile();

	function handleClose() {
		visible = !visible;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!e.repeat && e.key === 'Escape' && visible && escapable && removable) {
			e.stopPropagation();
			handleClose();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} on:keydown={handleFocusTrap} />

{#if (unmount && visible) || !unmount}
	<div role="presentation" tabindex="-1" on:keydown={handleKeydown} style="z-index:999999;">
		<ConditionalElement as="div" condition={position !== 'unstyled'} class={alertWrapperClasses}>
			<div
				{...$$restProps}
				class={alertClasses}
				bind:this={alert}
				transition:transitioner={transition}
				use:bindFocusTrap
			>
				<div class="flex w-full items-start space-x-3">
					<div class="flex-shrink-0">
						{#if icon !== false}
							<Icon
								icon={typeof icon === 'undefined' || icon === true ? alertIcons[theme] : icon}
								class={alertIconClasses}
							/>
						{/if}
					</div>

					<div class="flex-1 font-medium">
						<slot />
					</div>

					{#if removable}
						<div class="ml-auto">
							<div class="-mx-1.5 -my-1.5">
								<button type="button" class={alertButtonClasses} on:click={() => (visible = false)}>
									<span class="sr-only">Dismiss</span>
									<Icon icon="mdi:close" class={alertIconClasses} />
								</button>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</ConditionalElement>
	</div>
{/if}
