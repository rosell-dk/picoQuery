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

  // To add confusion, the order of the arguments in the callback differs
  // between jQuery and Array.prototype.map - so we have to add a proxy callback

  // TODO: we should use map helper function everywhere...
  var arr = this.e.map(function(item, index) {return fn.call(item, index, item)});

  // Return the array of whatever type the callback provides
  return __PUSH_STACK__(<@ arr @>)
}

