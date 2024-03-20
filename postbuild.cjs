const { rename } = require('fs');
const rimraf = require('rimraf');

// Purge Examples from Dist
rimraf.sync('dist/components/_Example');
rimraf.sync('dist/components/examples.*', { glob: true });
rimraf.sync('dist/components/**/Example.svelte', { glob: true });
rimraf.sync('dist/components/**/Example.svelte.d.ts', { glob: true });
// rimraf.sync('dist/components/DataGrid*', { glob: true });

// Remove dev init import
rimraf.sync('dist/theme/init.prod.d.ts');
rimraf.sync('dist/theme/init.prod.js');

// Rename production init for them to "init.js".
// rename('./dist/theme/init.prod.js', './dist/theme/init.js', (err) => err && console.err(err));
// rename('./dist/theme/init.prod.d.ts', './dist/theme/init.d.ts', (err) => err && console.err(err));
