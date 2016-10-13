/*
.replaceWith() 

Description:
  Replace each element in the set of matched elements with the provided new content and return the set of elements that was removed
  http://api.jquery.com/replaceWith/

Signatures:
  .replaceWith( newContent ) => jQuery
    Type: htmlString or Element or Array or jQuery
    The content to insert. May be an HTML string, DOM element, array of DOM elements, or jQuery object.

  .replaceWith( function ) => jQuery
    Type: Function()
    A function that returns content with which to replace the set of matched elements.

*/

replaceWith: function(newContent) {
  this.before(newContent).remove();
  return this;
}

// OPTIMIZED_VERSION //
replaceWith:function(a,aa,aaa) {
  this.before(a).remove();
  return this;
}
