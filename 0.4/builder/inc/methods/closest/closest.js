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

