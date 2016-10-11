/*
jQuery

Description:
  Return a collection of matched elements either found in the DOM based on passed argument(s) or created by passing an HTML string.
  http://api.jquery.com/jQuery/
 
 
TODO:
Scrutinize the jQuery 'fn.init' method to ensure compliance
For example $(1) doesn't return the same as in jQuery, right now
*/

function P(a,b) {

	if ( !a ) {
		this.e = [];
	}

  // It would be most readable if we wrote:
  //   if (typeof a === 'string') {
  // But we prioritize compact code over readability and speed, and can utilize the fact, that
  // there aren't any javascript datatype that comes after 'string', alphabetically
  // (possible data types are: boolean, number, function, object, string)
  else if (typeof a > 's') {
//console.log('array', a);

    // jQuery( html )
    // TODO: Support optional [ownerDocument] and [attributes]
    if (a[0] == '<') {
      // TODO: look at jQuery.parseHtml() and zepto.fragment
      // Need we test for ending '>' like jQuery does?
      var el = d.createElement('div');
      el.innerHTML = a;
      this.e = __TO_ARRAY__(el.children);

/*      this.e = __MAP__(this.e, function(item) {
        if (item.children) {
        }
      })*/
      // intro to document fragments in jQuery:   // http://ejohn.org/apps/workshop/adv-talk/#5
    }

    // jQuery( selector )
    else {

      // If subfeature: Scoped query selector
      if (b) {

        // Create array of "roots" that needs to be searched
        // If b is an element, it will just be [b]
        //   unless its a HTMLDocument, it will then be: [b.documentElement]
        // If b is an Array, it will be b  (ie: $​("li", $​("#item3"​)​.get​(​)​))
        // If b is a jQuery object, it will be b.e
        if (b.documentElement) {
          b = b.documentElement
        };

        var roots = (b instanceof P ? b.e : b instanceof Array ? b : [b]);

        // Push results to this array
        var arr = [];

        roots.forEach(function (b) {
          // https://github.com/lazd/scopedQuerySelectorShim

          var container, gaveContainer;

          // I guess it may happen that there is no parentNode,
          // although its not likely, as $("<b></b>") currently gets a div as a parent
          if (!b.parentNode) {
            // Add to temporary container
            container = document.createElement('div');
            container.appendChild(b);
          }

          if (!b.id) {
            // Give temporary ID (we use strings found nearby to make small gzip)
            b.id = 'querySelectorAllinnerHTML';
        
            arr = arr.concat(__TO_ARRAY__(b.parentNode.querySelectorAll('#'+b.id+' '+a)));

            // Reset the ID
//            b.id = '';
            b.removeAttribute('id');
          }
          else {
            arr = arr.concat(__TO_ARRAY__(b.parentNode.querySelectorAll('#'+b.id+' '+a)));
          }

          if (container) {
            container.removeChild(b);
          }
        });

        // Remove duplicates
        // Note that this code does not work with prototype 1.7.
        // (see parent.inc)
        // Here is a prototype 1.7 compatible variant:
        // arr = arr.filter(function(item,i,r){return arr.indexOf(item) == i});
        arr = arr.filter(function(item,i,r){return r.indexOf(item) == i});

        this.e = arr;
      }
      else {
        b = (b instanceof P ? b.e[0] : b);
        this.e = __TO_ARRAY__(d.querySelectorAll(a));
      }
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
  else if (a.map) {
//    this.e = __TO_ARRAY__(a);
    this.e = a;
/*jQuery:			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);*/

  }
  // jQuery ( NodeList )
  else if (a instanceof NodeList) {
//    console.log('html', a, a instanceof NodeList);
    this.e = __TO_ARRAY__(a);
  }
  // TODO: support jQuery (plainObject)
  else {

    this.e = [a];
  }


  <?php if (isFeatureEnabled('arraylike')):?>
  // Make our picoQuery object array-like, in the sense that it is accessible with [], and it has a "length" property
  for (var i=0; i<this.e.length; i++) {
    this[i] = this.e[i];    
  }
  this.length = this.e.length;
  // We also add the splice method in order for console.log to display
  // it like an array, as jQuery does.
  // http://elijahmanor.com/jquery-object-quacks-like-an-array-duck/
  // (although it does not seem to have any production value... tempted to let go...)
  this.splice = [].splice;

  <?php endif;?>

}

// OPTIMIZED_VERSION //
function P(a, b) {
  if (a) {
    if ("s" < typeof a) {
      if ("<" == a[0]) {
        var e = d.createElement("div");
        e.innerHTML = a;
        this.e = [].slice.call(e.children);
      } else {
        if (b) {
          var f = [];
          (b instanceof P ? b.e : [b]).forEach(function(c) {
            var b;
            c.parentNode || (b = document.createElement("div"), b.appendChild(c));
            c.id ? f = f.concat([].slice.call(c.parentNode.querySelectorAll("#" + c.id + " " + a))) : (c.id = "querySelectorAllinnerHTML", f = f.concat([].slice.call(c.parentNode.querySelectorAll("#" + c.id + " " + a))), c.removeAttribute("id"));
            b && b.removeChild(c);
          });
          this.e = f = f.filter(function(a, b, e) {
            return e.indexOf(a) == b;
          });
        } else {
          b = b instanceof P ? b.e[0] : b, this.e = [].slice.call(d.querySelectorAll(a));
        }
      }
    } else {
      if ("function" == typeof a) {
        return $(d).ready(a);
      }
      this.e = a.nodeType ? [a] : a instanceof P ? a.e : a.map ? a : [a];
    }
  } else {
    this.e = [];
  }
  <?php if (isFeatureEnabled('arraylike')):?>
  for (e = 0;e < this.e.length;e++) {
    this[e] = this.e[e];
  }
  this.length = this.e.length;
  this.splice = [].splice;
  <?php endif;?>
}

