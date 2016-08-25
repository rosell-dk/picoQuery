  each: function(fn) {    
    this._e(function(el, i) {
      fn.call(el, i, el);
    });
    return this;
  },
