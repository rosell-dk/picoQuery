/*
parent

Description:
  Get the parent of each element in the current set of matched elements, optionally filtered by a selector.
  http://api.jquery.com/parent/

Fully supported signatures: 
  .parent( [selector] ) => String
    selector [String]: 
      A string containing a selector expression to match elements against.

  Done: $(document).parent() should return an jQuery object, which has length = 0
        right now, it has a null element

  Done: Duplicate items should be removed, so ie $('li').parent('ul') only returns as
        many ul's that there are in the document
 */
parent: function(selector) {
//  return $(this.e.map(function(a){return a['parentNode']})).filter(selector||'*');

  // Map elements to their parent node
  var arr = this.e.map(function(a){return a['parentNode']});

  arr = __REMOVE_DUPLICATES_AND_NULLS__(<@ arr @>);

  __RETURN_PUSH_STACK_JQ__(<@ $(arr).filter(selector||'*') @>)

//  return selector ? $(arr).filter(selector) : $(arr);

}

