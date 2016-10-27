/*
.add()

Description:
  Create a new jQuery object with elements added to the set of matched elements.
  http://api.jquery.com/add/

Signatures: 
  .add( ) => jQuery

 */
add: function(a, aa) {
//  return this.prevObject || $();
  var arr = $.merge(this.e, $(a,aa).e);
  arr = __REMOVE_DUPLICATES__(<@ arr @>);
  return __PUSH_STACK__(<@ arr @>);
}

