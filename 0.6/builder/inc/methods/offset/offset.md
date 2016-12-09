
## GET
When converting jQuery 1.12.4 function to picoQuery, the GET part is:

```
	var docElem, win,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== "undefined" ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
		left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
	};

```

We immidiately remove the BlackBerry 5 / iOS 3 code

To test if a node is connected to the DOM, we can do this:
(this.e[0].ownerDocument.documentElement.contains(this.e[0]))

But actually, this is not a replacement of this:
jQuery.contains( docElem, elem )

- because as they write, contains() is:
  "Purposefully self-exclusive. As in, an element does not contain itself"

So there is a single case, they differ, namely when element is the root (the html node)
To circumvent this, we could perhaps do this:
(this.e[0].ownerDocument.body.contains(this.e[0]))
- But no - in some cases there might not be a body element

Better solution: elem.compareDocumentPosition(docElem)
Seems to be supported for our targetted browsers:
  https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition

(this.e[0].compareDocumentPosition(this.e[0].ownerDocument.documentElement) & 8)

Ignoring that, we get:

```
  // connected to dom, and not root?
  if (this.e[0].compareDocumentPosition(this.e[0].ownerDocument.documentElement) & 8) {
    var rect = this.e[0].getBoundingClientRect();

    var elem = this.e[0],
		  doc = elem && elem.ownerDocument,
	    docElem = doc.documentElement,
      win = doc.defaultView || elem.parentWindow;

    return {
			top: rect.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: rect.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
    }
  }
  else {
    return { top: 0, left: 0 };
  }
```

It seems we can rely on doc.defaultView. Its not supported in IE8, but otherwise well supported.
  http://quirksmode.org/dom/html/
  https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView

It also seems win.pageYOffset has pretty good support (IE9+):
  https://developer.mozilla.org/en-US/docs/Web/API/Window/pageYOffset
  http://www.quirksmode.org/mobile/tableViewport_desktop.html
  - So we rely on this, and do not fall back to docElem.scrollTop.

There is no way I can succeed in setting styles such that document.documentElement.clientTop is something else than 0.
I tried setting margin-top, padding-top, I tried on an iframe element. I tried position: absolute, position: fixed, position: relative, and of cause position: static.
(But I have only tried on Google Chrome...)
So until proven otherwise, we take it that it is always 0.

Implementing that, we get:

```
  // connected to dom, and not root?
  if (this.e[0].compareDocumentPosition(this.e[0].ownerDocument.documentElement) & 8) {
    var rect = this.e[0].getBoundingClientRect(),
      win = this.e[0].ownerDocument.defaultView;

    return {
		  top: rect.top  + win.pageYOffset,
		  left: rect.left + win.pageXOffset
    }
  }
  else {
    return { top: 0, left: 0 };
  }
```


## SET

jQuery's set method:

```
setOffset: function( elem, options, i ) {
	var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
		position = jQuery.css( elem, "position" ),
		curElem = jQuery( elem ),
		props = {};

	// set position first, in-case top/left are set even on static elem
	if ( position === "static" ) {
		elem.style.position = "relative";
	}

	curOffset = curElem.offset();
	curCSSTop = jQuery.css( elem, "top" );
	curCSSLeft = jQuery.css( elem, "left" );
	calculatePosition = ( position === "absolute" || position === "fixed" ) &&
		jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

	// need to be able to calculate position if either top or left
	// is auto and position is either absolute or fixed
	if ( calculatePosition ) {
		curPosition = curElem.position();
		curTop = curPosition.top;
		curLeft = curPosition.left;
	} else {
		curTop = parseFloat( curCSSTop ) || 0;
		curLeft = parseFloat( curCSSLeft ) || 0;
	}

	if ( jQuery.isFunction( options ) ) {

		// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
		options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
	}

	if ( options.top != null ) {
		props.top = ( options.top - curOffset.top ) + curTop;
	}
	if ( options.left != null ) {
		props.left = ( options.left - curOffset.left ) + curLeft;
	}

	if ( "using" in options ) {
		options.using.call( elem, props );
	} else {
		curElem.css( props );
	}
}
```

We haven't an extend method yet, so we skip the extend for now.

But otherwise, the code is pretty straightforwardly brought into picoQuery:

```
// SET
__ITERATE__(<@ this.e @>, <@ function(el,i) {
  
  
  var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
    curElem = $(el),
    position = curElem.css( "position" ),
    props = {};

  if ( position === "static" ) {
    el.style.position = "relative";
  }

  curOffset = curElem.offset();
  curCSSTop = curElem.css( "top" );
  curCSSLeft = curElem.css( "left" );
  calculatePosition = ( position === "absolute" || position === "fixed" ) && (curCSSTop == "auto" || curCSSLeft == "auto");

  if ( calculatePosition ) {
    curPosition = curElem.position();
    curTop = curPosition.top;
    curLeft = curPosition.left;
  } else {
    curTop = parseFloat( curCSSTop ) || 0;
    curLeft = parseFloat( curCSSLeft ) || 0;
  }

  if ( __IS_FUNCTION__(<@ a @>) ) {

    // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
//		    a = a.call( elem, i, jQuery.extend( {}, curOffset ) );
    a = a.call( elem, i, curOffset);
  }

  if ( a.top != null ) {
    props.top = ( a.top - curOffset.top ) + curTop;
  }
  if ( a.left != null ) {
    props.left = ( a.left - curOffset.left ) + curLeft;
  }

  if ( "using" in a ) {
    a.using.call( elem, props );
  } else {
    curElem.css( props );
  }

} @>);

return this;
```





In picoQuery 0.4.0, we did this:
```
  if ($(el).css('position') == 'static') {
    $(el).css('position', 'relative');
  }
  $(el).css('top', a['top'] - $(el).offset().top);
  $(el).css('left', a['left'] - $(el).offset().left);
```




### picoQuery 0.4.0 implementation:
offset: function(a) {
  var rect = this.e[0].getBoundingClientRect();
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset
  }
}




### jQuery 1.12.4 implementation:

```

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

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

### youmightnotneedjquery.com
/* youmightnotneedjquery.com proposed this solution:
   it however does not comply, when document is scrolled
var rect = this.e[0].getBoundingClientRect();
return {
  top: rect.top + document.body.scrollTop,
  left: rect.left + document.body.scrollLeft
}*/



### Zepto 1.2.0 implementation:
```
offset: function(coordinates){
  if (coordinates) return this.each(function(index){
    var $this = $(this),
        coords = funcArg(this, coordinates, index, $this.offset()),
        parentOffset = $this.offsetParent().offset(),
        props = {
          top:  coords.top  - parentOffset.top,
          left: coords.left - parentOffset.left
        }

    if ($this.css('position') == 'static') props['position'] = 'relative'
    $this.css(props)
  })
  if (!this.length) return null
  if (document.documentElement !== this[0] && !$.contains(document.documentElement, this[0]))
    return {top: 0, left: 0}
  var obj = this[0].getBoundingClientRect()
  return {
    left: obj.left + window.pageXOffset,
    top: obj.top + window.pageYOffset,
    width: Math.round(obj.width),
    height: Math.round(obj.height)
  }
},
```

### Cash 1.3.0 implementation:
```
offset: function () {
  var rect = this[0].getBoundingClientRect();
  return {
    top: rect.top + win.pageYOffset - docEl.clientTop,
    left: rect.left + win.pageXOffset - docEl.clientLeft
  };
},
```
