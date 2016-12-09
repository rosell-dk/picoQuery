jQuery sorts the result in Document order. A lot of efford goes into that.



### jQuery implementation (1.12.4 and 2.2,4)
```
add: function( selector, context ) {
	return this.pushStack(
		jQuery.uniqueSort(
			jQuery.merge( this.get(), jQuery( selector, context ) )
		)
	);
},

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

```


### zepto implementation:
```
add: function(selector,context){
  return $(uniq(this.concat($(selector,context))))
},

concat: function(){
  var i, value, args = []
  for (i = 0; i < arguments.length; i++) {
    value = arguments[i]
    args[i] = zepto.isZ(value) ? value.toArray() : value
  }
  return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)
},

concat = emptyArray.concat

uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }
```
That is, uniq does the same as our __REMOVE_DUPLICATES__ helper
