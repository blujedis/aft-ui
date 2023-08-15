const { rename } = require('fs');
const rimraf = require('rimraf');

// Purge Examples from Dist
rimraf.sync('dist/components/_Example');
rimraf.sync('dist/components/examples.*');
rimraf.sync('dist/components/**/Example.svelte');

// Remove dev init import
rimraf.sync('dist/theme/init.d.ts');
rimraf.sync('dist/theme/init.js');

// Rename production init for them to "init.js".
rename('./dist/theme/init.prod.js', './dist/theme/init.js', (err) => err && console.err(err));
rename('./dist/theme/init.prod.d.ts', './dist/theme/init.d.ts', (err) => err && console.err(err));
