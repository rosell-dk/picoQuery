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
  if (__IS_UNDEFINED__(value)) {
    // if Requirement: Return undefined on empty set (do not throw error)
    if (!(0 in this.e)) {
      return undefined;
    }
    // if Requirement: Return undefined for text-nodes and comment nodes (do not throw error)
		// TODO: jQuery tests allows all nodes, except text, comment and attribute nodes
    // like this: 	if ( nType === 3 || nType === 8 || nType === 2 ) {
    // but which other types than element node are relevant?
    // Document does not support setAttribute, and neither does DocumentFragment. The rest
    // seems irrelavant as well (list of the rest: http://www.w3schools.com/jsref/prop_node_nodetype.asp)

    if (this.e[0].nodeType != 1) {
      return undefined;
    }

    // if Requirement: Return undefined for non-existant attributes (instead of null)
    var z=this.e[0].getAttribute(name);
    return (z == null ? undefined : z);
    // else:
    // return this.e[0].getAttribute(name);

  }
  else {
    __ITERATE__(this.e, function(node, index) {
//      if (node.nodeType !== 1) return


      // If Requirement: if value is null, delete the attribute
      // Set attribute on a node, or remove it, if value is null
      function setOrRemoveAttribute(node, name, value) {
        // if Requirement: Convert value to string
        value == null ? node.removeAttribute(name) : node.setAttribute(name, value + "");
        // else:
        //value == null ? node.removeAttribute(name) : node.setAttribute(name, value);
      }

      // If Requirement: .attr( attributes ) => jQuery
      if (typeof name == "object") {
        for (key in name) {
          setOrRemoveAttribute(node, key, name[key])
        }
      }
      else {
        if (__IS_FUNCTION__(value)) {
          
          setOrRemoveAttribute(node, name, value.call(node, index, $(node).attr(name)));
        }
        else {
          setOrRemoveAttribute(node, name, value);
        }
      }
    });
    return this;
  }
  
/* zepto implementation:
  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
  }
    attr: function(name, value){
      var result
      return (typeof name == 'string' && !(1 in arguments)) ?
        (0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : undefined) :
        this.each(function(idx){
          if (this.nodeType !== 1) return
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    },
*/


  /*jQuery implementation:
jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
*/

}

// OPTIMIZED_VERSION //
/*
TODO: consider which is best size and performance-wise:
if (1 in arguments)
if (arguments.length > 1)
if (value === u)
*/
/*
I put this into closure compiler:

attr: function(name, value) {
  if (__IS_UNDEFINED__(value)) {
    if (!(0 in this.e)) {
      return undefined;
    }
    if (this.e[0].nodeType != 1) {
      return undefined;
    }

    z=this.e[0].getAttribute(name);
    return (z == null ? undefined : z);
  }
  else {
    __ITERATE__(this.e, function(node, index) {
      function setOrRemoveAttribute(node, name, value) {
        value == null ? node.removeAttribute(name) : node.setAttribute(name, value + "");
      }
      if (typeof name == "object") {
        for (key in name) {
          setOrRemoveAttribute(node, key, name[key])
        }
      }
      else {
        if (__IS_FUNCTION__(value)) {          
          setOrRemoveAttribute(node, name, value.call(node, index, $(node).attr(name)));
        }
        else {
          setOrRemoveAttribute(node, name, value);
        }
      }
    });
    return this;
  }
}
*/
attr:function(a, c) {
  if (__IS_UNDEFINED__(c)) {
    if (!(0 in this.e) || 1 != this.e[0].nodeType) {
      return;
    }
    z = this.e[0].getAttribute(a);
    return null == z ? void 0 : z;
  }
  __ITERATE__(this.e, function(b, e) {
    function d(a, b, c) {
      null == c ? a.removeAttribute(b) : a.setAttribute(b, c + "");
    }
    if ("object" == typeof a) {
      for (key in a) {
        d(b, key, a[key]);
      }
    } else {
      __IS_FUNCTION__(c) ? d(b, a, c.call(b, e, $(b).attr(a))) : d(b, a, c);
    }
  });
  return this;
}
