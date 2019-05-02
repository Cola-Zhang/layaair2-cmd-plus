var fs = require("fs");
var path = require("path");
var LayaAirFileTools = (function()
{
    function LayaAirFileTools()
    {

    }

    //得到路径下所有文件列表 参数为 路径和扩展名
    LayaAirFileTools.prototype.getFileList = function(url, extension)
    {
        var result = [];
        var fileList = fs.readdirSync(url);
        var stat = fs.statSync;
        nextfind(url);
        return result;

        function nextfind(url)
        {
            var fileList = fs.readdirSync(url);
            fileList.forEach(function(filepath)
            {
                var filepath = path.join(url, filepath);
                if (stat(filepath).isFile())
                {
                    filepath = filepath.replace(/\\/g, "/");
                    if (extension)
                    {
                        if (path.extname(filepath) == extension)
                        {
                            result.push(filepath);
                        }
                    }
                    else
                    {
                        result.push(filepath);
                    }
                }
                else
                {
                    nextfind(filepath);
                }
            })
        }
    }
    return new LayaAirFileTools();
})()
var classPattern = /\b(?:interface|class)\b\s+(\w+)(?:\s*(?:extends|implements)\s*((?:(?:(?:\w+\.)*(?:\w+)),?\b)+))?/;
var modeuleHelp = /\b(?:namespace|module)\b\s+((?:\w\.?)+)/;
var importHelp = /\bimport\b.*?=\s*((?:\w+\.?)+)/ //.exec(str)[1]
var interfaceHelp = /\bimplements\b\s+((?:\w+\,?)+)/ //.exec(str)
var staticHelp = /\bstatic\b\s+\w+:((?:\w+\.?)+)\s*=\s*new\s+/ //.exec(str)[1]
var refHelp =/"(.*?)"///.exec("sdfasdfsaf\"123ssdf\"sdfsdf")[1]
var htmlHandlerScript = function(configuration)
{
    var sriptList = [];
    //console.log(classPattern.exec(line));
    var allClassArr = [];
    allClassArr = LayaAirFileTools.getFileList(path.join(configuration.workspacePath, "src"), ".ts");
    var workspace = configuration.workspacePath;
    workspace = workspace.replace(/\\/g, "/").replace(/\/$/, "");
    var fileNodes = [];
    for (var i = 0; i < allClassArr.length; i++)
    {
        var fileNode = new FileNode();
        fileNode.url = allClassArr[i];
        fileNodes.push(fileNode);
        var filecont = fs.readFileSync(fileNode.url, "utf-8"); //读取内容
        var moduleName="";
        filecont = filecont.split("\n"); //分隔行，形成数组；
        for (var j = 0; j < filecont.length; j++)
        { 
            var tempmod = modeuleHelp.exec(filecont[j]);
            if(tempmod){
                moduleName = tempmod;
                moduleName = (moduleName[1] + ".").replace(/ /g, "");
            }
            var fileLine = classPattern.exec(filecont[j]);
            var interfaceClass = interfaceHelp.exec(filecont[j]);
            var staticClass = staticHelp.exec(filecont[j]);
            if (staticClass)
            {
                staticClass = staticClass[1];
                if (staticClass.indexOf(".") == -1)
                {
                    staticClass = fileNode[fileNode.classList.length] + staticClass;
                    fileNode.classList.push(staticClass);
                }
            }
            if (interfaceClass)
            {
                interfaceClass = interfaceClass[1].split(",");
                for (var p = 0; p < interfaceClass.length; p++)
                {
                    var inte = interfaceClass[p].replace(/ /g, "");
                    if (inte.indexOf(".") == -1)
                    {
                        inte = (moduleName + inte);
                    }
                    if (fileNode.parentClassList.indexOf(inte) == -1)
                    {
                        fileNode.parentClassList.push(inte);
                    }
                }
            }
            //console.log(fileLine);
            if (fileLine)
            {
                j++;
                fileNode.classList.push(moduleName + fileLine[1].replace(/ /g, ""));
                if (fileLine[2])
                {
                    var parentclassList = fileLine[2].replace(/ implements /g, ",").split(",");
                    for (var o = 0; o < parentclassList.length; o++)
                    {
                        parentclassList[o] = parentclassList[o].replace(/ /g, "")
                        if (parentclassList[o].indexOf(".") == -1)
                        {
                            parentclassList[o] = (moduleName + parentclassList[o]);
                        }
                        if (fileNode.parentClassList.indexOf(parentclassList[o]) == -1)
                        {
                            fileNode.parentClassList.push(parentclassList[o]);
                        }
                    }

                }
            }

        }

    }

    function FileNode()
    {
        this.classList = [];
        this.parentClassList = [];
        this.id = 0;
        this.url = "";

    }

    var listLength = fileNodes.length;
    for (var i = 0; i < fileNodes.length; i++)
    {
        var currentNode = fileNodes[i];
        currentNode.url = currentNode.url.replace(workspace + "/src/", "js/").replace(".ts", ".js");
    }
    for (var i = 0; i < fileNodes.length; i++)
    {
        var currentNode = fileNodes[i];
        if (currentNode.parentClassList.length == 0)
        {
            sriptList.unshift(currentNode.url);
            continue
        }
        for (var j = i; j < fileNodes.length; j++)
        {
            var checkNode = fileNodes[j];
            for (var k = 0; k < currentNode.parentClassList.length; k++)
            {
                var index = checkNode.classList.indexOf(currentNode.parentClassList[k]);
                if (index >= 0)
                {
                    var currentNodeIndex = sriptList.indexOf(currentNode.url);
                    var checkNodeIndex = sriptList.indexOf(checkNode.url);
                    if (currentNodeIndex != -1 && checkNodeIndex == -1)
                    {
                        sriptList.splice(currentNodeIndex - 1, 0, checkNode.url);
                    }
                    else if (currentNodeIndex == -1 && checkNodeIndex != -1)
                    {
                        // sriptList.push(checkNode.url);
                    }
                    else if (currentNodeIndex == -1 && checkNodeIndex == -1)
                    {
                        sriptList.push(checkNode.url);
                    }
                    else if (currentNodeIndex != -1 && checkNodeIndex != -1)
                    {
                        if (currentNodeIndex < checkNodeIndex)
                        {
                            sriptList[checkNodeIndex] = null;
                            sriptList.splice(currentNodeIndex - 1, 0, checkNode.url);
                        }
                    }
                }
            }
        }
        if (sriptList.indexOf(currentNode.url) == -1)
            sriptList.push(currentNode.url);
    }
    var htmlcont = fs.readFileSync(path.join(configuration.workspacePath, "bin", "index.html"), "utf-8");
    var jsscript = /<!--jsfile--startTag-->((?:.|(?:\r?\n))*)<!--jsfile--endTag-->/;
    var mainjsscript = /<!--jsfile--Main-->((?:.|(?:\r?\n))*)<!--jsfile--Main-->/;
    var customjsscript=/<!--jsfile--Custom-->((?:.|(?:\r?\n))*)<!--jsfile--Custom-->/;
    var mainjs = mainjsscript.exec(htmlcont);
    var customjs = customjsscript.exec(htmlcont);
    if (mainjs && mainjs.length > 1)
    {
        mainjs = mainjs[1];
    }
    else
    {
        mainjs = "";
    }
    if(customjs&&customjs.length>1){
        customjs =customjs[1];
    }else{
        customjs ="";
    }
    var oldscript = jsscript.exec(htmlcont);
    if (oldscript && oldscript.length > 1)
    {
        var oldscriptCon = oldscript[1];
        var addscript = ""
        for (var j = 0; j < sriptList.length; j++)
        {
            var fileItem = sriptList[j];
            if (mainjs.indexOf(fileItem) != -1||customjs.indexOf(fileItem)!=-1)
            {
                continue;
            }
            if (fileItem) addscript += "\n\t<script src=" + "\"" + fileItem + "\"" + "><" + "\/" + "script>";
        }
        addscript = "<!--jsfile--startTag-->" + addscript;
        addscript = addscript + "\n\t<!--jsfile--endTag-->";
        htmlcont = htmlcont.replace(oldscript[0], addscript);
        fs.writeFileSync(path.join(configuration.workspacePath, "bin", "index.html"), htmlcont);
    }
}
exports.htmlHandlerScript = htmlHandlerScript;