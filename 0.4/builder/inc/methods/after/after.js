/*
.after()

Description:
   Insert content, specified by the parameter, after each element in the set of matched elements.
   http://api.jquery.com/after/
*/
after: function(a) {
/*
  __DOM_MANIP__(this, arguments, function(elem) {
		if ( this.parentNode ) {
			this.parentNode.insertBefore( elem, this.nextSibling );
		}
	});
*/
  __DOM_MANIP__(this, arguments, 0, function(elem) {
		return elem.nextSibling;
	});
  return this;
}

