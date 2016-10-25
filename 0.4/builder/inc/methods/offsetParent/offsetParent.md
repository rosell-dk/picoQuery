Optimization idea:
Now with pushstack, it might be better to use the .map() method (if available).
But only when pushstack is enabled

  
/* If only one element, we can do like this:
var el = this.e[0];
return $(el.offsetParent || el);*/


// youmightnotneedjquery.com says we can do this:
// return (el.offsetParent || el);
// However, if current element is hidden, that will return current element,
// but jQuery will return document element

// Its a riddle to me why jQuery and zepto checks if offsetParent is "static", because
// Element.offsetParent() is supposed to return nearest anchestor that has a position
// OTHER than static (http://www.w3schools.com/jsref/prop_element_offsetparent.asp)

 
### jQuery implementation:

offsetParent: function() {
	return this.map( function() {
		var offsetParent = this.offsetParent;

		while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
			offsetParent = offsetParent.offsetParent;
		}

		return offsetParent || documentElement;
	} );
}

###  zepto implementation:

offsetParent: function() {
  return this.map(function(){
    var parent = this.offsetParent || document.body
    while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
      parent = parent.offsetParent
    return parent
  })
}

