/*
jQuery.data()

Description:
  Store arbitrary data associated with the specified element and/or return the value that was set.
  http://api.jquery.com/jQuery.data/

Signatures:
jQuery.data( element, key, value )
jQuery.data( element, key )
jQuery.data( element )

*/
$.data = function(elem, key, value) {
  var i, attrs, name;
  if (__IS_UNDEFINED__(key)) {
    if(!elem['_picoquerydata']) {
      elem['_picoquerydata'] = {};
    }
    // Private data
    if(!elem['__picoquerydata']) {
      elem['__picoquerydata'] = {};
    }

    return elem['_picoquerydata'];    
  }
  if (__IS_UNDEFINED__(value) && (__IS_STRING__(key))) {
    // Check if data has been registred on this node, with this key
    if (elem['_picoquerydata'] && elem['_picoquerydata'].hasOwnProperty(key)) {
      return elem['_picoquerydata'][key];
    }
    else {
      // No data has been registred. Return the data-[key] attribute
      var attrName = 'data-' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return this.attr(attrName);
    }
  }
  else {
    if(!elem['_picoquerydata']) {
      elem['_picoquerydata'] = {};
    }
    if ( typeof key == "object" ) {
      // Shallow copy
	    Object.keys(key).forEach(function(k) {
        elem['_picoquerydata'][k] = key[k];
	    });
    }
    else {      
      elem['_picoquerydata'][key] = value;
    }
  };
}

// OPTIMIZED_VERSION //
$.data = function(a, b, c) {
  if (__IS_UNDEFINED__(b)) {
    return a._picoquerydata || (a._picoquerydata = {}), a.__picoquerydata || (a.__picoquerydata = {}), a._picoquerydata;
  }
  if (__IS_UNDEFINED__(c) && __IS_STRING__(b)) {
    if (a._picoquerydata && a._picoquerydata.hasOwnProperty(b)) {
      return a._picoquerydata[b];
    }
    c = "data-" + b.replace(/([A-Z])/g, "-$1").toLowerCase();
    return this.attr(c);
  }
  a._picoquerydata || (a._picoquerydata = {});
  "object" == typeof b ? Object.keys(b).forEach(function(c) {
    a._picoquerydata[c] = b[c];
  }) : a._picoquerydata[b] = c;
};
