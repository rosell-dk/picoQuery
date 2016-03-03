/*
The bare essentials for above-the-fold scripting.

If you need more methods, go fishing in microquery-oneliners.js
If you want to see documented code, go to microquery-documented.js
*/

function picoQuery(sel) {return new picoQueryClass(sel);}
function picoQueryClass(sel) {this.init(sel)}

picoQueryClass.prototype = {
  init: function(sel) {if (typeof sel === 'string') {this.nodes = Array.prototype.slice.call(document.querySelectorAll(sel));} else if (sel.nodeType) {this.nodes = [sel];} else if (sel.length) {this.nodes = Array.prototype.slice.call(sel);}},
  each: function(fn){[].forEach.call(this.nodes, fn); return this},
  get: function(i){return this.nodes[i];},
  css: function(n,v){if (v === undefined) {return this.nodes[0].style[n];} else {return this.each(function(el) {el.style[n] = v;});}},
  addClass: function(v){return this.each(function(el) {if (el.classList){el.classList.add(v);} else {el.className+=' '+v;}});},
}

p$ = picoQuery;
