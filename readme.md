## layaair2-cmd
layaair2-cmd是layaair 2.0的命令行工具，可以使用layaair2-cmd不打开IDE的情况下对layaair 2.0项目进行编译发布等操作。它包含以下功能，这些功能都对应一个子命令。


|功能|子命令|
|-|-|
|编译|compile|
|发布|publish|

注：
- layaair2-cmd依赖于gulp，使用前请确保已经正确安装全局gulp。

## 安装
```
$ npm install layaair2-cmd -g
```

## CLI
layaair2-cmd的命令类似git命令，它的形式是：
```
$ layaair2-cmd [command] [args]
```
比如编译项目：
```
$ layaair2-cmd compile
```
或者查看帮助信息：
```
$ layaair2-cmd --help
```
不仅layaair2-cmd本身，所有的子命令都有版本信息和帮助信息，查看子命令帮助信息：
```
$ layaair2-cmd command -h
```
layaair2-cmd的子命令都需要当前工作目录下包含layaair项目。

## 编译
```
$ layaair2-cmd compile -h

    Usage: layaair2-cmd compile [options]

    Options:
        -v, --version                    output the version number
        -w, --workspace <workspacePath>  Incoming workspace path
        -h, --help                       output usage information
```
如果给定目录是layaair项目，该命令会生成编译后的JavaScript文件。

如果使用-w指定了项目位置，则使用给定的位置；如果没有使用-w指定位置，则默认使用当前目录作为项目路径。

#### 使用
```
layaair2-cmd compile
```
```
layaair2-cmd compile -w E:/workspace/layademo
```

## 发布
```
$ layaair2-cmd publish -h

    Usage: layaair2-cmd publish [options]

    Options:
        -v, --version                    output the version number
        -c, --config <configPlatform>    Set the publishing platform name[web|wxgame|bdgame|xmgame]
        -w, --workspace <workspacePath>  Incoming workspace path
        -h, --help                       output usage information
```
如果给定目录是layaair项目，该命令会生成发布后的JavaScript文件，发布的文件夹在release下面。

如果使用-w指定了项目位置，则使用给定的位置；如果没有使用-w指定位置，则默认使用当前目录作为项目路径。

支持的发布平台有: web|wxgame|bdgame|xmgame

#### 使用
```
layaair2-cmd publish -c wxgame
```
```
layaair2-cmd publish -c web -w E:/workspace/layademo
```