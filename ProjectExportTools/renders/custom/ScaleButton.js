
(function(window,document,Laya){
	var __un=Laya.un,__uns=Laya.uns,__static=Laya.static,__class=Laya.class,__getset=Laya.getset,__newvec=Laya.__newvec;

	var Button=laya.editorUI.Button,Event=laya.events.Event,Tween=laya.utils.Tween;
	//class component.ScaleButton extends laya.editorUI.Button
	var ScaleButton=(function(_super){
		function ScaleButton(skin,label){
			this.scaleTime=100;
			(label===void 0)&& (label="");
			ScaleButton.__super.call(this,skin,label);
			this.stateNum=1;
			this.on("mousedown",this,this.scaleSmal);
			this.on("mouseup",this,this.scaleBig);
			this.on("mouseout",this,this.scaleBig);
		}

		__class(ScaleButton,'component.ScaleButton',_super);
		var __proto=ScaleButton.prototype;
		__proto.scaleBig=function(){
			Tween.to(this,{scaleX:1,scaleY:1},this.scaleTime);
		}

		__proto.scaleSmal=function(){
			Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
		}

		return ScaleButton;
	})(Button)



})(window,document,Laya);
