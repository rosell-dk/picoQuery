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
  
//  var $sel = ;
  __ITERATE__(<@ this.filter(selector||'*').e @>, <@ function(el) {
    if (el.parentNode) {
      __CLEAN_DATA__(<@ el @>);
      el.parentNode.removeChild(el);
    }
  } @>);
  return this;
}

