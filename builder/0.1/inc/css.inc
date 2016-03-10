  css: function(n,v) {
    if (v === undefined) {
      return this._v[0].style[n];
    } 
    else {
      return this._e(function(el) {
        el.style[n] = v;
      });
    }
  },
