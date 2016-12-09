offsetParent: function() {
  __RETURN_PUSH_STACK_JQ__(<@ $(__MAP__(<@ this.e @>, <@ function(el) {
		var offsetParent = el.offsetParent;

		while ( offsetParent && getComputedStyle(offsetParent)["position"] == "static" ) {
			offsetParent = offsetParent.offsetParent;
		}

		return offsetParent || d.documentElement;
  } @>)) @>)
}

