var window = window || global;
var document = document || (window.document = {});
/***********************************/
/*http://www.layabox.com 2017/01/16*/
/***********************************/
var Laya=window.Laya=(function(window,document){
	var Laya={
		__internals:[],
		__packages:{},
		__classmap:{'Object':Object,'Function':Function,'Array':Array,'String':String},
		__sysClass:{'object':'Object','array':'Array','string':'String','dictionary':'Dictionary'},
		__propun:{writable: true,enumerable: false,configurable: true},
		__presubstr:String.prototype.substr,
		__substr:function(ofs,sz){return arguments.length==1?Laya.__presubstr.call(this,ofs):Laya.__presubstr.call(this,ofs,sz>0?sz:(this.length+sz));},
		__init:function(_classs){_classs.forEach(function(o){o.__init$ && o.__init$();});},
		__isClass:function(o){return o && (o.__isclass || o==Object || o==String || o==Array);},
		__newvec:function(sz,value){
			var d=[];
			d.length=sz;
			for(var i=0;i<sz;i++) d[i]=value;
			return d;
		},
		__extend:function(d,b){
			for (var p in b){
				if (!b.hasOwnProperty(p)) continue;
				var gs=Object.getOwnPropertyDescriptor(b, p);
				var g = gs.get, s = gs.set; 
				if ( g || s ) {
					if ( g && s)
						Object.defineProperty(d,p,gs);
					else{
						g && Object.defineProperty(d, p, g);
						s && Object.defineProperty(d, p, s);
					}
				}
				else d[p] = b[p];
			}
			function __() { Laya.un(this,'constructor',d); }__.prototype=b.prototype;d.prototype=new __();Laya.un(d.prototype,'__imps',Laya.__copy({},b.prototype.__imps));
		},
		__copy:function(dec,src){
			if(!src) return null;
			dec=dec||{};
			for(var i in src) dec[i]=src[i];
			return dec;
		},
		__package:function(name,o){
			if(Laya.__packages[name]) return;
			Laya.__packages[name]=true;
			var p=window,strs=name.split('.');
			if(strs.length>1){
				for(var i=0,sz=strs.length-1;i<sz;i++){
					var c=p[strs[i]];
					p=c?c:(p[strs[i]]={});
				}
			}
			p[strs[strs.length-1]] || (p[strs[strs.length-1]]=o||{});
		},
		__hasOwnProperty:function(name,o){
			o=o ||this;
		    function classHas(name,o){
				if(Object.hasOwnProperty.call(o.prototype,name)) return true;
				var s=o.prototype.__super;
				return s==null?null:classHas(name,s);
			}
			return (Object.hasOwnProperty.call(o,name)) || classHas(name,o.__class);
		},
		__typeof:function(o,value){
			if(!o || !value) return false;
			if(value===String) return (typeof o==='string');
			if(value===Number) return (typeof o==='number');
			if(value.__interface__) value=value.__interface__;
			else if(typeof value!='string')  return (o instanceof value);
			return (o.__imps && o.__imps[value]) || (o.__class==value);
		},
		__as:function(value,type){
			return (this.__typeof(value,type))?value:null;
		},		
		interface:function(name,_super){
			Laya.__package(name,{});
			var ins=Laya.__internals;
			var a=ins[name]=ins[name] || {self:name};
			if(_super)
			{
				var supers=_super.split(',');
				a.extend=[];
				for(var i=0;i<supers.length;i++){
					var nm=supers[i];
					ins[nm]=ins[nm] || {self:nm};
					a.extend.push(ins[nm]);
				}
			}
			var o=window,words=name.split('.');
			for(var i=0;i<words.length-1;i++) o=o[words[i]];
			o[words[words.length-1]]={__interface__:name};
		},
		class:function(o,fullName,_super,miniName){
			_super && Laya.__extend(o,_super);
			if(fullName){
				Laya.__package(fullName,o);
				Laya.__classmap[fullName]=o;
				if(fullName.indexOf('.')>0){
					if(fullName.indexOf('laya.')==0){
						var paths=fullName.split('.');
						miniName=miniName || paths[paths.length-1];
						if(Laya[miniName]) console.log("Warning!,this class["+miniName+"] already exist:",Laya[miniName]);
						Laya[miniName]=o;
					}
				}
				else {
					if(fullName=="Main")
						window.Main=o;
					else{
						if(Laya[fullName]){
							console.log("Error!,this class["+fullName+"] already exist:",Laya[fullName]);
						}
						Laya[fullName]=o;
					}
				}
			}
			var un=Laya.un,p=o.prototype;
			un(p,'hasOwnProperty',Laya.__hasOwnProperty);
			un(p,'__class',o);
			un(p,'__super',_super);
			un(p,'__className',fullName);
			un(o,'__super',_super);
			un(o,'__className',fullName);
			un(o,'__isclass',true);
			un(o,'super',function(o){this.__super.call(o);});
		},
		imps:function(dec,src){
			if(!src) return null;
			var d=dec.__imps|| Laya.un(dec,'__imps',{});
			function __(name){
				var c,exs;
				if(! (c=Laya.__internals[name]) ) return;
				d[name]=true;
				if(!(exs=c.extend)) return;
				for(var i=0;i<exs.length;i++){
					__(exs[i].self);
				}
			}
			for(var i in src) __(i);
		},
		getset:function(isStatic,o,name,getfn,setfn){
			if(!isStatic){
				getfn && Laya.un(o,'_$get_'+name,getfn);
				setfn && Laya.un(o,'_$set_'+name,setfn);
			}
			else{
				getfn && (o['_$GET_'+name]=getfn);
				setfn && (o['_$SET_'+name]=setfn);
			}
			if(getfn && setfn) 
				Object.defineProperty(o,name,{get:getfn,set:setfn,enumerable:false});
			else{
				getfn && Object.defineProperty(o,name,{get:getfn,enumerable:false});
				setfn && Object.defineProperty(o,name,{set:setfn,enumerable:false});
			}
		},
		static:function(_class,def){
				for(var i=0,sz=def.length;i<sz;i+=2){
					if(def[i]=='length') 
						_class.length=def[i+1].call(_class);
					else{
						function tmp(){
							var name=def[i];
							var getfn=def[i+1];
							Object.defineProperty(_class,name,{
								get:function(){delete this[name];return this[name]=getfn.call(this);},
								set:function(v){delete this[name];this[name]=v;},enumerable: true,configurable: true});
						}
						tmp();
					}
				}
		},		
		un:function(obj,name,value){
			value || (value=obj[name]);
			Laya.__propun.value=value;
			Object.defineProperty(obj, name, Laya.__propun);
			return value;
		},
		uns:function(obj,names){
			names.forEach(function(o){Laya.un(obj,o)});
		}
	};

	window.console=window.console || ({log:function(){}});
	window.trace=window.console.log;
	Error.prototype.throwError=function(){throw arguments;};
	String.prototype.substr=Laya.__substr;
	Object.defineProperty(Array.prototype,'fixed',{enumerable: false});

	return Laya;
})(window,document);

