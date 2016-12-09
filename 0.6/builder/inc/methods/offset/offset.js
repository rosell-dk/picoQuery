offset: function(a) {
  if (a) {
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

  }
  else {
    // GET

    // connected to dom, and not root?
    if (this.e[0].compareDocumentPosition(this.e[0].ownerDocument.documentElement) & 8) {
/*      var rect = this.e[0].getBoundingClientRect(),
        win = this.e[0].ownerDocument.defaultView;
      return {
  			top: rect.top  + win.pageYOffset,
  			left: rect.left + win.pageXOffset
      }*/

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
  }
}

