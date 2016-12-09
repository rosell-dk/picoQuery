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

<?php if (isFeatureEnabled('toggle') || isFeatureEnabled('show')): ?>

      var visible = getComputedStyle(el)['display'] != "none" && el.ownerDocument.documentElement.contains(el);

      // Store display value, if:
      // - "style.display" is set to something other than "none"
      // - element is visible and in dom

      if ( ((el.style.display != '') && (el.style.display != 'none')) || visible ){

        // Private data
        if(!el['__picoquerydata']) {
          el['__picoquerydata'] = {};
        }
        // Store old display value. FLAG#1
        el['__picoquerydata'][1] = (visible ? $(el).css('display') : el.style.display);

//        $(el).attr('store', el['__picoquerydata'][1]);

      }
<?php endif; ?>

      $(el).css('display', 'none');

//    };
  } @>);

  return this;
}

