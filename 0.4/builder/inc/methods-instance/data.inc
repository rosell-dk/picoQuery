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
  if (__IS_UNDEFINED__(key)) {
    // TODO: Add data-attr to object
    return this.e[0]['_data_data_'];    
  }
  if (__IS_UNDEFINED__(value) && (__IS_STRING__(key))) {
    // Check if data has been registred on this node, with this key
    if (this.e[0]['_data_data_'] && this.e[0]['_data_data_'].hasOwnProperty(key)) {
      return this.e[0]['_data_data_'][key];
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
      if(!el['_data_data_']) {
        el['_data_data_'] = {};
      }
	    if ( typeof key == "object" ) {
		    Object.keys(key).forEach(function(k) {
          console.log('key', k, key[k]);
          el['_data_data_'][k] = key[k];
		    });
	    }
      else {      
        el['_data_data_'][key] = value;
      }
    });
    return this;
  };
}

// OPTIMIZED_VERSION //
data:function(a, b) {
  if (__IS_UNDEFINED__(b)) {
    if (this.e[0]["_data_key_" + a]) {
      return this.e[0]["_data_" + a];
    }
    var d = "data-" + a.replace(/([A-Z])/g, "-$1").toLowerCase();
    return this.attr(d);
  }
  __ITERATE__(this.e, function(c) {
    c["_data_key_" + a] = !0;
    c["_data_" + a] = b;
  });
  return this;
}
