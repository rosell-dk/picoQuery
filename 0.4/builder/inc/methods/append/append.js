/*
.append() 

Description:
  Insert content, specified by the parameter, to the end of each element in the set of matched elements.
  http://api.jquery.com/append/

Fully supported signatures:   
  .append( content [,content] ) => jQuery  (Retrieve one of the elements matched by the jQuery object.)     
     content [htmlString or Element or Text or Array or jQuery]

Unsupported signatures:   

  .append( function ) => jQuery
*/

append: function(a) {
  __DOM_MANIP__(this, arguments, 1, function(elem) {
		return null;
	});
  return this;
}

