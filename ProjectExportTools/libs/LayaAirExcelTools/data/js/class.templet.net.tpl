//class {#@package#}.{#@className#}Data
	var {#@className#}Data=(function(){
		function {#@className#}Data(){
{#@varInits#}		
		}

		__class({#@className#}Data,'{#@package#}.{#@className#}Data');
		var __proto={#@className#}Data.prototype;
		__proto.notify=function(prop){
			Sheet.notify("{#@className#}."+prop);
			Sheet.notify("{#@className#}");
		}

		{#@className#}Data.sheet=function(){
			return Sheet.get("{#@className#}");
		}

		{#@className#}Data.getData=function(id){
			return Sheet.getData("{#@className#}",id);
		}
		
		{#@className#}Data.getByID=function(id){
			return Sheet.getByID("{#@className#}",id);
		}
{#@vars#}
		return {#@className#}Data;
	})()