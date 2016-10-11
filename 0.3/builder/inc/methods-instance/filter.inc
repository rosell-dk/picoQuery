/*
.filter()

Description:
  Reduce the set of matched elements to those that match the selector or pass the function's test.
  http://api.jquery.com/filter/

Note:
The special JQuery selectors, such as ":button", etc are not supported
http://api.jquery.com/category/selectors/jquery-selector-extensions/

:nth-of-type(odd)

Partially supported signatures:
  (only problem is that special jQuery selectors, such as ":button", etc are not supported)
  .filter(selector) => jQuery
    selector [String] :
      A string containing a selector expression to match the current set of elements against.

Supported signatures: 
  .filter(elements) => jQuery
    elements [Element]
      One or more DOM elements to match the current set of elements against.

  .filter(selection) => jQuery
      selection
        Type: jQuery
        An existing jQuery object to match the current set of elements against.

Unsupported signatures: 

  .filter(function) => jQuery
      function
        Type: Function( Integer index, Element element ) => Boolean
        A function used as a test for each element in the set. this is the current DOM element.



*/
filter: function(selector) {

/*
  if (selector == '*') {
    return this;
  }
*/

/*
  For very modern browsers, we can implement filter(selector[string]) as
  simple as this:
  (but right now, element.matches is only supported by 68% globally)

  return $(this.e.filter(function(el){
    return el.matches(selector);
  }));

  We can improve browser support to 92% globally this way:

  return $(this.e.filter(function(el){
    return (el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.oMatchesSelector || el.matchesSelector).call(el, selector);
  }));

  However, 92% is a lot less than the 97% that picoQuery otherwise supports
  (querySelectorAll + addEventHandler) (97%)

  So we go for the old-school solution, which is to use querySelectorAll
  on the parent element
  (for size reasons, we do not implement both - though speedwise, the above wins)
*/

  // In order to avoid recurssion, we need to check for '*'
  // (because we call parent(), and parent() is lazy and calls filter('*'))
  return (selector=='*') ? this : $(this.e.filter(function(element){
    // There may not be a parent, but it turns out to be no problem
    return ~$(selector, $(element).parent().e[0]).e.indexOf(element);
  }));

/*
  return $(this.e.filter(function(element){
    // zepto-based solution (rewritten for clarity)
    // (only when selector is string)

    var parent = element.parentNode;
    var noParent = !parent;
    if (noParent) {
      parent = document.createElement('div');
      parent.appendChild(element);
    }
    // the Array.prototype.indexOf searches an array for an element, and returns
    // the index, or -1.
    // Its supported in FF4+, IE9+, SF4+, Opera 10.5+, Konq 4.9+ and all modern browsers.

    // Alternatively, we could use Array.prototype.some()
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    // Its a bit better supported (as above, but FF2+, SF 3.2+)

    var match = (__TO_ARRAY__(parent.querySelectorAll(selector)).indexOf(element) >= 0);
    if (noParent) {
      parent.removeChild(element)
    }
    return match;
  }));
*/
/*
    
//    if (temp) (parent = tempParent).appendChild(element);
console.log([].slice.call(parent.querySelectorAll(selector)));
console.log([].slice.call(parent.querySelectorAll(selector)).indexOf(element));
console.log([].slice.call(~(parent.querySelectorAll(selector)).indexOf(element)));

    match = ~parent.querySelectorAll(selector).splice().indexOf(element);
    temp && tempParent.removeChild(element);
    return match;
  }));

*/

//    if (matchesSelector) return matchesSelector.call(element, selector)

/*
  zepto implementation:
  filter calls zepto.matches (line 55), which uses element.matches
  http://caniuse.com/#search=matches

    filter: function(selector){
      if (isFunction(selector)) return this.not(this.not(selector))
      return $(filter.call(this, function(element){
        return zepto.matches(element, selector)
      }))
    },

    // from this.not:
      var nodes=[]
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function(idx){
          if (!selector.call(this,idx)) nodes.push(this)
        })

  var filter = emptyArray.filter


  zepto.matches = function(element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false
    var matchesSelector = element.matches || element.webkitMatchesSelector ||
                          element.mozMatchesSelector || element.oMatchesSelector ||
                          element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)
    // fall back to performing a selector:
    var match, parent = element.parentNode, temp = !parent
    if (temp) (parent = tempParent).appendChild(element)
    match = ~zepto.qsa(parent, selector).indexOf(element)
    temp && tempParent.removeChild(element)
    return match
  }


  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators
  http://es6-features.org/#ExpressionBodies

*/

/*
  jQuery implementation:

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true) );
	},

  // Implement the identical functionality for filter and not
  function winnow( elements, qualifier, keep ) {

	  // Can't pass null or undefined to indexOf in Firefox 4
	  // Set to 0 to skip string check
	  qualifier = qualifier || 0;

	  if ( jQuery.isFunction( qualifier ) ) {
		  return jQuery.grep(elements, function( elem, i ) {
			  var retVal = !!qualifier.call( elem, i, elem );
			  return retVal === keep;
		  });

	  } else if ( qualifier.nodeType ) {
		  return jQuery.grep(elements, function( elem ) {
			  return ( elem === qualifier ) === keep;
		  });

	  } else if ( typeof qualifier === "string" ) {
		  var filtered = jQuery.grep(elements, function( elem ) {
			  return elem.nodeType === 1;
		  });

		  if ( isSimple.test( qualifier ) ) {
			  return jQuery.filter(qualifier, filtered, !keep);
		  } else {
			  qualifier = jQuery.filter( qualifier, filtered );
		  }
	  }

	  return jQuery.grep(elements, function( elem ) {
		  return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	  });
  }

	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

  filter in turn calls jQuery.find.matchesSelector, which I guess delegates the 
  job to Sizzle.matchesSelector

*/
}

// OPTIMIZED_VERSION //
filter: function(a) {
  return (a=="*")?this:$(this.e.filter(function(b){
    return ~$(a, $(b).parent().e[0]).e.indexOf(b);
  }));
}


