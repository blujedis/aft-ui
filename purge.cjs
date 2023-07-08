const rimraf = require('rimraf');

[
	'dist/components/_Example',
	'dist/components/**/Example.svelte*',
	'dist/components/examples.*'
].forEach((p) => rimraf.sync(p));
