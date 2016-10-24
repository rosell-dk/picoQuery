(function() {

  var usedApiFeatures = [], usedApiFeaturesLookup = {};
 
  // expose some functions
  window.featuredetect = {};
  window.featuredetect.clearLog = function() {
    console.log('clearing log')
    usedApiFeatures = [];
    usedApiFeaturesLookup = {};
  };


  // Hijack instance methods
  // =======================
  var fncopy = jQuery.extend(true, {}, jQuery.fn);
  var items = [];
  for (var item in fncopy) {
    if (typeof fncopy[item] != 'function') {
      continue;
    }
    switch (item) {
      // jquery fiddles with the prototype of init, which
      // prevents us from hijacking init()
      case 'init':
      case 'constructor':
        continue;
    }
    items.push(item);
  }
  //console.log('hijacking the following fn-methods:', items);
  //console.log(fncopy);

  //items = ['css'];
  items.forEach(function(methodName) {
    // Copy any sub functions / properties
    // ie jQuery.ready.promise needs to be copied
    var subProperties = jQuery.extend(true, {}, jQuery.fn[methodName]);

    jQuery.fn[methodName] = function() {
//      console.log(methodName + ' was called', arguments);
//      console.log(fncopy[methodName]);
      if (!this.depth) {
        this.depth = 0;
      }
      this.depth++;
      if ((!usedApiFeaturesLookup[methodName]) && (this.depth == 1)) {
        usedApiFeatures.push(methodName)
      }
      var v = fncopy[methodName].apply(this, arguments);
//      console.log(methodName + ' was called', this.depth, arguments);
      this.depth--;
      usedApiFeaturesLookup[methodName] = true;
      return v;
    }

    // Copy sub functions / properties back (ie jQuery.ready.promise needs to be copied back)
    jQuery.extend(true, jQuery.fn[methodName], subProperties);

  });

  // Hijack jquery methods
  // =======================
  var jqcopy = jQuery.extend(true, {}, jQuery);
  var items = [];
  for (var item in jqcopy) {
    if (typeof jqcopy[item] != 'function') {
      continue;
    }
    switch (item) {
      case 'fn':
      case 'Event':
        // Event is a bit special, and can't be copied right off
        continue;
    }
    items.push(item);
  }
//  console.log('hijacking the following jquery methods:', items);

  items.forEach(function(methodName) {
  //  console.log('hijacking:' + methodName);

    // Copy any sub functions / properties
    // ie jQuery.ready.promise needs to be copied
    var subProperties = jQuery.extend(true, {}, jQuery[methodName]);

    jQuery[methodName] = function() {
//      console.log(methodName + ' was called', arguments);
//      console.log(fncopy[methodName]);
      var v = jqcopy[methodName].apply(this, arguments);

      if (!usedApiFeaturesLookup['jQuery.' + methodName]) {
        usedApiFeatures.push('jQuery.' + methodName)
      }
      usedApiFeaturesLookup['jQuery.' + methodName] = true;
      return v;
    }

    // Copy sub functions / properties back (ie jQuery.ready.promise needs to be copied back)
    jQuery.extend(true, jQuery[methodName], subProperties);
    
  });

  // Timed logging
  // =======================

  function logUsedFeatures() {
    console.log('used methods:', usedApiFeatures);
  }
  logUsedFeatures();
  window.setTimeout(logUsedFeatures, 100);

  // In the beginning, log used features every second
  var tid = window.setInterval(logUsedFeatures, 1000);

  // After 5 seconds, log only every 3rd second
  window.setTimeout(function() {
    window.clearInterval(tid)
    tid = window.setInterval(logUsedFeatures, 3000);
  }, 5000);

  // After 20 seconds, log only every 10th second
  window.setTimeout(function() {
    window.clearInterval(tid);
    tid = window.setInterval(logUsedFeatures, 10000);
  }, 20000);

  // After 60 seconds, stop logging
  window.setTimeout(function() {
    window.clearInterval(tid);
  }, 60000);

})();


//console.log('little test');

//console.log(jQuery( document ).constructor);
//console.log('done hijack');




/*
  console.log(item);
  $.fn[item] = function() {
    copy[item].apply(this, arguments);
    console.log()
  }
}*/

/*
;'addClass.append.appendTo.css.each.first.get.hide.next.on.parent.ready.removeClass.trigger'.split('.').forEach(function(a,i) {
  $.fn[a] = function() {
    var v = fns[i].apply(this, arguments);
    return (v==u?this:v);
  }
});
*/
