/*
.prepend() 

Description:
  Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.
  http://api.jquery.com/prepend/

Fully supported signatures (TODO: test):   
  .prepend( content [,content] ) => jQuery
     content [htmlString or Element or Text or Array or jQuery]
      DOM element, text node, array of elements and text nodes, HTML string, or jQuery object to insert at the beginning of each element in the set of matched elements


  Unsupported signatures:   
  .prepend( function ) => jQuery
*/

prepend: function(a) {
  __DOM_MANIP__(<@ this @>, <@ arguments @>, <@ 1 @>, <@ function(elem) {
		return elem.firstChild;
	} @>);
  return this;
}

