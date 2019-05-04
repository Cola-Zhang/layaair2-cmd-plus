#!/usr/bin/env node
const program = require('commander');
const { spawn } = require("child_process");
const path = require("path");

program
    .version('1.0.1', '-v, --version')
    .option("-c, --config <configPlatform>", "Set the publishing platform name[web|wxgame|bdgame|xmgame]")
    .option("-w, --workspace <workspacePath>", "Incoming workspace path")
    .parse(process.argv);

let jsonName = program.config ? `${program.config}.json` : "web.json";
let projPath = program.workspace ? program.workspace : process.cwd();
let gulpFilePath = path.join(process.argv[1], "../", "publish.js");

console.log("==============gulpFilePath", gulpFilePath,projPath,jsonName);

let cmd = "gulp";
let args = ["--gulpfile", gulpFilePath, "--propath", projPath, "--config", jsonName, "publish"];

let _gulp = spawn(cmd, args, {
    silent: true,
    shell: true
});

_gulp.stdout.on('data', (data) => {
    console.log(`${data}`);
});

_gulp.stderr.on('data', (data) => {
    console.log(`stderr: \n${data}`);
});

_gulp.on('close', (code) => {
    console.log(`exit：${code}`);
});