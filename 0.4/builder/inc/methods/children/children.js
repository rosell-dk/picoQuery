/*
children

Description:
  Get the children of each element in the set of matched elements, optionally filtered by a selector
  http://api.jquery.com/children/

Fully supported signatures: 
  .children( [selector] ) => jQuery
    selector [String]: 
      A string containing a selector expression to match elements against.

 */
children: function(selector) {

  // First map, then flatten-approach
  var arr = __MAP__(<@ this.e @>, <@ function(a){return __TO_ARRAY__(<@ a['children'] @>)} @>);
  arr = __FLATTEN__(<@ arr @>);

  __RETURN_PUSH_STACK_JQ__(<@ $(arr).filter(selector||'*') @>)
//  return __PUSH_STACK_JQ__(<@ $(arr).filter(selector||'*') @>);

}

