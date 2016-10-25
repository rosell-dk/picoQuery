/*
.first() 

Description:
  Reduce the set of matched elements to the first in the set.
  http://api.jquery.com/first/

Fully supported signatures: 
  .first() => jQuery
*/
first: function() {
  return __PUSH_STACK_SINGLE__(<@ this.e[0] @>);
}

