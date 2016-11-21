/*
.offsetParent()

Description:
  Get the closest ancestor element that is positioned.

  http://api.jquery.com/offsetParent/

Signatures: 
  .offsetParent( ) => jQuery

*/
offsetParent: function() {
/*  return $(__MAP__(<@ this.e @>, <@ function(el) {
    return (el.offsetParent || el.ownerDocument.documentElement);
  } @>));*/

  __RETURN_PUSH_STACK_JQ__(<@ $(__MAP__(<@ this.e @>, <@ function(el) {
      var offsetParent = el.offsetParent;

      if (!offsetParent || <?php if (isFeatureEnabled('css')) {echo '$(offsetParent).css("position")';} else {echo 'getComputedStyle(offsetParent)["position"]';} ?> == "static") {
      
      
        return el.ownerDocument.documentElement
      }
      return offsetParent;

/*    var offsetParent = el.offsetParent;
    if (!offsetParent || offsetParent == offsetParent.ownerDocument.body) {
      return el.ownerDocument.documentElement
    }
    return offsetParent;*/

//    return (el.offsetParent || el.ownerDocument.documentElement);
  } @>)) @>)
}

