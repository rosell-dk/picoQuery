/*
.filter()

Description:
  Reduce the set of matched elements to those that match the selector or pass the function's test.
  http://api.jquery.com/filter/

Note:
The special JQuery selectors, such as ":button", etc are not supported
http://api.jquery.com/category/selectors/jquery-selector-extensions/

:nth-of-type(odd)

Partially supported signatures:
  (only problem is that special jQuery selectors, such as ":button", etc are not supported)
  .filter(selector) => jQuery
    selector [String] :
      A string containing a selector expression to match the current set of elements against.

Supported signatures: 
  .filter(elements) => jQuery
    elements [Element]
      One or more DOM elements to match the current set of elements against.

  .filter(selection) => jQuery
      selection
        Type: jQuery
        An existing jQuery object to match the current set of elements against.

Unsupported signatures: 

  .filter(function) => jQuery
      function
        Type: Function( Integer index, Element element ) => Boolean
        A function used as a test for each element in the set. this is the current DOM element.



*/
filter: function(selector) {
  // In order to avoid recurssion, we need to check for '*'
  // (because we call parent(), and parent() is lazy and calls filter('*'))

  return (selector=='*') ? __PUSH_STACK_THIS__() : __PUSH_STACK__(<@ this.e.filter(function(element){
    // There may not be a parent, but it turns out to be no problem
    return ~$(selector, $(element).parent().e[0]).e.indexOf(element);
  }) @>);

}

