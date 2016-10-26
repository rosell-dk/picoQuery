## When selector is string:

  ### Variant 1: "First shot". SELECTED
  var arr=[];
  __ITERATE__(<@ this.e @>, <@ function(item) {
    arr = arr.concat($(selector, item).e);
  } @>);

  arr = __REMOVE_DUPLICATES__(<@ arr @>);
  return __PUSH_STACK__(<@ arr @>);


  ### Variant 2: "First map, then flatten approach"

  // map elements to querySelectorAll searches
  var arr = this.e.map(function(item, index) {
    return $(selector, item).e;
  });
  // Flatten
  arr = [].concat.apply([], arr);
  // Remove duplicates
  arr = arr.filter(function(item,i,r){return r.indexOf(item) == i});
  return $(arr);


  // Idea: Try a variation of First shot, where we do not insert duplicates
  // (an extra loop, and indexOf())

## When selector is string:

### Variation 1: "First shot"
- which ignores that "element.contains()" isn't supported in all our targetted browsers!

var arr = [];
__ITERATE__(<@ this.e @>, <@ function(searchInItem) {
  __ITERATE__(<@ selector.e @>, <@ function(searchForItem) {
    if (searchInItem.contains(searchForItem)) {
      arr.push(searchForItem);
    }
  } @>);
} @>);
return $(arr);

### Variation 2: - loops switched
var arr = [];
var searchInItems = this.e;
__ITERATE__(<@ selector.e @>, <@ function(searchForItem) {
  __ITERATE__(<@ searchInItems @>, <@ function(searchInItem) {
    if (searchInItem.contains(searchForItem)) {
      arr.push(searchForItem);
    }
  } @>);
} @>);
return $(arr);

### Variation 3: - First loop replaced with "filter" (the goal is after all to eliminate)
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

### Variation 4:

The second loops function is to find out if any element in 
searchInItems array forfills a certain criteria
But that function already exists - array.prototype.some():
The some() method tests whether some element in the array passes the test implemented by the provided function.

```
var searchInItems = this.e;
var arr = selector.e.filter(function(searchForItem) {
  return searchInItems.some(function(searchInItem) {
    return searchInItem.contains(searchForItem);
  });
});
return $(arr);
```

### Variation 5:
Next, we need to implement our own contains() function,
as .contains() isn't supported in all our targetted browsers
```
var searchInItems = this.e;
var arr = selector.e.filter(function(searchForItem) {
  return searchInItems.some(function(searchInItem) {
    var node = searchForItem;
    while (node && (node = node.parentNode)) {
      if (node === searchInItem) return true
    }
  });
});
return $(arr);
```

### Variation 6:
Next, we must also support when selector is an Element.
By wrapping selector in $, we have code that works both when selector is jQuery and Element

```
var searchInItems = this.e;
var arr = $(selector).e.filter(function(searchForItem) {
  return searchInItems.some(function(searchInItem) {
    var node = searchForItem;
    while (node && (node = node.parentNode)) {
      if (node === searchInItem) return true
    }
  });
});
return __PUSH_STACK__(<@ arr @>);
```

### zepto implementation:
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



### OPTIMIZED_VERSION
The following was input to closure compliler:

find: function(selector) {
  if (typeof selector > "s") {
    // First shot:
    var arr=[];
    __ITERATE__(<@ this.e @>, <@ function(item) {
      arr = arr.concat($(selector, item).e);      
    } @>);

    return $(arr.filter(function(item,i,r){return r.indexOf(item) == i}));
  }
  else {
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
  }
}
*/
