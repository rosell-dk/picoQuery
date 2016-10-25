/*
.prependTo() 

Description:
  Insert every element in the set of matched elements to the beginning of the target.
  http://api.jquery.com/prependTo/

*/
prependTo: function(target) {
  var ret = [], 
    me = this,
    arr = $(target).e,
    last = arr.length - 1,
    elems;

  __ITERATE__(<@ arr @>, <@ function(t, idx) {
    elems = (idx == last ? me.clone(1) : me);
    $(t).prepend(elems);
    Array.prototype.push.apply(ret, elems);    
  } @>);
//  return $(ret);
  return __PUSH_STACK__(<@ ret @>)
}

