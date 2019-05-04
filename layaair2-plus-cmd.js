#!/usr/bin/env node
const program = require('commander');


program
    .version('1.2.0', '-v, --version')
    .usage("[command] [args]")
    .command('compile', 'compile project.')
    .command('publish', 'publish project.')
    .command('ui', 'export ui code, atlas')
    .parse(process.argv);

