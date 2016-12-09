Actually, we are not quite at minimum.

This code:

remove: function(selector) {

  var $sel = this.filter(selector||'*');
  $sel.e.forEach(function(item) {
    if (item.parentNode) {
      a['__picoquerydata'] = undefined;
      item.parentNode.removeChild(item);
    }
  });
  return this;
}

can be minified to this:

remove:function(c) {
  this.filter(c || "*").e.forEach(function(b) {
    b.parentNode && (a.__picoquerydata = void 0, b.parentNode.removeChild(b));
  });
  return this;
}

That is:

if (item.parentNode) {statement1; statement2}

can be minimized to:
item.parentNode && (statement1, statement2);


But doing so is not straightforward, because statement2 is inside a helper.
Since the gain is insignificant, we do not attempt this minor optimization
