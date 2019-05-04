
		_{#@name#}:{#@type#};
		get {#@name#}():{#@type#} {
			return this._{#@name#};
		}
		
		set {#@name#}(value:{#@type#}) {
			this._{#@name#} = value;
			this.notify("{#@name#}");
		}