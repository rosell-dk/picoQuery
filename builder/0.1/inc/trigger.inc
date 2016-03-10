<?php if ($comments_code_notes): ?>
  // Execute all handlers and behaviors attached to the matched elements for the given event type.
  //
  // http://api.jquery.com/trigger/
  // http://api.jquery.com/trigger/#trigger-eventType-extraParameters
  // http://api.jquery.com/trigger/#trigger-event-extraParameters
<?php endif; ?>
    
  trigger: function(type) {
<?php if ($comments_devel_notes): ?>
    // TODO: This might not be compatible with all target browsers
    // Go look here: https://gist.github.com/dciccale/6226151
    // and here: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
    // http://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
    // https://www.google.dk/search?q=cross+browser+trigger+event&oq=cross+browser+trigger&aqs=chrome.1.69i57j0l2.3983j0j7&client=ubuntu&sourceid=chrome&es_sm=93&ie=UTF-8
    // https://gist.github.com/dciccale/6226151

    //this._e(function(el) {  
    //});
<?php endif; ?>

    var ev = document.createEvent('HTMLEvents');
    ev.initEvent(type,true,false);
    this._v[0].dispatchEvent(ev);
    return this;
  },
