/*
.offset() 

Description:
  Get the current coordinates of the first element, or set the coordinates of every element, in the set of matched elements, relative to the document.
  http://api.jquery.com/offset/

Supported signatures:   
  .offset( ) => Object

Unsupported signatures:
  .offset( coordinates ) => jQuery
  .offset( function ) => jQuery

*/

offset: function(a) {
  var rect = this.e[0].getBoundingClientRect();
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset
  }


  /* youmightnotneedjquery.com proposed this solution:
     it however does not comply, when document is scrolled
  var rect = this.e[0].getBoundingClientRect();
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  }*/
}

// OPTIMIZED_VERSION //
offset:function(a,aa,aaa) {
  return 0;
}
