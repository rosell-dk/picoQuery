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
  var arr = this.e.map(function(a){return a["previousElementSibling"]}); 

  // Remove nulls
  arr = arr.filter(function(item,i,r){return item != null});
  return $(arr).filter(selector||"*");
}

