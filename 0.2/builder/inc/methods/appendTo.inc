/*
.appendTo() 

Description:
  Insert every element in the set of matched elements to the end of the target.
  http://api.jquery.com/appendTo/

Fully supported signatures:   
  .append( target ) => $

    target [Selector or htmlString or Element or Array or jQuery]
      A selector, element, HTML string, array of elements, or jQuery object;
      the matched set of elements will be inserted at the end of the element(s)
      specified by this parameter.

*/
appendTo: function(t) {
  __EACH__(this, function(el) {
    $(t).append(el);
  }); return this;
}
