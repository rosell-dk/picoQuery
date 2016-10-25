I put this half-optimized version into Closure Compiler:

closest:function(selector, context) {
  return $(this.e.map(function(elm){
    while (elm) {
      if (elm == context) {
        // Instead of returning null, we return 0 in this optimized version
        // It will be filtered out in the filter() call
        return 0;
      }
      if (~$(selector, $(elm).parent().e[0]).e.indexOf(elm)) {
        return elm;
      }
      elm = elm.parentNode;
    }
  }).filter(function(item,i,r) {
    return item && r.indexOf(item) == i
  }));
}
