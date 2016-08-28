/*
.each() 

Description:
  Return a collection of matched elements either found in the DOM based on passed argument(s) or created by passing an HTML string.
  http://api.jquery.com/jQuery/
 
     
*/

function P(a,b) {

  // It would be most readable if we wrote:
  //   if (typeof a === 'string') {
  // But we prioritize compact code over readability and speed, and can utilize the fact, that
  // there aren't any javascript datatype that comes after 'string', alphabetically
  // (possible data types are: boolean, number, function, object, string)
  if (typeof a > 's') {

    // jQuery( html )
    // TODO: Support optional [ownerDocument] and [attributes]
    if (a[0] == '<') {
      var el = d.createElement('div');
      el.innerHTML = a;
      this.e = [el.firstChild];
    }

    // jQuery( selector )
    // TODO: Support optional [context]
    else {
      this.e = __TO_ARRAY__(d.querySelectorAll(a));
    }
  }
  // jQuery( callback )
  else if (__IS_FUNCTION__(a)) {
    // TODO: we might consider implementing ready functionality right here instead of delegating it
    // to the .ready() method, and always having 'ready' as a dependency. The .ready() method could then utilize it
    return $(d).ready(a);
  }
  // jQuery( element )
  else if (a.nodeType) {
    this.e = [a];
  } 
  // jQuery( selection ) - An existing jQuery object to clone.
  else if (a instanceof P) {
    this.e = a.e;
  }
  // jQuery( elementArray ) - An array containing a set of DOM elements to wrap in a jQuery object.
  else if (a.length) {
    this.e = __TO_ARRAY__(a);
  }
  // TODO: support jQuery (plainObject)
  else {
    this.e = [];
  }

  // IF FEATURE: core:array-like:brackets
  // Make our picoQuery object array-like, in the sense that it is accessible with []
/*
  for (var i=0; i<this.e.length; i++) {
    this[i] = this.e[i];    
  }

  // IF FEATURE: core:array-like:length
  this.length = this.e.length;*/
}

// OPTIMIZED_VERSION //
function P(a,c){if(typeof a>"s")if("<"==a[0]){z=d.createElement("div");z.innerHTML=a;this.e=[z.firstChild]}else this.e=__TO_ARRAY__(d.querySelectorAll(a));else{if(__IS_FUNCTION__(a))return $(d).ready(a);this.e=a.nodeType?[a]:a instanceof P?a.e:a.length?__TO_ARRAY__(a):[]}};
