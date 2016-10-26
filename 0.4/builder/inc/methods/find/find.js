/*
.find()

Description:
  Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.
  http://api.jquery.com/find/


Fully supported signatures: 
  .find( selector [String] ) => jQuery
  .find( selector [Element or jQuery]) => jQuery


*/
find: function(selector) {
  var arr=[];
  if (__IS_STRING__(<@ selector @>)) {
    __ITERATE__(<@ this.e @>, <@ function(item) {
      arr = arr.concat($(selector, item).e);      
    } @>);
    arr = <@ __REMOVE_DUPLICATES__(<@ arr @>);
  }
  else {
    var searchInItems = this.e;
    arr = $(selector).e.filter(function(searchForItem) {
      return searchInItems.some(function(searchInItem) {
        var node = searchForItem;
        while (node && (node = node.parentNode)) {
          if (node === searchInItem) return true
        }
      });
    });
  }
  return __PUSH_STACK__(<@ arr @>);
}

