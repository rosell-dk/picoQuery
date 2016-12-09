/*
TODO: consider which is best size and performance-wise:
if (1 in arguments)
if (arguments.length > 1)
if (value === u)
if (value === undefined)
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
