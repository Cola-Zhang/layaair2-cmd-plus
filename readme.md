目前layaair2-cmd 官方已经支持了ui导出， 思路和我这个类似，大家可以无缝迁移到官方平台了。目前官方平台在mac有bug，缺少一些执行文件，可以在我这个工程里找到
感谢大家的支持

## layaair2-plus-cmd
基于官方的layaair2-cmd
对layaair2-cmd进行扩展，支持导出json atals 散图 gameconfig layamaxui
针对2d项目  mac电脑测试过


## 安装
```
cd layaair2-plus-cmd/
./install.sh
运行时有个npm库报错 无关紧要的
```


#### 使用
```
cd 游戏项目根目录
导出json atals 散图 gameconfig layamaxui runtime
layaair2-plus-cmd ui -c -a -d
编译项目
layaair2-plus-cmd compile
发布项目
layaair2-plus-cmd publish 
```





