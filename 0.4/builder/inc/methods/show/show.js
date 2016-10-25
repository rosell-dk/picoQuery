/*
.hide()

Description:
  Show the matched elements.
  http://api.jquery.com/show/

Fully supported signatures: 
  .show( ) => jQuery

Unsupported signatures: 
  .show( [ duration ][, complete ]) => jQuery
  .show( options) => jQuery
  .show( [ duration ][, easing][, complete ]) => jQuery

TODO: MUST be tested in IE9, because the jQuery solution involves some IE9-11 code
Also, jQuery has more code involved for finding the default value for a tag name, "if the simple
method fails". But under which circumstances are the simple method failing?


 */
show: function() {

  __ITERATE__(<@ this.e @>, <@ function(el) {
    if ((el.style.display == 'none') || (el.style.display == '')) {

      // If previously hidden with the hide() method, set display to old display value, FLAG#1
      if (el['__picoquerydata'] && el['__picoquerydata'][1]) {
        el.style.display = el['__picoquerydata'][1];
      }

      // else set to default value for that tag name.
      else {
//  			el.style.display = $(d.createElement(el.nodeName)).css('display');
  			el.style.display = $('<' + el.nodeName + '></' + el.nodeName + '>').css('display');
      }
    };
  } @>);

  return this;

}

