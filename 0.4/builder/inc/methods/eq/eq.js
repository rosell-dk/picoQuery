/*
.eq() 

Description:
  Reduce the set of matched elements to the one at the specified index.
  http://api.jquery.com/eq/

Signatures:   
  .eq( index ) => jQuery
    index
      Type: Integer
      An integer indicating the 0-based position of the element.

  .eq( indexFromEnd ) => jQuery
    indexFromEnd
      Type: Integer
      An integer indicating the position of the element, counting backwards from the last element in the set.

*/

eq: function(a) {
  return __PUSH_STACK_SINGLE__(<@ this.e[a<0?this.e.length+a:a] @>);

//  return $(this.e[a<0?this.e.length+a:a]);
/* zepto implementation:
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
*/
//  return a === -1 ? Array.prototype.slice(a) : Array.prototype.slice(a, + a + 1)
}

