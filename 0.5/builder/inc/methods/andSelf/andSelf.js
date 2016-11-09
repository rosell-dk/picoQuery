/*
.andSelf()

Description:
  Add the previous set of elements on the stack to the current set.
  http://api.jquery.com/andSelf/

Signatures: 
  .andSelf( ) => jQuery
 */
andSelf: function() {
	return this.add(this.prevObject);
}

