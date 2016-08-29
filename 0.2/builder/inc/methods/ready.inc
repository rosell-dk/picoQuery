/*
.ready() 

Description:
  Specify a function to execute when the DOM is fully loaded.
  http://api.jquery.com/ready/

Fully supported signatures: 
  .ready( handler ) => $
     handler [Function]: A function to execute after the DOM is ready.

*/
ready:function(handler) {
  // We do not need to make the IE8-workaround that zepto does, because it is only an issue in IE8
  // If document is already ready, trigger the callback
  // Its ready if readyState is "complete", "loaded" or "interactive"
  // Other possible values are: "uninitialized" and "loading" - http://www.w3schools.com/jsref/prop_doc_readystate.asp)
  // So if readyState starts with "u", it must be "uninitialized". If contains "ng", it must be "loading"
  if (/^u|ng/.test(document.readyState))
    this.on('DOMContentLoaded',function(){handler($)});
  else {
    handler($);
  }
  return this;
}

// OPTIMIZED_VERSION //
ready: function(a) {
  /^u|ng/.test(d.readyState)?this.on("DOMContentLoaded",function(){a($)}):a($);return this;
}
