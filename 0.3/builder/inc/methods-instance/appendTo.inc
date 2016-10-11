/*
.appendTo() 

Description:
  Insert every element in the set of matched elements to the end of the target.
  http://api.jquery.com/appendTo/

Fully supported signatures:   
  .appendTo( target ) => jQuery

    target [Selector or htmlString or Element or Array or jQuery]
      A selector, element, HTML string, array of elements, or jQuery object;
      the matched set of elements will be inserted at the end of the element(s)
      specified by this parameter.

*/
appendTo: function(a) {
  var c = [], d = this, g = $(a).e, e = g.length - 1, b;
  __ITERATE__(g, function(a, f) {
    b = f == e ? d.clone(1) : d;
    $(a).append(b);
    Array.prototype.push.apply(c, b);
  });
  return $(c);
}

// OPTIMIZED_VERSION //
appendTo: function(a) {
  var c = [], d = this, g = $(a).e, e = g.length - 1, b;
  __ITERATE__(g, function(a, f) {
    b = f == e ? d.clone(1) : d;
    $(a).append(b);
    Array.prototype.push.apply(c, b);
  });
  return $(c);
}
