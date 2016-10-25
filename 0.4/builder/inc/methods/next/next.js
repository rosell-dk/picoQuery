/*
next

Description:
  Get the immediately following sibling of each element in the set of matched elements. If a selector is provided, it retrieves the next sibling only if it matches that selector.
  http://api.jquery.com/next/

Fully supported signatures: 
  .next( [selector] ) => jQuery
    selector [String]: 
      A string containing a selector expression to match elements against.

 */
next: function(selector) {
  var arr = this.e.map(function(a){return a["nextElementSibling"]}); 

  // Remove nulls
  arr = arr.filter(function(item,i,r){return item != null});
//  return $(arr).filter(selector||"*");
  __RETURN_PUSH_STACK_JQ__(<@ $(arr).filter(selector||"*") @>)
}

