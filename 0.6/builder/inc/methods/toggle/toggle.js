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
    (__IS_UNDEFINED__(<@ display @>) ? $(el).css('display') == 'none' : display) ? $(el).show() : $(el).hide();
  } @>);
  return this;
<?php else: ?>
  __ITERATE__(<@ this.e @>, <@ function(el) {
    if (__IS_UNDEFINED__(<@ display @>) ? $(el).css('display') == 'none' : display) {

      // SHOW
      // ----

      // If previously hidden with the hide() method, set display to old display value, FLAG#1
      if (el['__picoquerydata'] && el['__picoquerydata'][1] != undefined) {
        el.style.display = el['__picoquerydata'][1];
      }
      else {
		    // Reset the inline display of this element to learn if it is
		    // being hidden by cascaded rules or not
		    if (el.style.display == "none") {
			    el.style.display = "";
        }

	      // Set elements which have been hidden in a stylesheet to default browser style
        // Also set elements not in the dom to default
	      if ( el.style.display === "" && (getComputedStyle(el)["display"] == "none" ) || !el.ownerDocument.documentElement.contains(el)) {
          var tempEl = d.createElement(el.nodeName);
          d.body.appendChild(tempEl);
          el.style.display = getComputedStyle(tempEl)['display'];
          tempEl.parentNode.removeChild(tempEl);
	      }
      }
    }
    else {

      // SHOW
      // ----

      var visible = getComputedStyle(el)['display'] != "none" && el.ownerDocument.documentElement.contains(el);
      if ( ((el.style.display != '') && (el.style.display != 'none')) || visible ){
        // Private data
        if(!el['__picoquerydata']) {
          el['__picoquerydata'] = {};
        }
        // Store old display value. FLAG#1
        el['__picoquerydata'][1] = (visible ? $(el).css('display') : el.style.display);
      }
      $(el).css('display', 'none');
    }
  } @>);
  return this;
<?php endif; ?>
}

