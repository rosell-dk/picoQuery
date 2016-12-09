/*
.insertAfter() 

Description:
  Insert every element in the set of matched elements after the target.
  http://api.jquery.com/insertAfter/


*/
insertAfter: function(a) {
  var c = [], d = this, g = $(a).e, e = g.length - 1, b;
  __ITERATE__(<@ g @>, <@ function(a, f) {
    b = f == e ? d.clone(1) : d;
    $(a).after(b);
    Array.prototype.push.apply(c, b);
  } @>);
  return __PUSH_STACK__(<@ c @>)
}

