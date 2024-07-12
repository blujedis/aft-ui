# Aft UI

Aft is a UI library build on Svelte and Tailwind

## Setup

```sh
$ npm install @aft/config @aft/ui autoprefixer postcss tailwindcss @tailwindcss/forms -D
```

Aft UI requires `svelte` and `@svelte/kit`. In an <strong>existing</strong> application install the following and configure `tailwindcss`. For the basic Tailwind configuration follow the documentation found here [https://tailwindcss.com/docs/guides/sveltekit](https://tailwindcss.com/docs/guides/sveltekit)

**After installing SvelteKit and walking through the above Tailwindcss configuration continue below...**

## Configuring Tailwind

We need to tell Tailwind where Aft's classes can be found. This is required due to Jit which only uses defined classes, others will be purged.

We also need to tell our SvelteKit app which theme should be used. We need to tell Tailwind to use the forms plugin as well as setting darkmode to be set by `class`.

### Configure tailwind.config.cjs

Note the second path defined in `content`. It points to our node_modules path where `@aft/ui` is installed.

```js
import { aft, defaultTheme } from '@aft/config';

const themes = {
	default: {
		...defaultTheme
	}
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class', // IMPORTANT
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@aft/ui/dist/**/*.{html,js,svelte,ts}'
	],
	plugins: [
		aft(themes),
		require('@tailwindcss/forms')({
			// IMPORTANT
			strategy: 'class'
		})
	]
};
```

### Configure app.html

We need to tell Aft UI which theme we wish to use. In our `tailwind.config.cjs` above we defined our themes. In this case we have just one, our <strong>default</strong>.

Create a data attribute called `data-theme` and set it to default as shown below in `src/app.html`

This will allow you to have multiple themes if you wish. You need only change the `data-theme` attribute. How you do that, how you persist the user or site's desired theme we leave to you.

```html
<body data-theme="default" data-sveltekit-preload-data="hover" class="h-full">
	<div style="display: contents">%sveltekit.body%</div>
</body>
```

## Using Aft UI

You are now ready to import your first component. Lets use an `Alert` component as it's often used in your main `+layout.svelte`.

```svelte
<script lang="ts">
	export let data;
</script>

<Alert position="top" visible={data.alert?.message} theme={data.alert?.theme}>
	{data.alert?.message}
</Alert>
```

## Documentation and Examples

Currently both are quite poor. To see working examples clone the `@aft/ui` repository. Run the project in dev mode and you'll see several examples. In the cloned repository every component in `src/lib/components` contains an `Example.svelte` component that you can view to see how the component was configured.

```sh
$ git clone https://github.com/blujedis/aft-ui.git
$ cd aft-ui
$ pnpm install
$ pnpm dev
```

**NOTE**: Aft UI uses port 5174 instead of the default 5173.
