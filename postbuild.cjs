const rimraf = require('rimraf');

rimraf.sync('dist/components/_Example');
rimraf.sync('dist/components/examples.*');
rimraf.sync('dist/components/**/Example.svelte');
