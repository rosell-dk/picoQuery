/*
.on() 

Description:
  Attach an event handler function for one or more events to the selected elements.
  http://api.jquery.com/on/

Partially supported signatures: 
  .on( events [,selector] [,data], handler ) => jQuery
     events [String]: 
        Event type, such as "click"
        COMMA-SEPARATED LIST OF EVENTS ARE NOT SUPPORTED
        Namespaces such as "keydown.myPlugin" are not supported
     selector [String] NOT SUPPORTED
     data [String] NOT SUPPORTED

Unsupported signatures
  .on( events [,selector] [,data]) => $
     In this signature, events is a plain object, and the purpose is again to listen
     to multiple events in one go.

*/
on:function(events, selector, data, handler) {
  /* If we only support .on(events, handler), the following is sufficient: */
  /*
on:function(events, handler) {
  return __EACH__(this, function(el) {
    // The third parameter "useCapture" is according to web standards optional and defaults to false.
    // However, in Firefox 2-6, it is non-optional
    el.addEventListener(events, handler, false);
  });
}
*/
/* zepto implementation:
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
*/

/*
jQuery implementation:
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
  // event, selector, data, handler
	if ( data == null && handler == null ) {

		// ( types, handler )
		handler = selector;
		data = selector = undefined;
	} else if ( handler == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, handler )
			handler = data;
			data = undefined;
		} else {

			// ( types, data, handler )
			handler = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( handler === false ) {
		handler = function() {
      return false
    };
	} else if ( !handler ) {
		return events;
	}

//console.log('data', data);
  return __EACH__(this, function(el) {
    // The third parameter "useCapture" is according to web standards optional and defaults to false.
    // However, in Firefox 2-6, it is non-optional
//    el.addEventListener(events, handler, false);
    el.addEventListener(events, function(e) {
      e.data = data;
      handler.call(this, e);
    }, false);
  });

}

// OPTIMIZED_VERSION //
on:function(d, a, c, b) {
  null == c && null == b ? (b = a, c = a = void 0) : null == b && ("string" === typeof a ? (b = c, c = void 0) : (b = c, c = a, a = void 0));
  if (!1 === b) {
    b = function() {
      return !1;
    };
  } else {
    if (!b) {
      return d;
    }
  }
  return __EACH__(this, function(a) {
    a.addEventListener(d, function(a) {
      a.data = c;
      b.call(this, a);
    }, !1);
  });
}
