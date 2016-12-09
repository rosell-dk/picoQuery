/*
.attr() 

Description:
  Get the value of an attribute for the first element in the set of matched elements or set one or more attributes for every matched element.
  http://api.jquery.com/attr/

Fully supported signatures: 
  .attr( attributeName ) => String

  .attr( attributeName, value ) => jQuery
      attributeName
        Type: String
        The name of the attribute to set.value
      value
        Type: String or Number or Null
        A value to set for the attribute. If null, the specified attribute will be removed (as in .removeAttr()).

  .attr( attributes ) => jQuery
      attributes
        Type: PlainObject
        An object of attribute-value pairs to set.

  .attr( attributeName, function ) => jQuery

      attributeName
        Type: String
        The name of the attribute to set.

      function
        Type: Function( Integer index, String attr ) => String or Number
        A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old attribute value as arguments.

*/
attr: function(name, value) {
  if (!(1 in arguments) && (__IS_STRING__(<@ name @>))) {
    // if Requirement: Return undefined on empty set (do not throw error)
/*    if (!(0 in this.e)) {
      return undefined;
    }*/
    // if Requirement: Return undefined for text-nodes and comment nodes (do not throw error)
		// TODO: jQuery tests allows all nodes, except text, comment and attribute nodes
    // like this: 	if ( nType === 3 || nType === 8 || nType === 2 ) {
    // but which other types than element node are relevant?
    // Document does not support setAttribute, and neither does DocumentFragment. The rest
    // seems irrelavant as well (list of the rest: http://www.w3schools.com/jsref/prop_node_nodetype.asp)

/*
    if (this.e[0].nodeType != 1) {
      return undefined;
    }*/

    if ((0 in this.e) && (this.e[0].nodeType == 1)) {
      // if Requirement: Return undefined for non-existant attributes (instead of null)
      var z=this.e[0].getAttribute(name);
      return (z == null ? undefined : z);
    }
    // else:
    // return this.e[0].getAttribute(name);

  }
  else {
    __ITERATE__(<@ this.e @>, <@ function(node, index) {
//      if (node.nodeType !== 1) return


      // If Requirement: if value is null, delete the attribute
      // Set attribute on a node, or remove it, if value is null
      function setOrRemoveAttribute(node, name, value) {
        // if Requirement: Convert value to string
        value === null ? node.removeAttribute(name) : node.setAttribute(name, value + "");
        // else:
        //value == null ? node.removeAttribute(name) : node.setAttribute(name, value);
      }

      // If Requirement: .attr( attributes ) => jQuery

      if (__IS_OBJECT__(<@ name @>)) {
        for (key in name) {
          setOrRemoveAttribute(node, key, name[key])
        }
      }
      else {
        if (__IS_FUNCTION__(<@ value @>)) {
          
          setOrRemoveAttribute(node, name, value.call(node, index, $(node).attr(name)));
        }
        else {
          setOrRemoveAttribute(node, name, value);
        }
      }
    } @>);
    return this;
  }
  

}

