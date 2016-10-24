/*
.empty()

Description:
  Remove all child nodes of the set of matched elements from the DOM.
  http://api.jquery.com/empty/


Fully supported signatures: 
  .empty() => jQuery


*/
empty: function() {
  __ITERATE__(<@ this.e @>, <@ function(item) {
    item.innerHTML = '';
  } @>);
  return this;
}

