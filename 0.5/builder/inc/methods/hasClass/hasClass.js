/*
.hasClass() 

Description:
  Determine whether any of the matched elements are assigned the given class.
  https://api.jquery.com/hasClass/


  .hasClass( className ) => Boolean
     className [String]: 
        The class name to search for.

*/
hasClass: function(className) {
  return this.e.some(function(el){
    // It will work both with /\s+/ and /\s/.
    // We go for the latter, because:
    // - situation with more spaces is probably rare (so any potential performance gain with plus is not important)
    // - well, it works!
    // - gzip will generally be smaller without plus. For example, /\s/ occours in removeClass()
    return el.className.split(/\s/).some(function(c){
      return c==className
    });
  });
}

