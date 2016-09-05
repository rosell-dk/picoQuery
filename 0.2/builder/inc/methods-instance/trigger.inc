/*
.trigger() 

Description:
  Execute all handlers and behaviors attached to the matched elements for the given event type.
  http://api.jquery.com/trigger/

Partially supported signatures: 
  
  .trigger( eventType, [extraParameters] ) => jQuery
     eventType [String]: A string containing a JavaScript event type, such as click or submit.
     NOT SUPPORTED: extraParameters [Array or PlainObject]: Additional parameters to pass along to the event handler.

   The "extraParameters" argument is relevant only when working with custom events

Unsupported signatures:
  .trigger( event, [extraParameters] ) => jQuery
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

  __EACH__(this, function(el) {
    // Trigger native event
    // This code is from http://youmightnotneedjquery.com/
    /*   var ev = document.createEvent('HTMLEvents');
         ev.initEvent(eventType,true,false);
         el.dispatchEvent(ev);*/
    // However, does this work with mouse events?
    // Zepto, the mozilla example, and the answer by Mishra to this question:
    // http://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
    // all handles mouse events differently

    // Another problem is that the  "initEvent" has been removed from the web standards, 
    // so we cannot rely on it to be supported by future (or even current?) browsers
    // (according to https://developer.mozilla.org/en/docs/Web/API/Event/initEvent)

    // We are supposed to do like they say here:
    // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
    // However, this is IE11+, so I guess we have to implement both

    // if (very modern browser) {
    //   do something along these lines:
    //    var event = new Event('build');
    //    el.dispatchEvent(eventType);
    //   and for mouse events, its new MouseEvent()
    // } else {


    // However, initEvent is probably going to be supported quite a while.
    // and zepto also relyes on it, so we just do it old-style

    var ev = document.createEvent('HTMLEvents');
    ev.initEvent(eventType,true,false);
    el.dispatchEvent(ev);

    // TODO: Handle mouse events?
    // Check out how zepto do it
    /*
  $.Event = function(type, props) {
    if (!isString(type)) props = type, type = props.type
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
    event.initEvent(type, bubbles, true)
    return compatible(event)
  }

  $.fn.trigger = function(event, args){
    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
    event._args = args
    return this.each(function(){
      // handle focus(), blur() by calling them directly
      if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
      // items in the collection might not be DOM elements
      else if ('dispatchEvent' in this) this.dispatchEvent(event)
      else $(this).triggerHandler(event, args)
    })
  }

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function(event, args){
    var e, result
    this.each(function(i, element){
      e = createProxy(isString(event) ? $.Event(event) : event)
      e._args = args
      e.target = element
      $.each(findHandlers(element, event.type || event), function(i, handler){
        result = handler.proxy(e)
        if (e.isImmediatePropagationStopped()) return false
      })
    })
    return result
  }

*/
  });
  return this;
}

// OPTIMIZED_VERSION //
trigger: function(a) {
  __EACH__(this, function(b) {
    // z is a garbage variable defined a scope up, the purpose of which is
    // to save the few bytes a "var" declaration takes.
    // We are only allowed to use it in optimized version
    z = d.createEvent('HTMLEvents');
    z.initEvent(a,!0,!1);
    b.dispatchEvent(z);
  });
  return this
}

