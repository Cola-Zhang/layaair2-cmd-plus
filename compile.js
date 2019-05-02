const requireDir = require('require-dir');
const fs = require("fs");

// 获取项目位置
let workSpaceDir;
if (process.argv.length >= 6 && process.argv[4] === "--propath") {
	workSpaceDir = process.argv[5].replace(/\\/g, "/") + "/";
}
global.workSpaceDir = workSpaceDir;

// 判断是哪种语言的项目，使用对应的compile_{as|ts|js}脚本
let protypeList = ["as", "ts", "js"];
let protype = "as";
let 
    configPath,
    _protype;
for (let i = 0, len = protypeList.length; i < len; i++) {
    _protype = protypeList[i];
    configPath = `${workSpaceDir}/${_protype}config.json`;
    if (fs.existsSync(configPath)) {
        protype = _protype;
        break;
    }
}

console.log(workSpaceDir, protype);

requireDir('./', {
    filter: function (fullPath) {
        // 只用到了compile.js和publish.js
        if (fullPath.endsWith(`compile_${protype}.js`)) {
            return true;
        } else {
            return false;
        }
    }
});