/*
parent

Description:
  Get the children of each element in the set of matched elements, optionally filtered by a selector
  http://api.jquery.com/children/

Fully supported signatures: 
  .children( [selector] ) => jQuery
    selector [String]: 
      A string containing a selector expression to match elements against.

 */
children: function(selector) {

  // Simple implementation using one forEach and concat()
  var arr = [];
  this.e.forEach(function(el) {
    arr = arr.concat(__TO_ARRAY__(el.children));
  });
  return $(arr).filter(selector||'*');

  // Simple implementation using two forEach
/*
  var arr = [];
  this.e.forEach(function(el) {
    __TO_ARRAY__(el.children).forEach(function(child) {
      arr.push(child);
    })
  });
  return $(arr);*/

  // Attempt at zepto approach
  // Map elements to their children node
//  var arr = this.e.map(function(a){return __TO_ARRAY__(a['children'])});


  // zepto implementation:
  /* return filtered(this.map(function(){ return children(this) }), selector)
  function children(element) {
    return 'children' in element ?
      slice.call(element.children) :
      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
  }*/
  // We can assume that element.children is supported


//  return $(this.e.map(function(a){return a['parentNode']})).filter(selector||'*');

  // element.children returns a live HTMLCollection. We need to convert it to
  // ordinary array
  // https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children

  // Map elements to their children node
//  var arr = this.e.map(function(a){return __TO_ARRAY__(a['children'])});

  // Flatten
//  arr = arr.concat
//  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
/*
    concat: function(){
      var i, value, args = []
      for (i = 0; i < arguments.length; i++) {
        value = arguments[i]
        args[i] = zepto.isZ(value) ? value.toArray() : value
      }
      return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)
    },
*/

  // Remove duplicates
//  arr = arr.filter(function(item,i,r){return r.indexOf(item) == i});

  // Remove nulls
//  arr = arr.filter(function(item,i,r){return item != null});


  // Remove duplicats and nulls
//  arr = arr.filter(function(item,i,r){return item && r.indexOf(item) == i});



  // Wrap and filter
  return $(arr).filter(selector||'*');

  // 
//  return selector ? $(arr).filter(selector) : $(arr);

}

// OPTIMIZED_VERSION //
children: function(a) {
  z = [];
  this.e.forEach(function(b) {
    z = z.concat(__TO_ARRAY__(b.children));
  });
  return $(z).filter(a||'*');
}

