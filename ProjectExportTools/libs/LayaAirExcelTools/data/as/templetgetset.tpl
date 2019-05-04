
		public static const {#@nameUper#}_FIELD:String = "{#@name#}";
		private var _{#@name#}:{#@type#};
		/**
		 * {#@comment#}
		 */
		public function get {#@name#}():{#@type#} {
			return _{#@name#};
		}
		
		public function set {#@name#}(value:{#@type#}):void {
			_{#@name#} = value;
			notify("{#@name#}");
		}