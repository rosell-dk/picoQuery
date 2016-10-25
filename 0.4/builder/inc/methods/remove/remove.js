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
  
  var $sel = this.filter(selector||'*');
  $sel.e.forEach(function(item) {
    if (item.parentNode) {
      item.parentNode.removeChild(item);
    }
  });
  return this;
}

