
(function(window,document,Laya){
	var __un=Laya.un,__uns=Laya.uns,__static=Laya.static,__class=Laya.class,__getset=Laya.getset,__newvec=Laya.__newvec;

	var Button$1=laya.ui.Button,Event=laya.events.Event,Image=laya.ui.Image,Sprite=laya.display.Sprite;
	/**
	*...
	*@author ww
	*/
	//class laya.editorwithpanel.EditorWithPanel extends laya.display.Sprite
	var EditorWithPanel=(function(_super){
		function EditorWithPanel(){
			this.disablePivot=true;
			this.isSelectState=false;
			EditorWithPanel.__super.call(this);
			this.graphics.drawRect(0,0,100,100,"#ff0000");
			this.size(100,100);
		}

		__class(EditorWithPanel,'laya.editorwithpanel.EditorWithPanel',_super);
		var __proto=EditorWithPanel.prototype;
		__proto.setIDESelectState=function(isSelect){
			if (isSelect){
				EditorPanel.I.show(this);
				}else {
				EditorPanel.I.hide(this);
			}
			this.isSelectState=isSelect;
		}

		return EditorWithPanel;
	})(Sprite)


	/**
	*...
	*@author ww
	*/
	//class laya.editorwithpanel.EditorPanel extends laya.ui.Image
	var EditorPanel=(function(_super){
		function EditorPanel(){
			this.button=null;
			this._tar=null;
			EditorPanel.__super.call(this);
			this.skin="view/backmain.png";
			this.size(200,200);
			this.button=new Button$1();
			this.button.skin="comp/button.png";
			this.addChild(this.button);
			this.top=5;
			this.right=5;
		}

		__class(EditorPanel,'laya.editorwithpanel.EditorPanel',_super);
		var __proto=EditorPanel.prototype;
		__proto.show=function(tar){
			if (this._tar){
				this._tar.off(/*laya.events.Event.UNDISPLAY*/"undisplay",this,this.hide);
			}
			this._tar=tar;
			if (this._tar){
				this._tar.on(/*laya.events.Event.UNDISPLAY*/"undisplay",this,this.hide,[this._tar]);
			}
			Laya.stage.addChild(this);
		}

		__proto.hide=function(tar){
			if (tar !=this._tar)return;
			this.removeSelf();
		}

		__getset(1,EditorPanel,'I',function(){
			if (!EditorPanel._I)EditorPanel._I=new EditorPanel();
			return EditorPanel._I;
		},laya.ui.Image._$SET_I);

		EditorPanel._I=null
		return EditorPanel;
	})(Image)



})(window,document,Laya);
