/*
.remove()

Description:
  Remove the set of matched elements from the DOM.
  http://api.jquery.com/remove/


Fully supported signatures: 
  .remove( ) => jQuery

  .remove( selector [String] ) => jQuery
    selector
      Type: String
      A selector expression that filters the set of matched elements to be removed.


*/
remove: function(selector) {
  /* without support for selector, its as simple as this: */
/*
  this.e.forEach(function(item) {
    if (item.parentNode) {
      item.parentNode.removeChild(item);
    }
  });
  return this;
*/
  
  var $sel = this.filter(selector||'*');
  $sel.e.forEach(function(item) {
    if (item.parentNode) {
      item.parentNode.removeChild(item);
    }
  });
  return this;
  
//  var arr = this.e.map(function(item){return __TO_ARRAY__(<@ a['children'] @>)});


//  return $(arr).filter(selector||'*');

}

