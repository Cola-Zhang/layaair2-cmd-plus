package {#@package#} 
{
    import laya.data.Sheet;
	import laya.data.MessageBase;
	public class {#@className#}Data extends MessageBase
	{
		public static function sheet():Sheet {
			return Sheet.get("{#@className#}");
		}
		
		public static function getData(id:int):{#@className#}Data {
			return Sheet.getData("{#@className#}", id);
		}
				
		public static function getByID(id:String):{#@className#}Data {
			return Sheet.getByID("{#@className#}", id);
		}
{#@vars#}
		public function notify(prop:String):void {
			Sheet.notify("{#@className#}."+prop);
			Sheet.notify("{#@className#}");
		}
		
		public static const DES:Array = [
{#@varsDes#}
		];
	}
	
}
