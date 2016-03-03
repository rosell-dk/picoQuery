function picoQuery(sel) {
  return new picoQueryClass(sel);
}
function picoQueryClass(sel) {

  if (typeof sel === 'string') { 
    this.nodes = Array.prototype.slice.call(document.querySelectorAll(sel));
  }
  // Handle $(DOMElement)
  else if (sel.nodeType ) {
    this.nodes = [sel];
  }
  // Handle $(DOMElementList)
  else if (sel.length) {
    this.nodes = Array.prototype.slice.call(sel);
  }
}
picoQueryClass.prototype = {  
  each: function(fn) {
    [].forEach.call(this.nodes, fn);
  },
  get: function(i) {
    return this.nodes[i];
  },
  addClass: function (v) {
    return this.each(function (n) {
      if (n.classList) {
        n.classList.add(v);
      } 
      else {
        n.className += ' ' + v;
      }
    });
  },
}

p$ = picoQuery;
