	/**
	*游戏初始化配置
	*/
	//class GameConfig
	var GameConfig=(function(){
		function GameConfig(){};
		Laya.class(GameConfig,'GameConfig');
		GameConfig.width={!designWidth!};
		GameConfig.height={!designHeight!};
		GameConfig.scaleMode="{!scaleMode!}";
		GameConfig.screenMode="{!screenMode!}";
		GameConfig.alignV="{!alignV!}";
		GameConfig.alignH="{!alignH!}";
		GameConfig.startScene= {!startScene!};
		GameConfig.sceneRoot= "{!sceneRoot!}";
		GameConfig.debug={!debug!};
		GameConfig.stat={!stat!};
		return GameConfig;
	})()