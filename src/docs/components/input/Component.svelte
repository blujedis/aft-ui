<script lang="ts">
	export let value = '';

	interface $$Props {
		value?: string;
		class?: string;
	}

	$$props = {
		...$$props
	};
	$: props = $$props as $$Props;

	const { class: klass } = $$props;
</script>

<input bind:value class={klass} />
