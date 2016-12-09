We have three ways of getting style.

1) el.style[name]
2) getComputedStyle(el)[name]
3) getComputedStyle(el).getPropertyValue(name)

How do they differ?

(1) el.style[name]
 - Gets the inline style attribute - does not take other styles into account!
 - Can be accessed both in dasherised and camelCase (only tested that in a few browsers)
 - Works on both attached nodes and unattached nodes
 - Returns "auto" on a div with style="margin-left:auto"
  
(2) getComputedStyle(el)[name]
 - Takes all styles into account
 - Can be accessed both in dasherised and camelCase (only tested that in a few browsers)
 - For unattached nodes, it behaves differently in Chrome and Firefox:
    - In Firefox, the styles of the document are taken into account,
      even though its not attached to the DOM yet (but in defence for FF, it was created
      with the createElement method)
 - getComputedStyle(document.createElement('li'))['display'] returns 'block' in firefox
   but when created with innerHTML, FF returns 'list-item'
 - Returns computed value in pixels when a property is set to "auto" 
   With a div with style="margin-left:auto", it can for example return "44.62px"
 

(3) getComputedStyle(el).getPropertyValue(name)
 - Takes all styles into account
 - Can only be accesed in dasherised form
 - Has same crossbrowser issue with unattached nodes as (2)


    var computed = getComputedStyle(this.e[0]);
    return this.e[0].style[name] || computed.getPropertyValue(name) || computed[name];


https://drafts.csswg.org/cssom/#resolved-values
https://drafts.csswg.org/css-cascade-4/#used-value
http://erik.eae.net/archives/2007/07/27/18.54.15/
https://developer.mozilla.org/en-US/docs/Web/CSS/used_value


  // Considering if(!value). 
  // - But I guess we should support setting a property to an empty string
  if (__IS_UNDEFINED__(<@ value @>)) {

    // In picoQuery 0.1, we just return this.e[0].style[name]
    // However, we need to support javascript properties as well

    // There is a little quirk with 'float', because its a reserved word
    // Therefore, its called 'cssFloat' instead of 'float' (its called styleFloat in IE8, but we
    // needn't worry about that)
    // http://stackoverflow.com/questions/606470/is-there-a-cross-browser-way-of-setting-style-float-in-javascript

    // We should also support cssHooks, as plugins may add new ones: https://api.jquery.com/jQuery.cssHooks/
//console.log(getComputedStyle(this.e[0]).getPropertyValue(name));


    // TODO: zepto and jQuery camelCases the property. But it seems unneccessary, as
    // getComputedStyle() returns an object with both ie "backgroundColor" and "background-color"
    // console.log(getComputedStyle(this.e[0]));
    // But does all modern browsers do that?
    // getComputedStyle() also has the property 'float' - so no need to handle that (todo: browser-test it)


      // Well, well, it seems that el.style has both variants (ie 'background-color' and 'backgroundColor')
      // so we do not need to dasherize or camelCase.
      // TODO: Browser-test it

      // Although... this does not work with vender prefixes - there is ie no: el.style.-moz-user-select
      // To set that, we need: el.style.MozUserSelect


      // btw, zepto sets the style with style.cssText
      // jQuery sets the style with el.style[camelCasedPropertyName]


getPropertyValue


### jQuery implementation
```
This is just an excerpt:

var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;
var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );


jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
```

There are a lot of CSS hooks...

```
jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);
```
support.reliableMarginLeft is false for FF 39, but true for Chromium 53.
It is the test result of measuring if computed value is correct on an element set with auto.
FF 39 for example fails, as it returns "0px"

The swap function is used to:
1) set elem.style.marginLeft to 0
2) get elem.getBoundingClientRect().left;
3) set elem.style.marginLeft back to original value


More CSS hooks:
```
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},
  ...
}
```


### Zepto implementation
```
css: function(property, value){
  if (arguments.length < 2) {
    var element = this[0]
    if (typeof property == 'string') {
      if (!element) return
      return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(property)
    } else if (isArray(property)) {
      if (!element) return
      var props = {}
      var computedStyle = getComputedStyle(element, '')
      $.each(property, function(_, prop){
        props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
      })
      return props
    }
  }

  var css = ''
  if (type(property) == 'string') {
    if (!value && value !== 0)
      this.each(function(){ this.style.removeProperty(dasherize(property)) })
    else
      css = dasherize(property) + ":" + maybeAddPx(property, value)
  } else {
    for (key in property)
      if (!property[key] && property[key] !== 0)
        this.each(function(){ this.style.removeProperty(dasherize(key)) })
      else
        css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
  }

  return this.each(function(){ this.style.cssText += ';' + css })
}

var cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },

function maybeAddPx(name, value) {
  return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
}

function dasherize(str) {
  return str.replace(/::/g, '/')
         .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
         .replace(/([a-z\d])([A-Z])/g, '$1_$2')
         .replace(/_/g, '-')
         .toLowerCase()
}

```

### Cash implementation
```
css: function (prop, value) {
  if (isString(prop)) {
    prop = getPrefixedProp(prop);
    return (value ? this.each(function (v) {
      return v.style[prop] = value;
    }) : win.getComputedStyle(this[0])[prop]);
  }

  for (var key in prop) {
    this.css(key, prop[key]);
  }

  return this;
}

var getPrefixedProp = (function () {
  var cache = {}, div = doc.createElement("div"), style = div.style, camelRegex = /(?:^\w|[A-Z]|\b\w)/g, whiteSpace = /\s+/g;

  function camelCase(str) {
    return str.replace(camelRegex, function (letter, index) {
      return letter[index === 0 ? "toLowerCase" : "toUpperCase"]();
    }).replace(whiteSpace, "");
  }

  return function (prop) {
    prop = camelCase(prop);
    if (cache[prop]) {
      return cache[prop];
    }

    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1), prefixes = ["webkit", "moz", "ms", "o"], props = (prop + " " + (prefixes).join(ucProp + " ") + ucProp).split(" ");

    each(props, function (p) {
      if (p in style) {
        cache[p] = prop = cache[prop] = p;
        return false;
      }
    });

    return cache[prop];
  };
}());

```


