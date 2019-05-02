#!/usr/bin/env node
const program = require('commander');
const { spawn } = require("child_process");
const path = require("path");

program
    .version('1.0.0', '-v, --version')
    .option("-w, --workspace <workspacePath>", "Incoming workspace path")
    .parse(process.argv);

let projPath = program.workspace ? program.workspace : process.cwd();
let gulpFilePath = path.join(process.argv[1], "../", "compile.js");
let cmd = "gulp";
let args = ["--gulpfile", gulpFilePath, "--propath", projPath, "compile"];

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