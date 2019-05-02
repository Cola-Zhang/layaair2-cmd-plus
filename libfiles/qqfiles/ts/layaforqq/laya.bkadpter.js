
(function(window,document,Laya){
	var __un=Laya.un,__uns=Laya.uns,__static=Laya.static,__class=Laya.class,__getset=Laya.getset,__newvec=Laya.__newvec;

	var Bitmap=laya.resource.Bitmap,Browser=laya.utils.Browser,Canvas=BK.Canvas,CharBook=laya.webgl.resource.CharBook;
	var ColorUtils=laya.utils.ColorUtils,Context=laya.resource.Context,Event=laya.events.Event,EventDispatcher=laya.events.EventDispatcher;
	var HTMLCanvas=laya.resource.HTMLCanvas,HTMLImage=laya.resource.HTMLImage,Handler=laya.utils.Handler,HitArea=laya.utils.HitArea;
	var Input=laya.display.Input,LocalStorage=laya.net.LocalStorage,Matrix=laya.maths.Matrix,MouseManager=laya.events.MouseManager;
	var Point=laya.maths.Point,Rectangle=laya.maths.Rectangle,Render=laya.renders.Render,RenderSprite=laya.renders.RenderSprite;
	var RenderState2D=laya.webgl.utils.RenderState2D,RunDriver=laya.utils.RunDriver,Socket=laya.net.Socket,SoundChannel=laya.media.SoundChannel;
	var SoundManager=laya.media.SoundManager,Sprite=laya.display.Sprite,Stage=laya.display.Stage,Stat=laya.utils.Stat;
	var Text=laya.display.Text,Texture=laya.resource.Texture,TouchManager=laya.events.TouchManager,URL=laya.net.URL;
	var Utils=laya.utils.Utils,WebGL=laya.webgl.WebGL,WebGLContext=laya.webgl.WebGLContext,WebGLContext2D=laya.webgl.canvas.WebGLContext2D;
/**
*...
*@author ww
*/
//class BKLaya.adptclass.BKBase64Tool
var BKBase64Tool=(function(){
	function BKBase64Tool(){
		this.imgPath=null;
	}

	__class(BKBase64Tool,'BKLaya.adptclass.BKBase64Tool');
	var __proto=BKBase64Tool.prototype;
	__proto.toBase64=function(type,quality,callBack){
		Laya.timer.once(1,this,this.runCallBack,[callBack]);
	}

	__proto.runCallBack=function(callBack){
		if (callBack!=null)callBack(this.imgPath);
	}

	return BKBase64Tool;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptclass.BKCanvas
var BKCanvas=(function(){
	function BKCanvas(){
		this.__ctx=null;
		this.style={};
		this.__is2D=false;
		this._width=200;
		this._height=200;
	}

	__class(BKCanvas,'BKLaya.adptclass.BKCanvas');
	var __proto=BKCanvas.prototype;
	__proto.getContext=function(type){
		if (!this.__ctx){
			type=type.toLowerCase();
			console.log("getContext:",type);
			if (type=="2d"){
				this.__ctx=new BKCanvasRenderContext(this._width,this._height);
				this.__is2D=true;
				this["__nativeObj"]=this.__ctx["__nativeObj"];
			}
			if (type=="webgl"){
				this.__ctx=new BKWebGLRenderingContext();
			}
			if (this._width > 0 && this._height > 0){
				if (this.__ctx.sizefun){
					this.__ctx.sizefun(this._width,this._height);
				}
			}
		}
		return this.__ctx;
	}

	__proto.addEventListener=function(type,fun){
		console.log("BKCanvas.addEventListener:",type,fun);
	}

	__getset(0,__proto,'width',function(){
		return this._width;
		},function(value){
		this._width=value;
		if (!this.__ctx)return;
		if (this.__ctx.sizefun){
			this.__ctx.sizefun(this._width,this._height);
		}
	});

	__getset(0,__proto,'height',function(){
		return this._height;
		},function(value){
		this._height=value;
		if (!this.__ctx)return;
		if (this.__ctx.sizefun){
			this.__ctx.sizefun(this._width,this._height);
		}
	});

	return BKCanvas;
})()


/**
*Context功能模拟
*@author ww
*/
//class BKLaya.adptclass.BKContext
var BKContext=(function(){
	function BKContext(){
		this._font=null;
		this._fontSize=12;
	}

	__class(BKContext,'BKLaya.adptclass.BKContext');
	var __proto=BKContext.prototype;
	__proto.measureText=function(text){
		var rst;
		rst=BK.Text.measureTextSize(BKContext._textStyle,text);
		rst.width=rst.contentWidth;
		rst.height=rst.contentHeight;
		return rst;
		if (!text||text.length<1)return {width:this._fontSize,height:this._fontSize };
		var i=0,len=0;
		len=text.length;
		var noChineseCount=0;
		noChineseCount=0;
		for (i=0;i < len;i++){
			if (!BKContext.isChinese(text.charAt(i))){
				noChineseCount++;
			}
		}
		return {width:this._fontSize*(len-noChineseCount*0.5),height:this._fontSize };
	}

	__proto._drawTextureWithTransform=function(__args){}
	__proto._drawTexture=function(__args){}
	__getset(0,__proto,'font',function(){
		return this._font;
		},function(v){
		this._font=v;
		this._fontSize=BKContext.getFontSize(v);
		BKContext._textStyle.fontSize=this._fontSize;
	});

	BKContext.isChinese=function(str){
		return BKContext.reg.test(str);
	}

	BKContext.getFontSize=function(fontStr){
		var strs=fontStr.split(' ');
		var size=0;
		for (var i=0,n=strs.length;i < n;i++){
			var str=strs[i];
			if (str.indexOf('px')> 0){
				size=parseInt(str);
				break ;
			}
		}
		if (!size)size=12;
		return size;
	}

	__static(BKContext,
	['_textStyle',function(){return this._textStyle={"fontSize":12,"textAlign":0,"maxWidth":999999};},'reg',function(){return this.reg=new RegExp("[\\u4E00-\\u9FFF]+","g");}
	]);
	return BKContext;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptclass.BKHTMLElement
var BKHTMLElement=(function(){
	function BKHTMLElement(){
		this.style={};
		this.type=null;
	}

	__class(BKHTMLElement,'BKLaya.adptclass.BKHTMLElement');
	var __proto=BKHTMLElement.prototype;
	__proto.appendChild=function(child){
		if ((child instanceof BKLaya.adptclass.BKCanvas )){
		}
	}

	//Director.root.addChild(tCanvas.getContext());
	__getset(0,__proto,'clientHeight',function(){
		return BK.Director.screenPixelSize.height;
	});

	__getset(0,__proto,'clientWidth',function(){
		return BK.Director.screenPixelSize.width;
	});

	return BKHTMLElement;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptclass.BKHTMLImage
var BKHTMLImage=(function(){
	function BKHTMLImage(){
		this.onload=null;
		this.onerror=null;
		this.__nativeObj=null;
		this._src=null;
		this._image=null;
	}

	__class(BKHTMLImage,'BKLaya.adptclass.BKHTMLImage');
	var __proto=BKHTMLImage.prototype;
	__proto.__onHttpLoaded=function(path){
		this._image=BK.Image.loadImage(path,6);
		this._image.src=this._src;
		this.__nativeObj=this._image;
		if (this.onload !=null){
			this.onload();
		}
	}

	__proto.__loadImage=function(){
		this._image=BK.Image.loadImage(this._src,6);
		if (!this._image){
			if (this.onerror !=null){
				this.onerror();
			}
			return;
		}
		this._image.src=this._src;
		this.__nativeObj=this._image;
		if (this.onload !=null){
			this.onload();
		}
	}

	__getset(0,__proto,'src',function(){
		return this._src;
		},function(value){
		this._src=value;
		if (!this._src || this._src==""){
			console.log("dispose image:",value);
			if (this._image){
				this._image.dispose();
			}
			if (this.__nativeObj){
			}
			return;
		}
		if (this._src.indexOf("http")>=0){
			BKFileCache.getHttpFile(this._src,Handler.create(this,this.__onHttpLoaded),"",true);
		}else
		Laya.timer.frameOnce(1,this,this.__loadImage);
	});

	__getset(0,__proto,'width',function(){
		return this._image.width;
	});

	__getset(0,__proto,'height',function(){
		return this._image.height;
	});

	return BKHTMLImage;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptclass.BKWebGLRenderingContext
var BKWebGLRenderingContext=(function(){
	function BKWebGLRenderingContext(){
		var glO;
		glO=/*__JS__ */bkWebGLGetInstance();
		if (!glO.getExtension){
			glO.getExtension=function (){
				return null;
			}
		}
		/*__JS__ */return glO;
	}

	__class(BKWebGLRenderingContext,'BKLaya.adptclass.BKWebGLRenderingContext');
	var __proto=BKWebGLRenderingContext.prototype;
	__proto.bufferSubData=function(target,offset,srcData){}
	__proto.bufferSubDataAdpt=function(target,offset,srcData){
		console.log("bufferSubDataAdpt:",target,offset,srcData);
		this.bufferSubData(target,offset,BKBufferTool.typedArrayToBKBuffer(srcData));
	}

	return BKWebGLRenderingContext;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptclass.BKWebSocket
var BKWebSocket=(function(){
	function BKWebSocket(url){
		this._socket=null;
		this.onopen=null;
		this.onmessage=null;
		this.onclose=null;
		this.onerror=null;
		this._socket=new BK.WebSocket(url);
		var _self;
		_self=this;
		this._socket.onClose=function (ws){
			if (_self.onclose !=null){
				_self.onclose();
			}
		}
		this._socket.onOpen=function (ws){
			if (_self.onopen !=null){
				_self.onopen();
			}
		}
		this._socket.onError=function (ws){
			if (_self.onerror !=null){
				_self.onerror();
			}
		}
		this._socket.onMessage=function (ws,data){
			if (data.isBinary){
				data.data=BKBufferTool.BufferToArrayBuffer(data.data);
				}else{
				if(data.data.readAsString)
					data.data=(data.data).readAsString();
			}
			if (_self.onmessage !=null){
				_self.onmessage(data);
			}
		}
	}

	__class(BKWebSocket,'BKLaya.adptclass.BKWebSocket');
	var __proto=BKWebSocket.prototype;
	__proto.send=function(data){
		if (!this._socket)return;
		if ((typeof data=='string')){
			this._socket.send(data);
		}else
		if((data instanceof ArrayBuffer)){
			this._socket.send(BKBufferTool.arrayBufferToBKBuffer(data));
		}
	}

	__proto.connect=function(){
		if (!this._socket)return;
		this._socket.connect();
	}

	__proto.close=function(){
		if (!this._socket)return;
		this._socket.close();
	}

	return BKWebSocket;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptclass.utils.BKBufferTool
var BKBufferTool=(function(){
	function BKBufferTool(){}
	__class(BKBufferTool,'BKLaya.adptclass.utils.BKBufferTool');
	BKBufferTool.base64toArrayBuffer=function(base64){
		var bufferLength=base64.length *0.75,len=base64.length,i=0,p=0,encoded1=0,encoded2=0,encoded3=0,encoded4=0;
		if (base64[base64.length-1]==='='){
			bufferLength--;
			if (base64[base64.length-2]==='='){
				bufferLength--;
			}
		};
		var arraybuffer=new ArrayBuffer(bufferLength);
		var bytes=new Uint8Array(arraybuffer);
		for (i=0;i < len;i+=4){
			encoded1=BKBufferTool.chars.indexOf(base64[i]);
			encoded2=BKBufferTool.chars.indexOf(base64[i+1]);
			encoded3=BKBufferTool.chars.indexOf(base64[i+2]);
			encoded4=BKBufferTool.chars.indexOf(base64[i+3]);
			bytes[p++]=(encoded1 << 2)| (encoded2 >> 4);
			bytes[p++]=((encoded2 & 15)<< 4)| (encoded3 >> 2);
			bytes[p++]=((encoded3 & 3)<< 6)| (encoded4 & 63);
		}
		return arraybuffer;
	}

	BKBufferTool.base64fromArrayBuffer=function(arraybuffer){
		var bytes=new Uint8Array(arraybuffer),i=0,len=bytes.length,base64="";
		for (i=0;i < len;i+=3){
			base64+=BKBufferTool.chars[bytes[i] >> 2];
			base64+=BKBufferTool.chars[((bytes[i] & 3)<< 4)| (bytes[i+1] >> 4)];
			base64+=BKBufferTool.chars[((bytes[i+1] & 15)<< 2)| (bytes[i+2] >> 6)];
			base64+=BKBufferTool.chars[bytes[i+2] & 63];
		}
		if ((len % 3)===2){
			base64=base64.substring(0,base64.length-1)+"=";
		}
		else if ((len % 3)===1){
			base64=base64.substring(0,base64.length-2)+"==";
		}
		return base64;
	}

	BKBufferTool.BufferToArrayBuffer2=function(buf){
		if (buf.length !=buf.capacity){
			buf.rewind();
			buf=buf.readBuffer(buf.length);
		}
		buf.rewind();
		var s=BK.Misc.encodeBase64FromBuffer(buf);
		return BKBufferTool.base64toArrayBuffer(s);
	}

	BKBufferTool.arrayBufferToBKBuffer2=function(ab){
		var s=BKBufferTool.base64fromArrayBuffer(ab);
		return BK.Misc.decodeBase64FromString(s);
	}

	BKBufferTool.BufferToArrayBuffer=function(buf){
		if (BKBufferTool.useFastMode)return BKBufferTool.BufferToArrayBuffer2(buf);
		buf.rewind();
		var ab=new ArrayBuffer(buf.length);
		var da=new DataView(ab);
		while (!buf.eof){
			da.setUint8(buf.pointer,buf.readUint8Buffer());
		}
		return ab;
	}

	BKBufferTool.BufferToArrayBuffer1=function(buf){
		buf.rewind();
		var ab=new ArrayBuffer(buf.length);
		var da=new DataView(ab);
		while (!buf.eof){
			da.setUint8(buf.pointer,buf.readUint8Buffer());
		}
		return ab;
	}

	BKBufferTool.checkIsTransSame=function(buf){
		BKBufferTool.useFastMode=false;
		BKBufferTool.isSameArrayBuffer(BKBufferTool.BufferToArrayBuffer2(buf),BKBufferTool.BufferToArrayBuffer1(buf));
	}

	BKBufferTool.isSameArrayBuffer=function(ab0,ab1){
		var rst=true;
		if (ab0.byteLength !=ab1.byteLength){
			rst=false;
			debugger;
		};
		var dv0,dv1;
		dv0=new Uint8Array(ab0);
		dv1=new Uint8Array(ab1);
		var i=0,len=0;
		len=dv0.length;
		for (i=0;i < len;i++){
			if (dv0[i] !=dv1[i]){
				rst=false;
				debugger;
			}
		}
		console.log("isSame:",rst);
	}

	BKBufferTool.arrayBufferToBKBuffer=function(ab){
		var bf=new BK.Buffer(ab.byteLength);
		var da=new DataView(ab);
		for (var i=0;i < ab.byteLength;i++){
			bf.writeUint8Buffer(da.getUint8(i));
		}
		return bf;
	}

	BKBufferTool.typedArrayToBKBuffer=function(arr){
		var ab;
		if ((arr instanceof ArrayBuffer)){
			ab=arr;
		}
		else {
			ab=arr.buffer;
		};
		var buff;
		buff=BKLaya.adptclass.utils.BKBufferTool.arrayBufferToBKBuffer(ab);
		return buff;
	}

	BKBufferTool.chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	BKBufferTool.useFastMode=true;
	return BKBufferTool;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptclass.utils.BKColor
var BKColor=(function(){
	function BKColor(){}
	__class(BKColor,'BKLaya.adptclass.utils.BKColor');
	BKColor.getBKColor=function(color){
		var color=ColorUtils.create(color);
		if (!color["colorO"]){
			var colorO;
			colorO={};
			var arr;
			arr=color.arrColor;
			colorO.r=arr[0];
			colorO.g=arr[1];
			colorO.b=arr[2];
			colorO.a=arr[3];
			color["colorO"]=colorO;
		}
		return color["colorO"];
	}

	return BKColor;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptclass.utils.BKFileCache
var BKFileCache=(function(){
	function BKFileCache(){}
	__class(BKFileCache,'BKLaya.adptclass.utils.BKFileCache');
	BKFileCache.sha1FromUrl=function(url){
		var bufSha=BK.Misc.sha1(url);
		var sha1="";
		for (var i=0;i < bufSha.length;i++){
			var charCode=bufSha.readUint8Buffer();
			sha1+=charCode.toString(16);
		}
		return sha1;
	}

	BKFileCache.getDataType=function(res){
		var b0=res.readUint8Buffer();
		var b1=res.readUint8Buffer();
		var fileType="unknown";
		if(b0==66 && b1==77){
			fileType="BMP";
		}
		else if(b0==255 && b1==216){
			fileType="JPG";
			}else if(b0==137 && b1==80){
			fileType="PNG";
			}else if(b0==71 && b1==73){
			fileType="GIF";
		}
		return fileType;
	}

	BKFileCache.getHttpFile=function(url,completeHandler,extension,isImage){
		(extension===void 0)&& (extension="");
		(isImage===void 0)&& (isImage=false);
		var cacheUrl;
		cacheUrl="GameSandBox://webcache/"+BKFileCache.sha1FromUrl(url)+extension;
		if (Browser.onIOS)isImage=false;
		if (BK.FileUtil.isFileExist(cacheUrl)){
			if (isImage && url.indexOf(".png")<0&&LayaBKAdpter.gifHolderPath && LayaBKAdpter.gifHolderPath !=""){
				var buf=BK.FileUtil.readFile(cacheUrl);
				if (BKFileCache.getDataType(buf)=="GIF"){
					BKFileCache.getHttpFile(LayaBKAdpter.gifHolderPath,completeHandler);
					return;
				}
			}
			Laya.timer.frameOnce(1,null,BKFileCache.onCompleteCallBack,[cacheUrl,completeHandler],false);
			return;
		};
		var httpreq=new BK.HttpUtil(url);
		httpreq.setHttpMethod("get");
		httpreq.requestAsync(__ondataLoaded);
		function __ondataLoaded (res,code){
			if (code==200){
				if (isImage&& url.indexOf(".png")<0&&LayaBKAdpter.gifHolderPath && LayaBKAdpter.gifHolderPath !=""){
					if (BKFileCache.getDataType(res)=="GIF"){
						BKFileCache.getHttpFile(LayaBKAdpter.gifHolderPath,completeHandler);
						return;
					}
				}
				BK.FileUtil.writeBufferToFile(cacheUrl,res);
				completeHandler.runWith(cacheUrl);
				}else{
				console.log("BK.httpGet Failed:"+url);
			}
		}
	}

	BKFileCache.onCompleteCallBack=function(path,completeHandler){
		completeHandler.runWith(path);
	}

	return BKFileCache;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptclass.utils.BKTypedArrayAdpt
var BKTypedArrayAdpt=(function(){
	function BKTypedArrayAdpt(){
		this.buffer=null;
		this.length=0;
		this.byteOffset=0;
	}

	__class(BKTypedArrayAdpt,'BKLaya.adptclass.utils.BKTypedArrayAdpt');
	var __proto=BKTypedArrayAdpt.prototype;
	__proto.subarray=function(begin,end){
		(begin===void 0)&& (begin=0);
		(end===void 0)&& (end=-1);
		if (end < 0)end=this.length;
		var len=end-begin;
		if (len < 0)len=0;
		return new Uint8Array(this.buffer,this.byteOffset+begin,len);
	}

	BKTypedArrayAdpt._init=function(){
		var poto=Uint8Array["prototype"];
		if (!poto.subarray)poto.subarray=BKTypedArrayAdpt["prototype"]["subarray"];
	}

	return BKTypedArrayAdpt;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptcodes.BrowserAdpt
var BrowserAdpt=(function(){
	function BrowserAdpt(){}
	__class(BrowserAdpt,'BKLaya.adptcodes.BrowserAdpt');
	BrowserAdpt.__init__=function(){
		if (Browser["_window"])return;
		Browser.userAgent="limixiu";
		Browser["_window"]=RunDriver.getWindow();
		Browser["_document"]=Browser.window.document;
		Browser["_document"].body={};
		Browser["_window"].innerWidth=LayaBKAdpter.getScreenWidth();
		Browser["_window"].innerHeight=LayaBKAdpter.getScreenHeight();
	}

	BrowserAdpt.__init=function(){
		Browser["__init__"]=BrowserAdpt.__init__;
	}

	return BrowserAdpt;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptcodes.DrawToCanvasAdpt
var DrawToCanvasAdpt=(function(){
	function DrawToCanvasAdpt(){}
	__class(DrawToCanvasAdpt,'BKLaya.adptcodes.DrawToCanvasAdpt');
	DrawToCanvasAdpt.yFlipImage=function(arr,width,height){
		var rst;
		rst=new Uint8Array(arr.length);
		var i=0,j=0;
		var index=0;
		var index1=0;
		for (i=0;i < width;i++){
			for (j=0;j < height;j++){
				index=(j *width+i)*4;
				index1=((height-j-1)*width+i)*4;
				rst[index]=arr[index1];
				rst[index+1]=arr[index1+1];
				rst[index+2]=arr[index1+2];
				rst[index+3]=arr[index1+3];
			}
		}
		return rst;
	}

	DrawToCanvasAdpt.drawToCanvas=function(sprite,_renderType,canvasWidth,canvasHeight,offsetX,offsetY){
		if (canvasWidth <=0 || canvasHeight <=0){
			console.log("[error] canvasWidth and canvasHeight should greater than zero");
		};
		var renderTarget=/*no*/this.RenderTarget2D.create(canvasWidth,canvasHeight,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401,0,false);
		renderTarget.start();
		renderTarget.clear(0,0,0,0);
		StageAdpt.disableTransform=true;
		Render.context.clear();
		StageAdpt.disableTransform=false;
		RenderSprite.renders[_renderType]._fun(sprite,Render.context,offsetX,RenderState2D.height-canvasHeight+offsetY);
		Render.context.flush();
		renderTarget.end();
		var pixels=renderTarget.getData(0,0,renderTarget.width,renderTarget.height);
		renderTarget.recycle();
		pixels=DrawToCanvasAdpt.yFlipImage(pixels,canvasWidth,canvasHeight);
		var savePath;
		savePath="GameSandBox://saveimg";
		BK.Image.saveImage(BKBufferTool.arrayBufferToBKBuffer(pixels.buffer),canvasWidth,canvasHeight,savePath,"png");
		var b64;
		b64=new BKBase64Tool();
		b64.imgPath=savePath+".png";
		return b64;
	}

	DrawToCanvasAdpt._init=function(){
		RunDriver.drawToCanvas=DrawToCanvasAdpt.drawToCanvas;
	}

	return DrawToCanvasAdpt;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptcodes.HTMLCanvasAdpt
var HTMLCanvasAdpt=(function(){
	function HTMLCanvasAdpt(){
		this._source=null;
		this._width=NaN;
		this._height=NaN;
		this.memorySize=0;
		this._ctx=null;
		this._setGPUMemory=null;
	}

	__class(HTMLCanvasAdpt,'BKLaya.adptcodes.HTMLCanvasAdpt');
	var __proto=HTMLCanvasAdpt.prototype;
	/**
	*设置宽高。
	*@param w 宽度。
	*@param h 高度。
	*/
	__proto.size=function(w,h){
		if (this._width !=w || this._height !=h || (this._source && (this._source.width !=w || this._source.height !=h))){
			this._width=w;
			this._height=h;
			this._setGPUMemory(w *h *4);
			this._ctx && ((typeof this._ctx.size=='function'))&&this._ctx.size(w,h);
			this._source && (this._source.height=h,this._source.width=w);
		}
	}

	HTMLCanvasAdpt._init=function(){
		var replaceFuns;
		replaceFuns=["size"];
		FunctionReplaceTool.replaceClassFuns(HTMLCanvas,HTMLCanvasAdpt,replaceFuns);
	}

	return HTMLCanvasAdpt;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptcodes.HTMLImageAdpt
var HTMLImageAdpt=(function(){
	function HTMLImageAdpt(){
		this._recreateLock=false;
		this._needReleaseAgain=false;
		this._source=null;
		this.memorySize=0;
	}

	__class(HTMLImageAdpt,'BKLaya.adptcodes.HTMLImageAdpt');
	var __proto=HTMLImageAdpt.prototype;
	__proto.disposeResource=function(){
		if (this._recreateLock)
			this._needReleaseAgain=true;
		if(this._source){
			this._source.src=null;
			this._source=null;
			this.memorySize=0;
		}
	}

	HTMLImageAdpt.__init=function(){
		var replaceFuns;
		replaceFuns=["disposeResource"];
		FunctionReplaceTool.replaceClassFuns(HTMLImage,HTMLImageAdpt,replaceFuns);
	}

	return HTMLImageAdpt;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptcodes.InputAdpt
var InputAdpt=(function(){
	function InputAdpt(){
		//inputContainer.appendChild(inputElement);
		this.nativeInput=null;
		this._focus=false;
		this._multiline=false;
		this._editable=false;
		this._maxChars=0;
		this._type=null;
		this._content=null;
		this._prompt=null;
		this._text=null;
		this._originColor=null;
		this.fontSize=0;
		this.font=null;
	}

	__class(InputAdpt,'BKLaya.adptcodes.InputAdpt');
	var __proto=InputAdpt.prototype;
	//e.stopPropagation && e.stopPropagation();
	__proto._setInputMethod=function(){
		Input["inputElement"]=(this._multiline ? Input["area"] :Input["input"]);
	}

	__proto.event=function(__arg){}
	__proto._focusIn=function(){
		Input.isInputting=true;
		var input=this.nativeInput;
		this._focus=true;
		input.readOnly=!this._editable;
		input.maxLength=this._maxChars;
		input.type=this._type;
		input.value=this._content;
		input.placeholder=this._prompt;
		var _t=this;
		Laya.stage.focus=_t;
		this.event(/*laya.events.Event.FOCUS*/"focus");
		input.focus();
		var temp=this._text;
		input.setColor(this._originColor);
		input.setFontSize(this.fontSize);
		input.setFontFace(this.font);
		this._syncInputTransform();
	}

	/**
	*在输入期间，如果 Input 实例的位置改变，调用_syncInputTransform同步输入框的位置。
	*/
	__proto._syncInputTransform=function(){}
	InputAdpt.__init=function(){
		if (!LayaBKAdpter.enableInputAdpt)return;
		if (!Input)return;
		Input["prototype"]["_setInputMethod"]=InputAdpt["prototype"]["_setInputMethod"];
		Input["prototype"]["_focusIn"]=InputAdpt["prototype"]["_focusIn"];
		Input["prototype"]["_syncInputTransform"]=InputAdpt["prototype"]["_syncInputTransform"];
		Input["_popupInputMethod"]=InputAdpt._popupInputMethod;
		Input["_createInputElement"]=InputAdpt._createInputElement;
		Input["_processInputting"]=InputAdpt._processInputting;
		Input["_stopEvent"]=InputAdpt._stopEvent;
		InputAdpt._createInputElement();
	}

	InputAdpt._popupInputMethod=function(e){
		if (!Input.isInputting)return;
		var input=Input["inputElement"];
		input.focus();
	}

	InputAdpt._createInputElement=function(){
		var tInput;
		tInput=new BKNativeInput();
		InputAdpt._initInput(tInput);
		Input["input"]=tInput;
		Input["area"]=tInput;
		var ct;
		ct={};
		ct.contains=function (){return false };
		ct.removeChild=function (){};
		ct.appendChild=function (){};
		Input["inputContainer"]=ct;
		tInput.on(/*laya.events.Event.INPUT*/"input",null,InputAdpt._processInputting);
		tInput.on(/*laya.events.Event.ENTER*/"enter",null,InputAdpt._processInputEnd);
	}

	InputAdpt._initInput=function(input){}
	InputAdpt._processInputEnd=function(){
		var input=Input["inputElement"].target;
		if (!input)return;
		input.focus=false;
		input.event(/*laya.events.Event.ENTER*/"enter");
	}

	InputAdpt._processInputting=function(e){
		var input=Input["inputElement"].target;
		if (!input)return;
		var value=Input["inputElement"].value;
		if (input._restrictPattern){
			value=value.replace(/\u2006|\x27/g,"");
			if (input._restrictPattern.test(value)){
				value=value.replace(input._restrictPattern,"");
				Input["inputElement"].value=value;
			}
		}
		input._text=value;
		input.event(/*laya.events.Event.INPUT*/"input");
	}

	InputAdpt._stopEvent=function(e){}
	return InputAdpt;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptcodes.LoaderAdpt
var LoaderAdpt=(function(){
	function LoaderAdpt(){}
	__class(LoaderAdpt,'BKLaya.adptcodes.LoaderAdpt');
	LoaderAdpt.__init=function(){
		Browser.window.XMLHttpRequest=XMLHttpRequestAdpt;
	}

	return LoaderAdpt;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptcodes.LocalStorageAdpt
var LocalStorageAdpt=(function(){
	function LocalStorageAdpt(){}
	__class(LocalStorageAdpt,'BKLaya.adptcodes.LocalStorageAdpt');
	LocalStorageAdpt._readData=function(){
		if (!BK.FileUtil.isFileExist(LocalStorageAdpt.dataPath)){
			return null;
		}
		try{
			var dataO=BK.FileUtil.readFile(LocalStorageAdpt.dataPath);
			var jsonStr;
			jsonStr=dataO.readAsString();
			return JSON.parse(jsonStr);
			}catch (e){
			return null;
		}
		return null;
	}

	LocalStorageAdpt._saveData=function(data){
		if (!data)return;
		try{
			BK.FileUtil.writeFile(LocalStorageAdpt.dataPath,JSON.stringify(data));
			}catch (e){
			console.log("save data fail:",LocalStorageAdpt.dataPath,data);
		}
	}

	LocalStorageAdpt.setItem=function(key,value){
		var dataO=LocalStorageAdpt._readData();
		if(!dataO)dataO={};
		dataO[key]=value;
		LocalStorageAdpt._saveData(dataO);
	}

	LocalStorageAdpt.getItem=function(key){
		var dataO=LocalStorageAdpt._readData();
		if(!dataO)dataO={};
		return dataO[key];
	}

	LocalStorageAdpt.setJSON=function(key,value){
		LocalStorageAdpt.setItem(key,value);
	}

	LocalStorageAdpt.getJSON=function(key){
		return LocalStorageAdpt.getItem(key);
	}

	LocalStorageAdpt.removeItem=function(key){
		var data=LocalStorageAdpt._readData();
		if (!data)return;
		delete data[key];
		LocalStorageAdpt._saveData(data);
	}

	LocalStorageAdpt.clear=function(){
		LocalStorageAdpt._saveData({});
	}

	LocalStorageAdpt.dataPath="GameSandBox://layabox/localstorage.data";
	return LocalStorageAdpt;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptcodes.RenderContextAdpt
var RenderContextAdpt=(function(){
	function RenderContextAdpt(){
		this.ctx=null;
		this._transform=function(x,y,args){
			this.ctx.translate(args[1]+x,args[2]+y);
			var mat=args[0];
			this.ctx.transforms(mat.a,mat.b,mat.c,mat.d,mat.tx,mat.ty);
			this.ctx.translate(-x-args[1],-y-args[2]);
		}
	}

	__class(RenderContextAdpt,'BKLaya.adptcodes.RenderContextAdpt');
	var __proto=RenderContextAdpt.prototype;
	__proto.clear=function(){
		this.ctx.clear();
		var _this=this;
		if(_this==Render.context)
			StageAdpt.webglRenderBegin(this.ctx);
	}

	__proto.flush=function(){
		this.ctx.flush && this.ctx.flush();
		var _this=this;
		if(_this==Render.context)
			StageAdpt.webglRenderEnd(this.ctx);
	}

	__proto.transform=function(a,b,c,d,tx,ty){
		this.ctx.transforms(a,b,c,d,tx,ty);
	}

	RenderContextAdpt.__init=function(){
		var replaceFuns;
		replaceFuns=["transform","_transform"];
		FunctionReplaceTool.replaceClassFuns(laya.renders.RenderContext,RenderContextAdpt,["clear","flush"]);
	}

	return RenderContextAdpt;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptcodes.SocketAdpt
var SocketAdpt=(function(){
	function SocketAdpt(){
		this._socket=null;
	}

	__class(SocketAdpt,'BKLaya.adptcodes.SocketAdpt');
	var __proto=SocketAdpt.prototype;
	__proto.connectByUrl=function(url){
		SocketAdpt._preConnect.call(this,url);
		this._socket.connect();
	}

	SocketAdpt.__init=function(){
		if (SocketAdpt._preConnect!=null)return;
		if (!Socket)return;
		SocketAdpt._preConnect=Socket["prototype"]["connectByUrl"];
		Socket["prototype"]["connectByUrl"]=SocketAdpt["prototype"]["connectByUrl"];
	}

	SocketAdpt._preConnect=null;
	return SocketAdpt;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptcodes.SpriteAdpt
var SpriteAdpt=(function(){
	function SpriteAdpt(){}
	__class(SpriteAdpt,'BKLaya.adptcodes.SpriteAdpt');
	var __proto=SpriteAdpt.prototype;
	/**
	*<p>绘制 当前<code>Sprite</code> 到 <code>Canvas</code> 上，并返回一个HtmlCanvas。</p>
	*<p>绘制的结果可以当作图片源，再次绘制到其他Sprite里面，示例：</p>
	*
	*var htmlCanvas:HTMLCanvas=sprite.drawToCanvas(100,100,0,0);//把精灵绘制到canvas上面
	*var texture:Texture=new Texture(htmlCanvas);//使用htmlCanvas创建Texture
	*var sp:Sprite=new Sprite().pos(0,200);//创建精灵并把它放倒200位置
	*sp.graphics.drawTexture(texture);//把截图绘制到精灵上
	*Laya.stage.addChild(sp);//把精灵显示到舞台
	*
	*<p>也可以获取原始图片数据，分享到网上，从而实现截图效果，示例：</p>
	*
	*var htmlCanvas:HTMLCanvas=sprite.drawToCanvas(100,100,0,0);//把精灵绘制到canvas上面
	*var canvas:*=htmlCanvas.getCanvas();//获取原生的canvas对象
	*trace(canvas.toDataURL("image/png"));//打印图片base64信息，可以发给服务器或者保存为图片
	*
	*@param canvasWidth 画布宽度。
	*@param canvasHeight 画布高度。
	*@param x 绘制的 X 轴偏移量。
	*@param y 绘制的 Y 轴偏移量。
	*@return HTMLCanvas 对象。
	*/
	__proto.drawToCanvas=function(canvasWidth,canvasHeight,offsetX,offsetY){
		console.log("drawToCanvas not work");
		return null;
	}

	SpriteAdpt.__init=function(){}
	return SpriteAdpt;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptcodes.StageAdpt
var StageAdpt=(function(){
	function StageAdpt(){
		this._scaleMode=null;
		this._screenMode=null;
		this.designWidth=NaN;
		this.designHeight=NaN;
		this.scaleX=NaN;
		this.scaleY=NaN;
		this._width=NaN;
		this._height=NaN;
		this.offset=null;
		this.visible=false;
		this._repaint=0;
		this._alignH=null;
		this._alignV=null;
	}

	__class(StageAdpt,'BKLaya.adptcodes.StageAdpt');
	var __proto=StageAdpt.prototype;
	/**@private */
	__proto._changeCanvasSize=function(){
		this.setScreenSize(LayaBKAdpter.getScreenWidth(),LayaBKAdpter.getScreenHeight());
	}

	/**
	*设置屏幕大小，场景会根据屏幕大小进行适配。可以动态调用此方法，来更改游戏显示的大小。
	*@param screenWidth 屏幕宽度。
	*@param screenHeight 屏幕高度。
	*/
	__proto.setScreenSize=function(screenWidth,screenHeight){
		var rotation=false;
		if (this._screenMode==/*laya.display.Stage.SCREEN_HORIZONTAL*/"horizontal"){
			BK.Director.screenMode=LayaBKAdpter.HORIZONTAL_TYPE;
			}else{
			BK.Director.screenMode=1;
		}
		screenWidth=LayaBKAdpter.getScreenWidth();
		screenHeight=LayaBKAdpter.getScreenHeight();
		var scaleMode=this._scaleMode;
		var scaleX=screenWidth / this.designWidth;
		var scaleY=screenHeight / this.designHeight;
		var canvasWidth=this.designWidth;
		var canvasHeight=this.designHeight;
		var realWidth=screenWidth;
		var realHeight=screenHeight;
		var pixelRatio=1;
		this._width=this.designWidth;
		this._height=this.designHeight;
		switch (scaleMode){
			case /*laya.display.Stage.SCALE_NOSCALE*/"noscale":
				scaleX=scaleY=1;
				realWidth=this.designWidth;
				realHeight=this.designHeight;
				break ;
			case /*laya.display.Stage.SCALE_SHOWALL*/"showall":
				scaleX=scaleY=Math.min(scaleX,scaleY);
				canvasWidth=realWidth=Math.round(this.designWidth *scaleX);
				canvasHeight=realHeight=Math.round(this.designHeight *scaleY);
				break ;
			case /*laya.display.Stage.SCALE_NOBORDER*/"noborder":
				scaleX=scaleY=Math.max(scaleX,scaleY);
				realWidth=Math.round(this.designWidth *scaleX);
				realHeight=Math.round(this.designHeight *scaleY);
				break ;
			case /*laya.display.Stage.SCALE_FULL*/"full":
				scaleX=scaleY=1;
				this._width=canvasWidth=screenWidth;
				this._height=canvasHeight=screenHeight;
				break ;
			case /*laya.display.Stage.SCALE_FIXED_WIDTH*/"fixedwidth":
				scaleY=scaleX;
				this._height=canvasHeight=Math.round(screenHeight / scaleX);
				break ;
			case /*laya.display.Stage.SCALE_FIXED_HEIGHT*/"fixedheight":
				scaleX=scaleY;
				this._width=canvasWidth=Math.round(screenWidth / scaleY);
				break ;
			case /*laya.display.Stage.SCALE_FIXED_AUTO*/"fixedauto":
				if ((screenWidth / screenHeight)< (this.designWidth / this.designHeight)){
					scaleY=scaleX;
					this._height=canvasHeight=Math.round(screenHeight / scaleX);
					}else {
					scaleX=scaleY;
					this._width=canvasWidth=Math.round(screenWidth / scaleY);
				}
				break ;
			}
		scaleX *=this.scaleX;
		scaleY *=this.scaleY;
		if (scaleX===1 && scaleY===1){
			StageAdpt.transform.identity();
			}else {
			StageAdpt.transform.a=this._formatData(scaleX / (realWidth / canvasWidth));
			StageAdpt.transform.d=this._formatData(scaleY / (realHeight / canvasHeight));
		}
		console.log("changeWebGLSize:",canvasWidth,canvasHeight,RunDriver.changeWebGLSize);
		RunDriver.changeWebGLSize(screenWidth,screenHeight);
		console.log("scale:",scaleX,scaleY);
		LayaBKAdpter.adptNode.scale={x:scaleX,y:scaleY };
		if (this._alignH===/*laya.display.Stage.ALIGN_LEFT*/"left")this.offset.x=0;
		else if (this._alignH===/*laya.display.Stage.ALIGN_RIGHT*/"right")this.offset.x=screenWidth-realWidth;
		else this.offset.x=(screenWidth-realWidth)*0.5 / pixelRatio;
		if (this._alignV===/*laya.display.Stage.ALIGN_TOP*/"top")this.offset.y=0;
		else if (this._alignV===/*laya.display.Stage.ALIGN_BOTTOM*/"bottom")this.offset.y=screenHeight-realHeight;
		else this.offset.y=(screenHeight-realHeight)*0.5 / pixelRatio;
		this.offset.x=Math.round(this.offset.x);
		this.offset.y=Math.round(this.offset.y);
		LayaBKAdpter.adptNode.position={x:this.offset.x,y:this.offset.y };
		LayaBKAdpter.setStageRotation(rotation);
		var tempMt;
		tempMt=Matrix.TEMP;
		tempMt.identity();
		console.log("StageInfo:",rotation,scaleX,scaleY,this.offset.x,this.offset.y);
		tempMt.scale(scaleX,scaleY);
		tempMt.translate(this.offset.x,this.offset.y);
		Matrix.mul(tempMt,LayaBKAdpter._stageMatrix,LayaBKAdpter._stageMatrix);
		StageAdpt._preTransformMatrix.identity();
		StageAdpt._preTransformMatrix.scale(scaleX,scaleY);
		StageAdpt._preTransformMatrix.translate(this.offset.x,this.offset.y);
		this.visible=true;
		this._repaint=1;
		this.event(/*laya.events.Event.RESIZE*/"resize");
	}

	/**@private */
	__proto._formatData=function(value){
		if (Math.abs(value)< 0.000001)return 0;
		if (Math.abs(1-value)< 0.001)return value > 0 ? 1 :-1;
		return value;
	}

	__proto.event=function(type){}
	__proto.get_screenMode=function(){
		return this._screenMode;
	}

	__proto.set_screenMode=function(value){
		this._screenMode=value;
		Laya.timer.callLater(this,this._changeCanvasSize);
	}

	/**当前视窗由缩放模式导致的 X 轴缩放系数。*/
	__proto.get_clientScaleX=function(){
		return StageAdpt.transform.getScaleX();
	}

	/**当前视窗由缩放模式导致的 Y 轴缩放系数。*/
	__proto.get_clientScaleY=function(){
		return StageAdpt.transform.getScaleY();
	}

	__proto.render=function(context,x,y){
		MouseManager.instance["runEvent"]();
		StageAdpt._preRender.call(this,context,x,y);
	}

	StageAdpt.__init=function(){
		StageAdpt._preRender=Stage["prototype"]["render"];
		FunctionReplaceTool.replaceFunction(Stage,StageAdpt,"render");
		FunctionReplaceTool.replaceFunction(Stage,StageAdpt,"_changeCanvasSize");
		FunctionReplaceTool.replaceFunction(Stage,StageAdpt,"setScreenSize");
		FunctionReplaceTool.replaceGetSet(Stage,"screenMode",StageAdpt["prototype"]["get_screenMode"],StageAdpt["prototype"]["set_screenMode"]);
		FunctionReplaceTool.replaceGetSet(Stage,"clientScaleX",StageAdpt["prototype"]["get_clientScaleX"]);
		FunctionReplaceTool.replaceGetSet(Stage,"clientScaleY",StageAdpt["prototype"]["get_clientScaleY"]);
	}

	StageAdpt.webglRenderBegin=function(ctx){
		ctx.save();
		var mt;
		mt=StageAdpt._preTransformMatrix;
		if(!StageAdpt.disableTransform)
			ctx.transform(mt.a,mt.b,mt.c,mt.d,mt.tx,mt.ty);
	}

	StageAdpt.webglRenderEnd=function(ctx){
		ctx.restore();
		WebGL.mainContext["glCommit"]();
	}

	StageAdpt._preRender=null;
	StageAdpt.disableTransform=false;
	__static(StageAdpt,
	['transform',function(){return this.transform=new Matrix;},'_preTransformMatrix',function(){return this._preTransformMatrix=new Matrix();}
	]);
	return StageAdpt;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptcodes.URLAdpt
var URLAdpt=(function(){
	function URLAdpt(){}
	__class(URLAdpt,'BKLaya.adptcodes.URLAdpt');
	URLAdpt.formatURL=function(url,base){
		if (!url)return "null path";
		if (url.indexOf("GameRes://")>=0)return url;
		if (url.indexOf("GameSandBox://")>=0)return url;
		if (url.indexOf(":")> 0)return url;
		if (URL.customFormat !=null)url=URL.customFormat(url,base);
		if (url.indexOf("http")>=0)return url;
		if (url.indexOf("GameRes://")>=0)return url;
		var char1=url.charAt(0);
		if (char1==="."){
			return URL["formatRelativePath"]((base || URL.basePath)+url);
			}else if (char1==='~'){
			return URL.rootPath+url.substring(1);
			}else if (char1==="d"){
			if (url.indexOf("data:image")===0)return url;
			}else if (char1==="/"){
			return url;
		}
		return (base || URL.basePath)+url;
	}

	URLAdpt.__init=function(){
		URL["formatURL"]=URLAdpt.formatURL;
	}

	return URLAdpt;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptcodes.WebGLRenderContext2dAdpt
var WebGLRenderContext2dAdpt=(function(){
	function WebGLRenderContext2dAdpt(){}
	__class(WebGLRenderContext2dAdpt,'BKLaya.adptcodes.WebGLRenderContext2dAdpt');
	var __proto=WebGLRenderContext2dAdpt.prototype;
	__proto.clear=function(){
		WebGLRenderContext2dAdpt.preClear.call(this);
		var _this=this;
		if(_this==Render.context)
			StageAdpt.webglRenderBegin(this);
	}

	__proto.flush=function(){
		var rst=0;
		rst=WebGLRenderContext2dAdpt.preFlush.call(this);
		var _this=this;
		if(_this==Render.context)
			StageAdpt.webglRenderEnd(this);
		return rst;
	}

	WebGLRenderContext2dAdpt.__init=function(){
		WebGLRenderContext2dAdpt.preClear=WebGLContext2D["prototype"]["clear"];
		WebGLRenderContext2dAdpt.preFlush=WebGLContext2D["prototype"]["flush"];
		FunctionReplaceTool.replaceClassFuns(WebGLContext2D,WebGLRenderContext2dAdpt,["clear","flush"]);
	}

	WebGLRenderContext2dAdpt.preClear=null;
	WebGLRenderContext2dAdpt.preFlush=null;
	return WebGLRenderContext2dAdpt;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptcodes.XMLHttpRequestAdpt
var XMLHttpRequestAdpt=(function(){
	function XMLHttpRequestAdpt(){
		this.responseType=null;
		this.onerror=null;
		this.onabort=null;
		this.onprogress=null;
		this.onload=null;
		this.method=null;
		this.url=null;
		this.header={};
		this.status=NaN;
		this.statusText="";
		this.data=null;
		this.responseText=null;
		this.response=null;
	}

	__class(XMLHttpRequestAdpt,'BKLaya.adptcodes.XMLHttpRequestAdpt');
	var __proto=XMLHttpRequestAdpt.prototype;
	__proto.open=function(method,url,asy){
		(asy===void 0)&& (asy=false);
		this.method=method;
		this.url=url;
		this.header={};
		this.status=0;
		this.response=null;
		this.responseText=null;
	}

	__proto.setRequestHeader=function(type,value){
		this.header[type]=value;
	}

	__proto.send=function(data){
		if (this.url.indexOf("http")>=0){
			var httpreq=new BK.HttpUtil(this.url);
			httpreq.setHttpMethod(this.method || "get");
			if (data){
				httpreq.setHttpPostData(data);
			};
			var key;
			for (key in this.header){
				httpreq.setHttpHeader(key,this.header[key]+"");
			};
			var self=this;
			httpreq.requestAsync(Utils.bind(__ondataLoaded,this));
			function __ondataLoaded (res,code){
				self.__onload(res);
			}
		}
		else {
			var buff=BK.FileUtil.readFile(this.url);
			this.__onload(buff);
		}
	}

	__proto.__onload=function(buff){
		if (this.responseType=="arraybuffer"){
			this.response=XMLHttpRequestAdpt.BufferToArrayBuffer(buff);
		}
		else {
			this.responseText=buff.readAsString(true);
		}
		if (this.onload !=null){
			Laya.timer.frameOnce(2,this,this.onload,[this]);
		}
	}

	XMLHttpRequestAdpt.BufferToArrayBuffer=function(buf){
		return BKBufferTool.BufferToArrayBuffer(buf);
	}

	return XMLHttpRequestAdpt;
})()


/**
*...
*@author ww
*/
//class BKLaya.adpttool.FunctionReplaceTool
var FunctionReplaceTool=(function(){
	function FunctionReplaceTool(){}
	__class(FunctionReplaceTool,'BKLaya.adpttool.FunctionReplaceTool');
	FunctionReplaceTool.replaceFunction=function(clzPre,clzNew,funName){
		clzPre["prototype"][funName]=clzNew["prototype"][funName];
	}

	FunctionReplaceTool.replaceStaticFun=function(clzPre,fun,funName){
		clzPre[funName]=fun;
	}

	FunctionReplaceTool.replaceGetSet=function(clzPre,key,getFun,setFun){
		Object["defineProperty"](clzPre["prototype"],key,{"get":getFun,"set":setFun });
	}

	FunctionReplaceTool.replaceClassFuns=function(clzPre,clzNew,funs){
		var i=0,len=0;
		len=funs.length;
		var preP=clzPre["prototype"];
		var newP=clzNew["prototype"];
		var tKey;
		for (i=0;i < len;i++){
			tKey=funs[i];
			preP[tKey]=newP[tKey];
		}
	}

	FunctionReplaceTool.replaceClassStaticFuns=function(clzPre,clzNew,funs){
		var i=0,len=0;
		len=funs.length;
		var preP=clzPre;
		var newP=clzNew;
		var tKey;
		for (i=0;i < len;i++){
			tKey=funs[i];
			preP[tKey]=newP[tKey];
		}
	}

	return FunctionReplaceTool;
})()


/**
*<p><code>MouseManager</code> 是鼠标、触摸交互管理器。</p>
*<p>鼠标事件流包括捕获阶段、目标阶段、冒泡阶段。<br/>
*捕获阶段：此阶段引擎会从stage开始递归检测stage及其子对象，直到找到命中的目标对象或者未命中任何对象；<br/>
*目标阶段：找到命中的目标对象；<br/>
*冒泡阶段：事件离开目标对象，按节点层级向上逐层通知，直到到达舞台的过程。</p>
*/
//class BKLaya.events.BKMouseManager
var BKMouseManager=(function(){
	function BKMouseManager(){
		/**canvas 上的鼠标X坐标。*/
		this.mouseX=0;
		/**canvas 上的鼠标Y坐标。*/
		this.mouseY=0;
		/**是否禁用除 stage 以外的鼠标事件检测。*/
		this.disableMouseEvent=false;
		/**鼠标按下的时间。单位为毫秒。*/
		this.mouseDownTime=0;
		/**鼠标移动精度。*/
		this.mouseMoveAccuracy=2;
		this._stage=null;
		this._target=null;
		this._lastMoveTimer=0;
		this._isLeftMouse=false;
		this._eventList=[];
		this._touchIDs={};
		this._id=1;
		this._tTouchID=0;
		this._event=new Event();
		this._matrix=new Matrix();
		this._point=new Point();
		this._rect=new Rectangle();
		this._prePoint=new Point();
		this._curTouchID=NaN;
	}

	__class(BKMouseManager,'BKLaya.events.BKMouseManager');
	var __proto=BKMouseManager.prototype;
	/**
	*@private
	*初始化。
	*/
	__proto.__init__=function(stage,canvas){
		this._stage=stage;
	}

	__proto.runEvent=function(){
		var i=0,len=0;
		var touches;
		touches=BK.TouchEvent.getTouchEvent();
		if (!touches)return;
		var tTouch;
		len=touches.length;
		var list=this._eventList;
		for (i=0;i < len;i++){
			tTouch=touches[i];
			tTouch.type=TouchEventItem.TouchDic[tTouch.status];
			tTouch.changedTouches=[tTouch];
			tTouch["identifier"]=tTouch.id;
			list.push(tTouch);
		}
		this._runEvent();
		BK.TouchEvent.updateTouchStatus();
	}

	__proto.initEvent=function(e,nativeEvent){
		var _this=this;
		_this._event._stoped=false;
		_this._event.nativeEvent=nativeEvent || e;
		_this._target=null;
		this._point.setTo(e.x,e.y);
		LayaBKAdpter._stageMatrix.invertTransformPoint(this._point);
		_this.mouseX=this._point.x;
		_this.mouseY=this._point.y;
		_this._event.touchId=e.id || 0;
		this._tTouchID=_this._event.touchId;
		var evt;
		evt=TouchManager.I._event;
		evt._stoped=false;
		evt.nativeEvent=_this._event.nativeEvent;
		evt.touchId=_this._event.touchId;
	}

	__proto.checkMouseWheel=function(e){
		this._event.delta=e.wheelDelta ? e.wheelDelta *0.025 :-e.detail;
		var _lastOvers=TouchManager.I.getLastOvers();
		for (var i=0,n=_lastOvers.length;i < n;i++){
			var ele=_lastOvers[i];
			ele.event(/*laya.events.Event.MOUSE_WHEEL*/"mousewheel",this._event.setTo(/*laya.events.Event.MOUSE_WHEEL*/"mousewheel",ele,this._target));
		}
	}

	// _stage.event(Event.MOUSE_WHEEL,_event.setTo(Event.MOUSE_WHEEL,_stage,_target));
	__proto.onMouseMove=function(ele){
		TouchManager.I.onMouseMove(ele,this._tTouchID);
	}

	__proto.onMouseDown=function(ele){
		if (Input.isInputting && Laya.stage.focus && Laya.stage.focus["focus"] && !Laya.stage.focus.contains(this._target)){
			var pre_input=Laya.stage.focus['_tf'] || Laya.stage.focus;
			var new_input=ele['_tf'] || ele;
			if ((new_input instanceof laya.display.Input )&& new_input.multiline==pre_input.multiline)
				pre_input['_focusOut']();
			else
			pre_input.focus=false;
		}
		TouchManager.I.onMouseDown(ele,this._tTouchID,this._isLeftMouse);
	}

	__proto.onMouseUp=function(ele){
		TouchManager.I.onMouseUp(ele,this._tTouchID,this._isLeftMouse);
	}

	__proto.check=function(sp,mouseX,mouseY,callBack){
		this._point.setTo(mouseX,mouseY);
		sp.fromParentPoint(this._point);
		mouseX=this._point.x;
		mouseY=this._point.y;
		var scrollRect=sp.scrollRect;
		if (scrollRect){
			this._rect.setTo(scrollRect.x,scrollRect.y,scrollRect.width,scrollRect.height);
			if (!this._rect.contains(mouseX,mouseY))return false;
		}
		if (!this.disableMouseEvent){
			if (sp.hitTestPrior && !sp.mouseThrough && !this.hitTest(sp,mouseX,mouseY)){
				return false;
			}
			for (var i=sp._children.length-1;i >-1;i--){
				var child=sp._children[i];
				if (!child.destroyed && child.mouseEnabled && child.visible){
					if (this.check(child,mouseX,mouseY,callBack))return true;
				}
			}
		};
		var isHit=(sp.hitTestPrior && !sp.mouseThrough && !this.disableMouseEvent)? true :this.hitTest(sp,mouseX,mouseY);
		if (isHit){
			this._target=sp;
			callBack.call(this,sp);
			}else if (callBack===this.onMouseUp && sp===this._stage){
			this._target=this._stage;
			callBack.call(this,this._target);
		}
		return isHit;
	}

	__proto.hitTest=function(sp,mouseX,mouseY){
		var isHit=false;
		if (sp.scrollRect){
			mouseX-=sp.scrollRect.x;
			mouseY-=sp.scrollRect.y;
		}
		if ((sp.hitArea instanceof laya.utils.HitArea )){
			return sp.hitArea.isHit(mouseX,mouseY);
		}
		if (sp.width > 0 && sp.height > 0 || sp.mouseThrough || sp.hitArea){
			if (!sp.mouseThrough){
				var hitRect=this._rect;
				if (sp.hitArea)hitRect=sp.hitArea;
				else hitRect.setTo(0,0,sp.width,sp.height);
				isHit=hitRect.contains(mouseX,mouseY);
				}else {
				isHit=sp.getGraphicBounds().contains(mouseX,mouseY);
			}
		}
		return isHit;
	}

	/**
	*执行事件处理。
	*/
	__proto._runEvent=function(){
		var len=this._eventList.length;
		if (!len)return;
		var _this=this;
		var i=0;
		while (i < len){
			var evt=this._eventList[i];
			if (evt.type!=='mousemove')this._prePoint.x=this._prePoint.y=-1000000;
			switch (evt.type){
				case "touchstart":
					BKMouseManager._isTouchRespond=true;
					_this._isLeftMouse=true;
					var touches=evt.changedTouches;
					for (var j=0,n=touches.length;j < n;j++){
						var touch=touches[j];
						if (BKMouseManager.multiTouchEnabled || isNaN(this._curTouchID)){
							this._curTouchID=touch.identifier;
							if (this._id % 200===0)this._touchIDs={};
							this._touchIDs[touch.identifier]=this._id++;
							_this.initEvent(touch,evt);
							_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseDown);
						}
					}
					break ;
				case "touchend":
				case "touchcancel":
					BKMouseManager._isTouchRespond=true;
					_this._isLeftMouse=true;
					var touchends=evt.changedTouches;
					for (j=0,n=touchends.length;j < n;j++){
						touch=touchends[j];
						if (BKMouseManager.multiTouchEnabled || touch.identifier==this._curTouchID){
							this._curTouchID=NaN;
							_this.initEvent(touch,evt);
							var isChecked=false;
							isChecked=_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseUp);
							if (!isChecked){
								_this.onMouseUp(null);
							}
						}
					}
					break ;
				case "touchmove":;
					var touchemoves=evt.changedTouches;
					for (j=0,n=touchemoves.length;j < n;j++){
						touch=touchemoves[j];
						if (BKMouseManager.multiTouchEnabled || touch.identifier==this._curTouchID){
							_this.initEvent(touch,evt);
							_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseMove);
						}
					}
					break ;
				}
			i++;
		}
		this._eventList.length=0;
	}

	BKMouseManager.enabled=true;
	BKMouseManager.multiTouchEnabled=true;
	BKMouseManager._isTouchRespond=false;
	__static(BKMouseManager,
	['instance',function(){return this.instance=new BKMouseManager();}
	]);
	return BKMouseManager;
})()


/**
*...
*@author ww
*/
//class BKLaya.events.TouchEventItem
var TouchEventItem=(function(){
	function TouchEventItem(){
		this.id=0;
		this.x=NaN;
		this.y=NaN;
		this.type=null;
		this.changedTouches=null;
		/**
		*1.点击抬起 2.点击中 3.移动中
		*/
		this.status=0;
	}

	__class(TouchEventItem,'BKLaya.events.TouchEventItem');
	TouchEventItem.TouchEnd=1;
	TouchEventItem.TouchBegin=2;
	TouchEventItem.TouchMove=3;
	__static(TouchEventItem,
	['TouchDic',function(){return this.TouchDic={1:"touchend",2:"touchstart",3:"touchmove" };}
	]);
	return TouchEventItem;
})()


/**
*...
*@author ww
*/
//class BKLaya.LayaBKAdpter
var LayaBKAdpter=(function(){
	function LayaBKAdpter(){}
	__class(LayaBKAdpter,'BKLaya.LayaBKAdpter');
	LayaBKAdpter.getScreenWidth=function(){
		return BK.Director.screenPixelSize.width;
	}

	LayaBKAdpter.getScreenHeight=function(){
		return BK.Director.screenPixelSize.height;
	}

	LayaBKAdpter.isBK=function(){
		return /*__JS__ */window.BK&&BK.Sprite;
	}

	LayaBKAdpter._initFirst=function(){
		if (!LayaBKAdpter.isH5&&(LayaBKAdpter._preLayaInit==null)){
			LayaBKAdpter._preInits();
			LayaBKAdpter._preLayaInit=Laya.init;
			Laya["init"]=LayaBKAdpter._adptLayaInit;
		}
	}

	LayaBKAdpter._adptLayaInit=function(width,height){
		WebGL.enable();
		LayaBKAdpter._preLayaInit(width,height);
		BKLaya.LayaBKAdpter.init();
	}

	LayaBKAdpter._preInits=function(){
		if (!LayaBKAdpter.adptNode){
			LayaBKAdpter.adptNode=new BK.Node();
			BK.Director.root.addChild(LayaBKAdpter.adptNode);
		}
		LayaBKAdpter.window=/*__JS__ */window;
		if (!LayaBKAdpter.window.addEventListener){
			LayaBKAdpter.window.addEventListener=function (type,fun){
				console.log("window.addEventListener:",type,fun);
			};
		}
		LayaBKAdpter.window.CanvasRenderingContext2D=BKCanvasRenderContext;
		if (!/*__JS__ */BK.Editor){
			LayaBKAdpter.enableInputAdpt=false;
		}
		if (!LayaBKAdpter.window.CanvasRenderingContext2D["prototype"]["save"]){
			LayaBKAdpter.window.CanvasRenderingContext2D["prototype"]["save"]=LayaBKAdpter.window.CanvasRenderingContext2D["prototype"]["sava"];
		}
		if (!LayaBKAdpter.window.CanvasRenderingContext2D["prototype"]["transform"]){
			LayaBKAdpter.window.CanvasRenderingContext2D["prototype"]["transform"]=LayaBKAdpter.window.CanvasRenderingContext2D["prototype"]["transforms"];
		}
		LayaBKAdpter.window.focus=function (){
			console.log("window.focus");
		}
		if (!LayaBKAdpter.window.HTMLElement){
			LayaBKAdpter.window.HTMLElement=BKHTMLElement;
		}
		if (!LayaBKAdpter.window.Image){
			LayaBKAdpter.window.Image=BKHTMLImage;
		}
		if (!LayaBKAdpter.window.document)LayaBKAdpter.window.document={};
		LayaBKAdpter.document=LayaBKAdpter.window.document;
		LayaBKAdpter.document.addEventListener=function (type,fun){
			console.log("document.addEventListener:",type,fun);
		};
		LayaBKAdpter.document.getElementsByTagName=function (type){
			console.log("document.getElementsByTagName:",type);
			var rst;
			switch(type){
				case "meta":
					rst=[{"name":"viewport"}];
					break ;
				}
			return rst;
		}
		LayaBKAdpter.document.getElementById=function (){
			return null;
		}
		LayaBKAdpter.document.createElement=function (type){
			console.log("document.createElement:",type);
			var rst;
			switch(type){
				case "meta":
					rst={};
					break ;
				case "canvas":
					rst=new BKCanvas();
					break ;
				case "div":
					rst=new BKHTMLElement();
					break ;
				}
			return rst;
		}
		if (!LayaBKAdpter.document.body)LayaBKAdpter.document.body=new BKHTMLElement();
		LayaBKAdpter.window.navigator={};
		LayaBKAdpter.window.navigator.userAgent="limixiu";
		LayaBKAdpter.window.location={"protocol":"file:","pathname":"GameRes://","search":"" };
		LayaBKAdpter.window.location.reload=function (){};
		LayaBKAdpter.document.location=LayaBKAdpter.window.location;
		Browser.container=new BKHTMLElement();
		LayaBKAdpter.window.requestAnimationFrame=LayaBKAdpter.requestAnimationFrame;
		RunDriver.getPixelRatio=function (){return 1;};
		LocalStorage._baseClass=LocalStorageAdpt;
		InputAdpt.__init();
		LoaderAdpt.__init();
		URLAdpt.__init();
		StageAdpt.__init();
		HTMLImageAdpt.__init();
		BKTypedArrayAdpt._init();
		HTMLCanvasAdpt._init();
		WebGLRenderContext2dAdpt.__init();
		Stage._wgColor=[0,0,0];
		SoundManager._musicClass=BKSound;
		SoundManager._soundClass=BKSound;
	}

	LayaBKAdpter.init=function(){
		if (LayaBKAdpter.isH5)return;
		var t;
		LayaBKAdpter._timerTicker=t=new BK.Ticker();
		t.interval=1;
		t.setTickerCallBack(LayaBKAdpter._mainLoop);
		var context;
		context=new BKContext();
		Browser.context=context;
		RunDriver.now=LayaBKAdpter.now;
		Browser.window.WebSocket=BKWebSocket;
		SocketAdpt.__init();
		LayaBKAdpter.updateStage();
		BKMouseManager.instance.__init__(Laya.stage,null);
		var mouseManager;
		mouseManager=BKMouseManager.instance;
		MouseManager["instance"]=mouseManager;
		RunDriver.createShaderCondition=LayaBKAdpter.createShaderCondition;
		RunDriver.endFinish=LayaBKAdpter.endFinish;
		CharBook.isWan1Wan=true;
		CharBook.scaleFontWithCtx=false;
		DrawToCanvasAdpt._init();
		Browser.onAndriod=/*__JS__ */GameStatusInfo.platform=="android";
		Browser.onIOS=/*__JS__ */GameStatusInfo.platform=="ios";
	}

	LayaBKAdpter.endFinish=function(){
		WebGL.mainContext["glCommit"]();
	}

	LayaBKAdpter.createShaderCondition=function(conditionScript){
		var _$this=this;
		var func=function (){
			var abc=conditionScript;
			return _$this[conditionScript.replace("this.","")];
		}
		return func;
	}

	LayaBKAdpter.updateStage=function(){
		var tRoot;
		tRoot=BK.Director.root;
		tRoot.scale={x:1,y:-1};
		var screenWidth=LayaBKAdpter.getScreenWidth();
		var screenHeight=LayaBKAdpter.getScreenHeight();
		if (Laya.stage.screenMode==/*laya.display.Stage.SCREEN_HORIZONTAL*/"horizontal"){
			tRoot.rotation={x:0,y:0,z:90};
			tRoot.position={x:screenWidth,y:screenHeight};
			BKLaya.LayaBKAdpter._stageMatrix.identity();
			BKLaya.LayaBKAdpter._stageMatrix.rotate(0.5 *Math.PI);
			BKLaya.LayaBKAdpter._stageMatrix.scale(1,-1);
			BKLaya.LayaBKAdpter._stageMatrix.setTranslate(screenWidth,screenHeight);
		}
		else {
			tRoot.rotation={x:0,y:0,z:0};
			tRoot.position={x:0,y:screenHeight};
			BKLaya.LayaBKAdpter._stageMatrix.identity();
			BKLaya.LayaBKAdpter._stageMatrix.scale(1,-1);
			BKLaya.LayaBKAdpter._stageMatrix.setTranslate(0,screenHeight);
		}
	}

	LayaBKAdpter.setStageRotation=function(rotate){
		var tRoot;
		tRoot=BK.Director.root;
		tRoot.scale={x:1,y:-1};
		var screenWidth=LayaBKAdpter.getScreenWidth();
		var screenHeight=LayaBKAdpter.getScreenHeight();
		if (rotate){
			tRoot.rotation={x:0,y:0,z:-90};
			tRoot.position={x:screenWidth,y:screenHeight};
			BKLaya.LayaBKAdpter._stageMatrix.identity();
			BKLaya.LayaBKAdpter._stageMatrix.rotate(0.5 *Math.PI);
			BKLaya.LayaBKAdpter._stageMatrix.scale(1,-1);
			BKLaya.LayaBKAdpter._stageMatrix.setTranslate(screenWidth,screenHeight);
		}
		else {
			tRoot.rotation={x:0,y:0,z:0};
			tRoot.position={x:0,y:screenHeight};
			BKLaya.LayaBKAdpter._stageMatrix.identity();
			BKLaya.LayaBKAdpter._stageMatrix.scale(1,-1);
			BKLaya.LayaBKAdpter._stageMatrix.setTranslate(0,screenHeight);
		}
	}

	LayaBKAdpter.requestAnimationFrame=function(fun){
		LayaBKAdpter._requestAnimationFun=fun;
	}

	LayaBKAdpter._mainLoop=function(ts,duration){
		if (LayaBKAdpter._requestAnimationFun !=null){
			LayaBKAdpter._requestAnimationFun();
		}
	}

	LayaBKAdpter.now=function(){
		return BK.Time.timestamp *1000;
	}

	LayaBKAdpter.window=null;
	LayaBKAdpter.document=null;
	LayaBKAdpter.isH5=false;
	LayaBKAdpter.adptNode=null;
	LayaBKAdpter.YFlip=0;
	LayaBKAdpter.enableInputAdpt=true;
	LayaBKAdpter.gifHolderPath="";
	LayaBKAdpter.version="1.0.1";
	LayaBKAdpter.HORIZONTAL_TYPE=2;
	LayaBKAdpter._preLayaInit=null;
	LayaBKAdpter._timerTicker=null;
	LayaBKAdpter._funList=[];
	LayaBKAdpter._requestAnimationFun=null;
	__static(LayaBKAdpter,
	['_stageMatrix',function(){return this._stageMatrix=new Matrix();}
	]);
	LayaBKAdpter.__init$=function(){
		LayaBKAdpter.isH5=!LayaBKAdpter.isBK();
		LayaBKAdpter._initFirst();;;
	}

	return LayaBKAdpter;
})()


/**
*...
*@author ww
*/
//class BKLaya.tools.DebugTxt
var DebugTxt$1=(function(){
	function DebugTxt(){}
	__class(DebugTxt,'BKLaya.tools.DebugTxt',null,'DebugTxt$1');
	DebugTxt.init=function(){
		if (DebugTxt._txt)return;
		DebugTxt._txt=new Text();
		DebugTxt._txt.pos(100,100);
		DebugTxt._txt.color="#ff00ff";
		DebugTxt._txt.zOrder=999;
		DebugTxt._txt.fontSize=24;
		DebugTxt._txt.text="debugTxt inited";
		Laya.stage.addChild(DebugTxt._txt);
	}

	DebugTxt.getArgArr=function(arg){
		var rst;
		rst=[];
		var i=0,len=arg.length;
		for(i=0;i<len;i++){
			rst.push(arg[i]);
		}
		return rst;
	}

	DebugTxt.dTrace=function(__arg){
		var arg=arguments;
		arg=DebugTxt.getArgArr(arg);
		var str;
		str=arg.join(" ");
		if (DebugTxt._txt){
			DebugTxt._txt.text=str+"\n"+DebugTxt._txt.text;
		}
	}

	DebugTxt.getTimeStr=function(){
		var dateO=/*__JS__ */new Date();
		return dateO.toTimeString();
	}

	DebugTxt.traceTime=function(msg){
		DebugTxt.dTrace(DebugTxt.getTimeStr());
		DebugTxt.dTrace(msg);
	}

	DebugTxt.show=function(__arg){
		var arg=arguments;
		arg=DebugTxt.getArgArr(arg);
		var str;
		str=arg.join(" ");
		if (DebugTxt._txt){
			DebugTxt._txt.text=str;
		}
	}

	DebugTxt._txt=null;
	DebugTxt.I=null;
	return DebugTxt;
})()


/**
*...
*@author ww
*/
//class BKLaya.tools.LimixiuDebugTools
var LimixiuDebugTools=(function(){
	function LimixiuDebugTools(){}
	__class(LimixiuDebugTools,'BKLaya.tools.LimixiuDebugTools');
	LimixiuDebugTools.mSetTimeout=function(fun,delay,_this){
		BK.Director.ticker.setTimeout(fun,delay,_this);
	}

	LimixiuDebugTools.version="1.0.1";
	return LimixiuDebugTools;
})()


/**
*矩阵处理工具
*@author ww
*/
//class BKLaya.tools.MatrixTool
var MatrixTool=(function(){
	function MatrixTool(){}
	__class(MatrixTool,'BKLaya.tools.MatrixTool');
	MatrixTool.decodeMatrix=function(tm){
		var sx=NaN,sy=NaN;
		var rotate=NaN;
		var a=tm.a,b=tm.b,c=tm.c,d=tm.d;
		var angle=Math.atan2(b,a);
		rotate=angle/0.0174532922222222;
		sx=Math.sqrt(a *a+b *b);
		sy=Math.sqrt(c *c+d *d);
		var cx=0;
		cx=Math.cos(angle);
		if (cx !=0){
			sy=d / cx;
			}else{
			sy=-c / Math.sin(angle);
		};
		var rst={};
		rst.rotate=rotate;
		rst.scaleX=sx;
		rst.scaleY=sy;
		rst.x=tm.tx;
		rst.y=tm.ty;
		return rst;
	}

	MatrixTool.makeMatrix=function(rotate,sx,sy,skewX,skewY){
		(sx===void 0)&& (sx=1);
		(sy===void 0)&& (sy=1);
		(skewX===void 0)&& (skewX=0);
		(skewY===void 0)&& (skewY=0);
		var tm;
		tm=new Matrix();
		var skx=(rotate-skewX)*0.0174532922222222;
		var sky=(rotate+skewY)*0.0174532922222222;
		var cx=Math.cos(sky);
		var ssx=Math.sin(sky);
		var cy=Math.sin(skx);
		var ssy=Math.cos(skx);
		tm.a=sx *cx;
		tm.b=sx *ssx;
		tm.c=-sy *cy;
		tm.d=sy *ssy;
		tm.tx=tm.ty=0;
		return tm;
	}

	return MatrixTool;
})()


/**
*文本工具
*@author ww
*/
//class BKLaya.tools.TextTool
var TextTool=(function(){
	function TextTool(){}
	__class(TextTool,'BKLaya.tools.TextTool');
	TextTool.getDefaultStyle=function(){
		var style={
			"fontSize":20,
			"textColor":0xFFFF0000,
			"maxWidth":200,
			"maxHeight":400,
			"width":100,
			"height":200,
			"textAlign":0,
			"bold":1,
			"italic":1,
			"strokeColor":0xFF000000,
			"strokeSize":5,
			"shadowRadius":5,
			"shadowDx":10,
			"shadowDy":10,
			"shadowColor":0xFFFF0000}
		return style;
	}

	TextTool.getColorObj=function(colorStr){
		var color=laya.utils.Color.create(colorStr);
		var rst;
		rst={};
		rst.a=1;
		rst.r=color._color[0];
		rst.g=color._color[1];
		rst.b=color._color[2];
		return rst;
	}

	TextTool.getArgb=function(colorStr){
		if (colorStr.indexOf("#")>=0){
			colorStr=colorStr.replace("#","0xFF");
		}
		return parseInt(colorStr);
	}

	TextTool.getTextStyle=function(styleStr,align){
		var italic=false;
		var bold=false;
		var family=null;
		var size=0;
		var strs=styleStr.split(' ');
		for (var i=0,n=strs.length;i < n;i++){
			var str=strs[i];
			switch (str){
				case 'italic':
					italic=true;
					continue ;
				case 'bold':
					bold=true;
					continue ;
				}
			if (str.indexOf('px')> 0){
				size=parseInt(str);
				family=strs[i+1];
				i++;
				continue ;
			}
		}
		if (!family)family="Arial";
		if (!size)size=12;
		var style;
		style={};
		style.fontSize=size;
		style.width=200;
		style.height=size+4;
		if (bold){
			style.bold=1;
		}
		if (italic){
			style.italic=1;
		}
		switch(align){
			case "right":
				style.textAlign=2;
				break ;
			case "center":
				style.textAlign=1;
				break ;
			default :
				style.textAlign=0;
			}
		return style;
	}

	TextTool.createText=function(style,text){
		var tTxt;
		tTxt=new BK.Text(style,text);
		tTxt.setUVFlip(0,/*BKLaya.LayaBKAdpter.YFlip*/0);
		return tTxt;
	}

	return TextTool;
})()


/**
*Trace工具
*@author ww
*/
//class BKLaya.tools.TraceTool
var TraceTool$1=(function(){
	function TraceTool(){}
	__class(TraceTool,'BKLaya.tools.TraceTool',null,'TraceTool$1');
	TraceTool.runWithTryCatch=function(fun,_this,_param){
		try{
			fun.apply(_this,_param);
			}catch (e){
			TraceTool.trace("runWithTryCatchErr:"+e.message);
			TraceTool.trace("runWithTryCatch stack:"+e.stack);
		}
	}

	TraceTool.initTrace=function(){
		if (LayaBKAdpter.isH5)return;
		var mwindow;
		mwindow=/*__JS__ */window;
		if (!mwindow.console){
			mwindow.console={};
		}
		mwindow.console.log=TraceTool.log;
		mwindow.trace=TraceTool.log;
	}

	TraceTool.getArgArr=function(arg){
		var rst;
		rst=[];
		var i=0,len=arg.length;
		for(i=0;i<len;i++){
			rst.push(arg[i]);
		}
		return rst;
	}

	TraceTool.log=function(__arg){
		var arg=arguments;
		arg=TraceTool.getArgArr(arg);
		var str;
		str=arg.join(" ");
		if (LayaBKAdpter.isH5){
			TraceTool.trace(str);
			}else{
			BK.Script.log(1,0,str);
		}
	}

	TraceTool.trace=function(__arg){
		var arg=arguments;
		if (LayaBKAdpter.isH5){
			Browser.window.console.log.apply(Browser.window.console.log,TraceTool.getArgArr(arg))
			}else{
			TraceTool.log.apply(null,TraceTool.getArgArr(arg));
		}
	}

	TraceTool.traceObj=function(obj){
		TraceTool.tempArr.length=0;
		var key;
		for(key in obj){
			TraceTool.tempArr.push(key+":"+obj[key]);
		};
		var rst;
		rst=TraceTool.tempArr.join("\n");
		TraceTool.trace(rst);
		return rst;
	}

	TraceTool.tempArr=[];
	return TraceTool;
})()


/**
*...
*@author ww
*/
//class BKLaya.adptclass.BKNativeInput extends laya.events.EventDispatcher
var BKNativeInput=(function(_super){
	function BKNativeInput(){
		this._onBtnClick=null;
		this._onTextChange=null;
		this.readOnly=false;
		this.maxLength=0;
		this.type=null;
		this.placeholder=null;
		this._text="";
		BKNativeInput.__super.call(this);
		this._onBtnClick=Utils.bind(this.onBtnClick,this);
		this._onTextChange=Utils.bind(this.onTextChange,this);
	}

	__class(BKNativeInput,'BKLaya.adptclass.BKNativeInput',_super);
	var __proto=BKNativeInput.prototype;
	__proto.focus=function(){
		console.log("native focus");
		BK.Editor.showKeyBoard(this._onBtnClick,this._onTextChange);
	}

	__proto.onBtnClick=function(text){
		console.log("native onBtnClick",text);
		this.value=text;
		if (BK.Editor.hideKeyBoard !=null){
			BK.Editor.hideKeyBoard();
		}
		this.event(/*laya.events.Event.ENTER*/"enter",text);
	}

	__proto.onTextChange=function(text){
		console.log("native onTextChange",text);
		this.value=text;
		this.event(/*laya.events.Event.INPUT*/"input",text);
	}

	__proto.blur=function(){}
	__proto.setFontFace=function(fontFace){}
	__proto.setColor=function(color){}
	__proto.setFontSize=function(fontSize){}
	__getset(0,__proto,'value',function(){
		return this._text;
		},function(v){
		this._text=v;
		if(BK.Editor.setText!=null)
			BK.Editor.setText(v);
	});

	return BKNativeInput;
})(EventDispatcher)


/**
*...
*@author ww
*/
//class BKLaya.bkaudio.BKSound extends laya.events.EventDispatcher
var BKSound=(function(_super){
	function BKSound(){
		this.url=null;
		this.realUrl=null;
		BKSound.__super.call(this);
	}

	__class(BKSound,'BKLaya.bkaudio.BKSound',_super);
	var __proto=BKSound.prototype;
	/**
	*加载声音。
	*@param url 地址。
	*
	*/
	__proto.load=function(url){
		this.url=url;
		if (url.indexOf("http")>=0){
			BKFileCache.getHttpFile(url,new Handler(this,this._httpLoadComplete),".mp3");
			}else{
			this.realUrl=url;
			Laya.timer.frameOnce(2,this,this.event,[ /*laya.events.Event.COMPLETE*/"complete"]);
		}
	}

	__proto._httpLoadComplete=function(cachePath){
		this.realUrl=cachePath;
		Laya.timer.frameOnce(2,this,this.event,[ /*laya.events.Event.COMPLETE*/"complete"]);
	}

	/**
	*播放声音。
	*@param startTime 开始时间,单位秒
	*@param loops 循环次数,0表示一直循环
	*@return 声道 SoundChannel 对象。
	*
	*/
	__proto.play=function(startTime,loops){
		(startTime===void 0)&& (startTime=0);
		(loops===void 0)&& (loops=0);
		var channel=new BKSoundChannel();
		channel.url=this.url;
		channel.realUrl=this.realUrl;
		channel.loops=loops;
		channel.startTime=startTime;
		channel.play();
		return channel;
	}

	/**
	*释放声音资源。
	*
	*/
	__proto.dispose=function(){}
	/**
	*获取总时间。
	*/
	__getset(0,__proto,'duration',function(){
		return 0;
	});

	return BKSound;
})(EventDispatcher)


/**
*...
*@author ww
*/
//class BKLaya.adptclass.BKCanvasRenderContext extends BK.Canvas
var BKCanvasRenderContext=(function(_super){
	function BKCanvasRenderContext(width,height){
		(width===void 0)&& (width=200);
		(height===void 0)&& (height=200);
		BKCanvasRenderContext.__super.call(this,width,height);
		this.size={"width":width,"height":height};
		this.useH5Mode();
	}

	__class(BKCanvasRenderContext,'BKLaya.adptclass.BKCanvasRenderContext',_super);
	var __proto=BKCanvasRenderContext.prototype;
	__proto.strokeText=function(text,x,y){
		var preColor;
		preColor=this.fillColor;
		this.fillColor=BKCanvasRenderContext.voidColor;
		_super.prototype.fillText.call(this,text,x,y);
		this.fillColor=preColor;
	}

	__proto.fillText=function(text,x,y){
		var preColor;
		preColor=this.strokeColor;
		this.strokeColor=BKCanvasRenderContext.voidColor;
		_super.prototype.fillText.call(this,text,x,y);
		this.strokeColor=preColor;
	}

	__proto.fillAndStrokeText=function(text,x,y){
		_super.prototype.fillText.call(this,text,x,y);
	}

	//}
	__proto.sizefun=function(w,h){
		this.size={"width":w,"height":h};
	}

	__proto.scalefun=function(sx,sy){
		this.scale={x:sx,y:sy };
	}

	__getset(0,__proto,'textAlign',null,function(value){
		switch(value){
			case "start":
			case "left":
				this.setTextAlign(0);
				break ;
			case "right":
			case "end":
				this.setTextAlign(2);
				break ;
			case "center":
				this.setTextAlign(1);
				break ;
			}
	});

	__getset(0,__proto,'font',null,function(value){
		var style;
		style=TextTool.getTextStyle(value);
		this.setTextSize(style.fontSize);
		this.setTextBold(style.bold);
		this.setTextItalic(style.italic);
	});

	__getset(0,__proto,'fillStyle',null,function(value){
		this.fillColor=BKColor.getBKColor(value);
	});

	__getset(0,__proto,'strokeStyle',null,function(value){
		this.strokeColor=BKColor.getBKColor(value);
	});

	__static(BKCanvasRenderContext,
	['voidColor',function(){return this.voidColor={r:1,g:1,b:1,a:0 };}
	]);
	return BKCanvasRenderContext;
})(Canvas)


/**
*...
*@author ww
*/
//class BKLaya.bkaudio.BKSoundChannel extends laya.media.SoundChannel
var BKSoundChannel=(function(_super){
	function BKSoundChannel(){
		this.realUrl=null;
		this._endFun=null;
		this._audio=null;
		BKSoundChannel.__super.call(this);
		this._endFun=Utils.bind(this._playEnd,this);
	}

	__class(BKSoundChannel,'BKLaya.bkaudio.BKSoundChannel',_super);
	var __proto=BKSoundChannel.prototype;
	/**
	*播放。
	*/
	__proto.play=function(){
		var type=0;
		if (this.url==SoundManager._bgMusic){
			type=0;
			}else{
			type=1;
		}
		if (this._audio)this._audio.stopMusic();
		this.isStopped=false;
		this._audio=new BK.Audio(type,this.realUrl,this.loops==0?-1:this.loops-1);
		SoundManager.addChannel(this);
		this._audio.startMusic(this._endFun);
	}

	__proto._playEnd=function(){
		if (this.completeHandler){
			Laya.timer.once(10,this,this.__runComplete,[this.completeHandler],false);
			this.completeHandler=null;
		}
		this.stop();
		this.event(/*laya.events.Event.COMPLETE*/"complete");
	}

	/**
	*停止。
	*/
	__proto.stop=function(){
		if (this._audio)this._audio.stopMusic();
		this.isStopped=true;
		SoundManager.removeChannel(this);
	}

	/**
	*暂停。
	*/
	__proto.pause=function(){
		if (this._audio)this._audio.pauseMusic();
	}

	/**
	*继续播放。
	*/
	__proto.resume=function(){
		if (this._audio)this._audio.resumeMusic();
	}

	return BKSoundChannel;
})(SoundChannel)


/**
*...
*@author ww
*/
//class BKLaya.adptcodes.WebGLCharImageAdpt extends laya.resource.Bitmap
var WebGLCharImageAdpt=(function(_super){
	function WebGLCharImageAdpt(){
		this.CborderSize=12;
		//this._ctx=null;
		/***是否创建私有Source*/
		//this._allowMerageInAtlas=false;
		/**是否允许加入大图合集*/
		//this._enableMerageInAtlas=false;
		/**HTML Canvas，绘制字符载体,非私有数据载体*/
		//this.canvas=null;
		/**********************************************************************************/
		//this.cw=NaN;
		//this.ch=NaN;
		//this.xs=NaN;
		//this.ys=NaN;
		//this.char=null;
		//this.fillColor=null;
		//this.borderColor=null;
		//this.borderSize=0;
		//this.font=null;
		//this.fontSize=0;
		//this.texture=null;
		//this.lineWidth=0;
		//this.UV=null;
		//this.isSpace=false;
		//this.underLine=0;
		WebGLCharImageAdpt.__super.call(this);
	}

	__class(WebGLCharImageAdpt,'BKLaya.adptcodes.WebGLCharImageAdpt',_super);
	var __proto=WebGLCharImageAdpt.prototype;
	__proto.recreateResource=function(){
		var bIsConchApp=Render.isConchApp;
		this.onresize(this.cw+this.CborderSize *2,this.ch+this.CborderSize *2);
		this.canvas && (this.canvas.height=/*no*/this._h,this.canvas.width=/*no*/this._w);
		if (bIsConchApp){
			var nFontSize=this.fontSize;
			if (this.xs !=1 || this.ys !=1){
				nFontSize=parseInt(nFontSize *((this.xs > this.ys)? this.xs :this.ys)+"");
			};
			var sFont="normal 100 "+nFontSize+"px Arial";
			if (this.borderColor){
				sFont+=" 1 "+this.borderColor;
			}
			this._ctx.font=sFont;
			this._ctx.textBaseline="top";
			this._ctx.fillStyle=this.fillColor;
			this._ctx.fillText(this.char,this.CborderSize,this.CborderSize,null,null,null);
			}else {
			this._ctx.save();
			(this._ctx).clearRect(0,0,this.cw+this.CborderSize *2,this.ch+this.CborderSize *2);
			this._ctx.font=this.font;
			if (Text.RightToLeft){
				this._ctx.textAlign="end";
				}else{
				this._ctx.textAlign="left";
			}
			this._ctx.textBaseline="top";
			this._ctx.translate(this.CborderSize,this.CborderSize);
			if (this.xs !=1 || this.ys !=1){
				this._ctx.scale(this.xs,this.ys);
			}
			if (this.fillColor && this.borderColor){
				this._ctx.strokeStyle=this.borderColor;
				this._ctx.lineWidth=this.lineWidth;
				this._ctx.fillStyle=this.fillColor;
				debugger;
				this._ctx.fillAndStrokeText(this.char,0,0,null,null,null);
				}else {
				if (this.lineWidth===-1){
					this._ctx.fillStyle=this.fillColor ? this.fillColor :"white";
					this._ctx.fillText(this.char,0,0,null,null,null);
					}else {
					this._ctx.strokeStyle=this.borderColor?this.borderColor:'white';
					this._ctx.lineWidth=this.lineWidth;
					this._ctx.strokeText(this.char,0,0,null,null,0,null);
				}
			}
			if (this.underLine){
				this._ctx.lineWidth=1;
				this._ctx.strokeStyle=this.fillColor;
				this._ctx.beginPath();
				this._ctx.moveTo(0,this.fontSize+1);
				var nW=this._ctx.measureText(this.char).width+1;
				this._ctx.lineTo(nW,this.fontSize+1);
				this._ctx.stroke();
			}
			this._ctx.restore();
		}
		this.borderSize=this.CborderSize;
		/*no*/this.completeCreate();
	}

	__proto.onresize=function(w,h){
		/*no*/this._w=w;
		/*no*/this._h=h;
		this._allowMerageInAtlas=true;
	}

	WebGLCharImageAdpt._init=function(){
		var replaceFuns;
		replaceFuns=["recreateResource"];
		FunctionReplaceTool.replaceClassFuns(laya.webgl.resource.WebGLCharImage,WebGLCharImageAdpt,replaceFuns);
	}

	return WebGLCharImageAdpt;
})(Bitmap)


	Laya.__init([LayaBKAdpter]);
})(window,document,Laya);

if (typeof define === 'function' && define.amd){
	define('laya.core', ['require', "exports"], function(require, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        for (var i in Laya) {
			var o = Laya[i];
            o && o.__isclass && (exports[i] = o);
        }
    });
}