/*
.append() 

Description:
  Insert content, specified by the parameter, to the end of each element in the set of matched elements.
  http://api.jquery.com/append/

Fully supported signatures:   
  .append( content [,content] ) => jQuery  (Retrieve one of the elements matched by the jQuery object.)     
     content [htmlString or Element or Text or Array or jQuery]

Unsupported signatures:   

  .append( function ) => jQuery
*/

append: function() {
  var a=arguments;
  __EACH__(this, function(el) {

//    [].forEach.call($.e, f)
//  a.forEach()
    for (var i=0; i<a.length; i++) {
      __EACH__($(a[i]), function(el2) {
        el.appendChild(el2);
      });
    }
  });
  return this;
}

// OPTIMIZED_VERSION //
append: function() {
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
        b.appendChild(c);
      });
    })
  });
  return this;
}


