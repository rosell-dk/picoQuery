/*
.addBack()

Description:
  Add the previous set of elements on the stack to the current set, optionally filtered by a selector.
  http://api.jquery.com/addBack/

Signatures: 
  .addBack( ) => jQuery
  .addBack( selector ) => jQuery

 */
addBack: function(selector) {
	return this.add( selector ? this.prevObject.filter(selector) : this.prevObject);
}

