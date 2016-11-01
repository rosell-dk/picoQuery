### Implementation:
empty: function() {
  __ITERATE__(<@ this.e @>, <@ function(item) {
    item.innerHTML = '';
  } @>);
  return this;
}

It seems the fastest way to empty a node is this:
while (el.firstChild) {
  el.removeChild(el.firstChild);
}
See test here:
https://jsperf.com/empty-an-element/4
http://stackoverflow.com/questions/13798796/what-is-the-best-way-to-empty-an-node-in-javascript

(on chrome, on my computer, its 27 million ops / sec, and innerHTML solution is only 0.4 million ops/sec)


### jQuery implementation (1.12.4)

  empty: function() {
	  var elem,
		  i = 0;

	  for ( ; ( elem = this[ i ] ) != null; i++ ) {

		  // Remove element nodes and prevent memory leaks
		  if ( elem.nodeType === 1 ) {
			  jQuery.cleanData( getAll( elem, false ) );
		  }

		  // Remove any remaining nodes
		  while ( elem.firstChild ) {
			  elem.removeChild( elem.firstChild );
		  }

		  // If this is a select, ensure that it displays empty (#12336)
		  // Support: IE<9
		  if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
			  elem.options.length = 0;
		  }
	  }

	  return this;
  },

### zepto implementation
  empty: function(){
    return this.each(function(){ this.innerHTML = '' })
  },

