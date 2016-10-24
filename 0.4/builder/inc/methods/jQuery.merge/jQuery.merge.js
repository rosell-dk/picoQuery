/*
jQuery.merge()

Description:
  Merge the contents of two arrays together into the first array.
  http://api.jquery.com/jQuery.merge/

Signatures:   
  jQuery.merge( first, second ) => Array
    first
      Type: ArrayLikeObject
      The first array-like object to merge, the elements of second added.
    second
      Type: ArrayLikeObject
      The second array-like object to merge into the first, unaltered.

Unsupported signatures:   
  jQuery.noConflict( removeAll ) => jQuery

*/
$.merge = function(first, second) {
//  return __TO_ARRAY__(first).concat(__TO_ARRAY__(<@ second @>))

	// In jQuery source code, they claim that the following doesnt work on Android<4.1, PhantomJS<2
	// they write: push.apply(_, arraylike) throws on ancient WebKit
  // ES5 compatibility table is down right now, http://kangax.github.io/compat-table/es5/
  // - so cannot check if ancient WebKit matters to us

  Array.prototype.push.apply(first, second);
  return first;
}

