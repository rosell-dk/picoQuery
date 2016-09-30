//console.log($.fn);

//var j$ = $;

// 

var usedApiFeatures = [], usedApiFeaturesLookup = {};

var fncopy = jQuery.extend({}, jQuery.fn);

var items = [];
for (var item in fncopy) {
  switch (item) {
    // jquery fiddles with the prototype of init, which
    // prevents us from hijacking init()
    case 'init':
    case 'jquery':
//    case 'constructor':
      continue;
  }
  items.push(item);
}
console.log(fncopy);

//items = ['css'];
items.forEach(function(methodName) {
  jQuery.fn[methodName] = function() {
    console.log('fncopy:' + methodName);
//    console.log(fncopy);
    var v = fncopy[methodName].apply(this, arguments);
//    console.log('ok');
//    console.log(methodName, arguments, '=>', v);
//    console.log(methodName + ' called');
    if (!usedApiFeaturesLookup[methodName]) {
      usedApiFeatures.push(methodName)
    }
    usedApiFeaturesLookup[methodName] = true;
    return v;
  }
});

//console.log('little test');

//console.log(jQuery( document ).constructor);
console.log('done hijack');

/*
function logUsedFeatures() {
  console.log(usedApiFeatures);
}
//window.setTimeout(logUsedFeatures, 2000);
var tid = window.setInterval(logUsedFeatures, 3000);

window.setTimeout(function() {
  window.clearInterval(tid)
  tid = window.setInterval(logUsedFeatures, 3000);
}, 2000);

window.setTimeout(function() {
  window.clearInterval(tid);
}, 10000);
*/
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
