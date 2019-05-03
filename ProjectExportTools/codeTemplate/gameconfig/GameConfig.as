package {
{!import!}	
	/**
	 * 游戏初始化配置
	 */
	public class GameConfig {
		public static var width:int = {!designWidth!};
		public static var height:int = {!designHeight!};
		public static var scaleMode:String = "{!scaleMode!}";
		public static var screenMode:String = "{!screenMode!}";
		public static var alignV:String = "{!alignV!}";
		public static var alignH:String = "{!alignH!}";
		public static var startScene:* = {!startSceneSimple!};
		public static var sceneRoot:String = "{!sceneRoot!}";
		public static var debug:Boolean = {!debug!};
		public static var stat:Boolean = {!stat!};
	}
}