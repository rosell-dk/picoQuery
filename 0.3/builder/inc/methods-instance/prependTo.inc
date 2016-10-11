/*
.prependTo() 

Description:
  Insert every element in the set of matched elements to the beginning of the target.
  http://api.jquery.com/prependTo/

*/
prependTo: function(target) {
/* If we did not have to support prepending to multiple targets, like this:
   $​("​<i>​hello​</i>​"​)​.prependTo​($​("​<a>​​</a>​​<b>​b​</b>​"​)​)​
  - we could simply use this implementation:

  $(target).prepend(this);
  return this;

  or this;
  __ITERATE__(this.e, function(el) {      
      $(target).prepend(el);
    });
  }); 
  return this;

  The tricky part of supporting multiple targets is that all nodes, except the
  last has to be cloned

*/

//  $(target).prepend(this);
//  return this;


  var ret = [], 
    me = this,
    arr = $(target).e,
    last = arr.length - 1,
    elems;

  __ITERATE__(arr, function(t, idx) {
    elems = (idx == last ? me.clone(1) : me);
    $(t).prepend(elems);
    Array.prototype.push.apply(ret, elems);    
  });
  return $(ret);


/*
	var elems,
		ret = [],
		insert = $(target),
		last = insert.length - 1,
		i = 0;

	for ( ; i <= last; i++ ) {
		elems = i === last ? this : this.clone(1);
		$(insert[i]).prepend( elems );
		Array.prototype.push.apply( ret, elems.e );
	}
  return $(ret);
*/


/*

		var elems,
			ret = [],
			insert = $(target),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			$(insert[i]).prepend( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			Array.prototype.push.apply( ret, elems.get() );
		}

    return $(ret);
//		return this.pushStack( ret );

*/


/*
  __ITERATE__(this.e, function(el) {
      console.log('prependTo', target, $(target));
    __ITERATE__($(target).e, function(t) {
      console.log('prepending', t, $(t), el);
      $(t).prepend(el.cloneNode(true));
      console.log('result', t.innerHTML)
    });
  }); 
  console.log('final result', this.e, target);
  return $(target);
**/
/*
/* jQuery implementation:
jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
ie:
	jQuery.fn.prependTo = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ 'prepend' ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};


zepto implementation (not compliant):

    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
      $(html)[operator](this)
      return this
    }

    ie:
    $.fn['prependTo'] = function(target) {
      $(target)['prepend'](this)
      return this
    }

*/

}

// OPTIMIZED_VERSION //
prependTo:function(a) {
  var c = [], d = this, g = $(a).e, e = g.length - 1, b;
  __ITERATE__(g, function(a, f) {
    b = f == e ? d.clone(1) : d;
    $(a).prepend(b);
    Array.prototype.push.apply(c, b);
  });
  return $(c);
}
