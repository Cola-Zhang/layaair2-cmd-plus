const path = require("path");
const program = require("commander");
const fs = require("fs");
const
{
	printOk,
	printErr,
	printQuotation,
	tr
} = require("./print.js");

program
	.version("0.1.1")
	.option('-c --clear', tr('clear will delete old ui code file.'))
	.option('-a --atlas', tr('generate atlas'))
	.option('-d --code', tr('generate ui code files'))
	.option('-m --mode <mode>', tr("'normal' or 'release', specify 'release' will generate UI code files exclude unused resources."))
	.parse(process.argv);

let clear = program.clear || false,
	mode  = program.mode || 'normal',
	code  = program.code || false,
	atlas = program.atlas || false;

/////////////////////////////////////////////////////////////
// Call external interface define in LayaAirCmdTool.max.js //
/////////////////////////////////////////////////////////////
var args = [];
let exe = path.join(__dirname, "ProjectExportTools", "LayaAirCmdTool.max.js");

console.log("path", path)
console.log("exe",exe)
args.push(path.resolve("laya", ".laya"));
args.push(`clear=${clear}`);
args.push(`releasemode=${mode}`);
args.push(`exportUICode=${code}`);
args.push(`exportRes=${atlas}`);
console.log("args", args);

var sp = require("child_process").fork(exe, args);

sp.on("close", (data) =>
{
	printOk(tr("finish."));
	process.exit();
});