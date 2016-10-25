/*
.pushStack()

Description:
  Add a collection of DOM elements onto the jQuery stack.
  http://api.jquery.com/pushStack/

Signatures: 
  .pushStack( elements ) => jQuery
    elements
      Type: Array
      An array of elements to push onto the stack and make into a new jQuery object.

  .pushStack( elements, name, arguments ) => jQuery
    elements
      Type: Array
      An array of elements to push onto the stack and make into a new jQuery object.
    name
      Type: String
      The name of a jQuery method that generated the array of elements.
    arguments
      Type: Array
      The arguments that were passed in to the jQuery method (for serialization).

 */
pushStack: function(elements) {
  var ret = $(elements);
  ret.prevObject = this;
  return ret;
}

