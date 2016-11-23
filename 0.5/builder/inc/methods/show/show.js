/*
.show()

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
<?php if (isFeatureEnabled('toggle') || isFeatureEnabled('hide')): ?>
    // If previously hidden with the hide() method, set display to old display value, FLAG#1
    if (el['__picoquerydata'] && el['__picoquerydata'][1] != undefined) {
//        $(el).attr('restoring', el['__picoquerydata'][1]);
      el.style.display = el['__picoquerydata'][1];
    }
    else {
<?php endif; ?>
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
<?php if (isFeatureEnabled('toggle') || isFeatureEnabled('hide')): ?>
    }
<?php endif; ?>
  } @>);
  return this;
}

