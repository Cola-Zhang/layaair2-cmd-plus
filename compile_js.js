const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const es2015 = require('babel-preset-es2015');
const babelify = require("babelify");

// 设置项目位置
let workSpaceDir = global.workSpaceDir;

// 如果是发布时调用编译功能，增加prevTasks
let prevTasks = "";
if (global.publish) {
	prevTasks = ["loadConfig"];
}

//使用browserify，转换es6到es5，并输出到bin/js目录
gulp.task("compile", prevTasks, function () {
	// 发布时调用编译功能，判断是否点击了编译选项
	if (global.publish && !global.config.compile) {
		return;
	}
	return browserify({
		basedir: workSpaceDir,
		//是否开启调试，开启后会生成jsmap，方便调试es6源码，但会影响编译速度
		debug: true,
		entries: ['src/Main.js'],
		cache: {},
		packageCache: {}
	})
		//使用babel转换es6代码
		.transform(babelify, { presets: [es2015] })
		.bundle()
		//使用source把输出文件命名为bundle.js
		.pipe(source('bundle.js'))
		//把bundle.js复制到bin/js目录
		.pipe(gulp.dest(workSpaceDir + "/bin/js"));
});