(function(window,document,Laya){
	var __un=Laya.un,__uns=Laya.uns,__static=Laya.static,__class=Laya.class,__getset=Laya.getset,__newvec=Laya.__newvec;
	/**
	*...
	*@author ww
	*/
	//class laya.RunConfig
	var RunConfig=(function(){
		function RunConfig(){}
		__class(RunConfig,'laya.RunConfig');
		RunConfig.filePath="E:/wangwei/codes/LayaAir/trank/Editor/LayaAirPSDTool/bin/h5/data/";
		RunConfig.outPath="E:/wangwei/codes/LayaAir/trank/Editor/LayaAirPSDTool/bin/h5/out/";
		RunConfig.fileExtension="psd";
		RunConfig.nameType="splitLast";
		return RunConfig;
	})()


	/**
	*...
	*@author ww
	*/
	//class LayaAirPSDTool
	var LayaAirPSDTool=(function(){
		function LayaAirPSDTool(){
			this.init();
			this.parseCMD(NodeJSTools.getArgv());
			RunConfig.filePath=FileManager.adptToCommonUrl(RunConfig.filePath);
			RunConfig.outPath=FileManager.adptToCommonUrl(RunConfig.outPath);
			DTrace.timeStart("LayaAirPSDTool");
			this.work();
			console.log("work done");
			DTrace.timeEnd("LayaAirPSDTool");
		}

		__class(LayaAirPSDTool,'LayaAirPSDTool');
		var __proto=LayaAirPSDTool.prototype;
		//NodeJSTools.setTimeout(NodeJSTools.bind(work,this),2000);
		__proto.parseCMD=function(args){
			NodeJSTools.parseArgToObj(args,1,RunConfig);
		}

		__proto.initTransDic=function(){
			var typeConfigPath;
			typeConfigPath=FileManager.getPath(NodeJSTools.getMyPath(),"config/type.json");
			if (FileManager.exists(typeConfigPath)){
				var typeDic;
				typeDic=FileManager.readJSONFile(typeConfigPath);
				if (typeDic){
					var key;
					for (key in typeDic){
						LayaAirPSDTool.TypeTransDic[key]=typeDic[key];
					}
				}
			}
		}

		__proto.init=function(){
			Device.Buffer=Buffer;
			SystemSetting.isCMDVer=true;
			OSInfo.init();
			FileTools.init2();
			PSDTool.init();
			PNGTool.init();
			this.initTransDic();
		}

		__proto.work=function(){
			if (!FileTools.exist(RunConfig.filePath)){
				console.log("path not exist:",RunConfig.filePath);
				return;
			};
			var parentPath;
			var files;
			if (FileTools.isDirectory(RunConfig.filePath)){
				parentPath=RunConfig.filePath;
				files=FileTools.getFileList(RunConfig.filePath);
			}
			else {
				parentPath=FileTools.getParent(RunConfig.filePath);
				files=[RunConfig.filePath];
			}
			console.log("filecount:",files.length);
			var i=0,len=0;
			len=files.length;
			var fileExtention;
			for (i=0;i < len;i++){
				fileExtention=FileTools.getExtensionName(files[i]);
				if (fileExtention==RunConfig.fileExtension){
					this.workAFile(parentPath,files[i]);
				}
			}
		}

		__proto.workAFile=function(parent,path){
			console.log("work:",path);
			var filePath;
			filePath=path;
			path=FileManager.getRelativePath(parent,path);
			LayaAirPSDTool.curFileName=FileManager.getFileName(path);
			LayaAirPSDTool.resOutPutPath=FileManager.getPath(RunConfig.outPath,"assets");
			LayaAirPSDTool.uiOutPath=FileManager.getPath(RunConfig.outPath,"pages/"+LayaAirPSDTool.curFileName);
			FileTools.createDirectory(LayaAirPSDTool.resOutPutPath+"/"+LayaAirPSDTool.curFileName);
			FileTools.createDirectory(LayaAirPSDTool.uiOutPath);
			if (!FileTools.exist(filePath)){
				console.log("file not exist:",filePath);
				return;
			}
			LayaAirPSDTool.curImageDic={};
			var tPsd;
			tPsd=PSDTool.fromFile(filePath);
			var psdData;
			psdData=tPsd.export();
			var viewTree;
			viewTree=this.makeViewObj(tPsd);
			LayaAirPSDTool.adptNodeTree(viewTree);
			LayaAirPSDTool.exportImages();
			LayaAirPSDTool.exportPage(viewTree);
		}

		__proto.makeViewObj=function(tree,parent,valueKey,dataO){
			var name;
			name=tree.name;
			var tNode;
			if (tree.isRoot()){
				tNode=LayaAirPSDTool.createNode("View");
				LayaAirPSDTool.copyProps(tNode,tree);
				valueKey=null;
			}
			else if (tree.isGroup()){
				if (name.charAt(0)=="@"){
					valueKey=name.substr(1);
					dataO=LayaAirPSDTool.getNodeSetValues(parent);
					tNode=parent;
				}
				else if (name=="skin"){
					valueKey=name;
					tNode=parent;
				}
				else if (LayaAirPSDTool.StyleGroups[name]){
					valueKey=name;
					tNode=parent;
					if (dataO){}
						}
				else if (LayaAirPSDTool.AppendGroups[name]){
					dataO=LayaAirPSDTool.getNodeAppend(parent);
					if (!dataO[name])
						dataO[name]={};
					dataO=dataO[name];
					tNode=parent;
				}
				else {
					dataO=null;
					tNode=LayaAirPSDTool.createNodeByPSDNode(tree);
					valueKey=null;
					if (tNode.type=="Image"){
						if (!LayaAirPSDTool.getProp(tNode,"skin")){
							valueKey="skin";
						}
					}
				}
			}
			else {
				if (valueKey){
					tNode=parent;
					if (dataO){
						dataO[valueKey]=tree;
					}
					else if (valueKey=="skin"){
						LayaAirPSDTool.addImage(tree.name,tree);
						LayaAirPSDTool.addProp(tNode,valueKey,LayaAirPSDTool.getImagePathFromNode(tree));
					}
					else {
						LayaAirPSDTool.addStyle(parent,valueKey,tree);
					}
				}
				else {
					tNode=LayaAirPSDTool.createNodeByPSDNode(tree);
					valueKey=null;
				}
				dataO=null;
			}
			if (parent && tNode !=parent){
				LayaAirPSDTool.addChild(tNode,parent);
			};
			var childs;
			childs=tree.children();
			var i=0,len=0;
			len=childs.length;
			for (i=0;i < len;i++){
				this.makeViewObj(childs[i],tNode,valueKey,dataO);
			}
			return tNode;
		}

		LayaAirPSDTool.exportPage=function(viewTree){
			var path;
			path=FileManager.getPath(LayaAirPSDTool.uiOutPath,LayaAirPSDTool.curFileName+".ui");
			FileManager.createJSONFile(path,viewTree);
		}

		LayaAirPSDTool.exportImages=function(){
			var key;
			for (key in LayaAirPSDTool.curImageDic){
				var tNode;
				tNode=LayaAirPSDTool.curImageDic[key];
				var tFilePath;
				tFilePath=FileManager.getPath(LayaAirPSDTool.resOutPutPath,LayaAirPSDTool.getImagePathFromNode(tNode));
				tNode.saveAsPng(tFilePath);
			}
		}

		LayaAirPSDTool.adptNodeTree=function(tNode,x,y){
			(x===void 0)&& (x=0);
			(y===void 0)&& (y=0);
			var mx=NaN,my=NaN;
			mx=LayaAirPSDTool.getProp(tNode,"x",0);
			my=LayaAirPSDTool.getProp(tNode,"y",0);
			LayaAirPSDTool.adptOneNode(tNode,x,y);
			var childs;
			childs=tNode.child;
			if (!childs)
				return;
			childs.reverse();
			var i=0,len=0;
			len=childs.length;
			for (i=0;i < len;i++){
				LayaAirPSDTool.adptNodeTree(childs[i],mx,my);
			}
		}

		LayaAirPSDTool.adptStyle=function(styleO,node){
			var tArr=[];
			var i=0,len=0;
			var key;
			len=LayaAirPSDTool.styleKeys.length;
			for (i=0;i < len;i++){
				key=LayaAirPSDTool.styleKeys[i];
				if (styleO[key]){
					tArr.push(styleO[key]);
				}
			}
			LayaAirPSDTool.addProp(node,"stateNum",1);
			var tLayer;
			if (tArr.length > 0){
				tLayer=tArr[0];
				var tFilePath;
				tFilePath=LayaAirPSDTool.getMergeImagePath(tArr);
				len=tArr.length;
				for (i=0;i < len;i++){
					tLayer=tArr[i];
					tArr[i]=tLayer.toPng();
				};
				var tPng=PNGTool.mergePng(tArr);
				LayaAirPSDTool.addProp(node,"skin",tFilePath);
				LayaAirPSDTool.addProp(node,"stateNum",len);
				PNGTool.savePng(tPng,FileManager.getPath(LayaAirPSDTool.resOutPutPath,tFilePath));
			}
		}

		LayaAirPSDTool.saveStylePng=function(styleO,fileName){
			var tArr=[];
			var i=0,len=0;
			var key;
			len=LayaAirPSDTool.styleKeys.length;
			for (i=0;i < len;i++){
				key=LayaAirPSDTool.styleKeys[i];
				if (styleO[key]){
					tArr.push(styleO[key]);
				}
			};
			var rst={};
			rst.count=len;
			var tLayer;
			if (tArr.length > 0){
				tLayer=tArr[0];
				var tFilePath;
				tFilePath=fileName || LayaAirPSDTool.getMergeImagePath(tArr);
				fileName=tFilePath;
				len=tArr.length;
				for (i=0;i < len;i++){
					tLayer=tArr[i];
					tArr[i]=tLayer.toPng();
				};
				var tPng=PNGTool.mergePng(tArr);
				PNGTool.savePng(tPng,FileManager.getPath(LayaAirPSDTool.resOutPutPath,tFilePath));
			}
			rst.fileName=fileName;
			return rst;
		}

		LayaAirPSDTool.adptOneNode=function(tNode,x,y){
			(x===void 0)&& (x=0);
			(y===void 0)&& (y=0);
			if (tNode.style){
				var tStyleData;
				tStyleData=tNode.style;
				delete tNode.style;
				LayaAirPSDTool.adptStyle(tStyleData,tNode);
			}
			if (LayaAirPSDTool.getNodeAppend(tNode,false)){
				LayaAirPSDTool.adptAppend(LayaAirPSDTool.getNodeAppend(tNode,false),tNode);
				delete tNode.append;
			}
			if (LayaAirPSDTool.getNodeSetValues(tNode,false)){
				LayaAirPSDTool.adptSetValues(LayaAirPSDTool.getNodeSetValues(tNode,false),tNode);
				delete tNode.setValues;
			}
			LayaAirPSDTool.addProp(tNode,"x",LayaAirPSDTool.getProp(tNode,"x",0)-x);
			LayaAirPSDTool.addProp(tNode,"y",LayaAirPSDTool.getProp(tNode,"y",0)-y);
			LayaAirPSDTool.adptNodeName(tNode);
			switch (tNode.type){}
		}

		LayaAirPSDTool.adptNodeName=function(tNode){
			switch (RunConfig.nameType){
				case "full":
					break ;
				case "none":
					LayaAirPSDTool.deleteProp(tNode,"name");
					break ;
				case "splitLast":;
					var cName;
					cName=LayaAirPSDTool.getProp(tNode,"name");
					if (cName && cName.indexOf("_")> 0){
						var nameArr;
						nameArr=cName.split("_");
						LayaAirPSDTool.addProp(tNode,"name",nameArr[nameArr.length-1]);
					}
					break ;
				}
		}

		LayaAirPSDTool.isPureNum=function(str){
			var i=0,len=0;
			len=str.length;
			for (i=0;i < len;i++){
				if (!LayaAirPSDTool._vNumDic[str.charAt(i)])return false;
			}
			if (parseFloat(str)!=str)return false;
			return true;
		}

		LayaAirPSDTool.getAdptStrValue=function(value){
			if (value=="")return value;
			if (LayaAirPSDTool.isPureNum(value)){
				return parseFloat(value);
			}
			return value;
		}

		LayaAirPSDTool.adptSetValues=function(props,tNode){
			var tKey;
			var tLabelNode;
			var tLabelObj;
			for (tKey in props){
				tLabelNode=props[tKey];
				tLabelObj=LayaAirPSDTool.getTextInfoFromNode(tLabelNode);
				if (tLabelObj.text){
					LayaAirPSDTool.addProp(tNode,tKey,LayaAirPSDTool.getAdptStrValue(tLabelObj.text));
				}
				if (LayaAirPSDTool.fontKeys[tKey]){
					if (tLabelObj.color){
						LayaAirPSDTool.addProp(tNode,"labelColors",tLabelObj.color);
					}
					if (tLabelObj.fontSize){
						LayaAirPSDTool.addProp(tNode,"labelSize",tLabelObj.fontSize);
					}
				}
			}
		}

		LayaAirPSDTool.adptAppend=function(appendO,tNode){
			var skinPath;
			skinPath=LayaAirPSDTool.getProp(tNode,"skin");
			if (!skinPath)
				return;
			var tKey;
			var tAppendStyle;
			for (tKey in LayaAirPSDTool.AppendGroups){
				tAppendStyle=appendO[tKey];
				if (tAppendStyle){
					LayaAirPSDTool.saveStylePng(tAppendStyle,skinPath.replace(".png",tKey+".png"));
				}
			}
		}

		LayaAirPSDTool.addChild=function(child,parent){
			if (!parent.child)
				parent.child=[];
			parent.child.push(child);
		}

		LayaAirPSDTool.addProp=function(node,key,value){
			if (!node.props)
				node.props={};
			node.props[key]=value;
		}

		LayaAirPSDTool.deleteProp=function(node,key){
			if (!node.props)
				return;
			delete node.props[key];
		}

		LayaAirPSDTool.getProp=function(node,key,defaultValue){
			if (node.props && node.props.hasOwnProperty(key))
				return node.props[key];
			return defaultValue;
		}

		LayaAirPSDTool.addStyle=function(node,key,value){
			if (!node.style)
				node.style={};
			node.style[key]=value;
		}

		LayaAirPSDTool.getNodeAppend=function(node,autoCreate){
			(autoCreate===void 0)&& (autoCreate=true);
			if ((!node.append)&& autoCreate)
				node.append={};
			return node.append;
		}

		LayaAirPSDTool.getNodeSetValues=function(node,autoCreate){
			(autoCreate===void 0)&& (autoCreate=true);
			if ((!node.setValues)&& autoCreate)
				node.setValues={};
			return node.setValues;
		}

		LayaAirPSDTool.addData=function(node,keys,value){
			var i=0,len=0;
			len=keys.length;
			var tNode;
			tNode=node;
			var tKey;
			for (i=0;i < len;i++){
				tKey=keys[i];
				if (i==len-1){
					tNode[tKey]=value;
					break ;
				}
				if (!tNode[tKey])
					tNode[tKey]={};
				tNode=tNode[tKey];
			}
		}

		LayaAirPSDTool.createNode=function(type){
			var rst={};
			rst.type=type;
			rst.props={};
			return rst;
		}

		LayaAirPSDTool.isUpChar=function(char){
			if (char >="A" && char <="Z")
				return true;
			return false;
		}

		LayaAirPSDTool.isLowChar=function(char){
			if (char >="a" && char <="z")
				return true;
			return false;
		}

		LayaAirPSDTool.addImage=function(key,pNode){
			LayaAirPSDTool.curImageDic[key]=pNode;
		}

		LayaAirPSDTool.getMergeImagePath=function(imgList){
			var name;
			var pNode;
			pNode=imgList[0];
			name=pNode.name;
			return LayaAirPSDTool.curFileName+"/merge_"+name+".png";
		}

		LayaAirPSDTool.getImagePathFromNode=function(pNode){
			var name;
			name=pNode.name;
			return LayaAirPSDTool.curFileName+"/"+name+".png";
		}

		LayaAirPSDTool.createNodeByPSDNode=function(pNode){
			var name;
			name=pNode.name;
			var type;
			if (name.indexOf("txt")==0 || name.lastIndexOf("Txt")==(name.length-3)){
				type="Label";
			}
			else if (name.indexOf("_")>=0){
				var tArr;
				tArr=name.split("_");
				type=tArr[0];
				if (!LayaAirPSDTool.isUpChar(type.charAt(0))){
					type="Image";
				}
			}
			else {
				type="Image";
			}
			if (LayaAirPSDTool.TypeTransDic[type])
				type=LayaAirPSDTool.TypeTransDic[type];
			var rst;
			rst=LayaAirPSDTool.createNode(type);
			LayaAirPSDTool.addProp(rst,"name",name);
			LayaAirPSDTool.copyProps(rst,pNode);
			return rst;
		}

		LayaAirPSDTool.copyProps=function(node,pNode){
			var type=node.type;
			var key;
			var tValue;
			for (key in LayaAirPSDTool.posKeys){
				tValue=pNode[LayaAirPSDTool.posKeys[key]];
				if (tValue==Infinity || tValue==-Infinity)
					continue ;
				LayaAirPSDTool.addProp(node,key,tValue);
			}
			if (type=="Image"){
				if (!pNode.isGroup()){
					LayaAirPSDTool.addImage(pNode.name,pNode);
					LayaAirPSDTool.addProp(node,"skin",LayaAirPSDTool.getImagePathFromNode(pNode));
				}
			}
			if (type=="Label"){
				LayaAirPSDTool.parseTxtInfoToNode(LayaAirPSDTool.getTextInfoFromNode(pNode),node);
			}
		}

		LayaAirPSDTool.parseTxtInfoToNode=function(textInfo,node){
			if (textInfo.text)
				LayaAirPSDTool.addProp(node,"text",textInfo.text);
			if (textInfo.align)
				LayaAirPSDTool.addProp(node,"align",textInfo.align);
			if (textInfo.fontSize)
				LayaAirPSDTool.addProp(node,"fontSize",textInfo.fontSize);
			if (textInfo.color)
				LayaAirPSDTool.addProp(node,"color",textInfo.color);
		}

		LayaAirPSDTool.getTextInfoFromNode=function(pNode){
			var rst;
			rst={};
			var addData;
			addData=pNode.export();
			var textInfo;
			textInfo=addData.text;
			if (!textInfo)
				return rst;
			var tFont;
			tFont=textInfo.font;
			rst.text=textInfo.value;
			if (tFont){
				if (tFont.name)
					rst.name=tFont.name;
				if (tFont.alignment && tFont.alignment[0]){
					rst.align=tFont.alignment[0];
				}
				if (tFont.sizes && tFont.sizes[0]){
					rst.fontSize=tFont.sizes[0];
				}
				if (tFont.colors && tFont.colors[0]){
					rst.color=LayaAirPSDTool.getRGBStr(tFont.colors[0]);
				}
			}
			return rst;
		}

		LayaAirPSDTool.getColorBit=function(value){
			var rst;
			rst=Math.floor(value).toString(16);
			rst=rst.length > 1 ? rst :"0"+rst;
			return rst;
		}

		LayaAirPSDTool.getRGBStr=function(rgb){
			return "#"+LayaAirPSDTool.getColorBit(rgb[0])+LayaAirPSDTool.getColorBit(rgb[1])+LayaAirPSDTool.getColorBit(rgb[2]);
		}

		LayaAirPSDTool.ExeSign="LayaAirPSDTool";
		LayaAirPSDTool.curImageDic={};
		LayaAirPSDTool.curFileName="";
		LayaAirPSDTool.resOutPutPath="";
		LayaAirPSDTool.uiOutPath="";
		__static(LayaAirPSDTool,
		['TypeTransDic',function(){return this.TypeTransDic={"Container":"Box","Item":"Box"};},'styleKeys',function(){return this.styleKeys=["normal","over","down"];},'fontKeys',function(){return this.fontKeys={"label":true,"labels":true};},'posKeys',function(){return this.posKeys={"x":"left","y":"top","width":"width","height":"height"};},'StyleGroups',function(){return this.StyleGroups={"normal":true,"over":true,"down":true};},'AppendGroups',function(){return this.AppendGroups={"$bar":true,"$down":true,"$up":true};},'_vNumDic',function(){return this._vNumDic={
				"0":true,
				"1":true,
				"2":true,
				"3":true,
				"4":true,
				"5":true,
				"6":true,
				"7":true,
				"8":true,
				"9":true,
				".":true
		};}

		]);
		return LayaAirPSDTool;
	})()


	/**
	*...
	*@author ww
	*/
	//class nodetool.NodeJSTools
	var NodeJSTools=(function(){
		function NodeJSTools(){}
		__class(NodeJSTools,'nodetool.NodeJSTools');
		NodeJSTools.setTimeout=function(fun,time){
			setTimeout(fun,time);
		}

		NodeJSTools.bind=function(fun,scope){
			var rst=fun;
			rst=fun.bind(scope);;
			return rst;
		}

		NodeJSTools.require=function(str){
			return require(str);;
		}

		NodeJSTools.getArgv=function(){
			var argv;
			argv=process.argv;;
			return argv;
		}

		NodeJSTools.parseArgToObj=function(args,start,target){
			(start===void 0)&& (start=0);
			var i=0,len=0;
			len=args.length;
			var tParam;
			var pArr;
			for (i=start;i < len;i++){
				tParam=args[i];
				if (tParam.indexOf("=")> 0){
					pArr=tParam.split("=");
					if (target[pArr[0]] && typeof(target[pArr[0]])=="number"){
						pArr[1]=Sys.mParseFloat(pArr[1]);
					}
					target[pArr[0]]=pArr[1];
				}
			}
		}

		NodeJSTools.getMyPath=function(){
			return __dirname;
		}

		NodeJSTools.eval=function(codeStr){
			return eval(codeStr);
		}

		return NodeJSTools;
	})()


	/**
	*...
	*@author ww
	*/
	//class nodetool.PNGTool
	var PNGTool=(function(){
		function PNGTool(){}
		__class(PNGTool,'nodetool.PNGTool');
		PNGTool.init=function(){
			PNGTool.PNG=NodeJSTools.require("./node_modules/psd/node_modules/pngjs").PNG;
			PNGTool.fs=NodeJSTools.require("fs");
		}

		PNGTool.savePng=function(png,path){
			png.pack().pipe(PNGTool.fs.createWriteStream(path));
		}

		PNGTool.mergePng=function(pngList){
			var width=NaN;
			var height=NaN;
			var rst;
			var tPng;
			tPng=pngList[0];
			width=tPng.width;
			height=tPng.height;
			rst=new PNGTool.PNG({width:width,height:height *pngList.length,filterType:4 });
			var pixelData;
			pixelData=[];
			var i=0,len=0;
			len=pngList.length;
			for (i=0;i < len;i++){
				tPng=pngList[i];
				pixelData=pixelData.concat(tPng.data);
			}
			rst.data=pixelData;
			return rst;
		}

		PNGTool.PNG=null
		PNGTool.fs=null
		return PNGTool;
	})()


	/**
	*封装所有驱动级接口
	*@author yung
	*/
	//class nodetools.devices.Device
	var Device=(function(){
		function Device(){};
		__class(Device,'nodetools.devices.Device');
		Device.init=function(){
			Device.Buffer=Buffer;
		}

		Device.require=function(mod){
			var rst;
			rst=require(mod);
			return rst;
		}

		Device.requireRemote=function(mod){
			if (!Device.remote)return Device.require(mod);
			return Device.remote.require(mod);
		}

		Device.app=null
		Device.appName="LayaAir";
		Device.appPath=null
		Device.dataPath=null
		Device.tempPath=null
		Device.workPath=null
		Device.userHome=null
		Device.extensionPath=null
		Device.remote=null
		Device.Buffer=null
		Device.electron=null
		Device.win=null
		return Device;
	})()


	/**
	*
	*@author ww
	*@version 1.0
	*
	*@created 2015-9-28 上午10:39:47
	*/
	//class nodetools.devices.DTrace
	var DTrace=(function(){
		function DTrace(){}
		__class(DTrace,'nodetools.devices.DTrace');
		DTrace.getArgArr=function(arg){
			var rst;
			rst=[];
			var i=0,len=arg.length;
			for(i=0;i<len;i++){
				rst.push(arg[i]);
			}
			return rst;
		}

		DTrace.getCallLoc=function(index){
			(index===void 0)&& (index=2);
			var loc;
			try {
				DTrace.Erroer.i++;
				}catch (e){
				var arr;
				arr=e.stack.replace(/Error\n/).split(/\n/);
				if (arr[index]){
					loc=arr[index].replace(/^\s+|\s+$/,"");
					}else{
					loc="unknow";
				}
			}
			return loc;
		}

		DTrace.dTrace=function(__arg){
			var arg=arguments;
			arg=DTrace.getArgArr(arg);
			arg.push(DTrace.getCallLoc(2));
			console.log.apply(console,arg);
			var str;
			str=arg.join(" ");
		}

		DTrace.timeStart=function(sign){
			console.time(sign);;
		}

		DTrace.timeEnd=function(sign){
			console.timeEnd(sign);;
		}

		DTrace.traceTable=function(data){
			console.table(data);;
		}

		DTrace.Erroer=null;
		return DTrace;
	})()


	/**文件管理类
	*@author yung
	*/
	//class nodetools.devices.FileManager
	var FileManager=(function(){
		function FileManager(){};
		__class(FileManager,'nodetools.devices.FileManager');
		FileManager.getPath=function(basePath,relativePath){
			return FileManager.adptToCommonUrl(FileTools.getPath(basePath,relativePath));
		}

		FileManager.getRelativePath=function(basePath,targetPath){
			return FileManager.adptToCommonUrl(FileTools.getRelativePath(basePath,targetPath));
		}

		FileManager.getAppPath=function(path){
			return FileManager.getPath(SystemSetting.appPath,path);
		}

		FileManager.getDataPath=function(path){
			return FileManager.getPath(Device.dataPath,path);
		}

		FileManager.getAppRelativePath=function(path){
			return FileManager.getRelativePath(SystemSetting.appPath,path);
		}

		FileManager.getWorkPath=function(path){
			return FileManager.getPath(SystemSetting.workPath,path);
		}

		FileManager.getWorkRelativePath=function(path){
			return FileManager.adptToCommonUrl(FileManager.getRelativePath(SystemSetting.workPath,path));
		}

		FileManager.getResRelativePath=function(path){
			return FileManager.adptToCommonUrl(""+FileManager.getRelativePath(SystemSetting.assetsPath,path));
		}

		FileManager.adptToCommonUrl=function(url){
			return StringTool.getReplace(url,"\\\\","/");
		}

		FileManager.adptToLocalUrl=function(url){
			return FileTools.path.normalize(url);
		}

		FileManager.getResPath=function(path){
			return FileManager.getPath(SystemSetting.assetsPath,path);
		}

		FileManager.getPagePath=function(path){
			return FileManager.getPath(SystemSetting.pagesPath,path);
		}

		FileManager.getFileName=function(path){
			return FileTools.path.basename(path).split(".")[0];
		}

		FileManager.createDirectory=function(path){
			try {
				FileTools.createDirectory(path);
				}catch (e){
				Sys.alert("Create folder failed:"+path);
			}
		}

		FileManager.createTxtFile=function(path,value){
			try {
				FileTools.createFile(path,value);
				}catch (e){
				Sys.alert("Create file failed:"+path);
			}
		}

		FileManager.createJSONFile=function(path,value){
			try {
				FileTools.createFile(path,JSON.stringify(value));
				}catch (e){
				Sys.alert("Create file failed:"+path);
			}
		}

		FileManager.createBytesFile=function(path,bytes){
			try {
				FileTools.createFile(path,bytes);
				}catch (e){
				Sys.alert("Create file failed:"+path);
			}
		}

		FileManager.removeFile=function(path){
			FileTools.removeE(path);
		}

		FileManager.copyFile=function(from,to){
			try {
				FileTools.copyE(from,to);
				}catch (e){
				Sys.alert("Copy file failed:(from:"+from+" to:"+to+")");
				console.log("Copy file failed:(from:"+from+" to:"+to+")");
			}
		}

		FileManager.readTxtFile=function(path,errorAlert){
			(errorAlert===void 0)&& (errorAlert=true);
			try {
				return FileTools.readFile(path);
				}catch (e){
				if (errorAlert)Sys.alert("Read file failed:"+path);
			}
			return null;
		}

		FileManager.readJSONFile=function(path,errorAlert){
			(errorAlert===void 0)&& (errorAlert=true);
			try {
				var str=nodetools.devices.FileManager.readTxtFile(path);
				return JSON.parse(str);
				}catch (e){
				if (errorAlert)Sys.alert("Read file failed:"+path);
				debugger;
			}
			return null;
		}

		FileManager.readByteFile=function(path,errorAlert){
			(errorAlert===void 0)&& (errorAlert=true);
			try {
				return FileTools.readFile(path);
				}catch (e){
				if (errorAlert)Sys.alert("Read file failed:"+path);
			}
			return null;
		}

		FileManager.getFileList=function(path){
			return FileTools.getFileList(path);
		}

		FileManager.exists=function(path){
			return FileTools.exist(path);
		}

		FileManager.getFileTree=function(path,hasExtension){
			(hasExtension===void 0)&& (hasExtension=false);
			var xml=findFiles(path);
			function findFiles (path){
				var node;
				if (FileTools.exist(path)){
					var fileName=FileTools.getFileName(path);
					node=new /*no*/this.XMLElement("<item label='"+fileName+"' path='"+path+"' isDirectory='true'/>");
					var a=FileTools.getDirFiles(path);
					var f;
					for(var $each_f in a){
						f=a[$each_f];
						f=FileTools.getPath(path,f);
						if (FileTools.isDirectory(f)&& f.indexOf(".svn")==-1){
							node.appendChild(findFiles(f));
						}
					}
					var $each_f;
					for($each_f in a){
						f=a[$each_f];
						f=FileTools.getPath(path,f);
						if (FileTools.isDirectory(f)==false){
							if (fileName.indexOf("$")==-1 && fileName.indexOf("@")==-1){
								node.appendChild(new /*no*/this.XMLElement("<item label='"+fileName+"' path='"+f+"' isDirectory='false'/>"));
							}
						}
					}
				}
				return node;
			}
			return xml
		}

		FileManager.rename=function(oldPath,newPath){
			try {
				FileTools.rename(oldPath,newPath);
				}catch (e){
				Sys.alert("Rename file failed:(from:"+oldPath+" to:"+newPath+")");
			}
		}

		return FileManager;
	})()


	/**
	*...
	*@author ww
	*/
	//class nodetools.devices.FileTools
	var FileTools=(function(){
		function FileTools(){}
		__class(FileTools,'nodetools.devices.FileTools');
		__getset(1,FileTools,'appPath',function(){
			var rst;
			var dirName;
			dirName=__dirname;;
			rst=FileTools.path.resolve(dirName,"../");
			return rst;
		});

		__getset(1,FileTools,'workPath',function(){
			return "workPath";
		});

		FileTools.init=function(){
			FileTools.fs=Device.require("fs");
			FileTools.path=Device.require("path");
			FileTools.shell=Device.requireRemote("shell");
			FileTools.tempApp=Device.remote.app.getDataPath();
		}

		FileTools.init2=function(){
			FileTools.fs=Device.require("fs");
			FileTools.path=Device.require("path");
		}

		FileTools.getSep=function(){
			return FileTools.path.sep;
		}

		FileTools.getAbsPath=function(path){
			return path;
		}

		FileTools.isAbsPath=function(path){
			if(!path)return false;
			if(path.indexOf(":")>0)return true;
			if(path.substr(0,1)=="/")return true;
			return false;
		}

		FileTools.getPath=function(basePath,relativePath){
			return FileTools.path.join(basePath,relativePath);
		}

		FileTools.getRelativePath=function(basePath,targetPath){
			return FileTools.path.relative(basePath,targetPath);
		}

		FileTools.getAppPath=function(path){
			return FileTools.getPath(FileTools.appPath,path);
		}

		FileTools.getAppRelativePath=function(path){
			return FileTools.getRelativePath(FileTools.appPath,path);
		}

		FileTools.getWorkPath=function(path){
			return FileTools.getPath(FileTools.workPath,path);
		}

		FileTools.getWorkRelativePath=function(path){
			return FileTools.getRelativePath(FileTools.workPath,path);
		}

		FileTools.getFileDir=function(path){
			if (!path)return path;
			if(nodetools.devices.FileTools.isDirectory(path))return path;
			return nodetools.devices.FileTools.path.dirname(path);
		}

		FileTools.getParent=function(path){
			if (!path)return path;
			var lasti=0;
			lasti=path.lastIndexOf(FileTools.getFileSep(path));
			return path.substring(0,lasti);
		}

		FileTools.getFileName=function(path){
			return nodetools.devices.FileTools.path.basename(path).split(".")[0];
		}

		FileTools.getFileNameWithExtension=function(path){
			if (path==null)
				return null;
			var a=path.split(nodetools.devices.FileTools.path.sep);
			var file=a[a.length-1];
			return file;
		}

		FileTools.getExtensionName=function(path){
			if (path==null)
				return null;
			var a=path.split(".");
			var file=a[a.length-1];
			return file;
		}

		FileTools.createDirectory=function(path){
			if (Boolean(path)){
				FileTools.ensurePath(path);
				if (!FileTools.fs.existsSync(path)){
					FileTools.fs.mkdirSync(path);
				}
			}
		}

		FileTools.ensurePath=function(pathStr){
			FileTools.mkdirsSync(pathStr,null);
			return;
			if (pathStr==null)return;
			var sep;
			sep=FileTools.path.sep;
			var a=pathStr.split(sep);
			var i=0,len=0;
			var tPath;
			tPath=a[0];
			len=a.length-1;
			for (i=1;i < len;i++){
				tPath+=sep+a[i];
				if (!FileTools.exist(tPath)){
					FileTools.createDirectory(tPath);
				}
			}
		}

		FileTools.getFileSep=function(filePath){
			if (filePath.indexOf("/")>=0)return "/";
			if (filePath.indexOf("\\")>=0)return "\\";
			return FileTools.path.sep;
		}

		FileTools.mkdirsSync=function(dirpath,mode){
			if (!FileTools.fs.existsSync(dirpath)){
				var pathtmp;
				var pathParts=dirpath.split(FileTools.getFileSep(dirpath));
				pathParts.pop();
				var onWindows=OSInfo.type.indexOf("Windows")>-1;
				if(!onWindows){
					pathtmp="/"+pathParts[1];
					pathParts.splice(0,2);
				}
				pathParts.forEach(function(dirname){
					if (pathtmp){
						pathtmp=FileTools.path.join(pathtmp,dirname);
					}
					else {
						pathtmp=dirname;
					}
					if (!FileTools.fs.existsSync(pathtmp)){
						if (!FileTools.fs.mkdirSync(pathtmp,mode)){
							return false;
						}
					}
				});
			}
			return true;
		}

		FileTools.createFile=function(path,value){
			FileTools.ensurePath(path);
			FileTools.fs.writeFileSync(path,value);
		}

		FileTools.toBuffer=function(ab){
			var buffer=new Device.Buffer(ab.byteLength);
			var view=new Uint8Array(ab);
			for (var i=0;i < buffer.length;++i){
				buffer[i]=view[i];
			}
			return buffer;
		}

		FileTools.readFile=function(path,encoding){
			(encoding===void 0)&& (encoding="utf8");
			if (FileTools.fs.existsSync(path)){
				var rst;
				rst=FileTools.fs.readFileSync(path,encoding);
				if(((typeof rst=='string'))&&rst.charCodeAt(0)==65279&&encoding=="utf8"){
					rst=rst.substr(1);
				}
				return rst;
			}
			return null;
		}

		FileTools.appendFile=function(path,data){
			FileTools.fs.appendFileSync(path,data);
		}

		FileTools.moveToTrash=function(path){
			if (FileTools.exist(path)){
				if (FileTools.shell){
					FileTools.shell.moveItemToTrash(path);
					}else{
					FileTools.removeE(path,false);
				}
			}
		}

		FileTools.removeFile=function(path,toTrash){
			(toTrash===void 0)&& (toTrash=true);
			if (toTrash){
				FileTools.moveToTrash(path);
				return;
			}
			if (Boolean(path)){
				FileTools.fs.unlinkSync(path)
			}
		}

		FileTools.removeE=function(path,toTrash){
			(toTrash===void 0)&& (toTrash=true);
			if (!FileTools.exist(path))
				return;
			if (FileTools.isDirectory(path)){
				FileTools.removeDir(path,toTrash);
			}
			else{
				FileTools.removeFile(path,toTrash);
			}
		}

		FileTools.removeDir=function(path,toTrash){
			(toTrash===void 0)&& (toTrash=true);
			if (toTrash){
				FileTools.moveToTrash(path);
				return;
			};
			var files=[];
			if (FileTools.fs.existsSync(path)){
				files=FileTools.fs.readdirSync(path);
				files.forEach(function(file,index){
					var curPath=FileTools.getPath(path,file);
					if (FileTools.fs.statSync(curPath).isDirectory()){
						FileTools.removeDir(curPath);
					}
					else{
						FileTools.fs.unlinkSync(curPath);
					}
				});
				FileTools.fs.rmdirSync(path);
			}
		}

		FileTools.exist=function(path){
			if(!path)return false;
			return FileTools.fs.existsSync(path);
		}

		FileTools.isDirectory=function(path){
			var st;
			try{
				st=FileTools.fs.statSync(path);
				}catch(e){
				return false;
			}
			if(!st)return false;
			return st.isDirectory();
		}

		FileTools.getStat=function(path){
			return FileTools.fs.statSync(path);
		}

		FileTools.getMTime=function(path){
			return FileTools.getStat(path).mtime;
		}

		FileTools.watch=function(path,callBack){
			FileTools.watcherDic[path]=FileTools.fs.watch(path,callBack);
			return FileTools.watcherDic[path];
		}

		FileTools.isDirWatched=function(path){
			return FileTools.watcherDic.hasOwnProperty(path);
		}

		FileTools.unwatch=function(path){
			if (FileTools.watcherDic[path]){
				FileTools.watcherDic[path].close();
				delete FileTools.watcherDic[path];
			}
		}

		FileTools.copyE=function(from,to){
			if (!FileTools.exist(from))
				return;
			if (FileTools.isDirectory(from)){
				FileTools.copyDir(from,to);
			}
			else{
				FileTools.copyFile(from,to);
			}
		}

		FileTools.copyFile=function(from,to){
			FileTools.createFile(to,FileTools.readFile(from,null));
		}

		FileTools.copyDir=function(from,to){
			var files=[];
			if (FileTools.fs.existsSync(from)){
				FileTools.createDirectory(to);
				files=FileTools.fs.readdirSync(from);
				files.forEach(function(file,index){
					var curPath=FileTools.getPath(from,file);
					var tPath=FileTools.getPath(to,file);
					if (FileTools.fs.statSync(curPath).isDirectory()){
						FileTools.copyDir(curPath,tPath);
					}
					else{
						FileTools.copyFile(curPath,tPath);
					}
				});
			}
		}

		FileTools.walk=function(path,floor,handleFile,self){
			(self===void 0)&& (self=false);
			if(self)
				handleFile(path,floor);
			floor++;
			var files=FileTools.fs.readdirSync(path);
			files.forEach(function(item){
				var tmpPath=FileTools.getPath(path,item);
				if (tmpPath.indexOf(".svn")>-1)
					return;
				var stats=FileTools.fs.statSync(tmpPath);
				if (stats.isDirectory()){
					FileTools.walk(tmpPath,floor,handleFile);
				}
				else{
					handleFile(tmpPath,floor);
				}
			});
		}

		FileTools.getFileList=function(path){
			var arr=[];
			if(!nodetools.devices.FileTools.exist(path))return arr;
			FileTools.walk(path,0,findFiles);
			function findFiles (spath,floor){
				arr.push(spath);
			}
			return arr;
		}

		FileTools.getFileDesO=function(path){
			if (!FileTools.exist(path))
				return null;
			var rst={};
			rst.label=FileTools.getFileName(path);
			rst.path=path;
			if (FileTools.isDirectory(path)){
				rst.files=[];
				rst.dirs=[];
				rst.childs=[];
				rst.isDirectory=true;
				}else{
				rst.isDirectory=false;
			}
			return rst;
		}

		FileTools.getDirChildDirs=function(p){
			var files=nodetools.devices.FileTools.getDirFiles(p);
			var i=0,len=0;
			var rst;
			rst=[];
			len=files.length;
			for(i=0;i<len;i++){
				files[i]=FileTools.path.join(p,files[i]);
				if(nodetools.devices.FileTools.isDirectory(files[i])){
					rst.push(files[i]);
				}
			}
			return rst;
		}

		FileTools.getDirFiles=function(path){
			var rst;
			rst=FileTools.fs.readdirSync(path);
			rst.sort(FileTools.folderFirst);
			return rst;
		}

		FileTools.folderFirst=function(pathA,pathB){
			var isFolderA=false;
			isFolderA=pathA.indexOf(".")<0;
			var isFolderB=false;
			isFolderB=pathB.indexOf(".")<0;
			var right=-1;
			if(isFolderA){
				if(!isFolderB){
					return right;
				}
				return pathA<pathB?right:-right;
			}
			if(isFolderB){
				return-right;
			}
			return pathA<pathB?right:-right;
		}

		FileTools.getFileTreeArr=function(path){
			var tTreeO=FileTools.getFileTreeO(path);
			var rst=[];
			FileTools.getTreeArr(tTreeO,rst,false);
			return rst;
		}

		FileTools.getTreeArr=function(treeO,arr,add){
			(add===void 0)&& (add=true);
			if(add)
				arr.push(treeO);
			var tArr=treeO.childs;
			var i=0,len=tArr.length;
			for(i=0;i<len;i++){
				if(!add){
					tArr[i].nodeParent=null;
				}
				if(tArr[i].isDirectory){
					FileTools.getTreeArr(tArr[i],arr);
					}else{
					arr.push(tArr[i]);
				}
			}
		}

		FileTools.getFileTreeO=function(path){
			var rst=FileTools.getFileDesO(path);
			if (FileTools.fs.existsSync(path)){
				var files=FileTools.getDirFiles(path);
				var tO;
				files.forEach(function(file,index){
					var curPath=FileTools.getPath(path,file);
					if (FileTools.fs.statSync(curPath).isDirectory()){
						tO=FileTools.getFileTreeO(curPath);
						tO.nodeParent=rst;
						tO.hasChild=tO.childs.length > 0;
						rst.dirs.push(tO);
					}
					else{
						tO=FileTools.getFileDesO(curPath);
						tO.nodeParent=rst;
						tO.hasChild=false;
						rst.files.push(tO);
					}
					tO.label=file;
					rst.childs.push(tO);
				});
				rst.hasChild=rst.childs.length > 0;
			}
			return rst;
		}

		FileTools.isPathSame=function(a,b){
			if(a.toLocaleLowerCase()==b.toLocaleLowerCase())return true;
			return false;
		}

		FileTools.rename=function(oldPath,newPath){
			if (!FileTools.exist(oldPath))
				return;
			if(FileTools.isPathSame(oldPath,newPath)){
				console.log("在移动文件到同一个位置！！");
				return;
			}
			FileTools.copyE(oldPath,newPath);
			FileTools.moveToTrash(oldPath);
			return;
			FileTools.fs.renameSync(oldPath,newPath);
		}

		FileTools.openItem=function(path){
			FileTools.shell.openItem(path);
		}

		FileTools.showItemInFolder=function(path){
			FileTools.shell.showItemInFolder(path);
		}

		FileTools.getFolder=function(path){
			path=FileManager.adptToCommonUrl(path);
			var idx=0;
			idx=path.lastIndexOf(".");
			if(idx>=0){
				idx=path.lastIndexOf("/",idx);
				if(idx>=0){
					path=path.substr(0,idx);
				}
			}
			return path;
		}

		FileTools.win=null
		FileTools.fs=null
		FileTools.path=null
		FileTools.shell=null
		FileTools.tempApp=null
		FileTools.watcherDic={};
		return FileTools;
	})()


	/**
	*...
	*@author ww
	*/
	//class nodetools.devices.OSInfo
	var OSInfo=(function(){
		function OSInfo(){}
		__class(OSInfo,'nodetools.devices.OSInfo');
		OSInfo.init=function(){
			OSInfo.os=Device.require("os");
			OSInfo.platform=OSInfo.os.platform();
			OSInfo.tempdir=OSInfo.os.tmpdir();
			OSInfo.type=OSInfo.os.type();
			var tProcess;
			tProcess=process;;
			OSInfo.process=tProcess;
			OSInfo.env=OSInfo.process.env;
			console.log("type:",OSInfo.type);
		}

		OSInfo.os=null
		OSInfo.platform=null
		OSInfo.homedir=null
		OSInfo.tempdir=null
		OSInfo.type=null
		OSInfo.process=null
		OSInfo.env=null
		return OSInfo;
	})()


	/**
	*编辑器全局静态入口
	*@author ww
	*/
	//class nodetools.devices.Sys
	var Sys=(function(){
		function Sys(){};
		__class(Sys,'nodetools.devices.Sys');
		Sys.mParseFloat=function(v){
			v=parseFloat(v);
			if (isNaN(v))return 0;
			return v;
		}

		Sys.log=function(__args){
			var args=arguments;
			Sys.print("log",args,"#0080C0");
		}

		Sys.error=function(__args){
			var args=arguments;
			Sys.print("error",args,"#FF0000");
		}

		Sys.warn=function(__args){
			var args=arguments;
			Sys.print("warn",args,"#9B9B00");
		}

		Sys.plugin=function(__args){
			var args=arguments;
			Sys.print("plugin",args,"#007300");
		}

		Sys.print=function(type,args,color){
			var msg="";
			for (var i=0;i < args.length;i++){
				msg+=args[i]+" ";
			}
			console.log("%c ["+type+"]"+msg,"color: "+color+"");
		}

		Sys.alert=function(msg){
			console.log(msg);
		}

		Sys.lang=function(body,__args){
			var args=[];for(var i=1,sz=arguments.length;i<sz;i++)args.push(arguments[i]);
			var i=0,len=0;
			len=args.length;
			for (i=0;i < len;i++){
				body=body.replace("{"+i+"}",args[i]);
			}
			return body;
		}

		return Sys;
	})()


	/**系统配置
	*@author ww
	*/
	//class nodetools.devices.SystemSetting
	var SystemSetting=(function(){
		function SystemSetting(){};
		__class(SystemSetting,'nodetools.devices.SystemSetting');
		SystemSetting.setProject=function(path){
			if (FileTools.exist(path)){
				SystemSetting.projectPath=path;
				SystemSetting.projectName=FileTools.getFileName(path).replace(".laya","");
				SystemSetting.workPath=FileTools.path.dirname(path);
				SystemSetting.workPath=FileTools.path.dirname(SystemSetting.workPath);
				SystemSetting.pagesPath=FileManager.getWorkPath("laya/pages");
				SystemSetting.assetsPath=FileManager.getWorkPath("laya/assets");
				SystemSetting.stylePath=FileManager.getWorkPath("laya/styles.xml");
				SystemSetting.pageStylePath=FileManager.getWorkPath("laya/pageStyles.xml");
				SystemSetting.tempPath=FileManager.getPath(FileTools.tempApp,"data/"+SystemSetting.projectName)
				FileManager.createDirectory(SystemSetting.pagesPath);
				FileManager.createDirectory(SystemSetting.assetsPath);
				FileManager.createDirectory(SystemSetting.tempPath);
			}
		}

		SystemSetting.workPath="";
		SystemSetting.appPath="";
		SystemSetting.projectName="";
		SystemSetting.projectPath="";
		SystemSetting.pagesPath="";
		SystemSetting.assetsPath="";
		SystemSetting.stylePath="";
		SystemSetting.pageStylePath="";
		SystemSetting.tempResPath="";
		SystemSetting.tempVerPath="";
		SystemSetting.tempPath="";
		SystemSetting.lang="";
		SystemSetting.ifShowRuleGrid=true;
		SystemSetting.toCodeModeWhenPublicEnd=false;
		SystemSetting.isCMDVer=false;
		return SystemSetting;
	})()


	/**
	*...
	*@author ww
	*/
	//class psd.PSDTool
	var PSDTool=(function(){
		function PSDTool(){}
		__class(PSDTool,'psd.PSDTool');
		PSDTool.init=function(){
			PSDTool.PSD=NodeJSTools.require("psd");
		}

		PSDTool.open=function(file){
			return PSDTool.PSD.open(file);
		}

		PSDTool.fromFile=function(file){
			try {
				var tPSD=PSDTool.PSD.fromFile(file);
				tPSD.parse();
				return tPSD.tree();
			}
			catch (e){
				console.log("parse err:",e.message);
			}
			return null;
		}

		PSDTool.PSD=null
		return PSDTool;
	})()


	/**
	*一些字符串操作函数
	*@author ww
	*
	*/
	//class laya.debug.tools.StringTool
	var StringTool=(function(){
		function StringTool(){}
		__class(StringTool,'laya.debug.tools.StringTool');
		StringTool.toUpCase=function(str){
			return str.toUpperCase();
		}

		StringTool.toLowCase=function(str){
			return str.toLowerCase();
		}

		StringTool.toUpHead=function(str){
			var rst;
			if(str.length<=1)return str.toUpperCase();
			rst=str.charAt(0).toUpperCase()+str.substr(1);
			return rst;
		}

		StringTool.toLowHead=function(str){
			var rst;
			if(str.length<=1)return str.toLowerCase();
			rst=str.charAt(0).toLowerCase()+str.substr(1);
			return rst;
		}

		StringTool.packageToFolderPath=function(packageName){
			var rst;
			rst=packageName.replace(".","/");
			return rst;
		}

		StringTool.insert=function(str,iStr,index){
			return str.substring(0,index)+iStr+str.substr(index);
		}

		StringTool.insertAfter=function(str,iStr,tarStr,isLast){
			(isLast===void 0)&& (isLast=false);
			var i=0;
			if(isLast){
				i=str.lastIndexOf(tarStr);
				}else{
				i=str.indexOf(tarStr);
			}
			if(i>=0){
				return StringTool.insert(str,iStr,i+tarStr.length);
			}
			return str;
		}

		StringTool.insertBefore=function(str,iStr,tarStr,isLast){
			(isLast===void 0)&& (isLast=false);
			var i=0;
			if(isLast){
				i=str.lastIndexOf(tarStr);
				}else{
				i=str.indexOf(tarStr);
			}
			if(i>=0){
				return StringTool.insert(str,iStr,i);
			}
			return str;
		}

		StringTool.insertParamToFun=function(funStr,params){
			var oldParam;
			oldParam=StringTool.getParamArr(funStr);
			var inserStr;
			inserStr=params.join(",");
			if(oldParam.length>0){
				inserStr=","+inserStr;
			}
			return StringTool.insertBefore(funStr,inserStr,")",true);
		}

		StringTool.trim=function(str,vList){
			if(!vList){
				vList=[" ","\r","\n","\t",String.fromCharCode(65279)];
			};
			var rst;
			var i=0;
			var len=0;
			rst=str;
			len=vList.length;
			for(i=0;i<len;i++){
				rst=StringTool.getReplace(rst,vList[i],"");
			}
			return rst;
		}

		StringTool.isEmpty=function(str){
			if(str.length<1)return true;
			return StringTool.emptyStrDic.hasOwnProperty(str);
		}

		StringTool.trimLeft=function(str){
			var i=0;
			i=0;
			var len=0;
			len=str.length;
			while(StringTool.isEmpty(str.charAt(i))&&i<len){
				i++;
			}
			if(i<len){
				return str.substr(i);
			}
			return "";
		}

		StringTool.trimRight=function(str){
			var i=0;
			i=str.length-1;
			while(StringTool.isEmpty(str.charAt(i))&&i>=0){
				i--;
			};
			var rst;
			rst=str.substring(0,i)
			if(i>=0){
				return str.substring(0,i+1);
			}
			return "";
		}

		StringTool.trimSide=function(str){
			var rst;
			rst=StringTool.trimLeft(str);
			rst=StringTool.trimRight(rst);
			return rst;
		}

		StringTool.isOkFileName=function(fileName){
			if(laya.debug.tools.StringTool.trimSide(fileName)=="")return false;
			var i=0,len=0;
			len=fileName.length;
			for(i=0;i<len;i++){
				if(StringTool.specialChars[fileName.charAt(i)])return false;
			}
			return true;
		}

		StringTool.trimButEmpty=function(str){
			return StringTool.trim(str,["\r","\n","\t"]);
		}

		StringTool.removeEmptyStr=function(strArr){
			var i=0;
			i=strArr.length-1;
			var str;
			for(i=i;i>=0;i--){
				str=strArr[i];
				str=laya.debug.tools.StringTool.trimSide(str);
				if(StringTool.isEmpty(str)){
					strArr.splice(i,1);
					}else{
					strArr[i]=str;
				}
			}
			return strArr;
		}

		StringTool.ifNoAddToTail=function(str,sign){
			if(str.indexOf(sign)>=0){
				return str;
			}
			return str+sign;
		}

		StringTool.trimEmptyLine=function(str){
			var i=0;
			var len=0;
			var tLines;
			var tLine;
			tLines=str.split("\n");
			for(i=tLines.length-1;i>=0;i--){
				tLine=tLines[i];
				if(StringTool.isEmptyLine(tLine)){
					tLines.splice(i,1);
				}
			}
			return tLines.join("\n");
		}

		StringTool.isEmptyLine=function(str){
			str=laya.debug.tools.StringTool.trim(str);
			if(str=="")return true;
			return false;
		}

		StringTool.removeCommentLine=function(lines){
			var rst;
			rst=[];
			var i=0;
			var tLine;
			var adptLine;
			i=0;
			var len=0;
			var index=0;
			len=lines.length;
			while(i<len){
				adptLine=tLine=lines[i];
				index=tLine.indexOf("/**");
				if(index>=0){
					adptLine=tLine.substring(0,index-1);
					StringTool.addIfNotEmpty(rst,adptLine);
					while(i<len){
						tLine=lines[i];
						index=tLine.indexOf("*/");
						if(index>=0){
							adptLine=tLine.substring(index+2);
							StringTool.addIfNotEmpty(rst,adptLine);
							break ;
						}
						i++;
					}
					}else if(tLine.indexOf("//")>=0){
					if(laya.debug.tools.StringTool.trim(tLine).indexOf("//")==0){
						}else{
						StringTool.addIfNotEmpty(rst,adptLine);
					}
					}else{
					StringTool.addIfNotEmpty(rst,adptLine);
				}
				i++;
			}
			return rst;
		}

		StringTool.addIfNotEmpty=function(arr,str){
			if(!str)return;
			var tStr;
			tStr=StringTool.trim(str);
			if(tStr!=""){
				arr.push(str);
			}
		}

		StringTool.trimExt=function(str,vars){
			var rst;
			rst=StringTool.trim(str);
			var i=0;
			var len=0;
			len=vars.length;
			for(i=0;i<len;i++){
				rst=StringTool.getReplace(rst,vars[i],"");
			}
			return rst;
		}

		StringTool.getBetween=function(str,left,right,ifMax){
			(ifMax===void 0)&& (ifMax=false);
			if(!str)return "";
			if(!left)return "";
			if(!right)return "";
			var lId=0;
			var rId=0;
			lId=str.indexOf(left);
			if(lId<0)return"";
			if(ifMax){
				rId=str.lastIndexOf(right);
				if(rId<lId)return "";
				}else{
				rId=str.indexOf(right,lId+1);
			}
			if(rId<0)return "";
			return str.substring(lId+left.length,rId);
		}

		StringTool.getSplitLine=function(line,split){
			(split===void 0)&& (split=" ");
			return line.split(split);
		}

		StringTool.getLeft=function(str,sign){
			var i=0;
			i=str.indexOf(sign);
			return str.substr(0,i);
		}

		StringTool.getRight=function(str,sign){
			var i=0;
			i=str.indexOf(sign);
			return str.substr(i+1);
		}

		StringTool.delelteItem=function(arr){
			while (arr.length>0){
				if(arr[0]==""){
					arr.shift();
					}else{
					break ;
				}
			}
		}

		StringTool.getWords=function(line){
			var rst=StringTool.getSplitLine(line);
			StringTool.delelteItem(rst);
			return rst;
		}

		StringTool.getLinesI=function(startLine,endLine,lines){
			var i=0;
			var rst=[];
			for(i=startLine;i<=endLine;i++){
				rst.push(lines[i]);
			}
			return rst;
		}

		StringTool.structfy=function(str,inWidth,removeEmpty){
			(inWidth===void 0)&& (inWidth=4);
			(removeEmpty===void 0)&& (removeEmpty=true);
			if(removeEmpty){
				str=laya.debug.tools.StringTool.trimEmptyLine(str);
			};
			var lines;
			var tIn=0;
			tIn=0;
			var tInStr;
			tInStr=StringTool.getEmptyStr(0);
			lines=str.split("\n");
			var i=0;
			var len=0;
			var tLineStr;
			len=lines.length;
			for(i=0;i<len;i++){
				tLineStr=lines[i];
				tLineStr=laya.debug.tools.StringTool.trimLeft(tLineStr);
				tLineStr=laya.debug.tools.StringTool.trimRight(tLineStr);
				tIn+=StringTool.getPariCount(tLineStr);
				if(tLineStr.indexOf("}")>=0){
					tInStr=StringTool.getEmptyStr(tIn*inWidth);
				}
				tLineStr=tInStr+tLineStr;
				lines[i]=tLineStr;
				tInStr=StringTool.getEmptyStr(tIn*inWidth);
			}
			return lines.join("\n");
		}

		StringTool.getEmptyStr=function(width){
			if(!StringTool.emptyDic.hasOwnProperty(width)){
				var i=0;
				var len=0;
				len=width;
				var rst;
				rst="";
				for(i=0;i<len;i++){
					rst+=" ";
				}
				StringTool.emptyDic[width]=rst;
			}
			return StringTool.emptyDic[width];
		}

		StringTool.getPariCount=function(str,inChar,outChar){
			(inChar===void 0)&& (inChar="{");
			(outChar===void 0)&& (outChar="}");
			var varDic;
			varDic={};
			varDic[inChar]=1;
			varDic[outChar]=-1;
			var i=0;
			var len=0;
			var tChar;
			len=str.length;
			var rst=0;
			rst=0;
			for(i=0;i<len;i++){
				tChar=str.charAt(i);
				if(varDic.hasOwnProperty(tChar)){
					rst+=varDic[tChar];
				}
			}
			return rst;
		}

		StringTool.readInt=function(str,startI){
			(startI===void 0)&& (startI=0);
			var rst=NaN;
			rst=0;
			var tNum=0;
			var tC;
			var i=0;
			var isBegin=false;
			isBegin=false;
			var len=0;
			len=str.length;
			for(i=startI;i<len;i++){
				tC=str.charAt(i);
				if(Number(tC)>0||tC=="0"){
					rst=10*rst+Number(tC);
					if(rst>0)isBegin=true;
					}else{
					if(isBegin)return rst;
				}
			}
			return rst;
		}

		StringTool.getReplace=function(str,oStr,nStr){
			if(!str)return "";
			var rst;
			rst=str.replace(new RegExp(oStr,"g"),nStr);
			return rst;
		}

		StringTool.getWordCount=function(str,findWord){
			var rg=new RegExp(findWord,"g")
			return str.match(rg).length;
		}

		StringTool.getResolvePath=function(path,basePath){
			if(StringTool.isAbsPath(path)){
				return path;
			};
			var tSign;
			tSign="\\";
			if(basePath.indexOf("/")>=0){
				tSign="/";
			}
			if(basePath.charAt(basePath.length-1)==tSign){
				basePath=basePath.substr(0,basePath.length-1);
			};
			var parentSign;
			parentSign=".."+tSign;
			var tISign;
			tISign="."+tSign;
			var pCount=0;
			pCount=StringTool.getWordCount(path,parentSign);
			path=laya.debug.tools.StringTool.getReplace(path,parentSign,"");
			path=laya.debug.tools.StringTool.getReplace(path,tISign,"");
			var i=0;
			var len=0;
			len=pCount;
			var iPos=0;
			for(i=0;i<len;i++){
				basePath=StringTool.removeLastSign(path,tSign);
			}
			return basePath+tSign+path;
		}

		StringTool.isAbsPath=function(path){
			if(path.indexOf(":")>=0)return true;
			return false;
		}

		StringTool.removeLastSign=function(str,sign){
			var iPos=0;
			iPos=str.lastIndexOf(sign);
			str=str.substring(0,iPos);
			return str;
		}

		StringTool.getParamArr=function(str){
			var paramStr;
			paramStr=laya.debug.tools.StringTool.getBetween(str,"(",")",true);
			if(StringTool.trim(paramStr).length<1)return [];
			return paramStr.split(",");
		}

		StringTool.copyStr=function(str){
			return str.substring();
		}

		StringTool.ArrayToString=function(arr){
			var rst;
			rst="[{items}]".replace(new RegExp("\\{items\\}","g"),StringTool.getArrayItems(arr));
			return rst;
		}

		StringTool.getArrayItems=function(arr){
			var rst;
			if(arr.length<1)return "";
			rst=StringTool.parseItem(arr[0]);
			var i=0;
			var len=0;
			len=arr.length;
			for(i=1;i<len;i++){
				rst+=","+StringTool.parseItem(arr[i]);
			}
			return rst;
		}

		StringTool.parseItem=function(item){
			var rst;
			rst="\""+item+"\"";
			return "";
		}

		StringTool.initAlphaSign=function(){
			if (StringTool.alphaSigns)return;
			StringTool.alphaSigns={};
			StringTool.addSign("a","z",StringTool.alphaSigns);
			StringTool.addSign("A","Z",StringTool.alphaSigns);
			StringTool.addSign("0","9",StringTool.alphaSigns);
		}

		StringTool.addSign=function(ss,e,tar){
			var i=0;
			var len=0;
			var s=0;
			s=ss.charCodeAt(0);
			len=e.charCodeAt(0);
			for(i=s;i<=len;i++){
				tar[String.fromCharCode(i)]=true;
				console.log("add :"+String.fromCharCode(i));
			}
		}

		StringTool.isPureAlphaNum=function(str){
			StringTool.initAlphaSign();
			if (!str)return true;
			var i=0,len=0;
			len=str.length;
			for (i=0;i < len;i++){
				if (!StringTool.alphaSigns[str.charAt(i)])return false;
			}
			return true;
		}

		StringTool.emptyDic={};
		StringTool.alphaSigns=null;
		__static(StringTool,
		['emptyStrDic',function(){return this.emptyStrDic={
				" ":true,
				"\r":true,
				"\n":true,
				"\t":true
		};},'specialChars',function(){return this.specialChars={"*":true,"&":true,"%":true,"#":true,"?":true};}

		]);
		return StringTool;
	})()



	new LayaAirPSDTool();

})(window,document,Laya);


/*
1 file:///E:/wangwei/codes/LayaAir/trank/Editor/LayaAirPSDTool/src/nodetools/devices/FileManager.as (225):warning:XMLElement This variable is not defined.
2 file:///E:/wangwei/codes/LayaAir/trank/Editor/LayaAirPSDTool/src/nodetools/devices/FileManager.as (237):warning:XMLElement This variable is not defined.
*/