  on: function(type,fn) {
    return this._e(function(el) {
      el.addEventListener(type,fn,false);
    });
  },
