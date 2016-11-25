/*
.detach()

Description:
  Remove the set of matched elements from the DOM.
  http://api.jquery.com/detach/


Signatures: 
  .detach( ) => jQuery

  .detach( selector [String] ) => jQuery
    selector
      Type: String
      A selector expression that filters the set of matched elements to be removed.


*/
detach: function(selector) {  
  __ITERATE__(<@ this.filter(selector||'*').e @>, <@ function(el) {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  } @>);
  return this;
}

