jQuery does not remove its references to its DOM nodes.
ie, $(el).remove().get(0) will returns el.
So picoQuery shall not do so, either.

In chapter 3 in this page, it is recommended to remove such references.
https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/

Anyway, the DOM node references will be garbage collected along with the jQuery object, once
it is unreferenced.



### Implementation
```
  var $sel = this.filter(selector||'*');
  __ITERATE__(<@ $sel.e @>, <@ function(el) {
    if (el.parentNode) {
      __CLEAN_DATA__(<@ el @>)
      el.parentNode.removeChild(el);
    }
  } @>);
  return this;
```

//  var arr = this.e.map(function(item){return __TO_ARRAY__(<@ a['children'] @>)});
//  return $(arr).filter(selector||'*');


### min
remove:function(b) {
  this.filter(b || "*").e.forEach(function(a) {
    a.parentNode && a.parentNode.removeChild(a);
  });
  return this;
}


### Speedtest
https://jsperf.com/innerhtml-vs-removechild/376


### jQuery implementation

```
remove: function( selector ) {
	return remove( this, selector );
},
detach: function( selector ) {
	return remove( this, selector, true );
},

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}



```


