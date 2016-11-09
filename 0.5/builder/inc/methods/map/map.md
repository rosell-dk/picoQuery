### zepto implementation
map: function(fn){
  return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
},

$.map = function(elements, callback){
  var value, values = [], i, key
  if (likeArray(elements))
    for (i = 0; i < elements.length; i++) {
      value = callback(elements[i], i)
      if (value != null) values.push(value)
    }
  else
    for (key in elements) {
      value = callback(elements[key], key)
      if (value != null) values.push(value)
    }
  return flatten(values)
}


### jQuery 2.2.4 implementation (looks identical to 1.12.4)
map: function( callback ) {
	return this.pushStack( jQuery.map( this, function( elem, i ) {
		return callback.call( elem, i, elem );
	} ) );
},

jQuery.map:

// arg is for internal usage only
map: function( elems, callback, arg ) {
  var length, value,
	  i = 0,
	  ret = [];

  // Go through the array, translating each of the items to their new values
  if ( isArrayLike( elems ) ) {
	  length = elems.length;
	  for ( ; i < length; i++ ) {
		  value = callback( elems[ i ], i, arg );

		  if ( value != null ) {
			  ret.push( value );
		  }
	  }

  // Go through every key on the object,
  } else {
	  for ( i in elems ) {
		  value = callback( elems[ i ], i, arg );

		  if ( value != null ) {
			  ret.push( value );
		  }
	  }
  }

  // Flatten any nested arrays
  return concat.apply( [], ret );
},

