/*
.last() 

Description:
  Reduce the set of matched elements to the final one in the set.
  http://api.jquery.com/last/

Signatures: 
  .last() => jQuery
*/
last: function() {
//  return this.e[0];
  return this.eq(-1);
//  return $(0<this.e.length ? this.e[0] : 0);
}

