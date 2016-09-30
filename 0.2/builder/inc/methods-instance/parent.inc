/*
parent

Description:
  Get the parent of each element in the current set of matched elements, optionally filtered by a selector.
  http://api.jquery.com/parent/

Fully supported signatures: 
  .parent( [selector] ) => String
    selector [String]: 
      A string containing a selector expression to match elements against.

  Done: $(document).parent() should return an jQuery object, which has length = 0
        right now, it has a null element

  Done: Duplicate items should be removed, so ie $('li').parent('ul') only returns as
        many ul's that there are in the document
 */
parent: function(selector) {
//  return $(this.e.map(function(a){return a['parentNode']})).filter(selector||'*');

  // Map elements to their parent node
  var arr = this.e.map(function(a){return a['parentNode']});

  // Remove duplicates
//  arr = arr.filter(function(item,i,r){return r.indexOf(item) == i});

  // Remove nulls
//  arr = arr.filter(function(item,i,r){return item != null});


  // Remove duplicates and nulls

  // Note that this code does not work with prototype 1.7.
  // The problem is that prototype 1.7 overrides Array.prototype.filter (even though it already
  // exists) and that it forgets the third argument (even though its ES5 standard)
  // Both these problems seems fixed in prototype 1.7.2
  // Here is a prototype 1.7 compatible variant:
  // arr = arr.filter(function(item,i,r){return item && arr.indexOf(item) == i});
  

  arr = arr.filter(function(item,i,r){return item && r.indexOf(item) == i});



  // Wrap and filter
  return $(arr).filter(selector||'*');

  // 
//  return selector ? $(arr).filter(selector) : $(arr);

}

// OPTIMIZED_VERSION //
parent: function(a) {
  return $(this.e.map(function(b){return b["parentNode"]}).filter(function(c,i,r){return c && r.indexOf(c) == i})).filter(a||"*");
}

