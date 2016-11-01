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
//  return this.css('display','none');
  __ITERATE__(<@ this.e @>, <@ function(el) {
//    console.log('el.style.display', el.style.display);
//    console.log('el.style.display', $(el).css('display'));
//    if (!((el.style.display == 'none'))) {  //  || (el.style.display == '')

      <?php if (isFeatureEnabled('toggle') || isFeatureEnabled('show')): ?>
      // Private data
      if(!el['__picoquerydata']) {
        el['__picoquerydata'] = {};
      }
      // Store old display value. FLAG#1
      el['__picoquerydata'][1] = $(el).css('display');
      <?php endif; ?>

      $(el).css('display', 'none');

//    };
  } @>);

  return this;
}

