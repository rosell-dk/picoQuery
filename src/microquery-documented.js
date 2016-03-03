/*
This file contains easy to read scripts with comments.
You will turn to this file if you are interested in the inner mechanisms.
This is also more commented
*/

function picoQuery(sel) {
  return new picoQueryClass(sel);
}

function picoQueryClass(sel) {
  this.init(sel)
}

picoQueryClass.prototype = {

  // Core
  // ====

  init: function(sel) {
    if (typeof sel === 'string') {
      this.nodes = Array.prototype.slice.call(document.querySelectorAll(sel));
    } 
    // DOM Element
    else if (sel.nodeType) {
      this.nodes = [sel];
    } 
    // DOM list
    else if (sel.length) {
      this.nodes = Array.prototype.slice.call(sel);
    }
  },

  each: function(fn) {
    [].forEach.call(this.nodes, fn); return this
  },


  // Basic (commonly needed in above-the-fold scripts)
  // =================================================

  get: function(i) {
    return this.nodes[i];
  },

  css: function(n,v) {
    if (v === undefined) {
      return this.nodes[0].style[n];
    } 
    else {
      return this.each(function(el) {
        el.style[n] = v;
      });
    }
  },

  // IE8+
  addClass: function(v) {
    return this.each(function(el) {
      if (el.classList) {
        el.classList.add(v);
      } 
      else {
        el.className+=' '+v;
      }
    });
  },

  // Convenience (nice-to-haves in above-the-fold scripts)
  // =====================================================

  // Partial implementation of jQuery hide. No effects, and initial display value is not remembered
  hide: function(fn) {
    this.css('display','none')
  }, 
  first: function(fn) {
    return picoQuery(this.nodes[0])
  },

  // Events. Probably not needed for above-the-fold scripting
  // Events are IE9+
  // ========================================================

  on: function(type,fn) {
    return this.each(function(el) {
      el.addEventListener(type,fn,false);
    });
  },

  _ev: function(type,fn) {
    if (fn === undefined) {
      var ev = document.createEvent('HTMLEvents');
      ev.initEvent(type,true,false);
      this.nodes[0].dispatchEvent(ev);return this;
    } 
    else {
      return this.on(type,fn);
    }
  },

  // Individual events
  // Note: You need the first two methods ("on" and "_ev") for these to work
  click: function(fn){return this._ev('click', fn);},
  focus: function(fn){return this._ev('focus', fn);},
  keyup: function(fn){return this._ev('keyup', fn);},

}

p$ = picoQuery;
