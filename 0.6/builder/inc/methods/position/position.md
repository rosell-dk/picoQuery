The picoQuery solution is a modification of jQuery 1.12.4 solution.

Without trying to optimize, it becomes this: (303/1637/3867) - gzipped size (just the code/position.min/full.min)

```
position: function(a) {

	if ( !this.e[ 0 ] ) {
		return;
	}

	var offsetParent, offset,
		parentOffset = { top: 0, left: 0 },
		elem = this.e[0];

	if ( $(elem).css("position") == "fixed" ) {

		offset = elem.getBoundingClientRect();
	} 
  else {
		offsetParent = this.offsetParent();

		offset = this.offset();
    if (offsetParent.e[0].nodeName.toLowerCase() != "html") {
			parentOffset = offsetParent.offset();
		}

		parentOffset.top  += parseFloat( $(offsetParent).css("border-top-width") ) || 0;
		parentOffset.left  += parseFloat( $(offsetParent).css("border-left-width") ) || 0;
	}

	return {
		top:  offset.top  - parentOffset.top - parseFloat( $(elem).css("margin-top") ) || 0,
		left: offset.left - parentOffset.left - parseFloat( $(elem).css("margin-left") ) || 0
	}
}
```

I wondered if we can presume that tag names are UPPERCASE.
We cannot, because nodes can lower case when imported from XML. See here:
http://ejohn.org/blog/nodename-case-sensitivity/

Instead, we could test if it equals the documentElement of the ownerDocument:

  if (offsetParent.e[0] != offsetParent.e[0].ownerDocument.documentElement) {

The string "documentElement" is low cost in gzip, because we use it in constructor.
However it is one or two bytes heavier (3884/1655)

We could change to camelCased properties (border-top-width => borderTopWidth), etc
However, this also increases gzip (3885/1655)



-------

The original picoQuery solution was taken from zepto
These notes have to do with that solution...

code taken from zepto
but added the test for position:fixed from jQuery, because Zepto did not comply when position was fixed

TODO: Scrutinize jQuery code, create more test cases
TODO: Is /^(?:body|html)$/i exactly what we need?



This code: (270 bytes gzipped)
```
  // Subtract element margins
  offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0;
  offset.left -= parseFloat( $(elem).css('margin-left') ) || 0;

  // Add offsetParent borders
  parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0;
  parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0;

  // Subtract the two offsets
  return {
    top:  offset.top  - parentOffset.top,
    left: offset.left - parentOffset.left
  }
```

can be rewritten to this: (267 bytes gzipped for whole function, after closure compiler)

```
// calc "top" or "left"
function calc(dim) {
  // Subtract element margins
  offset[dim]  -= parseFloat( $(elem).css('margin-' + dim) ) || 0;

  // Add offsetParent borders
  parentOffset[dim]  += parseFloat( $(offsetParent[0]).css('border-' + dim + '-width') ) || 0;

  // Subtract the two offsets
  return offset[dim]  - parentOffset[dim];
}

return {
  top:  calc('top'),
  left: calc('left')
}
```

Which can be rewritten to this: (265 bytes gzipped):
```
  // calc "top" or "left"
  function calc(dim) {
    return offset[dim] - (parseFloat( $(elem).css('margin-' + dim) ) || 0) - (parseFloat( $(offsetParent[0]).css('border-' + dim + '-width') ) || 0) - parentOffset[dim];
  }
  return {
    top:  calc('top'),
    left: calc('left')
  }
```

or this: (also 265 bytes gzipped)
```
  var o = {};
  function calc(dim) {
    o[dim] = offset[dim] - (parseFloat( $(elem).css('margin-' + dim) ) || 0) - (parseFloat( $(offsetParent[0]).css('border-' + dim + '-width') ) || 0) - parentOffset[dim];
  }
  calc('top');
  calc('left');
  return o;
```

not to this:
- because when we got a bounding rect, the bounding rect object will be returned,
and that does not strictly comply with returning a simple object

```
  // calc "top" or "left"
  function calc(dim) {
    offset[dim] -= (parseFloat( $(elem).css('margin-' + dim) ) || 0) + (parseFloat( $(offsetParent[0]).css('border-' + dim + '-width') ) || 0) + parentOffset[dim];
  }
  calc('top');
  calc('left');

  return offset;

```

So, best was this:
/*
	if ( !this.e[ 0 ] ) {
		return;
	}
	var elem = this.e[0],
    // Get *real* offsetParent
    offsetParent = this.offsetParent(),
    // Get correct offsets
    offset       = $(elem).css("position" ) === "fixed" ? elem.getBoundingClientRect() : this.offset(),
    parentOffset = /^(?:body|html)$/i.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();
  
  // calc "top" or "left"
  function calc(dim) {
    return offset[dim] - (parseFloat( $(elem).css('margin-' + dim) ) || 0) - (parseFloat( $(offsetParent[0]).css('border-' + dim + '-width') ) || 0) - parentOffset[dim];
  }
  return {
    top:  calc('top'),
    left: calc('left')
  }
*/




TODO: Meassure which variant is smallest gzip




### jQuery 1.12.4 implementation:

```

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},
```



### Zepto 1.2.0 implementation:
```
    position: function() {
      if (!this.length) return

      var elem = this[0],
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),
        // Get correct offsets
        offset       = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

      // Add offsetParent borders
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

      // Subtract the two offsets
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
```

### Cash 1.3.0 implementation:

Cash solution is actually seems quite good. So small!
The only thing is that it does not get decimals points.

```
    position: function () {
      var el = this[0];
      return {
        left: el.offsetLeft,
        top: el.offsetTop
      };
    },

```
