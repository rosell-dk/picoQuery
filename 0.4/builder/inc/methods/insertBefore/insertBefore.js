/*
.insertBefore() 

Description:
 Insert every element in the set of matched elements before the target.
  http://api.jquery.com/insertBefore/


Implementation is almost identical to .prependTo(), .appendTo() and .insertAfter().
So, a lot of duplicated code.
But it only costs 15 bytes per extra function in gzip, so we will optimize later
*/
insertBefore: function(a) {
  var c = [], d = this, g = $(a).e, e = g.length - 1, b;
  __ITERATE__(<@ g @>, <@ function(a, f) {
    b = f == e ? d.clone(1) : d;
    $(a).before(b);
    Array.prototype.push.apply(c, b);
  } @>);
//  return $(c);
  return __PUSH_STACK__(<@ c @>)
}

