/*
.hide()

Description:
  Hide the matched elements.
  http://api.jquery.com/hide/

Fully supported signatures: 
  .hide( ) => jQuery

Unsupported signatures: 
  .hide( [ duration ][, complete ]) => jQuery
  .hide( options) => jQuery
  .hide( [ duration ][, easing][, complete ]) => jQuery

 */
hide: function() {
  return this.css('display','none');
}

