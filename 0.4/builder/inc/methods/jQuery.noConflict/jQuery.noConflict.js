/*
jQuery.noConflict()

Description:
  Relinquish jQuery's control of the $ variable.
  http://api.jquery.com/jQuery.noConflict/

Fully supported signatures:   
  jQuery.noConflict() => jQuery

Unsupported signatures:   
  jQuery.noConflict( removeAll ) => jQuery

*/
$.noConflict = function() {
  w.$ = _$;
  return $;
}

