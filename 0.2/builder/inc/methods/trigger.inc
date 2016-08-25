/*
.trigger() 

Description:
  Execute all handlers and behaviors attached to the matched elements for the given event type.
  http://api.jquery.com/trigger/

Partially supported signatures: 
  
  .trigger( eventType, [extraParameters] ) => $
     eventType [String]: A string containing a JavaScript event type, such as click or submit.
     NOT SUPPORTED: extraParameters [Array or PlainObject]: Additional parameters to pass along to the event handler.

   The "extraParameters" argument is relevant only when working with custom events

Unsupported signatures:
  .trigger( event, [extraParameters] ) => $
     event [Event]: A jQuery.Event object.
     extraParameters [Array or PlainObject]: Additional parameters to pass along to the event handler.
     

*/
// Execute all handlers and behaviors attached to the matched elements for the given event type 
trigger: function(eventType) {
    // TODO: This might not be compatible with all target browsers
    // Go look here: https://gist.github.com/dciccale/6226151
    // and here: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
    // http://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
    // https://www.google.dk/search?q=cross+browser+trigger+event&oq=cross+browser+trigger&aqs=chrome.1.69i57j0l2.3983j0j7&client=ubuntu&sourceid=chrome&es_sm=93&ie=UTF-8
    // https://gist.github.com/dciccale/6226151

  __EACH__(this, function(el) {
    var ev = document.createEvent('HTMLEvents');
    ev.initEvent(eventType,true,false);
    el.dispatchEvent(ev);
  });
  return this;
},

// OPTIMIZED_VERSION //
trigger: function(a) {
  __EACH__(this, function(b) {
    // z is a garbage variable defined a scope up, the purpose of which is
    // to save the few bytes a "var" declaration takes.
    // We are only allowed to use it in optimized version
    z = d.createEvent('HTMLEvents');
    z.initEvent(a,true,false);
    b.dispatchEvent(z);
  });
  return this
}

