/*
.closest()

Description:
  For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
  http://api.jquery.com/closest/


Fully supported signatures: 
  .closest( selector ) => jQuery
  .closest( selector, context ) => jQuery
  .closest( selection ) => jQuery
  .closest( element ) => jQuery


*/
closest: function(selector, context) {
  var arr = this.e.map(function(elm){
    while (elm) {
      if (elm == context) {
        // no hit
        return null;
      }
      if (~$(selector, $(elm).parent().e[0]).e.indexOf(elm)) {
        return elm;
      }
      elm = elm.parentNode;
    }
  });
  arr = arr.filter(function(item,i,r){
    return item && r.indexOf(item) == i
  });
  // Wrap
  return $(arr);
}

// OPTIMIZED_VERSION //
/*
I put this half-optimized version into Closure Compiler:

closest:function(selector, context) {
  return $(this.e.map(function(elm){
    while (elm) {
      if (elm == context) {
        // Instead of returning null, we return 0 in this optimized version
        // It will be filtered out in the filter() call
        return 0;
      }
      if (~$(selector, $(elm).parent().e[0]).e.indexOf(elm)) {
        return elm;
      }
      elm = elm.parentNode;
    }
  }).filter(function(item,i,r) {
    return item && r.indexOf(item) == i
  }));
}
*/
closest:function(b, c) {
  return $(this.e.map(function(a) {
    for (;a;) {
      if (a == c) {
        return 0;
      }
      if (~$(b, $(a).parent().e[0]).e.indexOf(a)) {
        return a;
      }
      a = a.parentNode;
    }
  }).filter(function(a, b, c) {
    return a && c.indexOf(a) == b;
  }));
}
