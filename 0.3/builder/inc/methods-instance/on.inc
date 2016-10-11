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
on:function(events, handler) {
  return __EACH__(this, function(el) {
    // The third parameter "useCapture" is according to web standards optional and defaults to false.
    // However, in Firefox 2-6, it is non-optional
    el.addEventListener(events, handler, false);
  });
}

// OPTIMIZED_VERSION //
on: function(a,b) {
	__EACH__(this, function(c) {
    c.addEventListener(a, b, !1);
  });return this;
}
