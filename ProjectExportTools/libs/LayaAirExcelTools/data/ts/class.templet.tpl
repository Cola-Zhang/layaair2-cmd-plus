module {#@package#} {
    export class {#@className#}Data{
        constructor(){}
        public static sheet():Sheet
        {
            return Sheet.get("{#@className#}");
        }
        public static getData(id:number):{#@className#}Data {
			return Sheet.getData("{#@className#}", id);
		}
		public static getByID(id:number):{#@className#}Data {
			return Sheet.getByID("{#@className#}", id);
		}
{#@vars#}
    }
}