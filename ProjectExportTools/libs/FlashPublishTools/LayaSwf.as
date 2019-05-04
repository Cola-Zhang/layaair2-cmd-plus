package
{
	import flash.display.Sprite;
	import laya.flash.Window;
	[SWF(frameRate="60",height="800",width="800")]
	public class LayaSwf extends Sprite
	{
		public function LayaSwf(){
			//发布flash版本,请把Main改为自己的文档类
			Window.start(this,Main);
		}
	}
}