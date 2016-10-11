/*
.before()

Description:
  Insert content, specified by the parameter, before each element in the set of matched elements
  http://api.jquery.com/before/

Signatures: 
  .before( content ) => jQuery
      content
        Type: htmlString or Element or Text or Array or jQuery
        HTML string, DOM element, text node, array of elements and text nodes, or jQuery object to insert before each element in the set of matched elements.

  .before( content, content, ... ) => jQuery

  .before( function ) => jQuery
    function
      Type: Function( Integer index ) => htmlString or Element or Text or jQuery
      A function that returns an HTML string, DOM element(s), text node(s), or jQuery object to insert before each element in the set of matched elements. Receives the index position of the element in the set as an argument. Within the function, this refers to the current element in the set.

  .before( function-html ) => jQuery
    function-html
      Type: Function( Integer index, String html ) => htmlString or Element or Text or jQuery
      A function that returns an HTML string, DOM element(s), text node(s), or jQuery object to insert before each element in the set of matched elements. Receives the index position of the element in the set and the old HTML value of the element as arguments. Within the function, this refers to the current element in the set.

*/
before: function(a) {
  __DOM_MANIP__(this, arguments, 0, function(elem) {
		return elem;
	});
  return this;
}

// OPTIMIZED_VERSION //
before:function(a,aa,aaa) {
   __DOM_MANIP__(this, arguments, 0, function(b) {
	  return b;
  });
  return this;
}
