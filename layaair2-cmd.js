#!/usr/bin/env node
const program = require('commander');

const
{
	printQuotation,
	printErr,
	printOk,
	printWarning,
	tr
} = require("./print.js");


program
    .version('1.2.0', '-v, --version')
    .usage("[command] [args]")
    .command('compile', 'compile project.')
    .command('publish', 'publish project.')
    .command('ui', 'export ui code, atlas')
    .parse(process.argv);

