/*
.data()

Description:
   Store arbitrary data associated with the matched elements or return the value at the named data store for the first element in the set of matched elements.

   http://api.jquery.com/data/

.data( key, value ) => jQuery
  key
    Type: String
    A string naming the piece of data to set.
  value
    Type: Anything
    The new data value; this can be any Javascript type except undefined.

.data( obj ) => jQuery
  obj
    Type: Object
    An object of key-value pairs of data to update.


.data( key ) => Object
  Return the value at the named data store for the first element in the jQuery collection, as set by data(name, value) or by an HTML5 data-* attribute.
  key
    Type: String
    Name of the data stored..data( key )

.data()

*/
data: function(key, value) {
  var i, attrs, name, elem;
  if (__IS_UNDEFINED__(key)) {
    elem = this.e[0];
    if(!elem['_picoquerydata']) {
      elem['_picoquerydata'] = {};
    }
    // Private data
    if(!elem['__picoquerydata']) {
      elem['__picoquerydata'] = {};
    }

    // Copy all data-attributes into the data object
    // - unless its already copied  (we set a flag in private data after copy. FLAG#0)

		if ( elem.nodeType === 1 && (!elem['__picoquerydata'][0] ) ) {
      attrs = elem.attributes;
			i = attrs.length;
			while ( i-- ) {

				// Support: IE11+
				// The attrs elements can be null (#14894)
				if ( attrs[ i ] ) {
					name = attrs[ i ].name;
					if ( name.indexOf( "data-" ) === 0 ) {
						name = jQuery.camelCase( name.slice( 5 ) );
//						dataAttr( elem, name, data[ name ] );
            elem['_picoquerydata'][name] = attrs[ i ].value;
					}
				}
			}
  	  elem['__picoquerydata'][0] = 1;
		}


    return elem['_picoquerydata'];    
  }
  if (__IS_UNDEFINED__(value) && (__IS_STRING__(key))) {
    // Check if data has been registred on this node, with this key
    if (this.e[0]['_picoquerydata'] && this.e[0]['_picoquerydata'].hasOwnProperty(key)) {
      return this.e[0]['_picoquerydata'][key];
    }
    else {
      // No data has been registred. Return the data-[key] attribute

      // Conform with https://www.w3.org/TR/html5/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes
      // TODO: test this implementation (got it from zepto)
      var attrName = 'data-' + key.replace(/([A-Z])/g, '-$1').toLowerCase();

      return this.attr(attrName);
    }
  }
  else {
    __ITERATE__(this.e, function(el) {
      // We store data in an expando property on the node
      // jQuery also stores on an expando property
      // TODO: Beware of memory leaks
      // https://developers.google.com/speed/articles/optimizing-javascript
      if(!el['_picoquerydata']) {
        el['_picoquerydata'] = {};
      }
	    if ( typeof key == "object" ) {
        // Shallow copy
		    Object.keys(key).forEach(function(k) {
          el['_picoquerydata'][k] = key[k];
		    });
	    }
      else {      
        el['_picoquerydata'][key] = value;
      }
    });
    return this;
  };
}

// OPTIMIZED_VERSION //
data:function(c, f) {
  var b, d, e, a;
  if (__IS_UNDEFINED__(c)) {
    a = this.e[0];
    a._picoquerydata || (a._picoquerydata = {});
    a.__picoquerydata || (a.__picoquerydata = {});
    if (1 === a.nodeType && !a.__picoquerydata[0]) {
      d = a.attributes;
      for (b = d.length;b--;) {
        d[b] && (e = d[b].name, 0 === e.indexOf("data-") && (e = jQuery.camelCase(e.slice(5)), a._picoquerydata[e] = d[b].value));
      }
      a.__picoquerydata[0] = 1;
    }
    return a._picoquerydata;
  }
  if (__IS_UNDEFINED__(f) && __IS_STRING__(c)) {
    if (this.e[0]._picoquerydata && this.e[0]._picoquerydata.hasOwnProperty(c)) {
      return this.e[0]._picoquerydata[c];
    }
    b = "data-" + c.replace(/([A-Z])/g, "-$1").toLowerCase();
    return this.attr(b);
  }
  __ITERATE__(this.e, function(a) {
    a._picoquerydata || (a._picoquerydata = {});
    "object" == typeof c ? Object.keys(c).forEach(function(b) {
      a._picoquerydata[b] = c[b];
    }) : a._picoquerydata[c] = f;
  });
  return this;
}
