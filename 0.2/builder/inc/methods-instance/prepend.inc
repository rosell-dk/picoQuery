/*
.prepend() 

Description:
  Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.
  http://api.jquery.com/prepend/

Fully supported signatures (TODO: test):   
  .prepend( content [,content] ) => jQuery
     content [htmlString or Element or Text or Array or jQuery]
      DOM element, text node, array of elements and text nodes, HTML string, or jQuery object to insert at the beginning of each element in the set of matched elements


  Unsupported signatures:   
  .prepend( function ) => jQuery
*/

prepend: function() {
  var z = __TO_ARRAY__(arguments);
  __ITERATE__(this.e, function(b) {
    __ITERATE__(z,function(a){
      __ITERATE__($(a).e, function(c) {
        b.insertBefore(c, b.firstChild);
      });
    })
  });
  return this;
}

// OPTIMIZED_VERSION //
prepend: function() {
/*  __ITERATE__(__TO_ARRAY__(arguments),function(a){
    alert(a);
  });
  return;*/
  
//  __EACH__(this, function(b) {
  z = __TO_ARRAY__(arguments);
  __ITERATE__(this.e, function(b) {
    // We generally use the "ITERATE" helper instead of "for (var i=0; i<..."
    // - it produces more compact code.
    // compare this the following two:
    //   I(b,function(a){console.log(a)})
    //   for (z=0;z<b.length;z++){console.log(b[z])}

    __ITERATE__(z,function(a){
      __ITERATE__($(a).e, function(c) {
//      __EACH__($(a), function(c) {
        b.insertBefore(c, b.firstChild);

      });
    })
  });
  return this;
}


