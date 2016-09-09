/*
next

Description:
  Get the immediately following sibling of each element in the set of matched elements. If a selector is provided, it retrieves the next sibling only if it matches that selector.
  http://api.jquery.com/next/

Fully supported signatures: 
  .next( [selector] ) => jQuery
    selector [String]: 
      A string containing a selector expression to match elements against.

 */
next: function(selector) {
  // If we were optimizing for speed, we would only make the filter call,
  // when selector was supplied...

  var arr = this.e.map(function(a){return a['nextElementSibling']}); 

  // Remove nulls
  arr = arr.filter(function(item,i,r){return item != null});
  return $(arr).filter(selector||'*');

  // Maybe it can be optimized like we do with standard events
/*
  ;[['next','nextSibling'],[['parent','parentElement']].forEach(function(a) {
    $.fn[a[0]] = function(b){
      return $(this.e.map(function(c){return c[a[1]]})).filter(selector || '*')
    }
  });

  // Fortunately, nextElementSibling seems to be supported in all browsers
  // that supports Array.prototype.indexOf()
  // Support: https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/previousElementSibling

  // So we do not have to expand that check, nor write compatible function, ie:

  // Similar to pluck, but skips nodes that are not element-nodes (text nodes, etc). Used for siblings.
  function siblingFn(p) {
    return function (o) {
     	while ((o=o[p]) && o.nodeType !== 1 ) {}
    	return o;
    };
  }
  return $(this.e.map(siblingFn('nextSibling')))

  // btw: here is zepto implementation:     
  // `pluck` is borrowed from Prototype.js
  pluck: function(property){
    return $.map(this, function(el){ return el[property] })
  },

  prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },



  // TODO: .filter(selector || '*') },
*/

//  this.e = this.e.map(function(a){return a['parent']});return this;
}

// OPTIMIZED_VERSION //
next: function(a) {
  return $(this.e.map(function(b){return b['nextElementSibling']}).filter(function(c){return c != null})).filter(a||'*')
}
