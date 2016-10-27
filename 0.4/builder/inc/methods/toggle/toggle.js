/*
.toggle()

Description:
  Display or hide the matched elements.
  http://api.jquery.com/toggle/

Fully supported signatures: 
  .toggle( ) => jQuery
  .toggle( display ) => jQuery

Unsupported signatures: 
  .toggle( [ duration ][, complete ] ) => jQuery
  .toggle( options ) => jQuery
  .toggle( [ duration ][, easing][, complete ] ) => jQuery


 */
toggle: function(display) {
<?php if (isFeatureEnabled('show') && isFeatureEnabled('hide')): ?>
  __ITERATE__(<@ this.e @>, <@ function(el) {
    (__IS_UNDEFINED__(<@ display @>) ? el.style.display == 'none' : display) ? $(el).show() : $(el).hide()
  } @>);
  return this;
<?php else: ?>
  __ITERATE__(<@ this.e @>, <@ function(el) {
    if (__IS_UNDEFINED__(<@ display @>) ? el.style.display == 'none' : display) {
      if (el['__picoquerydata'] && el['__picoquerydata'][1]) {
        el.style.display = el['__picoquerydata'][1];
      }
      else {
  			el.style.display = $('<' + el.nodeName + '></' + el.nodeName + '>').css('display');
      }
    }
    else {
      if(!el['__picoquerydata']) {
        el['__picoquerydata'] = {};
      }
      el['__picoquerydata'][1] = $(el).css('display');
      $(el).css('display', 'none');
    }
  } @>);
  return this;
<?php endif; ?>
}

