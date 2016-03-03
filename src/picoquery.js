function picoQuery(sel) {return new picoQueryClass(sel);}
function picoQueryClass(sel) {this.init(sel)}

picoQueryClass.prototype = {

  // Core
  init: function(sel) {if (typeof sel === 'string') {this.nodes = Array.prototype.slice.call(document.querySelectorAll(sel));} else if (sel.nodeType) {this.nodes = [sel];} else if (sel.length) {this.nodes = Array.prototype.slice.call(sel);}},
  each: function(fn){[].forEach.call(this.nodes, fn); return this},

  // Basic (commonly needed in above-the-fold scripts)
  get: function(i){return this.nodes[i];},
  css: function(n,v){
    if (v === undefined) {
      return this.nodes[0].style[n];
    }
    else {
      return this.each(function(el) {
        el.style[n] = v;
      });
    }
  },
  addClass: function(v){return this.each(function(el) {if (el.classList){el.classList.add(v);} else {el.className+=' '+v;}});},

  // Convenience (nice-to-haves in above-the-fold scripts)
  hide: function(fn){this.css('display','none')}, // Partial implementation of jQuery hide. No effects, and initial display value is not remembered
  first: function(fn){return picoQuery(this.nodes[0])},

  // Events. Probably not needed for above-the-fold scripting
  on: function(type,fn){return this.each(function(el) {el.addEventListener(type,fn,false);});},
  click: function(fn){this.on('click',fn);},

}

p$ = picoQuery;
