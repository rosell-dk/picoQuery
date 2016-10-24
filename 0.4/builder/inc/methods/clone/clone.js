/*
.clone()

Description:
   Create a deep copy of the set of matched elements.
   http://api.jquery.com/clone/

Partially supported signatures:
.clone( [withDataAndEvents], [deepWithDataAndEvents] )
  withDataAndEvents (default: false)
    Type: Boolean
    A Boolean indicating whether event handlers should be copied along with the elements. As of jQuery 1.4, element data will be copied as well.

  deepWithDataAndEvents (default: value of withDataAndEvents)
    Type: Boolean
    A Boolean indicating whether event handlers and data for all children of the cloned element should be copied. By default its value matches the first argument's value (which defaults to false).

*/
clone: function() {
//  __MAP__(this.e, function(item){ return item.cloneNode(true) });
//  return this;

  var arr = [];
  __ITERATE__(this.e, function(item) {
    arr.push(item.cloneNode(true));
  });
  return $(arr);

  /* Zepto implementation:
     -- (I don't get this. Mapping destroys the original elements...)
  return this.map(function(){ return this.cloneNode(true) })
  */
}

