/*
.offsetParent()

Description:
  Get the closest ancestor element that is positioned.

  http://api.jquery.com/offsetParent/

Signatures: 
  .offsetParent( ) => jQuery

*/
offsetParent: function(a) {
/*  return $(__MAP__(<@ this.e @>, <@ function(el) {
    return (el.offsetParent || el.ownerDocument.documentElement);
  } @>));*/

  __RETURN_PUSH_STACK_JQ__(<@ $(__MAP__(<@ this.e @>, <@ function(el) {
    return (el.offsetParent || el.ownerDocument.documentElement);
  } @>)) @>)
}

