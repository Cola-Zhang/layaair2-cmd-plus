package {#@package#} 
{
    import laya.data.Sheet;
	public class {#@className#}Data  
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
	}
	
}
