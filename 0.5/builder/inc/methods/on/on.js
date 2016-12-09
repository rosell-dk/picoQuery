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

  __ITERATE__(<@ this.e @>, <@ function(el) {
    // The third parameter "useCapture" is according to web standards optional and defaults to false.
    // However, in Firefox 2-6, it is non-optional
//    el.addEventListener(events, handler, false);

<?php if (isFeatureEnabled('remove') || isFeatureEnabled('html') || isFeatureEnabled('empty') || isFeatureEnabled('replaceWith')): ?>
    var h = function(e) {
      e.data = data;
      handler.call(this, e);
    };
    el.addEventListener(events, h, false);

    // Private data
    if(!el['__picoquerydata']) {
      el['__picoquerydata'] = {};
    }
    // Store reference to handler in array (FLAG#2)
    if (!el['__picoquerydata'][2]) {
      el['__picoquerydata'][2] = [];
    }
    el['__picoquerydata'][2].push({h:h, t:events});

<?php else: ?>
    el.addEventListener(events, function(e) {
      e.data = data;
      handler.call(this, e);
    }, false);
<?php endif; ?>

  } @>);
  return this;
}

