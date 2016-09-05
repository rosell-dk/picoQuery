/*
.map() 

Description:
  Pass each element in the current matched set through a function, producing a new jQuery object containing the return values.
  http://api.jquery.com/map/

Fully supported signatures: 
  
  .map( callback ) => jQuery
    callback
    Type: Function( Integer index, Element domElement ) => Object
    A function object that will be invoked for each element in the current set.
     
*/
map: function(fn) { 
  // Map elements to the custom function, and set the value of this in callback
  // to be the current element
  var arr = this.e.map(function(item, index) {return fn.call(item, index, item)});

  // Wrap the array of whatever type the callback provides in $
  return $(arr);
}

// OPTIMIZED_VERSION //
map: function(a) {    
  return $(this.e.map(function(b, bb) {return a.call(b, bb, b)}));
}

