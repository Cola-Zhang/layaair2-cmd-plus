const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const cp = require("child_process");

// 设置项目位置
let workSpaceDir = global.workSpaceDir;

// 如果是发布时调用编译功能，增加prevTasks
let prevTasks = "";
if (global.publish) {
	prevTasks = ["loadConfig"];
}

//编译as为js，并输出为.laya/temp.js
gulp.task('layacompile', prevTasks, function (cb) {
	// 发布时调用编译功能，判断是否点击了编译选项
	if (global.publish && !global.config.compile) {
		return cb();
	}
	cp.exec(`"${workSpaceDir}.laya/layajs" "${workSpaceDir}asconfig.json;iflash=false;chromerun=false;quickcompile=true;out=.laya/temp.js;subpath="`,
		function (error, stdout, stderr) {
			// console.log(`\n[Info]\n${stdout}`);
			if (error !== null) {
				throw `${error}`;
			} else {
				if (stderr) console.log(`\n[Warning]\n${stderr}`);
				cb();
			}
		}
	)
});

//使用browserify，分析require引用，合并文件，如果不使用require，本步骤可不要
gulp.task('compile', ["layacompile"], function (cb) {
	// 发布时调用编译功能，判断是否点击了编译选项
	if (global.publish && !global.config.compile) {
		return cb();
	}
	return browserify({
		basedir: workSpaceDir,
		debug: false,
		entries: ['.laya/temp.js'],
		cache: {},
		packageCache: {}
	})
		.bundle()
		//使用source把输出文件命名为bundle.js
		.pipe(source('bundle.js'))
		//把bundle.js复制到bin/js目录
		.pipe(gulp.dest(workSpaceDir + "/bin/js"));
});