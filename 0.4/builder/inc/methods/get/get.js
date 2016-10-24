/*
.get() 

Description:
  Retrieve the DOM elements matched by the jQuery object.
  http://api.jquery.com/get/

Fully supported signatures: 
  
  .get( index ) => Element  (Retrieve one of the elements matched by the jQuery object.)     
     index [Integer]: A zero-based integer indicating which element to retrieve.

  .get() => Array (Retrieve the elements matched by the jQuery object.)
     

*/
get: function(index) {
  return __IS_UNDEFINED__(<@ index @>) ? this.e : this.e[index];
}

