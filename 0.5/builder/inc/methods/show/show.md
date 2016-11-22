###  Developer notes

*Should code be changed, make sure to change code in .toggle() as well!*

zepto and jQuery creates AND appends a node to the document in order to determine default display.
It however seems we do not need to append the node to get a default display.
- this gets it:      $('<' + el.nodeName + '></' + el.nodeName + '>').css('display')
- but this does not: $(d.createElement(el.nodeName)).css('display')
The former calls the constructor, which creates a div with createElement and sets HTML with innerHTML.
And thats apperently enough

We can either do this:
    if ((el.style.display == 'none') || (el.style.display == '')) {
or this:
    if (el.style.display == 'none') {

If we do the first, we meet edge case "Already visible - will it alter css #1?", but not #2
$​("​<p>​​</p>​"​)​.show​(​) => $[ ​<p style="display: block;">​​</p>​ ]

If we do the second, we meet edge case "Already visible - will it alter css #2?", but not #1
$​("​<i>​​</i>​"​)​.appendTo​("body"​)​.show​(​) => $[ ​<i>​​</i>​ ]

We could try to come up with compliant behavior, but its an edge case... We go for the latter.


In order to make show more compliant, we have added this condition to setting display value of css:
(!el.ownerDocument.documentElement.contains(el)))
It tests whether the element is attached the DOM.
It should work in all targeted browsers [1](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains)
Here, they claim that we should use the body element instead of the documentElement to get IE compatibility. But is it also neccesarry in IE9 ?[2](http://stackoverflow.com/questions/5629684/how-to-check-if-element-exists-in-the-visible-dom)
If we turn to use body, we must remember to test for the element itselves:
function isInPage(node) {
  return (node === document.body) ? false : document.body.contains(node);
}


So we do always set display value on unattached nodes.
If we did not do that, this wouldn't work:
$​("​<p class='display-none'>​​</p>​"​)​.show​(​)






### zepto implementation:

```
  function defaultDisplay(nodeName) {
    var element, display;

    element = document.createElement(nodeName);
    document.body.appendChild(element);
    display = getComputedStyle(element, '').getPropertyValue("display");
    element.parentNode.removeChild(element);
    display == "none" && (display = "block");
    return display;
  }

    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = '')
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)
      })
    },

```

### jQuery implementation


// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};


function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

The animation is added with this code:

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

