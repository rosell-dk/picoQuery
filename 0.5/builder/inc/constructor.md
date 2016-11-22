A note about the single tag test.
In jQuery its like this:
var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );
It matches ie "<div></div>", "<div/>" and "<my-div/>"

In zepto its like this:
singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
The difference is that it does not allow dash in tag name

In picoQuery, its like this:
var re = /^<([\w-]+)\s*\/?>(<\/\1>)?$/;
The "?:" is removed, because here we have no need to define it as a non-capturing group
The "|" is removed, because it does not seem to do anything...

In picoQuery, we only use the test in order to obtain compliance in when to trigger the 
jQuery(html, attributes) behaviour (in jQuery, attributes are only applied if html is an empty tag)


Zepto and jQuery uses this regex to do a createElement instead of innerHtml. 
We could also do it when optimizing for speed, like this:
```
if (/^<([\w-]+)\s*\/?>(<\/\1>)?$/.test(a)) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastMatch
  el = d.createElement(RegExp.$1);
}
else {
  el.innerHTML = a;
}
```


Intro to document fragments in jQuery:   // http://ejohn.org/apps/workshop/adv-talk/#5



### jQuery 1.12.4 implementation
```
	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );

```

### Cash 1.3.0 implementation
```
function Init(selector, context) {
  if (!selector) {
    return this;
  }

  // If already a cash collection, don't do any further processing
  if (selector.cash && selector !== win) {
    return selector;
  }

  var elems = selector, i = 0, length;

  if (isString(selector)) {
    elems = (idMatch.test(selector) ?
    // If an ID use the faster getElementById check
    doc.getElementById(selector.slice(1)) : htmlMatch.test(selector) ?
    // If HTML, parse it into real elements
    parseHTML(selector) :
    // else use `find`
    find(selector, context));

    // If function, use as shortcut for DOM ready
  } else if (isFunction(selector)) {
    onReady(selector);return this;
  }

  if (!elems) {
    return this;
  }

  // If a single DOM element is passed in or received via ID, return the single element
  if (elems.nodeType || elems === win) {
    this[0] = elems;
    this.length = 1;
  } else {
    // Treat like an array and loop through each item.
    length = this.length = elems.length;
    for (; i < length; i++) {
      this[i] = elems[i];
    }
  }

  return this;
}

function cash(selector, context) {
  return new Init(selector, context);
}
```

### zepto 1.2.0 implementation

```javascript
// `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
// takes a CSS selector and an optional context (and handles various
// special cases).
// This method can be overridden in plugins.
zepto.init = function(selector, context) {
  var dom
  // If nothing given, return an empty Zepto collection
  if (!selector) return zepto.Z()
  // Optimize for string selectors
  else if (typeof selector == 'string') {
    selector = selector.trim()
    // If it's a html fragment, create nodes from it
    // Note: In both Chrome 21 and Firefox 15, DOM error 12
    // is thrown if the fragment doesn't begin with <
    if (selector[0] == '<' && fragmentRE.test(selector))
      dom = zepto.fragment(selector, RegExp.$1, context), selector = null
    // If there's a context, create a collection on that context first, and select
    // nodes from there
    else if (context !== undefined) return $(context).find(selector)
    // If it's a CSS selector, use it to select nodes.
    else dom = zepto.qsa(document, selector)
  }
  // If a function is given, call it when the DOM is ready
  else if (isFunction(selector)) return $(document).ready(selector)
  // If a Zepto collection is given, just return it
  else if (zepto.isZ(selector)) return selector
  else {
    // normalize array if an array of nodes is given
    if (isArray(selector)) dom = compact(selector)
    // Wrap DOM nodes.
    else if (isObject(selector))
      dom = [selector], selector = null
    // If it's a html fragment, create nodes from it
    else if (fragmentRE.test(selector))
      dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
    // If there's a context, create a collection on that context first, and select
    // nodes from there
    else if (context !== undefined) return $(context).find(selector)
    // And last but no least, if it's a CSS selector, use it to select nodes.
    else dom = zepto.qsa(document, selector)
  }
  // create a new Zepto collection from the nodes found
  return zepto.Z(dom, selector)
}

// `$` will be the base `Zepto` object. When calling this
// function just call `$.zepto.init, which makes the implementation
// details of selecting nodes and creating Zepto collections
// patchable in plugins.
$ = function(selector, context){
  return zepto.init(selector, context)
}

// `$.zepto.fragment` takes a html string and an optional tag name
// to generate DOM nodes from the given html string.
// The generated DOM nodes are returned as an array.
// This function can be overridden in plugins for example to make
// it compatible with browsers that don't support the DOM fully.
zepto.fragment = function(html, name, properties) {
  var dom, nodes, container

  // A special case optimization for a single tag
  if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

  if (!dom) {
    if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
    if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
    if (!(name in containers)) name = '*'

    container = containers[name]
    container.innerHTML = '' + html
    dom = $.each(slice.call(container.childNodes), function(){
      container.removeChild(this)
    })
  }

  if (isPlainObject(properties)) {
    nodes = $(dom)
    $.each(properties, function(key, value) {
      if (methodAttributes.indexOf(key) > -1) nodes[key](value)
      else nodes.attr(key, value)
    })
  }

  return dom
}
methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

    table = document.createElement('table'),
    tableRow = document.createElement('tr'),

    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },


singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
fragmentRE = /^\s*<(\w+|!)[^>]*>/,

```
(wondering why 'tr' is set to 'tbody, 'td' is set to 'tr' etc in Zepto...)

