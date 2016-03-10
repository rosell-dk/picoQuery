  addClass: function(v) {
    return this._e(function(el) {
<?php if ($comments_devel_notes): ?>
      // http://caniuse.com/#feat=classlist
<?php endif; ?>
      if (el.classList) {
        el.classList.add(v);
      } 
      else {
        el.className+=' '+v;
      }
    });
  },
