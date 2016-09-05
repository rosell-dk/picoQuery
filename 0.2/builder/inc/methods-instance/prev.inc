/*
next

Description:
  Get the immediately preceding sibling of each element in the set of matched elements. If a selector is provided, it retrieves the previous sibling only if it matches that selector.
  http://api.jquery.com/prev/

Fully supported signatures: 
  .prev( [selector] ) => String
    selector [String]: 
      A string containing a selector expression to match elements against.

 */
prev: function(selector) {
  // If we were optimizing for speed, we would only make the filter call,
  // when selector was supplied...
  return $(this.e.map(function(el){return el['previousElementSibling']})).filter(selector||'*');
}

// OPTIMIZED_VERSION //
prev: function(a) {
  return $(this.e.map(function(b){return b['previousElementSibling']})).filter(a||'*')
}
