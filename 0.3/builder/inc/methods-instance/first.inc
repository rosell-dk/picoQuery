/*
.first() 

Description:
  Reduce the set of matched elements to the first in the set.
  http://api.jquery.com/first/

Fully supported signatures: 
  .first() => jQuery
*/
first: function() {
//  return this.e[0];
  return $(0<this.e.length ? this.e[0] : 0);
}

// OPTIMIZED_VERSION //
first: function() {
  return $(0<this.e.length ? this.e[0] : 0);
}

