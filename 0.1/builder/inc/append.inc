  append: function() {
    var args = arguments;
    this._e(function(el) {
      for (var i=0; i<args.length; i++) {
        p$(args[i])._e(function(el2) {
          el.appendChild(el2);
        });
      }
    });    
  },
