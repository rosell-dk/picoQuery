/*
.attr() 

Description:
  Remove an attribute from each element in the set of matched elements.
  http://api.jquery.com/removeAttr/

Fully supported signatures: 
  .removeAttr( attributeName ) => jQuery
    Type: String
    An attribute to remove; as of version 1.7, it can be a space-separated list of attributes.

*/
removeAttr: function(name) {
  // Requirement: no attributeName supplied => nothing happens
  if (name) {
    __ITERATE__(this.e, function(node) {

      // If no requirement for space-seperated list:
  //    node.removeAttribute(name);
      __ITERATE__(name.split(' '), function(attr) {
          node.removeAttribute(attr);
        });
    });
  }
  return this;
}

