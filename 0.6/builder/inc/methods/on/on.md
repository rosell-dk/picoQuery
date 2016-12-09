When events are going to be removed, we must call DOM API:
		elem.removeEventListener( type, handle );

So we need to keep track the handlers added to an element in order to remove them in CLEAN_DATA
jQuery uses the privData cache to store these. And so can we.

Both jQuery and picoQuery uses a proxy eventHandler, which is the same for all.
It has different closures, though (needed in order for the argument "data" to be available)

jQuery stores this when an event is added:
  handler: ref to the proxyHandler
  event: {
    click: [
      ref to special handlerObj, ...
    ],
    blur: ...
  }

But at the point elem.removeEventListener( type, handle ) is called, it does not use the
references in the event-object. It only uses the reference to the proxyHandler, which is only
stored once.

The loop looks like this:
		if ( ( data = elem[ dataPriv.expando ] ) ) {
			if ( data.events ) {
				for ( type in data.events ) {
					if ( special[ type ] ) {
						jQuery.event.remove( elem, type );

					// This is a shortcut to avoid jQuery.event.remove's overhead
					} else {
						jQuery.removeEvent( elem, type, data.handle );
					}
				}
			}

It seems wrong, actually.
But the thing is that jQuery only stores one event handler per type

running this in chrome console proves it:
var a = function(){alert("hej")};
var b = function(){alert("hello")};
var $div = $("<div></div>");
var div = $div.get(0);
$div.on("click", a);
getEventListeners(div); // shows one handler
$div.on("click", b);
getEventListeners(div); // still only shows one handler

That event handler takes care of dispatching to all registred events

Right now, we don't aim for that complexity.
We just want our event handlers to be removed when elements are removed.

To be able to do that, we need to store one handler per handler, so to say,
as well as the event type

  el['__picoquerydata'][2].push({handler:handler, type:type});









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
It sets this to the elements private data:
  - "handle": a proxy handler, which calls dispatch.
      An element only has ONE of these.

  - events: an object containing the event types that are attached
      click: array of click handlers (handleObj objects)




  jQuery.event = {
	  global: {},
	  add: function( elem, types, handler, data, selector ) {
    ...
		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

    ...
		var	elemData = dataPriv.get( elem );
    ...

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}



			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;
      ...

		handlers.push( handleObj );

    ...
		elem.addEventListener( type, eventHandle );

*/
