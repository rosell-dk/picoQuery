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

  if (typeof selector == "string") {
    // First shot:
    var arr=[];
    __ITERATE__(<@ this.e @>, <@ function(item) {
      arr = arr.concat($(selector, item).e);      
    } @>);

    // Remove duplicates
    // Note that this code does not work with prototype 1.7.
    // (see parent.inc)
    // Here is a prototype 1.7 compatible variant:
    // arr = arr.filter(function(item,i,r){return arr.indexOf(item) == i});

    arr = arr.filter(function(item,i,r){return r.indexOf(item) == i});

    return $(arr);

    // First map, then flatten approach:
    // (map elements to querySelectorAll searches)
    /*
    var arr = this.e.map(function(item, index) {
      return $(selector, item).e;
    });
    // Flatten
    arr = [].concat.apply([], arr);
    // Remove duplicates
    arr = arr.filter(function(item,i,r){return r.indexOf(item) == i});
    return $(arr);
    */

    // TODO: Try a variation of First shot, where we do not insert duplicates
    // (an extra loop, and indexOf())


  }
//  else if (selector instanceof P) {
  else {
    /* First shot: 
       (ignoring that "element.contains()" isn't supported in all our targetted browsers) */
    /*
    var arr = [];
    __ITERATE__(<@ this.e @>, <@ function(searchInItem) {
      __ITERATE__(<@ selector.e @>, <@ function(searchForItem) {
        if (searchInItem.contains(searchForItem)) {
          arr.push(searchForItem);
        }
      } @>);
    } @>);
    return $(arr);
    */

    /* We can of course switch the loops: */
/*
    var arr = [];
    var searchInItems = this.e;
    __ITERATE__(<@ selector.e @>, <@ function(searchForItem) {
      __ITERATE__(<@ searchInItems @>, <@ function(searchInItem) {
        if (searchInItem.contains(searchForItem)) {
          arr.push(searchForItem);
        }
      } @>);
    } @>);
    return $(arr);*/
        
    // Instead of first loop, we can use filter
    // - the goal is after all to eliminate
    /*
    var searchInItems = this.e;
    var arr = selector.e.filter(function(element) {
      var inAnyParents = false;
      __ITERATE__(<@ searchInItems @>, <@ function(searchInItem) {
        if (searchInItem.contains(element)) {
          inAnyParents = true;
        }      
      } @>);
      return inAnyParents;
    });
    return $(arr);
*/
    // The second loops function is to find out if any element in 
    // searchInItems array forfills a certain criteria
    // But that function already exists - array.prototype.some():
    // The some() method tests whether some element in the array passes the test implemented by the provided function.
    /*
    var searchInItems = this.e;
    var arr = selector.e.filter(function(searchForItem) {
      return searchInItems.some(function(searchInItem) {
        return searchInItem.contains(searchForItem);
      });
    });
    return $(arr);*/

    // Next, we need to implement our own contains() function,
    // as .contains() isn't supported in all our targetted browsers
/*
    var searchInItems = this.e;
    var arr = selector.e.filter(function(searchForItem) {
      return searchInItems.some(function(searchInItem) {
        var node = searchForItem;
        while (node && (node = node.parentNode)) {
          if (node === searchInItem) return true
        }
      });
    });
    return $(arr);*/

    // Next, we must also support when selector is an Element.
    // By wrapping selector in $, we have code that works both when selector is jQuery and Element
    var searchInItems = this.e;
    var arr = $(selector).e.filter(function(searchForItem) {
      return searchInItems.some(function(searchInItem) {
        var node = searchForItem;
        while (node && (node = node.parentNode)) {
          if (node === searchInItem) return true
        }
      });
    });
    return $(arr);


    //});

/*
    return $(selector).filter(function(){
      var node = this
      return emptyArray.some.call($this, function(parent){
        return $.contains(parent, node)
      })
    })*/

    
//    parent !== node && parent.contains(node)

/*
  zepto implementation:
  var result = $(selector).filter(function(){
      var node = this
      return emptyArray.some.call($this, function(parent){
        return $.contains(parent, node)
      })
    })

  $.contains = document.documentElement.contains ?
    function(parent, node) {
      return parent !== node && parent.contains(node)
    } :
    function(parent, node) {
      while (node && (node = node.parentNode))
        if (node === parent) return true
      return false
    }
*/


  }
}

