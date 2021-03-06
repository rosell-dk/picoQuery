If we only support .on(events, handler), the following is sufficient: */

on:function(events, handler) {
  return __ITERATE__(this.e, function(el) {
    // The third parameter "useCapture" is according to web standards optional and defaults to false.
    // However, in Firefox 2-6, it is non-optional
    el.addEventListener(events, handler, false);
  });
}
*/

### zepto implementation:
$.fn.on = function(event, selector, data, callback, one){
  var autoRemove, delegator, $this = this
  if (event && !isString(event)) {
    $.each(event, function(type, fn){
      $this.on(type, selector, data, fn, one)
    })
    return $this
  }

  if (!isString(selector) && !isFunction(callback) && callback !== false)
    callback = data, data = selector, selector = undefined
  if (callback === undefined || data === false)
    callback = data, data = undefined

  if (callback === false) callback = returnFalse

  return $this.each(function(_, element){
    if (one) autoRemove = function(e){
      remove(element, e.type, callback)
      return callback.apply(this, arguments)
    }

    if (selector) delegator = function(e){
      var evt, match = $(e.target).closest(selector, element).get(0)
      if (match && match !== element) {
        evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
        return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
      }
    }

    add(element, event, callback, data, selector, delegator || autoRemove)
  })
}


### jQuery implementation:
function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},


jQuery.event.add is a big function...
  jQuery.event = {
	  global: {},
	  add: function( elem, types, handler, data, selector ) {
      ...
*/
